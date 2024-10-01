import { TestBed } from '@angular/core/testing';
import { AuthService } from './keycloak.service';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';

// Mock implementation of KeycloakService
class MockKeycloakService {
  isLoggedIn() {
    return Promise.resolve(true);
  }
  getUsername() {
    return 'test-user';
  }
  logout() {}
  getUserRoles() {
    return ['user', 'admin'];
  }
  init() {
    return Promise.resolve();
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let keycloakService: KeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    });
    service = TestBed.inject(AuthService);
    keycloakService = TestBed.inject(KeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize Keycloak', async () => {
    const initSpy = spyOn(keycloakService, 'init').and.callThrough();
    await service.init();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should check if the user is logged in', async () => {
    const isLoggedIn = await service.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  it('should get the username', () => {
    const username = service.getUsername();
    expect(username).toBe('test-user');
  });

  it('should log out the user', () => {
    const logoutSpy = spyOn(keycloakService, 'logout').and.callThrough();
    service.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should check if the user has a specific role', () => {
    const hasRoleUser = service.hasRole('user');
    const hasRoleAdmin = service.hasRole('admin');
    const hasRoleGuest = service.hasRole('guest');
    
    expect(hasRoleUser).toBe(true);
    expect(hasRoleAdmin).toBe(true);
    expect(hasRoleGuest).toBe(false);
  });
});
