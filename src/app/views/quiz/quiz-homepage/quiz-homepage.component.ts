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
  /*
  Page de présentation du quiz
  Permet la séléction du nombre de questions par multiples de la longueur du cycle de thèmes
  */

  dataService = inject(DataService); // Permet d'avoir accès aux fonctions gérant les cartes
  progressService = inject(ProgressService); // Permet d'avoir accès aux fonctions gérant la navigation au sein des cartes Quiz

  possibleNumberOfQuestionsPerTopic = [1, 2, 3]; // Définit le nombre de questions divisé par 4 possible lors de la session du Quiz
  iNumberOfQuestions = 1; // Indice du nombre de questions mis par défaut - Il y a donc 8 questions mis par défaut

  constructor(
  ) {
    // Au chargement du site, cette page est affichée,
    // si l'URL n'est pas celle de la page de départ, elle est redirigée
    this.progressService.goToBegining();
  }

  adjustNumberOfQuestions(c: number) {
    // Permet de changer le nombre de questions lors du Quiz
    this.iNumberOfQuestions += c;
  }
  getNumberOfQuestions(){
    /*
    Output : iNumberofQuestions (int)
    */
    return this.iNumberOfQuestions
  }
}
