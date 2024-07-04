import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = "";
  questions: any; //coleção de questões
  questionSelected: any; //questão selecionada
  answers: string[] = []; //armazena as respostas do úsuario no vetor de string que começa vazio
  answersSelected: string = ""; //recebe a resposta selecionada
  questionIndex: number = 0; //recebe o index da questão
  questionMaxIndex: number = 0; //armazena a quantidade maxima de questões
  finished: boolean = true; //armazena se a pessoa terminou
  fleabagImagePath: string = ""; // recebe o caminho da imagem

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(): Promise<void> {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];

      // Definindo o caminho da imagem com base na resposta final
      switch (finalAnswer) {
        case "Boo":
          this.fleabagImagePath = 'assets/imgs/boo.jpg';
          break;
        case "Madrasta":
          this.fleabagImagePath = 'assets/imgs/madrasta.jpg';
          break;
        case "Claire":
          this.fleabagImagePath = 'assets/imgs/claire.png';
          break;
        case "Padre":
          this.fleabagImagePath = 'assets/imgs/padre.jpg';
          break;
        case "Fleabag":
          this.fleabagImagePath = 'assets/imgs/fleabag.jpg';
          break;
        default:
          this.fleabagImagePath = ''; // Define um caminho vazio se não houver correspondência
          break;
      }
    }
  }

  async checkResult(answers: string[]): Promise<string> {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
