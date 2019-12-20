import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ModalCrearComponent } from './components/modal-crear/modal-crear.component';
import { ModalActivarComponent } from './components/modal-activar/modal-activar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ ListaUsuariosComponent, ModalCrearComponent, ModalActivarComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule

  ],
  exports:[
    ListaUsuariosComponent
    // ListaUsuariosComponent
  ],
  bootstrap: [ListaUsuariosComponent],
  entryComponents: [ModalCrearComponent, ModalActivarComponent]

})
export class UsuariosModule { }
