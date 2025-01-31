import { computed, inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Answer } from "../types/enums";
import { DataService } from "./quiz-service";

@Injectable({
  providedIn: 'root'
})

export class ProgressService {
  /* Service qui gère la navigation dans l'application */
  router = inject(Router);
  route = inject(ActivatedRoute);
  dataService = inject(DataService);
  score = signal(0);
  questionNumber = signal(0);
  currentAnswer = signal<number[]>([]);
  currentAnswerValidity = computed(() => this.verifyAnswer())
  hasEnded = signal(false);
  answered = signal(false);

  goToBegining() {
    /* Revient à la page du début, sans oublier les questions déjà posées */
    this.score.set(0);
    this.questionNumber.set(0);
    this.hasEnded.set(false);
    this.router.navigate(["quiz", "accueil"], { onSameUrlNavigation: 'ignore' });
  }

  start(nQuestions: number) {
    /* Lance une session de quiz avec le nombre de questions sélectionnées sur la page d'accueil */
    this.score.set(0);
    this.questionNumber.set(0);
    this.hasEnded.set(false);
    this.dataService.startQuiz(nQuestions);
    this.goToNext();
  }

  goToEnd() {
    /* Envoie sur la page de fin */
    this.hasEnded.set(true);
    this.router.navigate(["quiz", "end"], { replaceUrl: true });
  }

  goToNext() {
    /* Si la session de quiz n'est pas finie, envoie vers la question suivante */
    if (!this.dataService.isFinished()) {
      this.dataService.getNewQuestion();
      this.questionNumber.update(n => n + 1);
      this.answered.set(false);
      this.router.navigate(["quiz", this.questionNumber().toString()], {
        queryParams: { theme: this.dataService.currentTopic(), theme_id: this.dataService.currentQuestionId(), answered: false },
        replaceUrl: this.questionNumber() > 0,
      });
    } else {
      this.goToEnd();
    }
  }

  answer() {
    if (this.currentAnswerValidity() === Answer.Empty) {
      // Ne passe pas à la question suivante si aucune réponse n'a été sélectionnée
      return;
    }
    if (this.currentAnswerValidity() === Answer.True) {
      this.score.update(s => s + 1);
    }
    this.answered.set(true);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { answered: true },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
        replaceUrl: true,
      }
    );
  }

  private verifyAnswer(): Answer {
    const realAnswers = this.dataService.currentSegment()?.true_answers as number[];
    if (this.currentAnswer().length === 0) {
      return Answer.Empty;
    }
    if (this.currentAnswer().sort().toString() == realAnswers.sort().toString()) {
      return Answer.True;
    } else {
      return Answer.False;
    }
  }

}
