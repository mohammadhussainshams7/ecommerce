import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent, FooterComponent , RouterLink  ,FormsModule, RouterLinkActive],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  
})
export class AccountComponent {
  getDataUser:any  ;
  constructor(private account:AccountService ) {
    this.getDataUser = account.getUser()
    
  }

}
