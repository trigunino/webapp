import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './services/auth.guard';
// Define the routes for the application.


// two possibilities to load : Eager Loading  vs Lazy loading
// use lazy loading by defual with loadComponent: () =>....
//  canActivate: [AuthGuard]  // AuthGuard will check if the user is authenticated before activating this route.If the user is not authenticated, `AuthGuard` will redirect them to the login page.
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'home', 
        loadComponent: () => import('./comps/pages/home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./comps/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      }
    ]
  }
];
    // ,{
    //     path: 'admin/settings',
    //     loadComponent: () => import('./comps/adminpg/settings/settings.component').then(m => m.SettingsComponent),
    //     canActivate: [AuthGuard, canLoadPage([ROLES.admin])]
    // },
    // {
    //     path: 'admin/configurations',
    //     loadComponent: () => import('./comps/adminpg/configurations/configurations.component').then(m => m.ConfigurationsComponent),
    //     canActivate: [AuthGuard, canLoadPage([ROLES.admin])]
    // },
    // {
    //     path: 'admin/languages',
    //     loadComponent: () => import('./comps/adminpg/translation/translation.component').then(t => t.TranslationComponent),
    //     canActivate: [AuthGuard, canLoadPage([ROLES.admin])]
    // },
    // {
    //     path: 'error-page/:code',
    //     loadComponent: () => import('./comps/common/error-page/error-page.component').then(c => c.ErrorPageComponent),
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'admin/setup',
    //     loadComponent: () => import('./comps/adminpg/initial-setup/initial-setup.component').then(c => c.InitialSetupComponent),
    //     canActivate: [AuthGuard]
    //     data: {
    //         hideHeaders: true
    //     }
    // }

