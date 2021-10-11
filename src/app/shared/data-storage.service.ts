import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnDestroy{
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    let recipes: Recipe[];
    this.store.select('recipes')
      .pipe(
        map(recipeState => recipes = recipeState.recipes),
        tap(recipes => this.store.dispatch(new RecipesActions.StoreRecipes(recipes)))
        );


    /*this.http
      .put(
        'https://new-udemy-auth-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });*/
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://new-udemy-auth-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          console.log('Getting back recipes...');
          return recipes ? recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          }) : [];
        }),
        tap(recipes => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }

  ngOnDestroy() {
  }
}
