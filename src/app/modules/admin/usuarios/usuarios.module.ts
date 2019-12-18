import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [ ListaUsuariosComponent],
  imports: [
    CommonModule
  ],
  exports:[ListaUsuariosComponent]
})
export class UsuariosModule { }
