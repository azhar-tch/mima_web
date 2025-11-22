import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
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
  X,
  Ship,
  Award,
  GraduationCap,
  Briefcase,
  Building2,
  History,
  BookOpen,
  ShieldAlert,
  MapPin,
  AlertTriangle,
  Boxes,
  FileCheck,
  DollarSign,
  UserCog
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
  currentUserRole: string | undefined;

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
  readonly Ship = Ship;
  readonly Award = Award;
  readonly GraduationCap = GraduationCap;
  readonly Briefcase = Briefcase;
  readonly Building2 = Building2;
  readonly History = History;
  readonly BookOpen = BookOpen;
  readonly ShieldAlert = ShieldAlert;
  readonly MapPin = MapPin;
  readonly AlertTriangle = AlertTriangle;
  readonly Boxes = Boxes;
  readonly FileCheck = FileCheck;
  readonly DollarSign = DollarSign;
  readonly UserCog = UserCog;

  navSections = [
    {
      title: 'Système de Gestion',
      items: [
        { label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
        { label: 'Agents', icon: 'Users', href: '/agents' },
        { label: 'Unités', icon: 'Network', href: '/units' },
        { label: 'Missions', icon: 'Target', href: '/missions' },
        { label: 'Gardes', icon: 'Shield', href: '/duties' },
        { label: 'Absences', icon: 'Calendar', href: '/absences' },
        { label: 'Règles', icon: 'FileText', href: '/managementRules' },
        { label: 'Gestion Rôles', icon: 'UserCog', href: '/rules-management' },
        { label: 'Historique', icon: 'BarChart3', href: '/histories' },
        { label: 'Notifications', icon: 'Bell', href: '/notifications' },
      ]
    },
    {
      title: 'Opérations Maritimes',
      items: [
        { label: 'Navires Commerciaux', icon: 'Ship', href: '/commercial-ships' },
        { label: 'Navires Militaires', icon: 'Anchor', href: '/naval-vessels' },
        { label: 'Agences Sécurité', icon: 'ShieldAlert', href: '/security-agencies' },
        { label: 'Gardes Armés', icon: 'Shield', href: '/armed-guard-missions' },
        { label: 'Escortes', icon: 'Target', href: '/escort-missions' },
        { label: 'Arrivées/Départs', icon: 'MapPin', href: '/ship-arrival-departures' },
        { label: 'Entrées/Sorties PAL', icon: 'MapPin', href: '/pal-entry-exits' },
        { label: 'Incidents', icon: 'AlertTriangle', href: '/ship-incidents' },
        { label: 'Avitaillements', icon: 'Boxes', href: '/ship-provisionings' },
        { label: 'Opérations STS', icon: 'Boxes', href: '/sts-operations' },
        { label: 'Saisies', icon: 'AlertCircle', href: '/conservator-seizures' },
        { label: 'Indemnités', icon: 'DollarSign', href: '/personnel-allowances' },
      ]
    },
    {
      title: 'Gestion RH',
      items: [
        { label: 'Grades', icon: 'Award', href: '/hr-grades' },
        { label: 'Fonctions', icon: 'Briefcase', href: '/hr-functions' },
        { label: 'Formations', icon: 'GraduationCap', href: '/trainings' },
        { label: 'Distinctions', icon: 'Award', href: '/awards' },
        { label: 'Postes Service', icon: 'FileCheck', href: '/service-positions' },
        { label: 'Autres Postes', icon: 'FileCheck', href: '/other-positions' },
        { label: 'Compagnies BML', icon: 'Building2', href: '/bml-companies' },
      ]
    },
  ];

  // Keep for backward compatibility
  navItems = this.navSections[0].items;

  constructor(private authService: AuthService) {
    // Récupérer le rôle de l'utilisateur connecté
    const currentUser = this.authService.getCurrentUser();
    this.currentUserRole = currentUser?.rule;
  }

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
      'Ship': this.Ship,
      'Award': this.Award,
      'GraduationCap': this.GraduationCap,
      'Briefcase': this.Briefcase,
      'Building2': this.Building2,
      'History': this.History,
      'BookOpen': this.BookOpen,
      'ShieldAlert': this.ShieldAlert,
      'MapPin': this.MapPin,
      'AlertTriangle': this.AlertTriangle,
      'Boxes': this.Boxes,
      'FileCheck': this.FileCheck,
      'DollarSign': this.DollarSign,
      'UserCog': this.UserCog,
    };
    return iconMap[iconName];
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'ADMIN';
  }
}
