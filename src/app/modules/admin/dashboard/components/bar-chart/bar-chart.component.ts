import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TrabajosFirebaseService } from 'src/app/core/services/trabajos-firebase.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: [ './bar-chart.component.css' ]
})
export class BarChartComponent implements OnInit {
	barChartOptions: ChartOptions = {
		responsive: true
	};
	barChartType: ChartType = 'bar';
	barChartLegend = true;
	barChartPlugins = [];

	barChartData: ChartDataSets[] = [ { data: [], label: 'Trabajos Creados' } ];
	barChartLabels: Label[] = [];
	// barChartData: ChartDataSets[] = [ { data: [ 45, 37, 60, 70, 46, 33 ], label: 'Best Fruits' } ];
	// barChartLabels: Label[] = [ 'Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes' ];

	trabajos;
	datos = {};

	constructor(private trabajosService: TrabajosFirebaseService) {}

	async ngOnInit() {
		await this.getTrabajos();
		await this.extraerFechasUsuarios();

		// this.lineChartData[0].data = Object.values(this.datos);
		Object.values(this.datos).map((c) => this.barChartData[0].data.push(Number(c)));

		let labels = Object.keys(this.datos).map((k) => this.mesLabel(k));
		// this.barChartLabels = Object.keys(this.datos);
		this.barChartLabels = labels;
	}
	mesLabel(fecha: string): string {
		// let año = fecha.substr(0, 4);
		// let mes = Number(fecha.substr(5, 6));
		let dia = fecha.substr(2, 2);
		let mes = Number(fecha.substr(0, 2));

		let mesNombre;
		switch (mes) {
			case 1:
				mesNombre = 'Ene';
			case 2:
				mesNombre = 'Feb';
			case 3:
				mesNombre = 'Mar';
			case 4:
				mesNombre = 'Abr';
			case 5:
				mesNombre = 'May';
			case 6:
				mesNombre = 'Jun';
			case 7:
				mesNombre = 'Jul';
			case 8:
				mesNombre = 'Ago';
			case 9:
				mesNombre = 'Sep';
			case 10:
				mesNombre = 'Oct';
			case 11:
				mesNombre = 'Nov';
			case 12:
				mesNombre = 'Dic';
		}
		return mesNombre + '-' + dia;
	}

	getTrabajos() {
		return new Promise((resolve, reject) => {
			this.trabajosService
				.listaTrabajos()
				.snapshotChanges()
				.pipe(map((changes) => changes.map((c) => c.payload.val())))
				.subscribe(
					(trabajos) => {
						this.trabajos = trabajos;
						console.log(this.trabajos);
						resolve();
					},
					(error) => reject(error)
				);
		});
	}

	async extraerFechasUsuarios() {
		this.trabajos.map((u) => {
			let fecha = u.fechaCreacionTrabajo;
			// extrayendo  mes y año
			// let contador = fecha.split('/').splice(1, 2).reverse().join('');
			// extrayendo dia  y mes
			let contador = fecha.split('/').splice(0, 2).reverse().join('');
			if (this.datos[contador]) {
				this.datos[contador] += 1;
			} else {
				this.datos[contador] = 1;
			}
		});
	}
}
