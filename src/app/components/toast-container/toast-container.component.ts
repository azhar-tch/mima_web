import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/notifications/toast.service';
import { Toast } from '../../models/Toast';
import {
  LucideAngularModule,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  X
} from 'lucide-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  readonly CheckCircle2 = CheckCircle2;
  readonly Info = Info;
  readonly AlertTriangle = AlertTriangle;
  readonly XCircle = XCircle;
  readonly X = X;

  toasts: Toast[] = [];
  removingToasts: Set<string> = new Set();
  private registeredCallbacks = new Set<string>();
  private subscription?: Subscription;

  constructor(
    private toastService: ToastService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe({
      next: (toasts) => {
        this.ngZone.run(() => {
          // Enregistrer les callbacks uniquement pour les nouveaux toasts
          toasts.forEach(toast => {
            if (!this.registeredCallbacks.has(toast.id)) {
              this.registeredCallbacks.add(toast.id);
              this.toastService.registerRemoveCallback(toast.id, () => {
                this.removeToast(toast.id);
              });
            }
          });

          this.toasts = toasts;
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Nettoyer les callbacks lors de la destruction du composant
    this.registeredCallbacks.forEach(id => {
      this.toastService.unregisterRemoveCallback(id);
    });
    this.registeredCallbacks.clear();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeToast(id: string): void {
    this.ngZone.run(() => {
      // Ajouter à la liste des toasts en cours de suppression
      this.removingToasts.add(id);

      // Attendre la fin de l'animation avant de supprimer
      setTimeout(() => {
        this.toastService.remove(id);
        this.removingToasts.delete(id);
        this.registeredCallbacks.delete(id);
      }, 300); // Durée de l'animation slide-out
    });
  }

  isRemoving(id: string): boolean {
    return this.removingToasts.has(id);
  }

  getToastIcon(type: string) {
    switch (type) {
      case 'success': return this.CheckCircle2;
      case 'info': return this.Info;
      case 'warning': return this.AlertTriangle;
      case 'error': return this.XCircle;
      default: return this.Info;
    }
  }

  getToastStyles(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  }

  getIconColor(type: string): string {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }
}
