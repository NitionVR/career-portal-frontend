import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { AuthService } from './core/services/auth';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('temp-app');
  user: any | null = null;

  private authService = inject(AuthService);
  private userMenuSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    // The user menu modal is now handled within the HeaderComponent, so we no longer need to subscribe here.
    // this.userMenuSubscription = this.userMenuService.onOpenMenu().subscribe(() => {
    //   this.toggleUserMenuModal();
    // });
  }

  ngOnDestroy(): void {
    this.userMenuSubscription?.unsubscribe();
  }
}
