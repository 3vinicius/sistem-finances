import { HttpHeaders } from '@angular/common/http';

export class AuthorizationService {
    public static isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    public static getToken(): string | null {
        return localStorage.getItem('token');
    }

    public static setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    public static removerToken(): void {
        localStorage.removeItem('token');
    }
    public static headerToken (): HttpHeaders {
        const token = this.getToken();
        if (token) {
            return new HttpHeaders().set('Authorization', `Bearer ${token}`);
        }
        return new HttpHeaders().set('Authorization', `Bearer `);
    }

}
