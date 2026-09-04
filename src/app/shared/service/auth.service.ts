import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs';
import {AUTH_API_BASE} from '../api-config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  email: string;
  role: string;
}

const TOKEN_KEY = 'auth-token';
const EXPIRES_KEY = 'auth-token-expires';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API = `${AUTH_API_BASE}/auth`;

  private readonly authenticated = signal(this.hasValidSession());

  readonly isLoggedIn = this.authenticated.asReadonly();

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API}/login`, credentials)
      .pipe(tap(response => this.storeSession(response)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    this.authenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.hasValidSession() ? localStorage.getItem(TOKEN_KEY) : null;
  }

  isAuthenticated(): boolean {
    return this.hasValidSession();
  }

  private hasValidSession(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = localStorage.getItem(EXPIRES_KEY);
    if (!token || !expiresAt) {
      return false;
    }
    return Date.now() < new Date(expiresAt).getTime();
  }

  private storeSession(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(EXPIRES_KEY, response.expiresAt);
    this.authenticated.set(true);
  }
}
