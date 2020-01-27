import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTrabajosComponent } from './components/lista-trabajos/lista-trabajos.component';
import { ModalActivarComponent } from './components/modal-activar/modal-activar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaPostulantesComponent } from './components/lista-postulantes/lista-postulantes.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ ListaTrabajosComponent, ModalActivarComponent, ListaPostulantesComponent, TrabajosComponent ],
	imports: [ RouterModule, CommonModule, NgbModule, ReactiveFormsModule, SharedModule ],
	bootstrap: [ ListaTrabajosComponent ],
	entryComponents: [
		// ModalCrearComponent,
		ModalActivarComponent
	]
	// providers: [ UpperCaseCustomPipe ]
})
export class TrabajosModule {}
