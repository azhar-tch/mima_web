import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ConservatorSeizuresService } from '../services/conservator-seizures/conservator-seizures.service';
import { ConservatorSeizure } from '../models/Maritime';

@Component({
  selector: 'app-conservator-seizures',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './conservator-seizures.component.html',
  styleUrl: './conservator-seizures.component.css'
})
export class ConservatorSeizuresComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  seizures: ConservatorSeizure[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private conservatorSeizuresService: ConservatorSeizuresService) {}

  ngOnInit() {
    this.loadConservatorSeizuress();
  }

  loadConservatorSeizuress() {
    this.isLoading = true;
    this.conservatorSeizuresService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.seizures = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading seizures:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredConservatorSeizuress() {
    if (!this.searchTerm) return this.seizures;
    const term = this.searchTerm.toLowerCase();
    return this.seizures.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de saisie conservatoire sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour saisie conservatoire');
  }
}
