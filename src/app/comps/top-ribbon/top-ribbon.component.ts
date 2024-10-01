import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-top-ribbon',
  templateUrl: './top-ribbon.component.html',
  styleUrls: ['./top-ribbon.component.css'],
  standalone: true, // Mark the component as standalone
})
export class TopRibbonComponent implements OnInit {
  username: string | null = null;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      const keycloakInstance = this.keycloakService.getKeycloakInstance(); // Get Keycloak instance
      const userProfile = await keycloakInstance.loadUserProfile(); // Load the profile from Keycloak JS adapter
      this.username = userProfile?.username || null; // Set the username
    }
  }

  async logout() {
    await this.keycloakService.logout();
  }
}
