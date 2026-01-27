import { Component, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async login() {
  if (this.loading) return;

  this.error = null;

  if (!this.email || !this.password) {
    this.error = 'Por favor, completa todos los campos.';
    return;
  }

  this.loading = true;
  this.cdr.detectChanges();

  try {
    await this.authService.login(this.email, this.password);
    await this.router.navigate(['/home']);
  } catch (error: any) {
    this.error = this.mapAuthError(error);
  } finally {
    this.loading = false;
    this.cdr.detectChanges();
  }
}


  private mapAuthError(error: any): string {
    const message = error?.message?.toLowerCase() || '';

    if (message.includes('invalid login credentials')) {
      return 'Email o contraseña incorrectos';
    }

    if (message.includes('email not confirmed')) {
      return 'Debes confirmar tu email antes de entrar';
    }

    if (message.includes('network')) {
      return 'Error de conexión, inténtalo de nuevo';
    }

    return 'Error al iniciar sesión. Inténtalo más tarde.';
  }
}
