import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as data from './shared/assets/data/questions_final.json';
import { QuizData } from './shared/types/interfaces';
import { NavbarComponent } from './views/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'INCLUSIF: Le jeu';
  quizData = quizData;
}

export const quizData: QuizData = data;
