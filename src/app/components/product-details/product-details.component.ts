import { Component, inject  } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { CartService } from '../../services/cart.service';
import { ApiServerService } from '../../services/api-server.service';
import { ModalComponent } from "../../shard/modal/modal.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { ActivatedRoute, RouterLink,  RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, FormsModule,HeaderComponent, ModalComponent, FooterComponent , RouterLink , RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  products:any[]=[];
  productMount:number = 1;
  detailsTheProduct:any=[]
  imgSrc:string = ""
  private activatedRoute = inject(ActivatedRoute);
  id:number =this.activatedRoute.snapshot.params["id"];


  constructor(private cartService: CartService , private  api:ApiServerService ){
   
    this.api.getCartById(this.id).subscribe(
      (data) => {
        this.detailsTheProduct = data;
        this.imgSrc = this.detailsTheProduct.imageSrc
      })
   
  }

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   

    this.api.getProducts().subscribe((data:any[])=>{
         this.products = data
       })
  }
  addSampleItems(id:number , name:string , price:number ,quantity:number=1,imageSrc:string) {
    this.cartService.addToCart({ id: id, name: name, price: price, quantity: quantity,imageSrc:imageSrc });
  }
  subtract(){
    if(this.productMount >= 2){
      this.productMount--;
    }else{
      alert("min item 1")
    }
  }
  plural(){
      this.productMount++;
  }
  changePicture(e:any){
    this.imgSrc = e.target.src;
    console.log(e.target.src);
  }

}
