import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import {AngularFireAnalytics, AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics'
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [GraficosComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule
  ], providers:[
    ScreenTrackingService
  ]
})
export class DashboardModule { }
