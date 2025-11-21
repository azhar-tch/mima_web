import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Users as UsersIcon, Search, Save, X, RefreshCw } from 'lucide-angular';
import { UsersResponse, UsersRequest } from '../../models/Users';
import { RulesResponse } from '../../models/Rules';
import { ApiResponse } from '../../models/api-response';
import { UsersService } from '../../services/users/users.service';
import { RulesService } from '../../services/rules/rules.service';
import { ToastService } from '../../services/notifications/toast.service';

@Component({
  selector: 'app-rules-management',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './rules-management.component.html',
  styleUrl: './rules-management.component.css'
})
export class RulesManagementComponent implements OnInit {
  readonly UsersIcon = UsersIcon;
  readonly Search = Search;
  readonly Save = Save;
  readonly X = X;
  readonly RefreshCw = RefreshCw;

  users: UsersResponse[] = [];
  rules: RulesResponse[] = [];
  filteredUsers: UsersResponse[] = [];

  searchTerm = '';
  filterRule = '';
  filterStatus = '';

  isLoading = false;
  isSaving: { [key: string]: boolean } = {};

  constructor(
    private usersService: UsersService,
    private rulesService: RulesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Charger les utilisateurs et les rôles en parallèle
    Promise.all([
      this.usersService.listUsers().toPromise(),
      this.rulesService.listRules().toPromise()
    ]).then(([usersResponse, rulesResponse]) => {
      if (usersResponse?.data) {
        this.users = usersResponse.data;
        this.applyFilters();
      }
      if (rulesResponse?.data) {
        this.rules = rulesResponse.data;
      }
      this.isLoading = false;
    }).catch(error => {
      console.error('Erreur lors du chargement des données:', error);
      this.toastService.error('Erreur lors du chargement des données');
      this.isLoading = false;
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm ||
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRule = !this.filterRule || user.ruleTrackingId === this.filterRule;

      const matchesStatus = !this.filterStatus ||
        (this.filterStatus === 'active' && user.isActive) ||
        (this.filterStatus === 'inactive' && !user.isActive);

      return matchesSearch && matchesRule && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterRule = '';
    this.filterStatus = '';
    this.applyFilters();
  }

  updateUserRole(user: UsersResponse, newRuleTrackingId: string): void {
    if (user.ruleTrackingId === newRuleTrackingId) {
      return; // Pas de changement
    }

    this.isSaving[user.trackingId] = true;

    const updateRequest: UsersRequest = {
      email: user.email,
      password: '', // Le backend devrait gérer ça différemment pour une simple mise à jour de rôle
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      fcmToken: user.fcmToken,
      ruleTrackingId: newRuleTrackingId,
      isActive: user.isActive
    };

    this.usersService.updateUser(user.trackingId, updateRequest).subscribe({
      next: (response) => {
        if (response.data) {
          // Mettre à jour l'utilisateur dans la liste
          const index = this.users.findIndex(u => u.trackingId === user.trackingId);
          if (index !== -1) {
            this.users[index] = response.data;
          }
          this.applyFilters();
          this.toastService.success(`Rôle mis à jour pour ${user.firstName} ${user.lastName}`);
        }
        this.isSaving[user.trackingId] = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rôle:', error);
        this.toastService.error('Erreur lors de la mise à jour du rôle');
        this.isSaving[user.trackingId] = false;
        // Recharger les données pour revenir à l'état précédent
        this.loadData();
      }
    });
  }

  toggleUserStatus(user: UsersResponse): void {
    this.isSaving[user.trackingId] = true;

    const updateRequest: UsersRequest = {
      email: user.email,
      password: '',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      fcmToken: user.fcmToken,
      ruleTrackingId: user.ruleTrackingId || '',
      isActive: !user.isActive
    };

    this.usersService.updateUser(user.trackingId, updateRequest).subscribe({
      next: (response) => {
        if (response.data) {
          const index = this.users.findIndex(u => u.trackingId === user.trackingId);
          if (index !== -1) {
            this.users[index] = response.data;
          }
          this.applyFilters();
          const status = response.data.isActive ? 'activé' : 'désactivé';
          this.toastService.success(`Utilisateur ${status}`);
        }
        this.isSaving[user.trackingId] = false;
      },
      error: (error) => {
        console.error('Erreur lors de la modification du statut:', error);
        this.toastService.error('Erreur lors de la modification du statut');
        this.isSaving[user.trackingId] = false;
        this.loadData();
      }
    });
  }

  getRuleName(ruleTrackingId?: string): string {
    if (!ruleTrackingId) return 'Aucun rôle';
    const rule = this.rules.find(r => r.trackingId === ruleTrackingId);
    return rule ? rule.title : 'Inconnu';
  }

  refresh(): void {
    this.loadData();
  }

  get activeUsersCount(): number {
    return this.users.filter(u => u.isActive).length;
  }

  get inactiveUsersCount(): number {
    return this.users.filter(u => !u.isActive).length;
  }
}
