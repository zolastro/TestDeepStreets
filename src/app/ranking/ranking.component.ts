import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface PeriodicElement {
  position: number
  name: string;
  totalClassified: number;
  score: number;
}



@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  displayedColumns: string[] = [ 'position', 'name', 'totalClassified', 'score'];
  dataSource: PeriodicElement[] = [];

  constructor(
    private afs: AngularFirestore, private auth: AngularFireAuth
  ) {

   }

  ngOnInit(): void {
    this.afs.collection<any>('user_stats').valueChanges()
    .subscribe(values => {
      
      this.dataSource = values.sort((a, b) => b.score - a.score ).map((value, idx) => {
        value.position = idx + 1;
        return value;
      });
    })
  }

}
