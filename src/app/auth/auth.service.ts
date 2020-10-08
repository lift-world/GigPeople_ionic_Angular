import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { AuthData } from './auth-data.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverURL = environment.serverUrl;
  private token: string;
  private tokenTimer: number;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  isLoading: boolean = false;
  subjectLoading = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, firstName: string, lastName: string, country: string) {
    this.isLoading = true;
    this.subjectLoading.next(true);
    this.http
      .post(this.serverURL + "/api/user/signup", { email, password, firstName, lastName, country})
      .subscribe((resp) => {
        this.login(email, password);
      }, err => { 
        console.log(err);
        this.toastr.error("Server", err.error.message);
      });
  }

  login(email: string, password: string) {
    this.isLoading = true;
    this.subjectLoading.next(true);
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        this.serverURL + '/api/user/login',
        authData
      )
      .subscribe((resp) => {
        this.token = resp.token;
        if (this.token) {
          const expiresInDuration = resp.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(this.token, expirationDate);
          this.router.navigate(['/']);
          
          this.isLoading = false;
          this.subjectLoading.next(false);
          this.userService.getMe();
        }
      }, err => { 
        console.log(err);
        this.toastr.error(err.error.message||err.message , "Server");
        this.isLoading = false;
        this.subjectLoading.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.userService.getMe();
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    window.clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(expiresInDuration: number) {
    console.log(expiresInDuration)
    this.tokenTimer = window.setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return { token: token, expirationDate: new Date(expirationDate) };
  }

  
}
