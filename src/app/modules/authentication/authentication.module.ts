import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthenticationRouting } from './authentication.routing';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterProfileComponent } from './pages/register-profile/register-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

@NgModule({
	declarations: [ LoginComponent, RegisterComponent, AuthenticationComponent, RegisterProfileComponent ],
	imports: [
		RouterModule,
		CommonModule,
		RouterModule.forChild(AuthenticationRouting),
		ReactiveFormsModule,
		SharedModule
	],
	providers: [ AuthGuard ]
	// entryComponents: [ HeaderComponent ]
})
export class AuthenticationModule {}
