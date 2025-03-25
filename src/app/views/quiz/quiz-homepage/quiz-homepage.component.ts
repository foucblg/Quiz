import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-quiz-homepage',
  imports: [ButtonModule, DividerModule, PanelModule, InputNumberModule, BlockUIModule, ImageModule],
  templateUrl: './quiz-homepage.component.html',
  styleUrl: './quiz-homepage.component.css'
})
export class QuizHomepageComponent {
  /*
  Page de présentation du quiz
  Permet la sélection du nombre de questions par multiples de la longueur du cycle de thèmes
  */

  constructor(private router:Router) {}

  commencer(){
    this.router.navigate(['/quiz/temps'])
  }
  
}
