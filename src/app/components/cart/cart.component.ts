import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {  NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [NgIf,NgFor, FormsModule ,HeaderComponent, FooterComponent , RouterLink,RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  cartTotal: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
    this.loadCart();
  }


  
  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
  }
  addItemToCart(item: any): void {
    this.cartService.addToCart(item);
    this.loadCart();
  }

  removeItemFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
    this.cartService.decrementCountItemsCard();
  }
  updateQuantity(itemId: number, quantity: number): void {
  
      this.cartService.updateCartItemCount(itemId, quantity);
      this.loadCart();
    }
    
  }