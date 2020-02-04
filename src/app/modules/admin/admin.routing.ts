import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './usuarios/pages/lista-usuarios/lista-usuarios.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListaTrabajosComponent } from './trabajos/components/lista-trabajos/lista-trabajos.component';
import { GraficosComponent } from './dashboard/pages/graficos/graficos.component';
import { TrabajosComponent } from './trabajos/pages/trabajos/trabajos.component';
import { ListaPostulantesComponent } from './trabajos/components/lista-postulantes/lista-postulantes.component';
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
				component: TrabajosComponent,

				children: [
					{
						path: '',
						data: { titulo: 'Trabajos' },
						component: ListaTrabajosComponent,
					},
					{
						path: ':idTrabajo/postulantes',
						data: { titulo: 'Trabajos', subtitulo:"Postulantes" },
						component: ListaPostulantesComponent
					}
				]
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
