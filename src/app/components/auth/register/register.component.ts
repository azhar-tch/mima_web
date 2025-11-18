import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule, ErrorDialogComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';

  showErrorDialog = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    // Validation
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.errorMessage = 'Tous les champs obligatoires doivent être remplis.';
      this.showErrorDialog = true;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.showErrorDialog = true;
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      this.showErrorDialog = true;
      return;
    }

    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber || undefined,
      password: this.password
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log('✅ Registration success:', res);
        // Redirection vers la page de connexion
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('❌ Registration error:', err.error?.message || err.message);
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        this.showErrorDialog = true;
      }
    });
  }
}
