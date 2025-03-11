import { Component, inject, viewChild } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-quiz-endpage',
  imports: [ButtonModule, Divider, ImageModule],
  templateUrl: './quiz-endpage.component.html',
  styleUrl: './quiz-endpage.component.css'
})
export class QuizEndpageComponent {
  progressService = inject(ProgressService); // Permet d'avoir accès aux fonctions gérant la navigation au sein des cartes Quiz
  number_questions = this.progressService.questionNumber(); // Permet d'avoir le nombre total de questions de la session de Quiz
  rapport = this.number_questions/4; // Sert à déterminer les grades en normalisant les résultats
}
