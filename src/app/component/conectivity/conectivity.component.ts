import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  constructor(private route: ActivatedRoute,
     private router: Router,
     private datePipe: DatePipe,
     private conectivityService: ConectivityService,
     private spinner: NgxSpinnerService) 
     {
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

  getDate(createAt:string): string {
    const now = new Date(createAt);
    return this.datePipe.transform(now, 'yyyy-MM-dd hh:mm a')!;
  }

  connect() {
    this.conectivityService.loginWithGitHub();
  }

  getCallback(code:any,state:any){
    this.spinner.show();
    this.conectivityService.getCallBack({ code, state }).subscribe({
      next: (x) => {
        this.spinner.hide();
        localStorage.setItem("user",JSON.stringify(x))
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.spinner.hide();
      }
    })
  }

  disconectUser(userToken:any){
    this.spinner.show();
    this.conectivityService.disconectUser(userToken).subscribe({
      next: (x) => {
        this.spinner.hide();
        localStorage.removeItem('user')
        this.connectedUser = null;
      },
      error: (err) => {
        this.spinner.hide();
      }
    })
  }
}
