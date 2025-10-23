import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-collaboration-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './collaboration-dialog.component.html'
})
export class CollaborationDialogComponent {
  collaborationForm: FormGroup;
  teamMembers: string[] = ['John Smith', 'Sarah Johnson', 'Michael Chen'];
  previousNotes: any[] = [
    {
      author: 'John Smith',
      date: '2 days ago',
      content: 'Great communication skills. Technical knowledge seems solid. Recommend moving to the next round.'
    },
    {
      author: 'Sarah Johnson',
      date: '5 days ago',
      content: 'Resume shows relevant experience. Let\'s schedule a technical interview to assess skills further.'
    }
  ];
  
  constructor(
    private dialogRef: MatDialogRef<CollaborationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { application: any, candidateName: string, previousNotes: any[] }
  ) {
    this.collaborationForm = this.fb.group({
      note: ['', Validators.required]
    });
  }
  
  removeMember(member: string): void {
    const index = this.teamMembers.indexOf(member);
    if (index >= 0) {
      this.teamMembers.splice(index, 1);
    }
  }

  addMember(): void {
    // Placeholder for adding a new team member, could open another dialog
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    if (this.collaborationForm.valid) {
      this.dialogRef.close(this.collaborationForm.value);
    }
  }
}
