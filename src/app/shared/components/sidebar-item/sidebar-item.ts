import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.scss',
})
export class SidebarItemComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() collapsed: boolean = true;
}