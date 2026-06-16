import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VkService } from '../../services/vk.service';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {
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
    this.error = '';
    this.posts = [];
    this.expandedPosts.clear();
    this.cdr.detectChanges();
    
    try {
      // Получаем посты с хештегом #Блог (включая посты без хештегов)
      this.posts = await this.vkService.getPostsByHashtag('Блог');
    } catch (err) {
      this.error = 'Ошибка загрузки';
      console.error(err);
    }
    
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  toggleExpand(postId: number) {
    if (this.expandedPosts.has(postId)) {
      this.expandedPosts.delete(postId);
    } else {
      this.expandedPosts.add(postId);
    }
  }

  isExpanded(postId: number): boolean {
    return this.expandedPosts.has(postId);
  }
}