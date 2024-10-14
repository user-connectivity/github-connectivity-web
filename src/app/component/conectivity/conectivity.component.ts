import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import * as crypto from 'crypto-js';
import { IConnectedUser } from 'src/app/model/user';
import { ConectivityService } from 'src/app/services/conectivity.service';

@Component({
  selector: 'app-conectivity',
  templateUrl: './conectivity.component.html',
  styleUrls: ['./conectivity.component.scss'],
  providers: [DatePipe]

})
export class ConectivityComponent implements OnInit {
  panelOpenState = false;
  currentDate!: string;
  connectedUser!: IConnectedUser | null;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private datePipe: DatePipe, private conectivityService: ConectivityService) {
    let user = localStorage.getItem('user')
    if(user){
      this.connectedUser = JSON.parse(user);
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      const code = params['code'];
      const state = params['state'];
      const storedState = localStorage.getItem('latestCSRFToken');
 
      if (state !== storedState) {
        return;
      }
 
      localStorage.removeItem('latestCSRFToken');
      this.getCallback(code,state);
    });
  }

  loginWithGitHub(): void {
    const client_id = "Ov23liEfxzi01DRu0sXZ"
    const state = crypto.lib.WordArray.random(16).toString();
    localStorage.setItem("latestCSRFToken", state);
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/connectivity&state=${state}`;
    window.location.href = githubAuthUrl;
  }

  getDate(createAt:string): string {
    const now = new Date(createAt);
    return this.datePipe.transform(now, 'yyyy-MM-dd hh:mm a')!;
  }

  connect() {
    this.loginWithGitHub();
  }

  getCallback(code:any,state:any){
    this.conectivityService.getCallBack({ code, state }).subscribe({
      next: (x) => {
        localStorage.setItem("user",JSON.stringify(x))
        this.router.navigate(['/']);
      },
      error: (err) => {
      }
    })
  }

  disconectUser(userToken:any){
    this.conectivityService.disconectUser(userToken).subscribe({
      next: (x) => {
        localStorage.removeItem('user')
        this.connectedUser = null;
      },
      error: (err) => {
      }
    })
  }
}
