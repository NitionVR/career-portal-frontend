import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AuthService } from './core/services/auth';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MagicLinkPage } from './pages/magic-link/magic-link';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarComponent, SnackbarComponent, MagicLinkPage],
  providers: [MagicLinkPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('temp-app');
  user: any | null = null;

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private magicLinkPage = inject(MagicLinkPage);
  private userSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    const token = this.route.snapshot.queryParamMap.get('token');
    const action = this.route.snapshot.queryParamMap.get('action');

    if (token) {
      this.magicLinkPage.ngOnInit();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
