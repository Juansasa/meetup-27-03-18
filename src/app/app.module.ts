import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {FormsModule} from '@angular/forms';
import {ShoppingCartWidgetComponent} from './components/shopping-cart-widget/shopping-cart-widget.component';
import {ShoppingService} from './shopping.service';
import {StoreModule} from '@ngrx/store';
import {ShoppingEffect, shoppingListReducer} from './app.redux';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ShoppingCartWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      ShoppingEffect
    ])
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
