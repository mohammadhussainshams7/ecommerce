import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [HeaderComponent, FooterComponent ,FormsModule],
  templateUrl: './sign-in.component.html',
  standalone:true,
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email:string = '';
  password:string = '';
  constructor(private authService: AccountService) {}
  
  login() {
    this.authService.login(this.email, this.password);
  }

}
