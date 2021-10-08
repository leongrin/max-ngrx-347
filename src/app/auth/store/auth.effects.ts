import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions'
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user.model';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

let tokenExpirationTimer: any;

const autoLogout= (expirationDuration: number) => {
  tokenExpirationTimer = setTimeout(() => {
    return of(new AuthActions.Logout());
  }, expirationDuration);
}

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFailed(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFailed(errorMessage));
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  autoLogout(resData.expiresIn);

  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    expirationDate: expirationDate,
    token: resData.idToken
  })
}

@Injectable()
export class AuthEffects {

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
          ).pipe(
            map(resData => {
              return handleAuthentication(resData)
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            }))
      })
    );
  });


  authRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap(() => {
        this.router.navigate(['/']);
      })
    )}, { dispatch: false }
  );


  authSignUpStart$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
          return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
            ).pipe(
              map(resData => {
                return handleAuthentication(resData)
              }),
              catchError(errorRes => {
                return handleError(errorRes);
              })
            )
        })
      )
    }
  );


  authLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        localStorage.removeItem('userData');
        if (tokenExpirationTimer) {
          clearTimeout(tokenExpirationTimer);
        }
        tokenExpirationTimer = null;
      })
    );
  }, {dispatch: false})


  authAutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() =>{
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'DUMMY'};
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {

          return new AuthActions.AuthenticateSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate)
          });
        } else {
          return { type: 'DUMMY'};
        }
      })

    )
  )


  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }
}
