import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import {  NgIf } from '@angular/common';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { CartService } from '../../services/cart.service';
import { ApiServerService } from '../../services/api-server.service';
import { ModalComponent } from "../../shard/modal/modal.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink ,NgIf, HeaderComponent, FooterComponent, ModalComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  wishList: any[] = [];
  products:any[]=[];
  constructor(private wishListService: WishlistService,private  api:ApiServerService , private cartService: CartService) {}
  ngOnInit(): void {
    this.wishList = this.wishListService.getWishlist();
    this.api.getProducts().subscribe((data:any[])=>{
      this.products = data
    })
  }
  removeFromWishList(index: number): void {
    this.wishListService.removeFromWishlist(index);
    this.wishList = this.wishListService.getWishlist(); // Update Wishlist
    this.wishListService.decrementCountItemsWishList()
  }
  addSampleItems(id:number , name:string , price:number ,quantity:number=1,imageSrc:string) {
    this.cartService.addToCart({ id: id, name: name, price: price, quantity: quantity,imageSrc:imageSrc });
    this.cartService.incrementCountItemsCard();
  }
/*   moveToBag(){
    this.wishList.forEach(value => this.cartService.addToCart(value))
 
    console.log(this.cartService.getCartItems());
} */

}
