import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.store.select('recipes')
        .subscribe(recipesState => {
          this.recipe = recipesState.recipes[+params.id];
        })
    });


    /*this.route.params
      .pipe(
        tap((params: Params) => this.id = +params['id']),
        switchMap(() => {
          return this.store.select('recipes')
            .subscribe(recipesState => {
                this.recipe = recipesState.recipes[this.id];
            })
        })
      );*/
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    /*this.recipeService.deleteRecipe(this.id);*/
    console.log('onDeleteRecipe clicked ID => ' + this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe({index: this.id}));
    this.router.navigate(['/recipes']);
  }

}
