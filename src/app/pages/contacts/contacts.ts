import { Component } from '@angular/core';

interface UsefulLink {
  id: number;
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  links: UsefulLink[] = [
    { id: 1, title: 'Ссылка 1', url: '#', icon: '🔗' },
    { id: 2, title: 'Ссылка 2', url: '#', icon: '📚' },
    { id: 3, title: 'Ссылка 3', url: '#', icon: '📝' },
    { id: 4, title: 'Ссылка 4', url: '#', icon: '🎓' },
    { id: 5, title: 'Ссылка 5', url: '#', icon: '📖' },
  ];
}