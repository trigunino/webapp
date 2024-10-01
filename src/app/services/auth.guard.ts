import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

// A guard to protect routes using Keycloak authentication.
// Guards are used in Angular to control whether a route can be activated or not.
// This AuthGuard will check if the user is authenticated with Keycloak before allowing access to the route.

@Injectable({
  providedIn: 'root'  // This decorator makes the AuthGuard available throughout the application.
})
export class AuthGuard implements CanActivate {
  
  // Inject KeycloakService to handle authentication and Router to handle navigation.
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  // This method is called by the Angular router to determine if a route can be activated.
  async canActivate(): Promise<boolean> {
    
    // Check if the user is logged in using KeycloakService.
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    // If the user is not logged in, redirect to the Keycloak login page.
    if (!isLoggedIn) {
      await this.keycloakService.login();
      return false;  // Return false to prevent the route from being activated.
    }

    // If the user is logged in, allow the route to be activated by returning true.
    return true;
  }
}
