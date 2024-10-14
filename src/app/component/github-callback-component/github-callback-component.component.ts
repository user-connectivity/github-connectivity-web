import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-callback-component',
  templateUrl: './github-callback-component.component.html',
  styleUrls: ['./github-callback-component.component.scss']
})
export class GithubCallbackComponentComponent implements OnInit {
  constructor( private route: ActivatedRoute, private http: HttpClient, private router: Router){
  }
  ngOnInit(): void {
    // Extract code and state from the URL
    this.route.queryParams.subscribe((params:any) => {
     console.log('params',params)

     const code = params['code'];
     const state = params['state'];
     console.log('STATE',state)
     const storedState = localStorage.getItem('latestCSRFToken');

     if (state !== storedState) {
       // CSRF token mismatch, potential attack
       console.error('CSRF token mismatch');
       // return;
     }

     // Clear the CSRF token from local storage
     localStorage.removeItem('latestCSRFToken');

     // Send the authorization code to the backend to exchange for an access token
     this.http
       .post('http://localhost:3000/api/github/oauth/callback', { code, state })
       .subscribe(
         (response) => {
           // Handle successful authentication, like storing the token or navigating
           console.log('Authentication successful', response);
           this.router.navigate(['/dashboard']);
         },
         (error) => {
           console.error('Error during GitHub authentication', error);
         }
       );
   });
 }
}
