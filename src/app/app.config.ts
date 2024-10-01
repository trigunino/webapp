import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import { AuthService } from './services/keycloak.service';  // Corrected path

const keycloakService = new KeycloakService();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(KeycloakAngularModule),
    { provide: KeycloakService, useValue: keycloakService },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.init(),
      deps: [AuthService],
      multi: true
    }
  ]
};
