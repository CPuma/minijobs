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

@NgModule({
  declarations: [
    AppComponent,
    
    // SHARED
    HeaderComponent, // General HEader
    FooterComponent,  // General Footer
    LoaderComponent,
    CapitalizerPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,  // SUPER IMPORTANTE
    // Modulos
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
