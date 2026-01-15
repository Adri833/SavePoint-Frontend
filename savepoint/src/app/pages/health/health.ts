import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.html',
  styleUrl: './health.scss',
})
export class Health implements OnInit {

  status: string = 'Cargando...';

  constructor(
    private healthService: HealthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.healthService.checkHealth().subscribe({
      next: (response) => {
        this.status = `${response.status} - ${response.app}`;
        this.cdr.detectChanges(); //  Fuerza render
      },
      error: () => {
        this.status = 'Backend no disponible';
        this.cdr.detectChanges();
      }
    });
  }
}
