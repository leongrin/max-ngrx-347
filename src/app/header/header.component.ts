import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import * as fromApp from '../store/app.reducer'
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(map( authState => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    /*this.dataStorageService.storeRecipes();*/
    this.store.select('recipes')
      .subscribe(recipesState => {
        console.log('We received recipesState. Now lets dispatch');
      this.store.dispatch(new RecipesActions.StoreRecipes(recipesState.recipes));
    })
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    /*this.authService.logout();*/
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
