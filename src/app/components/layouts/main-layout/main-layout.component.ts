import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { HeaderComponent } from '../../header/header.component';
import { NotificationStateService } from '../../../services/notifications/notification-state.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isMobileSidebarOpen = false;

  constructor(
    private notificationStateService: NotificationStateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialiser le streaming de notifications pour l'utilisateur connecté
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.trackingId) {
      this.notificationStateService.initialize(currentUser.trackingId);
      // Demander la permission pour les notifications système
      this.notificationStateService.requestNotificationPermission();
    }
  }

  ngOnDestroy(): void {
    // Se déconnecter du flux de notifications lors de la destruction du composant
    this.notificationStateService.disconnect();
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }
}
