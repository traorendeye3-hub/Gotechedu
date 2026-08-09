import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const currentUser = authService.currentUser();

    if (currentUser && allowedRoles.includes(currentUser.role)) {
      return true;
    }

    // Redirection si l'utilisateur n'a pas les droits nécessaires
    return router.createUrlTree(['/dashboard']);
  };
};