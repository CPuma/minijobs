import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard
} from 'src/app/core/guards/auth.guard'



const routes: Routes = [
	// {
	//   path:'**',
	//   redirectTo:'auth'
	// },

	{
		path: 'admin',
		loadChildren: './modules/admin/admin.module#AdminModule'
	},
	{
		path: 'auth',
		loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
	},
	{
		path: '',
		loadChildren: './modules/home/home.module#HomeModule'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
