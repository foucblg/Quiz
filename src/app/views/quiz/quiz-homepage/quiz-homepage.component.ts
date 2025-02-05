import { Component, inject } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/quiz-service';


@Component({
  selector: 'app-quiz-homepage',
  imports: [ButtonModule, DividerModule, PanelModule, InputNumberModule, BlockUIModule, ImageModule],
  templateUrl: './quiz-homepage.component.html',
  styleUrl: './quiz-homepage.component.css'
})
export class QuizHomepageComponent {
  /* Page de présentation du quiz
  * Permet la séléction du nombre de questions par multiples de la longueur du cycle de thèmes
  */
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  numberOfTopics = this.dataService.getNumberOfTopics();
  possibleNumberOfQuestionsPerTopic = [1, 2, 3];
  iNumberOfQuestions = 0;

  constructor(
  ) {
    // Au chargement du site, cette page est affichée,
    // si l'URL n'est pas celle de la page de départ, elle est redirigée
    this.progressService.goToBegining();
  }

  adjustNumberOfQuestions(c: number) {
    this.iNumberOfQuestions += c;
  }
}
