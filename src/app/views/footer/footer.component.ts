import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-navbar',
  imports: [ImageModule, DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class NavbarComponent {

}
