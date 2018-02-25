import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CartItem} from './components/shopping-cart/cart-item';
import {ShoppingService} from './shopping.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  shoppingList: CartItem[] = [];
  backendResponse: { message: string, type: 'error' | 'success' };

  constructor(private shoppingSvc: ShoppingService, private changeDetector: ChangeDetectorRef) {
  }

  addItem() {
    const newItem = new CartItem();
    newItem.id = new Date().getTime() + '';
    newItem.name = 'Product-' + this.shoppingList.length;
    newItem.price = Math.floor(Math.random() * 1000);

    this.shoppingList = [...this.shoppingList, newItem];
  }

  getTotal() {
    return this.shoppingList.reduce((sum, item) => sum + item.price, 0);
  }

  buyItems() {
    this.shoppingSvc.buyItems(this.shoppingList)
      .subscribe((response: HttpResponse<any>) => {
        this.shoppingList = [];
        this.backendResponse = {
          message: response.statusText,
          type: 'success'
        };
        this.changeDetector.detectChanges();
      }, (error: Error) => {
        this.backendResponse = {
          message: error.message,
          type: 'error'
        };
        this.changeDetector.detectChanges();
      });

    setTimeout(() => {
      this.backendResponse = null;
      this.changeDetector.detectChanges();
    }, 5000);
  }

  probe() {
    console.log('checked');
  }
}
