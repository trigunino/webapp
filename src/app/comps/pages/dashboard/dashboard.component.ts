import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/keycloak.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule]
})
export class DashboardComponent implements OnInit {

  username: string = ''; // Initialize with a default value

  constructor(private authService: AuthService) {}

  async ngOnInit() {  //ngOnInit part of angular component lifecycle used for init locig in component,  called once after the component's data-bound properties have been initialized
    if (await this.authService.isLoggedIn()) {
      this.username = this.authService.getUsername();
    }
  }

  logout() {
    this.authService.logout();
  }
}
