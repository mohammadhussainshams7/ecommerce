import { Component } from '@angular/core';
import { FooterComponent } from '../../shard/footer/footer.component';
import { HeaderComponent } from '../../shard/header/header.component';

@Component({
  selector: 'app-contact',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
