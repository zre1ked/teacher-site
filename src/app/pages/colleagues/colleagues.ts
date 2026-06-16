import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VkService } from '../../services/vk.service';

@Component({
  selector: 'app-colleagues',
  standalone: false,
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss'
})
export class Colleagues implements OnInit {
  posts: any[] = [];
  isLoading = true;
  error = '';
  expandedPosts: Set<number> = new Set();

  constructor(private cdr: ChangeDetectorRef, private vkService: VkService) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    this.isLoading = true;
    this.posts = [];
    this.expandedPosts.clear();
    this.cdr.detectChanges();
    
    try {
      this.posts = await this.vkService.getPostsByHashtag('Коллегам');
    } catch (err) {
      this.error = 'Ошибка загрузки';
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