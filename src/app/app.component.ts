import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Answer} from './models/answer';
import { Question } from './models/question';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  ready = false;
  showCountdown = true;
  private answersCollection: AngularFirestoreCollection<Answer>
  title = 'test-deep-streets';
  question = new Question(['0.jpg', '0.jpg'], true)
  answers: Observable<Answer[]>;
  constructor(afs: AngularFirestore) {
    this.answersCollection = afs.collection<Answer>('answers');
    this.answers = this.answersCollection.valueChanges();
  }

  addNewAnswer(answer: Answer){
    this.answersCollection.add({...answer});
  }

  answerSelected(answer: Answer) {
    this.addNewAnswer(answer)
    this.getNewQuestion()
  }

  getNewQuestion() {
    const epochs = [65, 70, 75, 80, 85, 90]
    let idxEpoch = Math.floor(Math.random() * epochs.length)
    let idxReal = Math.floor(Math.random() * 1000)
    let idxFake = Math.floor(Math.random() * 1000)
    let isFirst = Math.random() > 0.5
    let pathA = (isFirst? idxReal : ('epoch' + epochs[idxEpoch] + '/' + idxFake)) + '.jpg';
    let pathB = (isFirst? ('epoch' + epochs[idxEpoch] + '/' + idxFake) : idxReal) + '.jpg';

    this.question = {...new Question([pathA, pathB], isFirst)}
    
  }

  readyClicked() {
    this.ready = true;
    this.getNewQuestion()
  }

}
