import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopRibbonComponent } from '../../comps/top-ribbon/top-ribbon.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true, // Mark it as standalone if needed
  imports: [CommonModule, RouterModule, TopRibbonComponent], // Import the TopRibbonComponent here
})
export class MainLayoutComponent {}