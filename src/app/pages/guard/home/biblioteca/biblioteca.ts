import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaythroughService } from '../../../../services/playtrough.service';
import { Playthrough } from '../../../../models/playtrough.model';

@Component({
  selector: 'app-biblioteca',
  imports: [CommonModule, ],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.scss',
})

export class Biblioteca implements OnInit {
  playthroughs: Playthrough[] = [];
  loading = false;
  error: string | null = null;

  constructor(private playthroughService: PlaythroughService) {}

  async ngOnInit() {
    await this.loadLibrary();
  }

  async loadLibrary() {
    try {
      this.loading = true;
      this.error = null;

      this.playthroughs = await this.playthroughService.getAllByUser();

      console.log('Biblioteca:', this.playthroughs);
    } catch (err: any) {
      console.error(err);
      this.error = err.message ?? 'Error loading library';
    } finally {
      this.loading = false;
    }
  }
}
