import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EmployerSidebarComponent } from './employer-sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployerSidebarComponent', () => {
  let component: EmployerSidebarComponent;
  let fixture: ComponentFixture<EmployerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerSidebarComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
