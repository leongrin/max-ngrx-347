import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start'
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_FAILED = '[Auth] LOGIN_FAILED';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date} ) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;

  constructor(public payload: string) {
  }
}




export type AuthActionsTypes = Login | Logout | LoginStart | LoginFailed;
