import { Component, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgIf } from '@angular/common';
import { WishlistService } from '../../../services/wishlist.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../../../interface/account';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive , NgIf , NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: WritableSignal<number>;
  wishListItemCount : WritableSignal<number>;
  getDataUser:Account  ;
  isLogin=0;

  constructor(private cartService: CartService ,private wishListService: WishlistService ,private account:AccountService ){
    this.getDataUser = account.getUser();
    const data = account.getAccountChangeFunction().subscribe(ele =>{
      this.isLogin = ele
    })
   this.cartItemCount =  this.cartService.countItemsCard;
   this.wishListItemCount =  this.wishListService.countItemsWishList;
  }
 
  
  
  logout(){
    this.account.logout();
  }
}
