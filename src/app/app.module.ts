import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {FormsModule} from '@angular/forms';
import {ShoppingCartWidgetComponent} from './components/shopping-cart-widget/shopping-cart-widget.component';
import {ShoppingService} from './shopping.service';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ShoppingCartWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
