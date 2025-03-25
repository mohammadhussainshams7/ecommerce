import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  countItemsCard : WritableSignal<number> = signal(0)




  /** Get cart items from local storage */
  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  /** Save cart items to local storage */
  private saveCart(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
  
  incrementCountItemsCard(){
    this.countItemsCard.update(value => value + 1)
  }

  decrementCountItemsCard(){
     this.countItemsCard.update(value => value - 1)
  }

/*   getCountItemsCard(){
    
    return this.getCartItems().length? this.getCartItems().length : this.countItemsCard();
  } */


    /** Add item to cart */
    addToCart(item: any): void {
      let items = this.getCartItems();
      let existingItem = items.find((i) => i.id === item.id);
  
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        items.push({ ...item, quantity: item.quantity || 1 });
      }
  
      this.saveCart(items);
    }

      /** Remove item from cart */
  removeFromCart(itemId: number): void {
    let items = this.getCartItems().filter((item) => item.id !== itemId);
    this.saveCart(items);
    
  }


    /** Update cart item count */
    updateCartItemCount(itemId: number, quantity: number): void {
      let items = this.getCartItems();
      let item = items.find((i) => i.id === itemId);
  
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0 && confirm("Are You Sure Delete This Item")){
          this.removeFromCart(itemId);
          this.decrementCountItemsCard()
        } else {
          this.saveCart(items);
        }
      }
    }


      /** Set cart items (replace all items) */
  setCartItems(items: any[]): void {
    this.saveCart(items);
  }

  /** Get cart total price */
  getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /** Get number of elements in cart */
  getNumberOfItems(): number {
    return this.getCartItems().reduce((count, item) => count + item.quantity, 0);
  }



}
