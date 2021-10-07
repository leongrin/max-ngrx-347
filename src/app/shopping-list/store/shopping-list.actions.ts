import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = '[Shopping List] UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = '[Shopping List] DELETE_INGREDIENTS';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}


export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}


export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: Ingredient ) {
  }
}


export class DeleteIngredients implements Action {
  readonly type = DELETE_INGREDIENTS;
}


export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }
}


export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActionsTypes =
  AddIngredient |
  AddIngredients |
  UpdateIngredients |
  DeleteIngredients |
  StartEdit |
  StopEdit;
