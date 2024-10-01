import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

interface AppConfig {
  keycloak: {
    url: string;
    realm: string;
    clientId: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return lastValueFrom(
      this.http.get<AppConfig>('assets/config.json').pipe(
        map(data => {
          this.config = data;
          console.log('Configuration loaded:', this.config);  // Add logging
          return data;
        })
      )
    );
  }

  get keycloakConfig() {
    if (!this.config) {
      throw new Error('Config not loaded');
    }
    return this.config.keycloak;
  }
}
