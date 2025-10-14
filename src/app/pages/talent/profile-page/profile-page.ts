import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePageComponent {
  uploading: boolean = false;
  progress: number = 0;

  onFileUpload(event: any): void {
    this.uploading = true;
    this.progress = 0;
    // Simulate upload progress
    let interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.uploading = false;
        this.progress = 0; // Reset progress after completion
      }
    }, 200);
  }
}
