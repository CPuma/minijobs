import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ModalCrearComponent } from './components/modal-crear/modal-crear.component';
import { ModalActivarComponent } from './components/modal-activar/modal-activar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpperCaseCustomPipe } from 'src/app/shared/pipes/upper-case-custom.pipe';

@NgModule({
	declarations: [ ListaUsuariosComponent, ModalCrearComponent, ModalActivarComponent ],
	imports: [ CommonModule, NgbModule, ReactiveFormsModule, SharedModule ],
	exports: [
		ListaUsuariosComponent
	],
	bootstrap: [ ListaUsuariosComponent ],
	entryComponents: [ ModalCrearComponent, ModalActivarComponent ],
	providers: [ UpperCaseCustomPipe ]
})
export class UsuariosModule {}
