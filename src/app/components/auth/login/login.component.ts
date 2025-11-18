import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, ErrorDialogComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  showErrorDialog = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      const credentials = {
        email: this.email,
        password: this.password
      };

      this.authService.login(credentials).subscribe({
        next: (res) => {
          console.log("✅ Login success:", res.message);
          console.log("🔑 Token:", res.token);
          console.log("👤 User:", res.user);

          // Stocke en session
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));

          // Redirection
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error("❌ Login error:", err.error?.message || err.message);
          this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.';
          this.showErrorDialog = true;
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.showErrorDialog = true;
    }
  }
}