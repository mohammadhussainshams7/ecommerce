import { Injectable, signal } from '@angular/core';
import { Wishlist as WishlistInterFace } from '../interface/wishlist';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'wishlist'; // Key to store wishlist in localStorage
  private wishLisItemCountSubject = new BehaviorSubject<number>(0); // Subject to track item count
   countItemsWishList = signal(0)
 
  constructor() { }
    // Get Wishlist items from localStorage
    getWishlist(): any[] {
      const wishlist = localStorage.getItem(this.wishlistKey);
      return wishlist ? JSON.parse(wishlist) : [];
    }
     // Save wishlist items to localStorage
  saveWishlist(wishlist: any[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }
   // Add an item to the wishlist
   addToWishlist(item: any): void {
    const wishlist = this.getWishlist();
    const existingItem = this.getWishlist().find((wishlistItem) => wishlistItem.id === item.id);
    if(!existingItem){
      wishlist.push(item);
      this.saveWishlist(wishlist);
    }
    this.updateWishListItemCount()
  }

  incrementCountItemsWishList(){
     this.countItemsWishList.set(this.countItemsWishList()+1)
}

decrementCountItemsWishList(){
   this.countItemsWishList.set(this.countItemsWishList()-1)
}

getCountItemsWishList(){
  
  return this.getWishlist().length? this.getWishlist().length : this.countItemsWishList();
}
    // Remove an item from the wishlist
    removeFromWishlist(index: number): void {
      const wishlist = this.getWishlist();
      wishlist.splice(index, 1);
      this.saveWishlist(wishlist);
      this.updateWishListItemCount()
    }
      // Clear the wishlist
  clearWishlist(): void {
    localStorage.removeItem(this.wishlistKey);
    this.updateWishListItemCount()
  }
  updateWishListItemCount(): void{
    this.wishLisItemCountSubject.next(this.getWishlist().length); // Update the count
  }
     // Get the current WishList item count
     getWishListItemCount() {
      return this.wishLisItemCountSubject.asObservable(); // Return as observable
    }
}
