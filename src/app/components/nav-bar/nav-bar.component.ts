import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ProgressService } from '../../services/progress.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(public progress: ProgressService, public theme: ThemeService) { }
}
