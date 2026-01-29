import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { SearchOverlay } from '../../../../shared/components/search-overlay/search-overlay';

@Component({
  selector: 'app-home-layout',
  imports: [CommonModule, Navbar, Sidebar, RouterModule, SearchOverlay],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss',
})
export class HomeLayout {

}
