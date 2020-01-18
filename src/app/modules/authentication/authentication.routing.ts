import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationComponent } from './authentication.component';
import { RegisterProfileComponent } from './pages/register-profile/register-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const AuthenticationRouting: Routes = [
	{
		path: '',
		component: AuthenticationComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'register-profile',
				canActivate:[AuthGuard],
				component: RegisterProfileComponent
			},
			{
				path: '**',
				redirectTo: 'register-profile'
			}
		]
	}
];
