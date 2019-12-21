import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [],
  exports:[], // Falta Agregar NAVBAR
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
