import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  
  const token = authService.getToken();

  if (token) {
    // Si le token existe, accès autorisé
    return true;
  } else {
    // Sinon, redirige vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};
