import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
// Remove unused import

@Component({
  selector: 'app-collaboration-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2">Team Collaboration</h2>
      <p class="text-muted-foreground mb-6">Share feedback and notes about {{ application.candidateProfile?.firstName }} {{ application.candidateProfile?.lastName }}</p>
      
      <div class="space-y-6">
        <!-- Team Members -->
        <div>
          <label class="block text-sm font-medium mb-2">Share with Team Members</label>
          <div class="flex flex-wrap gap-2 mb-4">
            <div *ngFor="let member of teamMembers" class="px-3 py-1.5 bg-muted rounded-full text-sm flex items-center gap-1">
              {{ member }}
              <button class="ml-1 focus:outline-none">
                <mat-icon class="text-sm h-4 w-4">close</mat-icon>
              </button>
            </div>
            <button class="px-3 py-1.5 border border-dashed border-muted-foreground rounded-full text-sm text-muted-foreground flex items-center gap-1">
              <mat-icon class="text-sm h-4 w-4">add</mat-icon>
              Add Member
            </button>
          </div>
        </div>
        
        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium mb-2">Notes</label>
          <mat-form-field appearance="outline" class="w-full">
            <textarea matInput [(ngModel)]="notes" rows="4" placeholder="Add your feedback or notes about this candidate..."></textarea>
          </mat-form-field>
        </div>
        
        <!-- Previous Notes -->
        <div *ngIf="previousNotes.length > 0">
          <label class="block text-sm font-medium mb-2">Previous Notes</label>
          <div class="space-y-4">
            <div *ngFor="let note of previousNotes" class="p-4 bg-muted rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {{ note.author.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium">{{ note.author }}</p>
                    <p class="text-xs text-muted-foreground">{{ note.date }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button mat-icon-button>
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
              <p class="text-sm">{{ note.content }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 mt-8">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="!notes" (click)="onSave()">Save Notes</button>
      </div>
    </div>
  `
})
export class CollaborationDialogComponent {
  application: any;
  notes: string = '';
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
    @Inject(MAT_DIALOG_DATA) public data: { application: any }
  ) {
    this.application = data.application;
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSave(): void {
    // In a real implementation, this would save the notes to the backend
    this.dialogRef.close({ notes: this.notes });
  }
}