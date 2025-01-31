import { Routes } from '@angular/router';
import { QuizComponent } from './views/quiz/quiz.component';

export const routes: Routes = [
  {
    path: 'quiz', title: "Quiz Inclusif, le jeu", children: [
      { path: '**', component: QuizComponent },
    ],
  },
  { path: '', redirectTo: 'quiz/accueil', pathMatch: 'full' },
];
