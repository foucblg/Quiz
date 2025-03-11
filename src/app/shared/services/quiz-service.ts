import { Injectable, signal } from "@angular/core";
import { quizData } from "../../app.component";
import { QuizSegment } from "../types/interfaces";

class RandomizedQuestionIndexQueue {
  /* Implémente un tirage aléatoire sans remise des numéros de questions dans un thème
  * https://gist.github.com/4skinSkywalker/f10939e0b070fe1815933730670177df
  */
  private remainingIndices;
  private intialSize; // Permet de garder en mémoire la taille de la liste
  private currentSize; // Permet d'avoir la taille restante de la liste
  constructor(size: number) {
    this.intialSize = size;
    this.currentSize = size;
    this.remainingIndices = [...Array(size).keys()];
  }

  private randomId() {
    /*
      Output (int) : Renvoit un nombre aléatoire entre la taille actuelle de la liste moins 1 et 0
      
      Conversion en entier avec la comparaison BitWise OR
    */

    return Math.random() * (this.currentSize - 1) | 0
  }

  isEmpty() {
    /* 
      Output (bool) : 
        - True : Il n'y a plus de questions dans la liste
        - False : Il y a encore des questions dans la liste
    */
    return (this.currentSize < 1)
  }

  replenish() {
    // Réinitialise la liste des indices restants
    this.remainingIndices = [...Array(this.intialSize).keys()];
    this.currentSize = this.intialSize;
  }

  dequeueIndex() {
    /*
      Output (int) : Renvoit un index aléatoire parmi les index restants
      
      Tire un index aléatoire et le retire de la liste des indices restants
    */

    if (this.isEmpty()) {
      this.replenish()
    }
    const id = this.randomId();
    const index = this.remainingIndices[id];
    this.remainingIndices.splice(id, 1);
    this.currentSize--;
    return index;
  }
}


class TopicsQueue {
  /* Implémente la queue des thèmes à effectuer selon le nombre de questions et le cycle de thème à aborder */
  private possibleTopics;
  private topicsCycle;
  private numberOfQuestionsPerCycle = 1; // valeur par défaut
  private topics: string[] = []; // queue qui va permettre de tirer les topics

  constructor(possibleTopics: string[] = [], topicsCycle: number[] = []) {
    this.possibleTopics = possibleTopics;
    this.topicsCycle = topicsCycle;
  }

  initialize(nQuestions: number) {
    /* Initialise la queue pour une session de quiz */
    this.numberOfQuestionsPerCycle = nQuestions;
    this.topics = [];
    this.topicsCycle.forEach((n, i) => { // n = occurrence, i = index
      this.topics.push(...Array(n * this.numberOfQuestionsPerCycle).fill(this.possibleTopics[i]));
    });
  }

  isEmpty() {
    // Vérification qu'il reste bien des topic
    return this.topics.length < 1;
  }

  deqeue() {
    return this.topics.shift();
  }

  getPossibleTopics() {
    return this.possibleTopics;
  }

  getNumberOfQuestions() {
    return this.topicsCycle.length * this.numberOfQuestionsPerCycle;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /* 
    Service qui fournit les données relatives à la question en cours de la session de quiz
    Les questions sont tirées aléatoirement sans remise
    Lorsqu'il n'y a plus de questions non faites, la liste de questions est régénèrée
  */
  quizSegmentTopicsQueue;
  quizSegments = quizData["questions"]; // tous les segments de quiz possibles, groupés par thème
  randomizedQuestionIndexQueuePool: Record<string, RandomizedQuestionIndexQueue> = {}
  questionNumber = signal(0);
  hasEnded = signal(false);
  numberOfQuestions = signal(0);
  currentSegment = signal<QuizSegment | undefined>(undefined);
  currentTopic = signal("");
  currentQuestionId = signal(-1);

  constructor() {
    this.quizSegmentTopicsQueue = new TopicsQueue(quizData["question_topics"], quizData["question_cycle"]);
    for (const questionTopic of this.quizSegmentTopicsQueue.getPossibleTopics()) {
      const rq = new RandomizedQuestionIndexQueue(this.quizSegments[questionTopic].length);
      this.randomizedQuestionIndexQueuePool[questionTopic] = rq;
    }
  }

  startQuiz(nQuestions: number) {
    // Initialise une nouvelle session de quiz
    this.questionNumber.set(0);
    this.hasEnded.set(false);
    this.quizSegmentTopicsQueue.initialize(nQuestions);
    this.numberOfQuestions.set(this.quizSegmentTopicsQueue.getNumberOfQuestions());
  }

  getNewQuestion() {
    // Récupère une nouvelle question aléatoire
    const questionTopic = this.quizSegmentTopicsQueue.deqeue();
    const questionId = this.randomizedQuestionIndexQueuePool[questionTopic!].dequeueIndex();
    this.currentTopic.set(questionTopic!);
    this.currentQuestionId.set(questionId);
    this.currentSegment.set(this.quizSegments[questionTopic!][questionId]);
  }

  isFinished() {
    // Vérifie si toutes les questions ont été posées
    return this.quizSegmentTopicsQueue.isEmpty();
  }

  getNumberOfTopics() {
    // Retourne le nombre de catégories possibles
    return this.quizSegmentTopicsQueue.getPossibleTopics().length;
  }
}
