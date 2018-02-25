export class CartItem {
  id: string;
  name: string;
  price = 0;
  amount = 0;

  getTotalPrice() {
    return this.amount * this.price;
  }

  increase() {
    this.amount = this.amount + 1;
  }

  decrease() {
    this.amount = Math.max(0, this.amount - 1);
  }
}

