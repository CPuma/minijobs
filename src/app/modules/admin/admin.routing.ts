import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './usuarios/pages/lista-usuarios/lista-usuarios.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
export const AdminRouting: Routes = [
	
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				canActivate: [ AuthGuard ],
				component: ListaUsuariosComponent
			},
			{
                path: 'usuarios',
                canActivate: [ AuthGuard ],
				component: ListaUsuariosComponent
			}
		]
	}
];
