import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  LayoutDashboard,
  Users,
  Network,
  Target,
  Shield,
  Calendar,
  AlertCircle,
  FileText,
  Bell,
  BarChart3,
  Anchor,
  LogOut,
  X
} from 'lucide-angular';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isProfileOpen = false;
  isMobileSidebarOpen = false;

  // Lucide icons
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly Network = Network;
  readonly Target = Target;
  readonly Shield = Shield;
  readonly Calendar = Calendar;
  readonly AlertCircle = AlertCircle;
  readonly FileText = FileText;
  readonly Bell = Bell;
  readonly BarChart3 = BarChart3;
  readonly Anchor = Anchor;
  readonly LogOut = LogOut;
  readonly X = X;

  navItems = [
    { label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
    { label: 'Agents', icon: 'Users', href: '/agents' },
    { label: 'Unités', icon: 'Network', href: '/units' },
    { label: 'Missions', icon: 'Target', href: '/missions' },
    { label: 'Gardes', icon: 'Shield', href: '/duties' },
    { label: 'Absences', icon: 'Calendar', href: '/absences' },
    { label: 'Règles', icon: 'FileText', href: '/managementRules' },
    { label: 'Historique', icon: 'BarChart3', href: '/histories' },
    { label: 'Notifications', icon: 'Bell', href: '/notifications' },
  ];

  constructor(private authService: AuthService) {}

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  getIcon(iconName: string) {
    const iconMap: { [key: string]: any } = {
      'LayoutDashboard': this.LayoutDashboard,
      'Users': this.Users,
      'Network': this.Network,
      'Target': this.Target,
      'Shield': this.Shield,
      'Calendar': this.Calendar,
      'AlertCircle': this.AlertCircle,
      'FileText': this.FileText,
      'Bell': this.Bell,
      'BarChart3': this.BarChart3,
      'Anchor': this.Anchor,
    };
    return iconMap[iconName];
  }
}
