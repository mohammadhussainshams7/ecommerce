import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [HeaderComponent, FooterComponent , RouterLink , RouterLinkActive , FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name:string = '';
  email:string = '';
  password:string = '';
  constructor(private authService: AccountService) {}
  
  register() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe(() => {
      alert('User registered successfully');
    });
  }

}
