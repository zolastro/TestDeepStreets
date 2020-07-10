import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

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
  
  user: User;
  totalClassified;
  score;
  usersRef;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
  }
  
  getUserData(user: User) {
    this.user = user;
    if (user) {
      this.usersRef.valueChanges({idField: user.uid}).subscribe((values) => {
        if (values.length > 0) {
          this.totalClassified = values[0].totalClassified;
          this.score = values[0].score
        } else {
          this.totalClassified = 0;
          this.score = 0;
        }
      });
    } else {
      this.totalClassified = 0;
      this.score = 0;
    }
  }  
  
  ngOnInit() {
    this.answersCollection = this.afs.collection<Answer>('realvsfake');
    this.answers = this.answersCollection.valueChanges();
    this.usersRef = this.afs.collection<any>('user_stats');
    this.getNewQuestion();
    this.auth.user.subscribe(user => this.getUserData(user));
  }

  addNewAnswer(answer: Answer){
    this.answersCollection.add({...answer});

    this.totalClassified += 1;
    if (answer.correct) {
      this.score += 100
    } else {
      if (answer.answer = 'both') {
        this.score -= 50;
      } else {
        this.score -= 100;
      }
    }
    if (this.user) {
      this.usersRef.doc(this.user.uid).set({
        totalClassified: this.totalClassified,
        score: this.score,
        name: this.user.displayName
      }, {merge: true})
    }
  }

  answerSelected(answer: Answer) {
    this.addNewAnswer(answer)
    this.getNewQuestion()
    this.totalClassified += 1
  }

  getNewQuestion() {
    let getFake = Math.random() > 0.33;
    let isFirst = Math.random() > 0.5
    let pathA: string;
    if (getFake) {
      const epochs = [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140]
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
