import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item";

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItemComponent, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
