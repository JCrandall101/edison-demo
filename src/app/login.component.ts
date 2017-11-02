import { Component, ApplicationRef }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <h2>LOGIN</h2>
    <div  *ngIf="error" style="color:red;">Error! Email or Password is incorrect!</div>
    <div style="display:inline-block;margin-right:10px;">
      <h3>Email:</h3>
      <input type="text" [(ngModel)]="email"/>
    </div>
    <div style="display:inline-block;">
      <h3>Password:</h3>
      <input type="password" [(ngModel)]="pwd"/>
    </div>
    <p>
      <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p>`
})
export class LoginComponent {
  //message: string;
  email: string;
  pwd: any;
  error: boolean = false;

  constructor(public authService: AuthService, public router: Router, private applicationRef:ApplicationRef) {
    //this.setMessage();
  }

  // setMessage() {
  //   this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }

  login() {
    //this.message = 'Trying to log in ...';

    this.authService.login(this.email,this.pwd).subscribe(() => {
      //this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/bfgz-impact';

        // Redirect the user
        this.router.navigate([redirect]);
        this.applicationRef.tick();
      }
      else{
        this.error = true;
      }
    });
  }

  logout() {
    this.authService.logout();
    //this.setMessage();
    this.router.navigate(['/bfgz-impact']);
  }
}
