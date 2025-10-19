import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appFileDrop]',
  standalone: true,
})
export class FileDropDirective {
  @Output() fileDropped = new EventEmitter<File>();
  @Output() fileHovered = new EventEmitter<boolean>();

  private counter = 0;

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Dragenter listener
  @HostListener('dragenter', ['$event']) onDragEnter(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.counter++;
    this.fileHovered.emit(true);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.counter--;
    if (this.counter === 0) {
      this.fileHovered.emit(false);
    }
  }

  // Drop listener
  @HostListener('drop', ['$event']) ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileHovered.emit(false);
    this.counter = 0;

    const files = evt.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }
}
