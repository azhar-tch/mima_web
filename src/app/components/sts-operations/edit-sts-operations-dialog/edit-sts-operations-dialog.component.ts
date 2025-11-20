import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { STSOperation, STSOperationRequest, CommercialShip, NavalVessel } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { NavalVesselsService } from '../../../services/naval-vessels/naval-vessels.service';

@Component({
  selector: 'app-edit-sts-operations-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-sts-operations-dialog.component.html',
  styleUrl: './edit-sts-operations-dialog.component.css'
})
export class EditStsOperationsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: STSOperation;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<STSOperationRequest>();

  formData: STSOperationRequest = {} as STSOperationRequest;
  errors: Record<string, string> = {};

  // Listes pour les dropdowns
  commercialShips: CommercialShip[] = [];
  navalVessels: NavalVessel[] = [];
  loadingData = false;

  constructor(
    private commercialShipsService: CommercialShipsService,
    private navalVesselsService: NavalVesselsService
  ) {}

  ngOnInit() {
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.loadingData = true;

    // Charger les navires commerciaux
    this.commercialShipsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.commercialShips = response.data;
        }
      },
      error: (error) => console.error('Erreur lors du chargement des navires commerciaux:', error)
    });

    // Charger les navires navals
    this.navalVesselsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.navalVessels = response.data;
        }
        this.loadingData = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des navires navals:', error);
        this.loadingData = false;
      }
    });
  }

  handleClose() {
    this.close.emit();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    // Ajoutez vos validations ici
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
    }
  }
}
