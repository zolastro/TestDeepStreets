import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  dataString;
  private answersCollection: AngularFirestoreCollection<Answer>;
  answersObs: Observable<Answer[]>;
  constructor(afs: AngularFirestore) {
    this.answersCollection = afs.collection<Answer>('realvsfake');
    this.answersObs = this.answersCollection.valueChanges();
  }
  
  ngOnInit(): void {
    this.answersObs.subscribe((answers: Answer[] )=> this.generateCSV(answers));
  }

  generateCSV(answers: Answer[]) {
    this.dataString = 'APath,BPath,answer,correct\n'
    for (const answer of answers) {
      this.dataString += answer.APath + ',' + answer.BPath + ',' + answer.answer + ',' + answer.correct + '\n'
    }
  }

}
