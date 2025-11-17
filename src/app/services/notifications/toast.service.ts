import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../models/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  private removeCallbacks = new Map<string, () => void>();
  private readonly STORAGE_KEY = 'mima_pending_toasts';
  private isRestoringToasts = false;

  constructor() {
    // Restaurer les toasts en attente après rechargement de page
    this.restorePendingToasts();
  }

  /**
   * Affiche un toast de notification
   */
  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration: number = 5000): void {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type,
      duration
    };

    // Si on est en train de restaurer les toasts, on les affiche normalement
    if (this.isRestoringToasts) {
      const currentToasts = this.toastsSubject.value;
      this.toastsSubject.next([...currentToasts, toast]);

      // Auto-remove après la durée spécifiée
      if (duration > 0) {
        const timeoutId = setTimeout(() => {
          this.triggerRemove(toast.id);
          this.removePendingToast(toast.id);
        }, duration);

        // Stocker le timeout pour pouvoir l'annuler si nécessaire
        (toast as any).timeoutId = timeoutId;
      }
    } else {
      // Afficher immédiatement le toast
      this.showImmediate(toast);
    }
  }

  /**
   * Affiche un toast immédiatement sans passer par sessionStorage
   */
  private showImmediate(toast: Toast): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto-remove après la durée spécifiée
    if (toast.duration && toast.duration > 0) {
      const timeoutId = setTimeout(() => {
        this.triggerRemove(toast.id);
      }, toast.duration);

      // Stocker le timeout pour pouvoir l'annuler si nécessaire
      (toast as any).timeoutId = timeoutId;
    }
  }

  /**
   * Sauvegarde un toast en attente dans sessionStorage
   */
  private savePendingToast(toast: Toast, duration: number): void {
    try {
      const pending = this.getPendingToasts();
      pending.push({
        toast,
        expiresAt: Date.now() + duration
      });
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(pending));
    } catch (e) {
      console.error('Failed to save pending toast:', e);
    }
  }

  /**
   * Supprime un toast en attente du sessionStorage
   */
  private removePendingToast(id: string): void {
    try {
      const pending = this.getPendingToasts().filter(p => p.toast.id !== id);
      if (pending.length > 0) {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(pending));
      } else {
        sessionStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to remove pending toast:', e);
    }
  }

  /**
   * Récupère les toasts en attente
   */
  private getPendingToasts(): Array<{ toast: Toast; expiresAt: number }> {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Restaure les toasts en attente après rechargement
   */
  private restorePendingToasts(): void {
    try {
      const pending = this.getPendingToasts();
      if (pending.length === 0) {
        return;
      }

      // Activer le mode restauration
      this.isRestoringToasts = true;

      const now = Date.now();

      pending.forEach(({ toast, expiresAt }) => {
        const remainingTime = expiresAt - now;

        if (remainingTime > 0) {
          // Utiliser show() qui va maintenant afficher le toast car isRestoringToasts = true
          this.show(toast.message, toast.type, remainingTime);
        }
      });

      // Nettoyer le storage après restauration
      sessionStorage.removeItem(this.STORAGE_KEY);

      // Désactiver le mode restauration après un court délai
      setTimeout(() => {
        this.isRestoringToasts = false;
      }, 100);

    } catch (e) {
      console.error('Failed to restore pending toasts:', e);
      sessionStorage.removeItem(this.STORAGE_KEY);
      this.isRestoringToasts = false;
    }
  }

  /**
   * Déclenche la suppression (sera intercepté par le composant pour l'animation)
   */
  triggerRemove(id: string): void {
    const callback = this.removeCallbacks.get(id);
    if (callback) {
      callback();
    } else {
      // Fallback si pas de callback enregistré
      this.remove(id);
    }
  }

  /**
   * Enregistre un callback pour gérer l'animation avant suppression
   */
  registerRemoveCallback(id: string, callback: () => void): void {
    this.removeCallbacks.set(id, callback);
  }

  /**
   * Désenregistre un callback
   */
  unregisterRemoveCallback(id: string): void {
    this.removeCallbacks.delete(id);
  }

  /**
   * Affiche un toast de succès
   */
  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  /**
   * Affiche un toast d'information
   */
  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  /**
   * Affiche un toast d'avertissement
   */
  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Affiche un toast d'erreur
   */
  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  /**
   * Supprime un toast
   */
  remove(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
    this.removePendingToast(id);
  }

  /**
   * Supprime tous les toasts
   */
  clear(): void {
    this.toastsSubject.next([]);
  }

  /**
   * Génère un ID unique pour le toast
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
