import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from '../logging.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  /*private subscription: Subscription;*/

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );*/

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    /*this.slService.startedEditing.next(index);*/
    console.log(`onEditItem from shoppingListComponent index => ${index}`);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    /*this.subscription.unsubscribe();*/
  }
}
