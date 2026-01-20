import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Logo } from '../../../shared/components/logo/logo';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Logo, InputFieldComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    this.error = null;
    this.loading = true;

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.error = error.message || 'Error al iniciar sesion, intentalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }
}
