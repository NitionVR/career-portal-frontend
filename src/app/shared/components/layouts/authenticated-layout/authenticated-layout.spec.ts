import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout';
import { AuthService } from '../../../../core/services/auth';
import { ENVIRONMENT } from '../../../../core/tokens';

describe('AuthenticatedLayoutComponent', () => {
  let component: AuthenticatedLayoutComponent;
  let fixture: ComponentFixture<AuthenticatedLayoutComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedLayoutComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        AuthService,
        { provide: ENVIRONMENT, useValue: { testUser: { email: 'test@example.com' } } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedLayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    const environment = TestBed.inject(ENVIRONMENT);

    // Log in the test user
    if (environment.testUser) {
      authService.loginForTesting().subscribe(() => {
        fixture.detectChanges();
      });
    } else {
      fixture.detectChanges();
    }
  });

  afterEach(() => {
    authService.clearRefreshTokenTimer();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
