import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface appState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}
