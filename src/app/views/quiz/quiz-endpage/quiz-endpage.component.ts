import { Component, inject, viewChild } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-endpage',
  imports: [ButtonModule, Divider, ImageModule],
  templateUrl: './quiz-endpage.component.html',
  styleUrl: './quiz-endpage.component.css'
})
export class QuizEndpageComponent {
  progressService = inject(ProgressService); // Permet d'avoir accès aux fonctions gérant la navigation au sein des cartes Quiz
  rapport: number = -1; // Variable qui stocke le score du Quiz
  constructor(private router:Router) {}

  get_score() {
    if (this.progressService.questionNumber() !== 0) {
      this.rapport = this.progressService.score()/this.progressService.questionNumber() ; // Permet d'avoir le nombre total de questions de la session de Quiz
    }
    return this.rapport
  }

  GotoQuiz(){
    this.router.navigate(['/quiz/accueil'])
  }
}
