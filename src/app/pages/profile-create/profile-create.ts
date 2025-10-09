import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  standalone: true,
  imports: [],
  templateUrl: './profile-create.html',
  styleUrl: './profile-create.css'
})
export class ProfileCreate implements OnInit {
  registrationToken: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.registrationToken = this.route.snapshot.queryParamMap.get('token');

    // Clean the URL after extracting the token
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: {} });
  }
}