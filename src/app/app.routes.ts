import { Routes } from '@angular/router';
import { QuizHomepageComponent } from './views/quiz/quiz-homepage/quiz-homepage.component';
import { QuizTimePageComponent } from './views/quiz/quiz-time/quiz-time.component';
import { QuizEndpageComponent } from './views/quiz/quiz-endpage/quiz-endpage.component';

export const routes: Routes = [
  {
    path: 'quiz',
    title: "Quiz Inclusif, le jeu",
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: QuizHomepageComponent },
      { path: 'temps', component: QuizTimePageComponent },
      { path: 'fin', component: QuizEndpageComponent },
      { path: '**',  redirectTo: 'accueil' },
    ],
  },
  { path: '', redirectTo: 'quiz/accueil', pathMatch: 'full' },
];
