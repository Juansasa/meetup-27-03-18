import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CartItem} from './components/shopping-cart/cart-item';
import {IAlert} from './components/shopping-cart/alert';
import {Observable} from 'rxjs/Observable';
import {AddItemAction, alertSelector, BuyItemsAction, IShoppingListState, shoppingListSelector, totalPriceSelector} from './app.redux';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  $shoppingList: Observable<CartItem[]> = this.store.select(shoppingListSelector);
  $alerts: Observable<IAlert> = this.store.select(alertSelector);
  $totalPrice: Observable<number> = this.store.select(totalPriceSelector);

  constructor(private store: Store<IShoppingListState>) {
  }

  addItem() {
    const newItem = new CartItem();
    newItem.id = new Date().getTime() + '';
    newItem.name = 'Product-' + Math.floor(Math.random() * 1000);
    newItem.price = Math.floor(Math.random() * 1000);

    this.store.dispatch(new AddItemAction(newItem));
  }

  buyItems() {
    this.$shoppingList
      .take(1)
      .subscribe(items => this.store.dispatch(new BuyItemsAction(items)));
  }

  probe() {
    console.log('probed');
  }
}
