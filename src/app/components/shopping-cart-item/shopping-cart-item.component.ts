import {Component, Input} from '@angular/core';
import {CartItem} from './cart-item';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  @Input() item: CartItem;

  constructor() {
  }
}
