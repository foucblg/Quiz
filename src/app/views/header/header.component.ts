import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-header',
  imports: [ImageModule, DividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
