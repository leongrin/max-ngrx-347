import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as fromStore from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromStore.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
