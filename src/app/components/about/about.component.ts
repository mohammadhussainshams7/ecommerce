import { Component } from '@angular/core';
import { HeaderComponent } from "../../shard/header/header.component";
import { FooterComponent } from "../../shard/footer/footer.component";

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
 
}
