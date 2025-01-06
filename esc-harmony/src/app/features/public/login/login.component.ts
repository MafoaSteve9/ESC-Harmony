import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Formulaire soumis', this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Réponse API :', res);
          localStorage.setItem('authToken', res.token);  // Stocker le token
          this.router.navigate(['/home']);  // Rediriger vers Home
        },
        error: (err: any) => {
          console.error('Erreur API :', err);
          alert('Connexion échouée : ' + err.error.message);
        }
      });
    }
  }
}
