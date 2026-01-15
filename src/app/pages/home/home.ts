import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Health } from '../health/health';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Health],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
