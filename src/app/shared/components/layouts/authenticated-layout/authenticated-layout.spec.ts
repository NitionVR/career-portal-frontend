import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout';
import { AuthService } from '../../../../core/services/auth';
import { environment } from '../../../../../environments/environment';

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
        { provide: 'environment', useValue: environment }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedLayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    // Log in the test user
    if (environment.testUser) {
      authService.loginForTesting().subscribe(() => {
        fixture.detectChanges();
      });
    } else {
      fixture.detectChanges();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
