import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { log } from 'console';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  
  const token = authService.getToken();
  console.log("Verification du token", token);
  

  if (token) {
    console.log('Accès autorisé');
    
    return true;
    
  } else {
    console.log('Accès refusé, redirection vers /login');
    router.navigate(['/login']);
    return false;
  }
};
