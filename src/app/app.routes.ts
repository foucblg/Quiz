import { Routes } from '@angular/router';
import { QuizComponent } from './views/quiz/quiz.component';
import { AppComponent } from './app.component';
import { QuizHomepageComponent } from './views/quiz/quiz-homepage/quiz-homepage.component';
import { QuizEndpageComponent } from './views/quiz/quiz-endpage/quiz-endpage.component';

export const routes: Routes = [
  {
    path: 'quiz', title: "Quiz Inclusif, le jeu", children: [
      { path: '**', component: QuizComponent },
      { path: 'accueil', component: QuizHomepageComponent },
      { path: 'fin', component: QuizEndpageComponent },
    ],
  },
  { path: '', redirectTo: 'quiz/accueil', pathMatch: 'full' },
];
