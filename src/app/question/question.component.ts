import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '../models/answer';
import { Question } from '../models/question';

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
    console.log(this.showCountdown)
    this._question = question
    if (this.showCountdown) {
      this.resetCountdown()
    } else {
      this.showImages()
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
        setTimeout(()=> {
          this.showImages()
        }, 300)
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
    if (this.question.isFirst) {
      answer = new Answer(this.question.paths[0], this.question.paths[1], option == 0)
    } else {
      answer = new Answer(this.question.paths[1], this.question.paths[0], option == 1)
    }
    this.onSelect.emit(answer)
  }

  getPrefix(option: number) {
    if ((this.question.isFirst && option == 0) ||
        (!this.question.isFirst && option != 0)) {
      return 'real/'
    } else {
      return 'fake/'
    }
  }
}
