import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { InviteRecruiterDialogComponent } from './invite-recruiter-dialog/invite-recruiter-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'

interface OrganizationMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  joinedDate: string;
}

interface PendingInvitation {
  id: string;
  email: string;
  createdAt: string;
  status: string;
}

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
  members: OrganizationMember[] = [];
  pendingInvitations: PendingInvitation[] = [];
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

  get filteredMembers(): OrganizationMember[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.members.filter(m => {
      const matchesQuery = q ? (
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      ) : true;
      const matchesRole = this.selectedRole ? m.role === this.selectedRole : true;
      return matchesQuery && matchesRole;
    });
  }

  getInitials(member: OrganizationMember): string {
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
    
    // Mock implementation since API doesn't exist yet
    setTimeout(() => {
      // Mock data for demonstration
      this.members = [
        {
          id: '1',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'HIRING_MANAGER',
          status: 'ACTIVE',
          joinedDate: new Date().toISOString()
        },
        {
          id: '2',
          email: 'recruiter@example.com',
          firstName: 'Jane',
          lastName: 'Recruiter',
          role: 'RECRUITER',
          status: 'ACTIVE',
          joinedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  loadPendingInvitations(): void {
    // Mock implementation since API doesn't exist yet
    setTimeout(() => {
      // Mock data for demonstration
      this.pendingInvitations = [
        {
          id: '101',
          email: 'newrecruiter@example.com',
          createdAt: new Date().toISOString(),
          status: 'PENDING'
        }
      ];
    }, 500);
  }

  openInviteDialog(): void {
    this.showInviteRecruiterModal = true;
  }

  handleInviteRecruiterConfirm(result: { emails: string[], message: string }): void {
    this.showInviteRecruiterModal = false;
    if (result) {
      this.inviteRecruiters(result.emails);
    }
  }

  handleInviteRecruiterCancel(): void {
    this.showInviteRecruiterModal = false;
  }

  inviteRecruiters(emails: string[]): void {
    // Mock implementation since API doesn't match our requirements
    setTimeout(() => {
      this.snackbarService.success('Invitations sent successfully!');
      // Add the new invitations to our mock data
      emails.forEach(email => {
        this.pendingInvitations.push({
          id: 'new-' + Math.random().toString(36).substring(2, 9),
          email: email,
          createdAt: new Date().toISOString(),
          status: 'PENDING'
        });
      });
    }, 500);
  }

  revokeInvitation(invitationId: string): void {
    // Mock implementation
    setTimeout(() => {
      this.pendingInvitations = this.pendingInvitations.filter(inv => inv.id !== invitationId);
      this.snackbarService.success('Invitation revoked successfully!');
    }, 500);
  }

  resendInvitation(invitationId: string): void {
    // Mock implementation
    setTimeout(() => {
      const invitation = this.pendingInvitations.find(inv => inv.id === invitationId);
      if (invitation) {
        invitation.createdAt = new Date().toISOString();
      }
      this.snackbarService.success('Invitation resent successfully!');
    }, 500);
  }

  updateMemberRole(memberId: string, newRole: string): void {
    // Mock implementation
    setTimeout(() => {
      const member = this.members.find(m => m.id === memberId);
      if (member) {
        member.role = newRole;
      }
      this.snackbarService.success('Member role updated successfully!');
    }, 500);
  }

  removeMember(memberId: string): void {
    const confirmed = window.confirm('Are you sure you want to remove this member from your organization?');
    if (confirmed) {
      // Mock implementation
      setTimeout(() => {
        this.members = this.members.filter(m => m.id !== memberId);
        this.snackbarService.success('Member removed successfully!');
      }, 500);
    }
  }

  getRoleChipClass(role: string): string {
    switch (role) {
      case 'HIRING_MANAGER':
        return 'bg-primary text-primary-foreground';
      case 'RECRUITER':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  getStatusChipClass(status: string): string {
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