import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from '../shopping-cart-item/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  @Input() shoppingItems: CartItem[] = [];
  @Output() shoppingItemsChange = new EventEmitter<CartItem[]>();

  constructor() {
  }

  getTotal() {
    return this.shoppingItems.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  removeItem(itemTobeRemoved: CartItem) {
    this.shoppingItemsChange.emit(this.shoppingItems.filter(i => i.id !== itemTobeRemoved.id));
  }
}
