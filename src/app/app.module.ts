import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ShoppingCartItemComponent} from './components/shopping-cart-item/shopping-cart-item.component';
import {FormsModule} from '@angular/forms';
import {ShoppingCartWidgetComponent} from './components/shopping-cart-widget/shopping-cart-widget.component';
import {ShoppingService} from './shopping.service';
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './app.redux';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    ShoppingCartWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
