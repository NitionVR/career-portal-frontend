import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationControllerService } from '../../../../api/services/organization-controller.service';
import { InvitationControllerService } from '../../../../api/services/invitation-controller.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { InviteRecruiterDialogComponent } from './invite-recruiter-dialog/invite-recruiter-dialog.component';
import { FormsModule } from '@angular/forms';
import { OrganizationMemberDto, RecruiterInvitationDto, RecruiterInvitationRequest } from '../../../../api/models';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-organization-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InviteRecruiterDialogComponent
  ],
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.scss']
})
export class OrganizationMembersComponent implements OnInit {
  members: OrganizationMemberDto[] = [];
  pendingInvitations: RecruiterInvitationDto[] = [];
  isLoading = true;
  showInviteRecruiterModal = false;
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'joinedDate', 'actions'];
  selectedMemberMenuId: string | null = null;

  toggleMemberMenu(memberId: string): void {
    this.selectedMemberMenuId = this.selectedMemberMenuId === memberId ? null : memberId;
  }

  isMemberMenuOpen(memberId: string): boolean {
    return this.selectedMemberMenuId === memberId;
  }

  closeMemberMenu(): void {
    this.selectedMemberMenuId = null;
  }
  invitationColumns: string[] = ['email', 'createdAt', 'status', 'actions'];

  constructor(
    private orgService: OrganizationControllerService,
    private invitationService: InvitationControllerService,
    private snackbarService: SnackbarService
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
    this.showInviteRecruiterModal = true;
  }

  handleInviteRecruiterConfirm(result: { emails: string[], message: string }): void {
    this.showInviteRecruiterModal = false;
    if (result) {
      this.inviteRecruiters(result.emails, result.message);
    }
  }

  handleInviteRecruiterCancel(): void {
    this.showInviteRecruiterModal = false;
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

  updateMemberRole(memberId: string, newRole: 'HIRING_MANAGER' | 'RECRUITER'): void {
    this.orgService.updateMemberRole({ memberId, body: { newRole } }).subscribe({
      next: () => {
        this.snackbarService.success('Member role updated successfully!');
        this.loadOrganizationMembers();
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to update member role.');
      }
    });
  }

  removeMember(memberId: string): void {
    const confirmed = window.confirm('Are you sure you want to remove this member from your organization?');
    if (confirmed) {
      this.orgService.removeMember({ memberId }).subscribe({
        next: () => {
          this.snackbarService.success('Member removed successfully!');
          this.loadOrganizationMembers();
        },
        error: (err: any) => {
          this.snackbarService.error('Failed to remove member.');
        }
      });
    }
  }

  resendInvitation(invitationId: string): void {
    this.invitationService.resendInvitation({ invitationId }).subscribe({
      next: () => {
        this.snackbarService.success('Invitation resent successfully!');
        this.loadPendingInvitations();
      },
      error: (err: any) => {
        this.snackbarService.error('Failed to resend invitation.');
      }
    });
  }

  getAvatarColor(memberId: string): string {
    const colors = ['bg-blue-200', 'bg-green-200', 'bg-purple-200', 'bg-amber-200', 'bg-red-200'];
    const hash = memberId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }

  getStatusIndicatorClass(status: string | undefined): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-success';
      case 'PENDING':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  }

  getRoleChipClass(role: string | undefined): string {
    switch (role) {
      case 'HIRING_MANAGER':
        return 'bg-primary/10 text-primary';
      case 'RECRUITER':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  getStatusChipClass(status: string | undefined): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-success/10 text-success';
      case 'PENDING':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }
}
