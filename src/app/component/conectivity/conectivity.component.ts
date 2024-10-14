import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-conectivity',
  templateUrl: './conectivity.component.html',
  styleUrls: ['./conectivity.component.scss'],
  providers:[DatePipe]

})
export class ConectivityComponent {
  panelOpenState = false;
  currentDate: string;
  constructor(private datePipe: DatePipe,private auth: AuthService){
    this.currentDate = this.getCurrentDate();
  }

  loginWithGitHub(): void {

    console.log('LOGIN')
    // this.auth.loginWithRedirect({
    //   connection: 'github'
    // });

    // the client id from github
const client_id = "Ov23liEfxzi01DRu0sXZ"

// create a CSRF token and store it locally
const state = crypto.lib.WordArray.random(16).toString();
localStorage.setItem("latestCSRFToken", state);

console.log('STATE',state)
    
// redirect the user to github
const link = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/integrations/github/oauth2/callback&state=${state}`;
console.log('LINK',link)
window.location.href = link;
  }
  
  getCurrentDate(): string {
    const now = new Date();
    return this.datePipe.transform(now, 'yyyy-MM-dd hh:mm a')!;
  }

  connect() {
    this.loginWithGitHub();
    // alert('connect to git hub')
  }
}
