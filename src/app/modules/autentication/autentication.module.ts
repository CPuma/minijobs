import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { AutenticationRouting } from './autentication.routing';
import { AutenticationComponent } from './autentication.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, AutenticationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AutenticationRouting)
  ]
})
export class AutenticationModule { }
