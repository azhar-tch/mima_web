import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { PersonnelAllowancesService } from '../services/personnel-allowances/personnel-allowances.service';
import { PersonnelAllowance } from '../models/Maritime';

@Component({
  selector: 'app-personnel-allowances',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './personnel-allowances.component.html',
  styleUrl: './personnel-allowances.component.css'
})
export class PersonnelAllowancesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  allowances: PersonnelAllowance[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private personnelAllowancesService: PersonnelAllowancesService) {}

  ngOnInit() {
    this.loadPersonnelAllowancess();
  }

  loadPersonnelAllowancess() {
    this.isLoading = true;
    this.personnelAllowancesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.allowances = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading allowances:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredPersonnelAllowancess() {
    if (!this.searchTerm) return this.allowances;
    const term = this.searchTerm.toLowerCase();
    return this.allowances.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de indemnité personnel sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour indemnité personnel');
  }
}
