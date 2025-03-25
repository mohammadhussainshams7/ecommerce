import { Component, inject } from '@angular/core';
import { NgbAccordionModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { ApiServerService } from '../../services/api-server.service';
import { CartService } from '../../services/cart.service';
import { ModalComponent } from "../../shard/modal/modal.component";
import { WishlistService } from '../../services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NgbCarouselModule, NgbAccordionModule, HeaderComponent, FooterComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Set the target date for the countdown (e.g., January 1, 2026)
  countDownDate: number = new Date('Jan 1, 2026 00:00:00').getTime();

  // Variables to hold the countdown values
  hours: number = 0;
  days: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  products:any[]=[];
  ourProducts:any[]=[];
  bestSellingProducts:any[]=[];

    // To store the interval ID
    private intervalId: any;

  constructor(private wishlistService: WishlistService, private  api:ApiServerService ,private cartService: CartService) {
  }
  

  ngOnInit() {
        // Start the countdown when the component is initialized
        this.startCountdown();

    this.api.getProducts().subscribe((data:any[])=>{
      this.products = data
    })
    
    this.api.getBestSellingProducts().subscribe((data:any[])=>{
      this.bestSellingProducts = data
    })
    this.api.getOurProducts().subscribe((data:any[])=>{
      this.ourProducts = data
    })
  }
  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  addSampleItems(id:number , name:string , price:number ,quantity:number=1,imageSrc:string) {
    this.cartService.addToCart({ id: id, name: name, price: price, quantity: quantity,imageSrc:imageSrc });
    this.cartService.incrementCountItemsCard()
  }
  addToWishlist(product: any): void {
    this.wishlistService.addToWishlist(product);
    this.wishlistService.incrementCountItemsWishList()
  }
  startCountdown() {
    this.intervalId = setInterval(() => {
      let now = new Date().getTime();
      let distance = this.countDownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Stop the countdown when it reaches 0
      if (distance < 0) {
        clearInterval(this.intervalId);
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    }, 1000); // Update every second
  }


  

}
