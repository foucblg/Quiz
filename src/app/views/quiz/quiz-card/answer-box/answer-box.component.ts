import { Component, inject } from "@angular/core";
import { DataService } from "../../../../shared/services/quiz-service";
import { ProgressService } from "../../../../shared/services/progress-service";
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-answer-box',
  standalone: true,
  imports: [ReactiveFormsModule, RadioButtonModule, CheckboxModule],
  templateUrl: './answer-box.component.html',
  styleUrl: './answer-box.component.css'
})
export class AnswerBoxComponent {
  dataService = inject(DataService);
  progressService = inject(ProgressService);
  quiz_segment = this.dataService.currentSegment()!;
}

