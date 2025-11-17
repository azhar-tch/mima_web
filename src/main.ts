import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig, // inclut tout ce que tu avais dans appConfig
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(FormsModule),   
    provideRouter(routes)               
  ]
})
.catch(err => console.error(err));