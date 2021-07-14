import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'search/:username', 
    component: HomeComponent
  },
  {
    path:'userdetails/:username', 
    component: UserDetailsComponent
  },
  {
    path:'about', 
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
