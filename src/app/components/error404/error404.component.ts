import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-error404',
  imports: [HeaderComponent, FooterComponent ,RouterLink , RouterLinkActive],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component {

}
