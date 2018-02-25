import {CartItem} from './components/shopping-cart/cart-item';
import {IAlert} from './components/shopping-cart/alert';
import {Action, createSelector} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ShoppingService} from './shopping.service';
import {HttpResponse} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

export const ADD_ITEM = '[APP] Add item to shopping list';
export const REMOVE_ITEM = '[APP] Remove item to shopping list';
export const BUY = '[APP] Buy items';
export const BUY_SUCCESS = '[APP] Action Success';
export const BUY_FAILURE = '[APP] Action failed';
export const CLEAR_ALERT = '[App] Clear alert';


export interface IShoppingListState {
  items: CartItem[];
  alert: IAlert;
}

export class AddItemAction implements Action {
  type = ADD_ITEM;

  constructor(public itemToAdd: CartItem) {
  }
}

export class RemoveItemFromCartAction implements Action {
  type = REMOVE_ITEM;

  constructor(public itemToRemove: CartItem) {
  }
}

export class BuyItemsAction implements Action {
  type = BUY;

  constructor(public shoppingItems: CartItem[]) {
  }
}

export class BuySuccessAction implements Action {
  type = BUY_SUCCESS;

  constructor(public message: string) {
  }
}

export class BuyFailedAction implements Action {
  type = BUY_FAILURE;

  constructor(public message: string) {
  }
}

export class ClearAlertAction implements Action {
  type = CLEAR_ALERT;

  constructor() {
  }
}

// Initial state
const initialState: IShoppingListState = {
  items: [],
  alert: null
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
        items: [...state.items, (action as AddItemAction).itemToAdd]
      });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        items: [...state.items.filter(i => i.id !== (action as RemoveItemFromCartAction).itemToRemove.id)]
      });
    case BUY_SUCCESS:
      return Object.assign({}, state, <IShoppingListState>{
        items: [],
        alert: <IAlert>{
          message: (action as BuySuccessAction).message,
          type: 'success'
        }
      });
    case BUY_FAILURE:
      return Object.assign({}, state, {
        alert: <IAlert>{
          message: (action as BuySuccessAction).message,
          type: 'error'
        }
      });
    case CLEAR_ALERT:
      return Object.assign({}, state, {
        alert: null
      });
    default:
      return state;
  }
}

@Injectable()
export class ShoppingEffect {
  @Effect()
  buy$ = this.action$
    .ofType(BUY)
    .switchMap((action: BuyItemsAction) => this.shoppingService.buyItems(action.shoppingItems)
      .map((response: HttpResponse<any>) => new BuySuccessAction(response.statusText))
      .catch((error: Error) => of(new BuyFailedAction(error.message))));

  @Effect()
  hideAlert$ = this.action$
    .ofType(BUY_SUCCESS, BUY_FAILURE)
    .switchMap(() => of(new ClearAlertAction()).delay(3000));

  constructor(private action$: Actions, private shoppingService: ShoppingService) {
  }
}

// Selectors
const _rootSelector = (rootState) => rootState.shoppingList;
export const shoppingListSelector = createSelector(_rootSelector, (state: IShoppingListState) => state ? state.items : null);
export const alertSelector = createSelector(_rootSelector, (state: IShoppingListState) => state ? state.alert : null);
export const totalPriceSelector = createSelector(shoppingListSelector,
  (shoppingList: CartItem[]) => shoppingList ? shoppingList
    .reduce((sum, item) => sum + item.price, 0) : 0);
