import { Component, computed, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressService } from '../../../../shared/services/progress-service';
import { DataService } from '../../../../shared/services/quiz-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Answer } from '../../../../shared/types/enums';

@Component({
  selector: 'app-choice-box',
  imports: [ReactiveFormsModule, RadioButtonModule, CheckboxModule, DialogModule, ButtonModule],
  templateUrl: './choice-box.component.html',
  styleUrl: './choice-box.component.css'
})
export class ChoiceBoxComponent {
  @Input() answered: boolean | undefined;
  answerForm = new FormGroup({});
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  quiz_segment = this.dataService.currentSegment;
  answerIsEmpty = computed(() => this.progressService.currentAnswerValidity() === Answer.Empty);
  dialogVisible = false;
  ngOnInit() {
    this.answerForm!.addControl(this.quiz_segment()!.question_type, new FormControl(''))
    this.answerForm!.reset();
  }

  tryToAnswer() {
    if (this.quiz_segment()?.question_type === "QCM") {
      this.progressService.currentAnswer.set(this.answerForm.get('QCM')!.value);
    } else if (this.quiz_segment()?.question_type === "QCU") {
      const key = this.answerForm.get('QCU')!.value;
      if (typeof key === "number") {
        this.progressService.currentAnswer.set([key]);
      } else {
        this.progressService.currentAnswer.set([]);
      }
    }
    this.progressService.answer();
    this.dialogVisible = this.answerIsEmpty();
  }
}
