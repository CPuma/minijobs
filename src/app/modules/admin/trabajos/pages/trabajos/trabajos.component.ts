import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-trabajos',
	templateUrl: './trabajos.component.html',
	styleUrls: [ './trabajos.component.css' ]
})
export class TrabajosComponent implements OnInit {
	titulo = "Trabajos";

	constructor() {}

	ngOnInit() {
	}
}
