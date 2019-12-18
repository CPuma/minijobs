import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './shared/header-admin/header-admin.component';
import { FooterAdminComponent } from './shared/footer-admin/footer-admin.component';
import { RouterModule } from '@angular/router';
import { AdminRouting } from './admin.routing';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [HeaderAdminComponent, FooterAdminComponent, AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRouting),

    UsuariosModule
  ]
})
export class AdminModule { }
