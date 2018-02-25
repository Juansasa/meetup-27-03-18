import {Component} from '@angular/core';
import {CartItem} from './components/shopping-cart-item/cart-item';
import {ShoppingService} from './shopping.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  shoppingList: CartItem[] = [];
  backendResponse: { message: string, type: 'error' | 'success' };

  constructor(private shoppingSvc: ShoppingService) {
  }

  addItem() {
    const newItem = new CartItem();
    newItem.id = new Date().getTime() + '';
    newItem.name = 'Product-' + this.shoppingList.length;
    newItem.price = Math.floor(Math.random() * 1000);
    newItem.amount = Math.floor(Math.random() * 100);

    this.shoppingList.push(newItem);
  }

  getTotal() {
    return this.shoppingList.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  buyItems() {
    this.shoppingSvc.buyItems(this.shoppingList)
      .subscribe((response: HttpResponse<any>) => {
        this.shoppingList = [];
        this.backendResponse = {
          message: response.statusText,
          type: 'success'
        };
      }, (error: Error) => {
        this.backendResponse = {
          message: error.message,
          type: 'error'
        };
      });

    setTimeout(() => {
      this.backendResponse = null;
    }, 5000);
  }
}
