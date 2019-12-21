import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { PoliticaDePrivacidadComponent } from './pages/politica-de-privacidad/politica-de-privacidad.component';
import { CondicionesDeServicioComponent } from './pages/condiciones-de-servicio/condiciones-de-servicio.component';

export const HomeRouting : Routes = [
    {
        path:'',
        redirectTo : '/auth/login'
    },
    // {
    //     path:'',
    //     component : HomeComponent
    // },
    {
        path:'politica-de-privacidad',
        component : PoliticaDePrivacidadComponent
    },
    {
        path:'condiciones-de-servicio',
        component : CondicionesDeServicioComponent
    }
]
