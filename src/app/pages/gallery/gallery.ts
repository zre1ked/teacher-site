import { Component } from '@angular/core';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  images: GalleryImage[] = [
    { id: 1, src: 'assets/images/placeholder.svg', alt: 'Фото 1' },
    { id: 2, src: 'assets/images/placeholder.svg', alt: 'Фото 2' },
    { id: 3, src: 'assets/images/placeholder.svg', alt: 'Фото 3' },
    { id: 4, src: 'assets/images/placeholder.svg', alt: 'Фото 4' },
    { id: 5, src: 'assets/images/placeholder.svg', alt: 'Фото 5' },
    { id: 6, src: 'assets/images/placeholder.svg', alt: 'Фото 6' },
  ];
  
  isLightboxOpen = false;
  selectedImage: GalleryImage | null = null;
  
  openLightbox(image: GalleryImage): void {
    this.selectedImage = image;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}