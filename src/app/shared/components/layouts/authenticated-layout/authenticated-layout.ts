import { Component } from '@angular/core';
import { HeaderComponent } from '../../navigation/header/header';
import { SidebarComponent } from '../../navigation/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './authenticated-layout.html',
  styleUrls: ['./authenticated-layout.css']
})
export class AuthenticatedLayoutComponent {

}
