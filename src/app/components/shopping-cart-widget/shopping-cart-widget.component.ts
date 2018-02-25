import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styleUrls: ['./shopping-cart-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartWidgetComponent {
  @Input() itemCount = 0;
  @Input() totalPrice = 0;

  constructor() {
  }
}
