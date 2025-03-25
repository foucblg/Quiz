import { Component, inject } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/quiz-service';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-quiz-time',
  imports: [ButtonModule, Divider, ImageModule],
  templateUrl: './quiz-time.component.html',
  styleUrl: './quiz-time.component.css'
})
export class QuizTimePageComponent {
  dataService = inject(DataService); // Permet d'avoir accès aux fonctions gérant les cartes
  progressService = inject(ProgressService); // Permet d'avoir accès aux fonctions gérant la navigation au sein des cartes Quiz
  
  
  possibleNumberOfQuestionsPerTopic = [1, 2, 3]; // Définit le nombre de questions possible divisé par 4 lors de la session du Quiz
  iNumberOfQuestions = 1; // Indice de la liste ci-dessus correspondant au nombre de questions - Il y a donc 8 questions mis par défaut

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
