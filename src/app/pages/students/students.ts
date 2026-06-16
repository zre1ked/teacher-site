import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VkService } from '../../services/vk.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {
  posts: any[] = [];
  isLoading = true;
  expandedPosts: Set<number> = new Set();

  constructor(private cdr: ChangeDetectorRef, private vkService: VkService) {}

  ngOnInit() { this.loadPosts(); }

  async loadPosts() {
    this.isLoading = true;
    this.posts = [];
    this.expandedPosts.clear();
    this.cdr.detectChanges();
    try {
      this.posts = await this.vkService.getPostsByHashtag('Ученикам');
    } catch (err) {
      console.error(err);
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  toggleExpand(postId: number) {
    if (this.expandedPosts.has(postId)) this.expandedPosts.delete(postId);
    else this.expandedPosts.add(postId);
  }

  isExpanded(postId: number): boolean {
    return this.expandedPosts.has(postId);
  }
}