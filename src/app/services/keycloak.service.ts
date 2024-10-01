import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService, private appConfigService: AppConfigService) {}

  async init(): Promise<void> {
    try {
      await this.appConfigService.loadConfig();  // Load the configuration
      await this.keycloakService.init({
        config: this.appConfigService.keycloakConfig,  // Use the loaded configuration
        initOptions: {
          onLoad: 'login-required',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        }
      });
      console.log('Keycloak initialized successfully');
    } catch (error: any) {
      console.error('Keycloak initialization failed', error);
  
      // Log more detailed information if available
      if (error.message) {
        console.error('Error Message:', error.message);
      }
      if (error.stack) {
        console.error('Error Stack:', error.stack);
      }
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const loggedIn =  await this.keycloakService.isLoggedIn();
    console.log('User logged in:', loggedIn);
    return loggedIn;
  }

  getUsername(): string {
    const userDetails = this.keycloakService.getKeycloakInstance().profile;
    const username = this.keycloakService.getUsername();
    console.log('Username:', username);
    return username;
  }

  logout(): void {
    const redirectUri = window.location.origin;  // Use the origin of the current page as the redirect URI
    console.log('Logging out:', redirectUri);
    this.keycloakService.logout(redirectUri);
  }

  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }
}
