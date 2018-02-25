import {Injectable} from '@angular/core';
import {CartItem} from './components/shopping-cart/cart-item';
import {Observable} from 'rxjs/Observable';
import {HttpResponse} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';

@Injectable()
export class ShoppingService {

  constructor() {
  }

  buyItems(items: CartItem[]): Observable<HttpResponse<any> | Error> {
    if (!items || items.length < 1) {
      return Observable.throw(new Error('Shopping list is empty'));
    }

    return Observable
      .of(new HttpResponse({
        status: 200,
        statusText: 'Your order has been placed successfully'
      }))
      .delay(2000);
  }
}
