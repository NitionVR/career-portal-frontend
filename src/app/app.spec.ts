import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './core/services/auth';
import { SnackbarService } from './shared/components/snackbar/snackbar.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [AuthService, SnackbarService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  afterEach(() => {
    const authService = TestBed.inject(AuthService);
    authService.clearRefreshTokenTimer();
  });
});
