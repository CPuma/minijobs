import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'**',
    redirectTo:'admin'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path:'admin',
    loadChildren:'./modules/admin/admin.module#AdminModule'
  },
  {
    path:'auth',
    loadChildren:'./modules/autentication/autentication.module#AutenticationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
