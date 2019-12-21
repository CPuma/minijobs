import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';

import {HomeRouting} from './home.routing';
import { PoliticaDePrivacidadComponent } from './pages/politica-de-privacidad/politica-de-privacidad.component';
import { CondicionesDeServicioComponent } from './pages/condiciones-de-servicio/condiciones-de-servicio.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard';





@NgModule({
  declarations: [HomeComponent, PoliticaDePrivacidadComponent, CondicionesDeServicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRouting)

  ],
  providers:[
		AuthGuard
	]
})
export class HomeModule { }
