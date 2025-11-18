import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {
  LucideAngularModule,
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  Hash,
  Save,
  X
} from 'lucide-angular';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  // Lucide icons
  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Briefcase = Briefcase;
  readonly Building = Building;
  readonly Hash = Hash;
  readonly Save = Save;
  readonly X = X;

  user: any = null;
  isEditing = false;
  editedUser: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.editedUser = { ...this.user };
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Annuler les modifications
      this.editedUser = { ...this.user };
    }
  }

  saveProfile() {
    // En production, ceci ferait un appel API
    this.user = { ...this.editedUser };
    localStorage.setItem('user', JSON.stringify(this.user));
    this.isEditing = false;
  }

  getInitials(firstName: string, lastName: string): string {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}
