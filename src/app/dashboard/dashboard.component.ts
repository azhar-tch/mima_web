import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { DashboardStats } from '../models/Dashboard';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading = true;
    this.error = null;

    this.dashboardService.getStatistics().subscribe({
      next: (res) => {
        this.stats = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques', err);
        this.error = 'Erreur lors du chargement des statistiques';
        this.loading = false;
      }
    });
  }

  // Calculer le pourcentage de changement (pour simulation)
  calculatePercentageChange(current: number, previous: number): string {
    if (previous === 0) return '+0%';
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
  }

  // Navigation vers les différentes sections
  navigateToMissions(): void {
    this.router.navigate(['/missions']);
  }

  navigateToDuties(): void {
    this.router.navigate(['/duties']);
  }

  navigateToAbsences(): void {
    this.router.navigate(['/absences']);
  }

  navigateToAgents(): void {
    this.router.navigate(['/agents']);
  }
}
