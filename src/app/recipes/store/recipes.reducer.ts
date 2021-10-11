import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipes.actions';


export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActionsTypes) {

  switch (action.type) {

    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    /*case RecipesActions.GET_RECIPES:
      return {
        ...state
      };*/

    case RecipesActions.GET_RECIPE:
      return {
        ...state
      };

    case RecipesActions.ADD_INGREDIENTS_TO_SHOPPING_LIST:
      return {
        ...state
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipesActions.UPDATE_RECIPE:
      const newRecipes = [...state.recipes];
      newRecipes[action.payload.index] = action.payload.newRecipe;
      return {
        ...state,
        recipes: [...newRecipes]
      };

    case RecipesActions.DELETE_RECIPE:
      const newRecipesDelete = [...state.recipes].filter( (item, index) => {
        return index != +action.payload.index
      });
      return {
        ...state,
        recipes: [...newRecipesDelete]
      };

    /*case RecipesActions.STORE_RECIPES:
      return {
        ...state
      };*/


    default:
      return state
  }

}
