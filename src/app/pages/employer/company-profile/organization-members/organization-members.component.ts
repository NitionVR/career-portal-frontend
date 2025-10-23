import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { OrganizationControllerService } from '../../../../api/services/organization-controller.service';
import { InvitationControllerService } from '../../../../api/services/invitation-controller.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { InviteRecruiterDialogComponent } from './invite-recruiter-dialog/invite-recruiter-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { OrganizationMemberDto, RecruiterInvitationDto, RecruiterInvitationRequest } from '../../../../api/models';

@Component({
  selector: 'app-organization-members',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.scss']
})
export class OrganizationMembersComponent implements OnInit {
  members: OrganizationMemberDto[] = [];
  pendingInvitations: RecruiterInvitationDto[] = [];
  isLoading = true;
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'joinedDate', 'actions'];
  invitationColumns: string[] = ['email', 'createdAt', 'status', 'actions'];

  constructor(
    private orgService: OrganizationControllerService,
    private invitationService: InvitationControllerService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  searchQuery: string = '';
  selectedRole: '' | 'HIRING_MANAGER' | 'RECRUITER' = '';
  roleOptions: string[] = ['HIRING_MANAGER', 'RECRUITER'];

  get filteredMembers(): OrganizationMemberDto[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.members.filter(m => {
      const matchesQuery = q ? (
        m.firstName?.toLowerCase().includes(q) ||
        m.lastName?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
      ) : true;
      const matchesRole = this.selectedRole ? m.role === this.selectedRole : true;
      return matchesQuery && matchesRole;
    });
  }

  getInitials(member: OrganizationMemberDto): string {
    const f = member.firstName?.[0] ?? '';
    const l = member.lastName?.[0] ?? '';
    return (f + l).toUpperCase();
  }

  ngOnInit(): void {
    this.loadOrganizationMembers();
    this.loadPendingInvitations();
  }

  loadOrganizationMembers(): void {
    this.isLoading = true;
    this.orgService.getOrganizationMembers().subscribe({
      next: (members) => {
        this.members = members;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to load organization members.');
        this.isLoading = false;
      }
    });
  }

  loadPendingInvitations(): void {
    this.invitationService.listOrganizationInvitations({ pageable: { page: 0, size: 100 } }).subscribe({
      next: (invitations) => {
        this.pendingInvitations = invitations.content || [];
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to load pending invitations.');
      }
    });
  }

  openInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteRecruiterDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inviteRecruiters(result.emails, result.message);
      }
    });
  }

  inviteRecruiters(emails: string[], message?: string): void {
    const requests: RecruiterInvitationRequest[] = emails.map(email => ({ email, personalMessage: message }));
    this.invitationService.inviteRecruiterBulk({ body: requests }).subscribe({
      next: () => {
        this.snackbarService.success('Invitations sent successfully!');
        this.loadPendingInvitations();
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to send invitations.');
      }
    });
  }

  revokeInvitation(invitationId: string): void {
    this.invitationService.revokeInvitation({ invitationId }).subscribe({
      next: () => {
        this.snackbarService.success('Invitation revoked successfully!');
        this.loadPendingInvitations();
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to revoke invitation.');
      }
    });
  }

  // resendInvitation(invitationId: string): void {
  //   // Backend endpoint does not exist yet
  //   this.snackbarService.info('Resend functionality is not yet available.');
  // }

  // updateMemberRole(memberId: string, newRole: string): void {
  //   // Backend endpoint does not exist yet
  //   this.snackbarService.info('Update role functionality is not yet available.');
  // }

  // removeMember(memberId: string): void {
  //   const confirmed = window.confirm('Are you sure you want to remove this member from your organization?');
  //   if (confirmed) {
  //     // Backend endpoint does not exist yet
  //     this.snackbarService.info('Remove member functionality is not yet available.');
  //   }
  // }

  getRoleChipClass(role: string | undefined): string {
    switch (role) {
      case 'HIRING_MANAGER':
        return 'bg-primary text-primary-foreground';
      case 'RECRUITER':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  getStatusChipClass(status: string | undefined): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-success text-success-foreground';
      case 'PENDING':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }
}