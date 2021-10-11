import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';
import * as fromState from '../store/app.reducer';
import {Store} from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipes.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private store: Store<fromState.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*const recipes = this.recipesService.getRecipes();*/
    console.log('Inside Recipes Resolver');
    let recipes: Recipe[];
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          /*return this.dataStorageService.fetchRecipes();*/
          this.store.dispatch(new RecipesActions.GetRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.GET_RECIPES),
            take(1)
          )
        } else {
          return of(recipes);
        }
      })
    )
  }
}
