import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './usuarios/pages/lista-usuarios/lista-usuarios.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListaTrabajosComponent } from './trabajos/pages/lista-trabajos/lista-trabajos.component';
import { GraficosComponent } from './dashboard/pages/graficos/graficos.component';
export const AdminRouting: Routes = [
	
	{
		path: '',
		component: AdminComponent,
		children: [
			// {
			// 	path: '',

			// 	// canActivate: [ AuthGuard ],
			// 	// component: ListaUsuariosComponent
			// 	redirectTo: 'usuarios'
			// },
			{
                path: 'usuarios',
                canActivate: [ AuthGuard ],
				component: ListaUsuariosComponent
			},
			{
                path: 'trabajos',
                canActivate: [ AuthGuard ],
				component: ListaTrabajosComponent
			},
			{
                path: 'dashboard',
                canActivate: [ AuthGuard ],
				component: GraficosComponent
			},
			{
				path: '**',
				redirectTo: 'dashboard'
			}
		]
	}
];
