import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// MODULOS
import { HomeModule } from './modules/home/home.module';

// SAHRED
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CapitalizerPipe } from './shared/pipes/capitalizer.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database'

import { environment } from '../environments/environment';
import { TimePipe } from './shared/pipes/time.pipe';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    
    // SHARED
    HeaderComponent, // General HEader
    FooterComponent,  // General Footer
    LoaderComponent,
    CapitalizerPipe,
    TimePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // FireBASe
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireDatabaseModule,
    // AngularFireStorageModule,


    NgbModule,

    CoreModule,  // SUPER IMPORTANTE
    // Modulos
    HomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
