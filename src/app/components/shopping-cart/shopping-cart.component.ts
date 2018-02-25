import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CartItem} from './cart-item';
import {IShoppingListState, RemoveItemFromCartAction, totalPriceSelector} from '../../app.redux';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {
  @Input() shoppingItems: CartItem[];
  $total = this.store.select(totalPriceSelector);

  constructor(private store: Store<IShoppingListState>) {
  }

  removeItem(itemTobeRemoved: CartItem) {
    this.store.dispatch(new RemoveItemFromCartAction(itemTobeRemoved));
  }
}
