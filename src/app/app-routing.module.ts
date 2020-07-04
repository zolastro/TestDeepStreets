import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'data', component: DataComponent },
    { path: 'test', component: TestComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
