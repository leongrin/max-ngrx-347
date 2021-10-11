import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as RecipesActions from './recipes.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipesEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) {
  }

  storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionsData, recipesData]) => {
        console.log('Lets store recipes on the server via effects => ' + recipesData.recipes);
        return this.http
          .put(
            'https://new-udemy-auth-default-rtdb.firebaseio.com/recipes.json',
            recipesData.recipes
          );
      })
    )
  }, { dispatch: false });


  getRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.GET_RECIPES),
      switchMap(() => {
        return this.http
          .get<Recipe[]>(
            'https://new-udemy-auth-default-rtdb.firebaseio.com/recipes.json'
          );
      }),
      map((recipes: Recipe[])=> {
        return  new RecipesActions.SetRecipes(recipes);
      })
    )
  })

}
