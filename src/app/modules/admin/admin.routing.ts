import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './usuarios/pages/lista-usuarios/lista-usuarios.component';
import { AdminComponent } from './admin.component';
export const AdminRouting: Routes = [
	// {
	// 	path: '',
	// 	component: AdminComponent
	// },
	{
        path: '',
        // path: 'usuarios',
        component:AdminComponent,
        children:[
            {
                path:'',
                component: ListaUsuariosComponent
            }
        ]
	}
];
