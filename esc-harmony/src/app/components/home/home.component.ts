import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  deleteToken() {
    return localStorage.removeItem('authToken')
  }

  onLogout(): void {
    const confirmed = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmed) {
      this.deleteToken();
      this.router.navigate(['/login']);
    }
  }
  
}
