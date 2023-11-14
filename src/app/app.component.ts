// app.component.ts
import { Component, OnInit } from '@angular/core';
import { SupersetService } from './superset.service';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { promises } from 'dns';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  supersetData: any;
  logintoken: any;

  constructor(private supersetService: SupersetService, private http: HttpClient) { }

  ngOnInit() {

    this.fetchLoginToken().subscribe({
      next: (res: any) => {
        this.logintoken = res.access_token
        console.log('updated acess_token : ', this.logintoken)
      },
      error: () => {
      },
      complete: () => {
        console.log('the login token success')
        this.fetchGuestTokenFromBackend(this.logintoken)
        this.getData(this.logintoken).subscribe((res : any) => {
          console.log('the response of getdata :', res);
        });
      }
    })


    embedDashboard({
      id: '2b2095af-fad0-4910-9142-5fa75cbe6047',
      supersetDomain: 'http://localhost:8088/',
      mountPoint: document.getElementById('superset')!,
      fetchGuestToken: () => this.fetchGuestTokenFromBackend(this.logintoken),
      dashboardUiConfig: {
        hideTitle: true,
        hideChartControls: true,
        hideTab: true,
        filters: {
          expanded: true,
        },
      },
    });

  }

  fetchGuestTokenFromBackend(token: any): any {
    console.log('method is cllng')
    const apiUrl = 'http://localhost:8088/api/v1/security/guest_token';
    console.log("token", token)
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    // const options = {headers: headers};
    const payload = {
      "resources": [{ "type": "dashboard", "id": "2b2095af-fad0-4910-9142-5fa75cbe6047" }],
      "user": { "username": "myAppUser", "first_name": "MyApp User", "last_name": "MyApp User" },
      "rls": [{ "clause": "" }]
    };
    // const payloads = JSON.parse(JSON.stringify(payload));
    return (this.http.post(apiUrl, payload, {'headers': headers}));
  }


  // fetchGuestTokenFromBackend(): Promise<string>{
  //   return Promise.resolve( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibXlBcHBVc2VyIiwiZmlyc3RfbmFtZSI6Ik15QXBwIFVzZXIiLCJsYXN0X25hbWUiOiJNeUFwcCBVc2VyIn0sInJlc291cmNlcyI6W3sidHlwZSI6ImRhc2hib2FyZCIsImlkIjoiMmIyMDk1YWYtZmFkMC00OTEwLTkxNDItNWZhNzVjYmU2MDQ3In1dLCJybHNfcnVsZXMiOlt7ImNsYXVzZSI6IiJ9XSwiaWF0IjoxNjk5OTczNzA3LjU1OTMxNTIsImV4cCI6MTY5OTk3NzMwNy41NTkzMTUyLCJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwLyIsInR5cGUiOiJndWVzdCJ9.kTr7RlSCWi4SIr61QmSjSZn5YO_wRtFOs5cDlTy9C5E');
  // }


  fetchLoginToken(): any {
    const apiUrl = 'http://localhost:8088/api/v1/security/login';
    const payload = {
      "username": "admin",
      "password": "@chaithu#apache013",
      "provider": "db"
    };
    return (this.http.post(apiUrl, payload));
  }


  getData(token:any): Observable<any> {
    console.log('get data is calling: ', token)
    const apiUrl = 'http://localhost:8088/api/v1/dashboard/14';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    }); 
    const options = { headers: headers };
    console.log("hearders :", options)
    return this.http.get<any>(apiUrl,options);
  }

  // this.supersetService.fetchData().subscribe(
  //   data => {
  //     this.supersetData = data;
  //     console.log(this.supersetData, 'getting the api data')
  //   },
  //   error => {
  //     console.error('Error fetching Superset data:', error);
  //   }
  // );


}
