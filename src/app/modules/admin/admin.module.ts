import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './shared/header-admin/header-admin.component';
import { FooterAdminComponent } from './shared/footer-admin/footer-admin.component';
import { RouterModule } from '@angular/router';
import { AdminRouting } from './admin.routing';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdminComponent } from './admin.component';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TrabajosModule } from './trabajos/trabajos.module';
import { DashboardModule } from './dashboard/dashboard.module';




@NgModule({
  declarations: [HeaderAdminComponent, FooterAdminComponent, AdminComponent, SidebarAdminComponent],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule.forChild(AdminRouting),

    UsuariosModule,
    TrabajosModule,
    DashboardModule
  ],
  providers:[
    AuthGuard
  ]
})
export class AdminModule { }
