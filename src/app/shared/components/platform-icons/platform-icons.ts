import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type PlatformIconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-platform-icons',
  imports: [CommonModule],
  templateUrl: './platform-icons.html',
  styleUrl: './platform-icons.scss',
})
export class PlatformIcons {
  @Input() platforms: { platform: { name: string } }[] = [];
  @Input() size: PlatformIconSize = 'md';

  get sizeClass(): string {
    return `size-${this.size}`;
  }

  getPlatformIcon(name: string): string {
    switch (name.toLowerCase()) {
      case 'pc':
        return 'icon-pc';
      case 'apple macintosh':
        return 'icon-mac';
      case 'linux':
        return 'icon-linux';
      case 'ios':
        return 'icon-ios';
      case 'android':
        return 'icon-android';
      case 'web':
        return 'icon-web';
      case 'playstation':
        return 'icon-playstation';
      case 'xbox':
        return 'icon-xbox';
      case 'nintendo':
        return 'icon-nintendo';
      default:
        return '';
    }
  }
}
