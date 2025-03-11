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
  /* 
    Input : answered (bool | undefined) - Permet de savoir si la question de la carte du Quiz a été répondu ou pas
  */
  @Input() answered: boolean | undefined;
  answerForm = new FormGroup({});
  dataService = inject(DataService); //Permet d'avoir accès aux fonctions gérant les cartes
  progressService = inject(ProgressService); // Permet d'avoir accès aux fonctions gérant la navigation au sein des cartes Quiz
  quiz_segment = this.dataService.currentSegment; //Permet d'avoir accès à la carte affichée
  answerIsEmpty = computed(() => this.progressService.currentAnswerValidity() === Answer.Empty); //Vérifie s'il y a bien eu une réponse lors de la validation de la carte
  dialogVisible = false; //Contrôle de l'apparition d'une boîte de dialogue
  
  ngOnInit() {
    // Initialisation du ControlForm
    this.answerForm!.addControl(this.quiz_segment()!.question_type, new FormControl(''))
    this.answerForm!.reset();
  }

  tryToAnswer() {
    /* 
    Cette fonction fait la gestion des réponses envoyées

    Dans le cas d'un QCM, elle vérifie qu'il y a bien eu une réponse non nulle
    Dans le cas d'un QCU, elle vérifie qu'il y a bien eu une réponse de type number
    Dans le cas contraire, il y a l'affichage d'une boîte de dialogue demandant à bien répondre à la carte du Quiz
    */
    if (this.quiz_segment()?.question_type === "QCM") {
      const key  = this.answerForm.get('QCM')!.value;
      if (key != null) {
        this.progressService.currentAnswer.set([key]);
      } else {
        this.progressService.currentAnswer.set([]);
      }
    } 
    else if (this.quiz_segment()?.question_type === "QCU") {
      const key = this.answerForm.get('QCU')!.value;
      if (typeof key === "number") {
        this.progressService.currentAnswer.set([key]);
      } else {
        this.progressService.currentAnswer.set([]);
      }
    }
    this.progressService.answer();
    this.dialogVisible = this.answerIsEmpty(); //Permet d'afficher la boîte de dialogue dans le cas d'une validation sans avoir répondu
  }
}
