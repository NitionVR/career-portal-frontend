import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../navigation/header/header';
import { SidebarComponent } from '../../navigation/sidebar/sidebar.component';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './authenticated-layout.html',
  styleUrls: ['./authenticated-layout.css']
})
export class AuthenticatedLayoutComponent {}
