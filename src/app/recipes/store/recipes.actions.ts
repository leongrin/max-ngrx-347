import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export const SET_RECIPES = '[Recipes Actions] Set Recipes';
export const GET_RECIPES = '[Recipes Actions] Get Recipes';
export const GET_RECIPE = '[Recipes Actions] Get Recipe';
export const ADD_INGREDIENTS_TO_SHOPPING_LIST = '[Recipes Actions] Add Ingredients to Shopping List';
export const ADD_RECIPE = '[Recipes Actions] Add Recipe';
export const UPDATE_RECIPE = '[Recipes Actions] Update Recipe';
export const DELETE_RECIPE = '[Recipes Actions] Delete Recipes';
export const STORE_RECIPES = '[Recipes Actions] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class GetRecipes implements Action {
  readonly type = GET_RECIPES;
}

export class GetRecipe implements Action {
  readonly type = GET_RECIPE;
}

export class AddIngredientsToShoppingList implements Action {
  readonly type = ADD_INGREDIENTS_TO_SHOPPING_LIST;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, newRecipe: Recipe}) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: {index: number}) {
  }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}


export type RecipesActionsTypes =
  SetRecipes
  | GetRecipes
  | GetRecipe
  | AddIngredientsToShoppingList
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
