import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log('INSIDE case ShoppingListActions.ADD_INGREDIENT:');
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      console.log('INSIDE case ShoppingListActions.ADD_INGREDIENTS:');
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENTS:
      console.log('INSIDE case ShoppingListActions.UPDATE_INGREDIENTS:');
      let updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = action.payload;

      return {
        ...state,
        ingredients: [...updatedIngredients],
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENTS:
      console.log('INSIDE case ShoppingListActions.DELETE_INGREDIENTS:');
      let ingredientsWithoutDeletedItem = [...state.ingredients].filter((item, index) => {
        return state.editedIngredientIndex !== index;
      });

      return {
        ...state,
        ingredients: ingredientsWithoutDeletedItem,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: +action.payload,
        editedIngredient: { ...state.ingredients[+action.payload]}
      }

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      }

    default:
      console.log('INSIDE default');
      return state
  }
}
