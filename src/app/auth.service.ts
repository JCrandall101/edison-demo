import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  //timeoutHandle: any;

  login(email:string,pwd:string): Observable<boolean> {
    if(email=="crandall@ficonsulting.com" && pwd=="FIC123"){
      this.resetTimeOut();
      return Observable.of(true).do(val => this.isLoggedIn = true);//Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }
    return Observable.of(true).do(val => this.isLoggedIn = false);//Observable.of(true).delay(1000).do(val => this.isLoggedIn = false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  resetTimeOut(){
    // let _this = this;
    // if(this.timeoutHandle){
    //   window.clearTimeout(_this.timeoutHandle);
    // }
    // this.timeoutHandle = window.setTimeout(_this.setNewTimeOut(),3000);
  }

  private setNewTimeOut(){
    if (this.isLoggedIn){
      console.log('LogOut');
      this.logout();
    }
  }
}
