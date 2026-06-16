import { Injectable } from '@angular/core';

interface VkPost {
  id: number;
  text: string;
  shortText: string;
  date: string;
  image: string;
  hasImage: boolean;
  url: string;
  isLong: boolean;
  hashtags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VkService {
  private cachedPosts: VkPost[] = [];
  private cacheTime = 0;
  private cacheDuration = 1 * 60 * 1000;

  async getPosts(): Promise<VkPost[]> {
    this.cacheTime = 0;
    
    if (this.cachedPosts.length > 0 && Date.now() - this.cacheTime < this.cacheDuration) {
      return this.cachedPosts;
    }

    try {
      const response = await fetch('/api/vk-posts');
      const data = await response.json();
      
      const items = data.response?.items || [];
      
      this.cachedPosts = items.map((item: any) => {
        const text = item.text || 'Без текста';
        let hashtags = this.extractHashtags(text);
        
        // Если нет хештегов - добавляем #Блог по умолчанию
        if (hashtags.length === 0) {
          hashtags = ['Блог'];
        }
        
        return {
          id: item.id,
          text: text,
          shortText: text.length > 150 ? text.substring(0, 150) + '...' : text,
          date: new Date(item.date * 1000).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          image: this.getImage(item.attachments),
          hasImage: this.hasImage(item.attachments),
          url: `https://vk.com/club239620084?w=wall-239620084_${item.id}`,
          isLong: text.length > 150,
          hashtags: hashtags
        };
      });
      
      this.cacheTime = Date.now();
      return this.cachedPosts;
    } catch (error) {
      console.error('Error loading posts:', error);
      return this.cachedPosts;
    }
  }

  async getPostsByHashtag(hashtag: string): Promise<VkPost[]> {
    const allPosts = await this.getPosts();
    return allPosts.filter(post => post.hashtags.includes(hashtag));
  }

  getImage(attachments: any[]): string {
    if (!attachments?.length) return '';
    const photo = attachments.find((a: any) => a.type === 'photo');
    if (photo?.photo?.sizes) {
      const max = photo.photo.sizes.reduce((a: any, b: any) => 
        (a.width * a.height > b.width * b.height) ? a : b
      );
      return max.url;
    }
    return '';
  }

  hasImage(attachments: any[]): boolean {
    return attachments?.some((a: any) => a.type === 'photo') || false;
  }

  extractHashtags(text: string): string[] {
    const hashtags: string[] = [];
    const regex = /#([\wа-яё]+)/gi;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const tag = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      hashtags.push(tag);
    }
    
    return hashtags;
  }
}