import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
	selector: 'app-graficos',
	templateUrl: './graficos.component.html',
	styleUrls: [ './graficos.component.css' ]
})
export class GraficosComponent implements OnInit {
	constructor(private analytics: AngularFireAnalytics) {
		analytics
			.logEvent('login', { method: 'Google' }, { global: true })
			.then((result) => {
				console.log('LOG EVENT::::', result);
			})
			.catch((error) => console.log('ERROR LOG:::', error));
		analytics.app
			.then((result) => {
				console.log('LOG  LOGIN::::', result);
			})
			.catch((error) => console.log('ERROR LOG:::', error));
	}

	ngOnInit() {}
}
