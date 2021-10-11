import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as RecipesActions from './recipes.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipesEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              ) {
  }

  storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      switchMap((recipeData: RecipesActions.StoreRecipes) => {
        console.log('Lets store recipes on the server via effects => ' + recipeData.payload);
        return this.http
          .put(
            'https://new-udemy-auth-default-rtdb.firebaseio.com/recipes.json',
            recipeData.payload
          );
      }),
      tap(() => console.log('saveddddddddd'))
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
