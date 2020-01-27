import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTrabajosComponent } from './pages/lista-trabajos/lista-trabajos.component';
import { ModalActivarComponent } from './components/modal-activar/modal-activar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [ ListaTrabajosComponent, ModalActivarComponent ],
  imports: [ CommonModule,  NgbModule, ReactiveFormsModule, SharedModule ],
  bootstrap: [ ListaTrabajosComponent ],
	entryComponents: [ 
    // ModalCrearComponent,
     ModalActivarComponent ],
	// providers: [ UpperCaseCustomPipe ]
})
export class TrabajosModule {}
