import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { Observable } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';
import { first, take } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: [ './line-chart.component.css' ]
})
export class LineChartComponent implements OnInit {
	lineChartData: ChartDataSets[] = [ { data: [], label: 'Registro de Usuarios' } ];
	lineChartLabels: Label[] = [];

	lineChartOptions = {
		responsive: true
	};

	lineChartColors: Color[] = [
		{
			// borderColor: '#A6A6A6',
			borderColor: 'rgb(223,91,68)',
			// backgroundColor: 'rgba(255,255,0,0.28)',
			backgroundColor: 'rgba(255,255,0,0)'
		}
	];

	lineChartLegend = false;
	lineChartPlugins = [];
	lineChartType = 'line';

	// -------------
	usuarios;
	datos = {};

	constructor(private usuariosService: UsuariosFirebaseService) {}

	async ngOnInit() {
		await this.getUsers();
		await this.extraerFechasUsuarios();

		// this.lineChartData[0].data = Object.values(this.datos);
		Object.values(this.datos).map((c) => this.lineChartData[0].data.push(Number(c)));

		// this.lineChartLabels = Object.keys(this.datos);
		let labels = Object.keys(this.datos).map((k) => this.mesLabel(k));

		this.lineChartLabels = labels;
	}

	mesLabel(fecha: string): string {
		let año = fecha.substr(0, 4);
		let mes = Number(fecha.substr(5, 6));
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
		return mesNombre + '-' + año;
	}

	getUsers() {
		return new Promise((resolve, reject) => {
			this.usuariosService
				.listaUsuarios()
				.snapshotChanges()
				.pipe(map((changes) => changes.map((c) => c.payload.val()), take(1)))
				.subscribe(
					(usuarios) => {
						this.usuarios = usuarios;
						resolve();
					},
					(error) => reject(error)
				);
		});
	}

	async extraerFechasUsuarios() {
		this.usuarios.map((u) => {
			let fecha = u.fechaCreacion;
			let contador = fecha.split('/').splice(1, 2).reverse().join('');
			if (this.datos[contador]) {
				this.datos[contador] += 1;
			} else {
				this.datos[contador] = 1;
			}
		});
	}
}
