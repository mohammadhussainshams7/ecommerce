import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiServerService } from '../../services/api-server.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-check-out',
  imports: [HeaderComponent ,NgIf,ReactiveFormsModule , FooterComponent ,RouterLink , RouterLinkActive],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;
  /* Rgx Email */
  rgx:string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"




  constructor(private cartService: CartService ,private apiUser:ApiServerService,private userData:AccountService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCart();

  }

  userForm:FormGroup = new FormGroup({
    fname: new FormControl("", Validators.required),
    companyName: new FormControl(""),
    street: new FormControl("" , Validators.required),
    apartment: new FormControl(""),
    city: new FormControl("",Validators.required),
    phone: new FormControl("",Validators.required),
    saveInformation: new FormControl(false),
    email: new FormControl("",[Validators.required , Validators.pattern(this.rgx)] ),
  }
   
  );

  saveData(){
    if (this.userForm.valid) {
    const userId = this.userData.getUser().id
    this.apiUser.updateUser(userId,this.userForm.value).subscribe(response=>{
      console.log('User updated:', response);
    })
  }
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);

    this.totalAmount = this.cartService.getCartTotal();
  }
  
}
