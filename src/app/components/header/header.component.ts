import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Menu,
  Search,
  Bell,
  ChevronDown
} from 'lucide-angular';
import { UsersResponse } from '../../models/Users';
import { NotificationStateService } from '../../services/notifications/notification-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();

  isUserMenuOpen = false;
  notificationCount = 0;
  currentUser: UsersResponse | null = null;
  private unreadCountSubscription?: Subscription;

  // Lucide icons
  readonly Menu = Menu;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly ChevronDown = ChevronDown;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationStateService: NotificationStateService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    // S'abonner au compteur de notifications non lues
    this.unreadCountSubscription = this.notificationStateService.unreadCount$.subscribe({
      next: (count) => {
        this.notificationCount = count;
      }
    });
  }

  ngOnDestroy(): void {
    this.unreadCountSubscription?.unsubscribe();
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    const firstInitial = this.currentUser.firstName?.charAt(0).toUpperCase() || '';
    const lastInitial = this.currentUser.lastName?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial || 'U';
  }

  getUserFullName(): string {
    if (!this.currentUser) return 'Utilisateur';
    return `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim() || 'Utilisateur';
  }

  getUserRole(): string {
    if (!this.currentUser || !this.currentUser.rule) return 'Utilisateur';
    return this.currentUser.rule;
  }

  getUserEmail(): string {
    return this.currentUser?.email || 'email@example.com';
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

 logout() {
  const token = localStorage.getItem('token');
  if (token) {
    this.authService.logout(token).subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        this.cleanLogout();
      },
      error: (err) => {
        console.warn('Erreur lors de la déconnexion, nettoyage local', err);
        this.cleanLogout();  // toujours supprimer le token localement
      }
    });
  } else {
    this.cleanLogout(); // pas de token trouvé
  }
  this.isUserMenuOpen = false;
}

private cleanLogout() {
  localStorage.removeItem('token');
  this.authService.clearCurrentUser();
  this.router.navigate(['/login']);
}

  navigateToProfile() {
    this.router.navigate(['/profil']);
    this.isUserMenuOpen = false;
  }

  navigateToSettings() {
    // TODO: Navigate to settings
    console.log('Navigate to settings');
    this.isUserMenuOpen = false;
  }

  navigateToHelp() {
    // TODO: Navigate to help
    console.log('Navigate to help');
    this.isUserMenuOpen = false;
  }

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }
}
