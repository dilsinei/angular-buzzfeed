import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = "";

  questions:any;
  questionSelected:any;
  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  answers:string[] = []
  answerSelected:string = ""

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
      console.log(this.questionMaxIndex);
      console.log(this.questionIndex);
    }
  }
  playerChoose(value: string){
    this.answers.push(value);
    this.nextStep();
    console.log(this.answers);
  }
 async nextStep(){
    this.questionIndex+=1;
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }
    else{
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }
  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, index, arr)=>{
      if( arr.filter(item => item === previous).length > arr.filter(item => item === current).length){
        return previous;
      }else{
        return current;
      }
    })
    return result;
  }


}
