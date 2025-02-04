import { Component, inject, viewChild } from '@angular/core';
import { ChoiceBoxComponent } from './choice-box/choice-box.component';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/quiz-service';
import { Answer } from '../../../shared/types/enums';
import { AnswerBoxComponent } from "./answer-box/answer-box.component";

@Component({
    selector: 'app-quiz-card',
    imports: [ChoiceBoxComponent, AnswerBoxComponent],
    templateUrl: './quiz-card.component.html',
    styleUrl: './quiz-card.component.css'
})
export class QuizCardComponent {
  dataService = inject(DataService);
  progressService = inject(ProgressService);
  answerType = Answer;
  quiz_segment = this.dataService.currentSegment;
  choiceBox = viewChild(ChoiceBoxComponent);

}

