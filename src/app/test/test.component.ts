import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  ready = false;
  showCountdown = true;
  private answersCollection: AngularFirestoreCollection<Answer>
  title = 'test-deep-streets';
  answers: Observable<Answer[]>;
  question: Question;
  constructor(afs: AngularFirestore) {
    this.answersCollection = afs.collection<Answer>('realvsfake');
    this.answers = this.answersCollection.valueChanges();
  }

  ngOnInit() {
    this.getNewQuestion();
  }

  addNewAnswer(answer: Answer){
    this.answersCollection.add({...answer});
  }

  answerSelected(answer: Answer) {
    this.addNewAnswer(answer)
    this.getNewQuestion()
  }

  getNewQuestion() {
    let getFake = Math.random() > 0.33;
    let isFirst = Math.random() > 0.5
    let pathA: string;
    if (getFake) {
      const epochs = [65, 70, 75, 80, 85, 90]
      let idxEpoch = Math.floor(Math.random() * epochs.length)
      let idxA = Math.floor(Math.random() * 1000)
      pathA = 'fake/epoch' + epochs[idxEpoch] + '/' + idxA + '.jpg';
    } else {
      let idxA = Math.floor(Math.random() * 8164)
      pathA = 'real/'+ idxA + '.jpg';
    }
    

    let idxB = Math.floor(Math.random() * 8164)
    let pathB = 'real/'+ idxB + '.jpg';
    if (getFake) {
      if (isFirst) {
        this.question = {...new Question(pathB, pathA, Question.options[0])}
      } else {
        this.question = {...new Question(pathA, pathB, Question.options[1])}
      }
    } else {
      this.question = {...new Question(pathA, pathB, Question.options[2])}
    }
  }

  readyClicked() {
    this.ready = true;
    this.getNewQuestion()
  }


}
