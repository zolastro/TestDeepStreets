import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '../../models/answer';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() showCountdown: boolean;

  private _question: Question
  @Input() 
  set question(question: Question) {
    this._question = question
    if (this.showCountdown) {
      this.resetCountdown()
    } else {
      setTimeout(() => this.showImages(), 600)
    }
  }

  get question(): Question { return this._question; }

  @Output() onSelect = new EventEmitter<Answer>()

  countdown = 4;
  show = true
  constructor() { }

  ngOnInit(): void {
    this.resetCountdown()
  }

  decreaseCountdown() {
    setTimeout(()=> {
      if (this.countdown > 0) {
        this.decreaseCountdown()
      }
      if (this.countdown == 0) {
          this.showImages()
      }  
    }, 1000)
    this.countdown -= 1
  }
  
  resetCountdown() {
    this.countdown = 4
    this.decreaseCountdown()
  }

  showImages() {
    this.show = true
    setTimeout(()=> {
      this.show = false
    }, 1000)
  }

  selectAnswer(option:number) {
    let answer: Answer;
    answer = new Answer(this.question.pathA, this.question.pathB, Question.options[option], Question.options[option] == this.question.correctOption)
    this.onSelect.emit(answer)
  }
}
