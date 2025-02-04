import { Component, inject } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';

@Component({
    selector: 'app-quiz-endpage',
    imports: [ButtonModule, Divider],
    templateUrl: './quiz-endpage.component.html',
    styleUrl: './quiz-endpage.component.css'
})
export class QuizEndpageComponent {
  progressService = inject(ProgressService);
}
