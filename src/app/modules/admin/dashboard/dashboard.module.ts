import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AngularFireAnalytics, AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';

import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
	declarations: [ GraficosComponent, LineChartComponent, PieChartComponent, BarChartComponent ],
	imports: [
		CommonModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAnalyticsModule,
		ChartsModule
	],
	providers: [ ScreenTrackingService ]
})
export class DashboardModule {}
