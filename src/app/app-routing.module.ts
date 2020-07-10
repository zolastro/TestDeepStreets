import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { AnalyzingComponent } from './analyzing/analyzing.component';
import { RankingComponent } from './ranking/ranking.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'test', component: TestComponent },
  { path: 'ranking', component: RankingComponent},
  // { path: 'analyzing', component: AnalyzingComponent },
  // { path: '',   redirectTo: 'analyzing', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: HomeComponent },
  // { path: '**', component: AnalyzingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
