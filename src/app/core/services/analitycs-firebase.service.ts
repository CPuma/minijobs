import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Injectable({
	providedIn: 'root'
})
export class AnalitycsFirebaseService {
  constructor(private analytics: AngularFireAnalytics) {}
  
	public logEvent(eventName: string, params: {}) {
		this.analytics
			.logEvent(eventName, params)
			.then((res) => {
				console.log('event registered', eventName, params);
			})
			.catch((error) => {
				console.log('error ANALITICAS :::: ', error.message);
			});
	}
}
