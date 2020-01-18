import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CapitalizerPipe } from './pipes/capitalizer.pipe';
import { TimePipe } from './pipes/time.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { UpperCaseCustomPipe } from './pipes/upper-case-custom.pipe';

@NgModule({
	declarations: [
		// SHARED
		HeaderComponent, // General HEader
		FooterComponent, // General Footer
		LoaderComponent,
		CapitalizerPipe,
		TimePipe,
		UpperCaseCustomPipe
	],
	imports: [ CommonModule, RouterModule ],
	exports: [
		HeaderComponent, // General HEader
		FooterComponent
	],
	providers:[
		
	]
})
export class SharedModule {}
