import { CommonModule } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressService } from '../../shared/services/progress-service';
import { DataService } from '../../shared/services/quiz-service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizEndpageComponent } from "./quiz-endpage/quiz-endpage.component";
import { QuizHomepageComponent } from './quiz-homepage/quiz-homepage.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  imports: [CommonModule, ButtonModule, ToastModule, ProgressBarModule, QuizHomepageComponent, QuizCardComponent, DividerModule, QuizEndpageComponent]
})

export class QuizComponent {
  /* Gère les cartes quiz par rapport à l'avancement dans le quiz et affiche une barre de progression le cas échéant*/
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  quizCard = viewChild(QuizCardComponent);
  progressPercentage = computed(() => this.progressService.questionNumber() / this.dataService.numberOfQuestions() * 100)
}
