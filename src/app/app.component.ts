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

  constructor(private supersetService: SupersetService, private http: HttpClient) {}

  ngOnInit() {

    // const token = await fetchGuestTokenFromBackend(config);
    this.getData().subscribe((res: any) => {
      console.log(res)
    }, (error: any) => {
      console.log("error in get method")
    })

    this.fetchGuestTokenFromBackend().subscribe((res: any) => {
      console.log(res)
    }, (error: any) => {
      console.log("errorin post method")
    })

    embedDashboard({
      id: '2b2095af-fad0-4910-9142-5fa75cbe6047', // given by the Superset embedding UI
      supersetDomain: 'http://localhost:8088/',
      mountPoint: document.getElementById('superset')!,
      fetchGuestToken: () => this.fetchGuestTokenFromBackend(),
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

  fetchGuestTokenFromBackend() : any{
    const apiUrl = 'http://localhost:8088/api/v1/security/guest_token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk5NDM1NTQzLCJqdGkiOiIzYTUwNTc5Yi1iYjZjLTRjNzAtYTE4Mi04Y2QwYjAwMzAxMTciLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2OTk0MzU1NDMsImV4cCI6MTY5OTQzNjQ0M30.C1MO699s-_2VQYVDr7Xa_-w16GnQmtY-8MW_f9kTLl8', // Replace with your actual access token
    }); 
    const payload = {
      "resources":[{"type": "dashboard", "id": "2b2095af-fad0-4910-9142-5fa75cbe6047"}],
      "user": {"username": "myAppUser", "first_name": "MyApp User", "last_name": "MyApp User"}, 
      "rls":[{"clause": ""}]
    };
    const options = { headers: headers };
    // const payloads = JSON.parse(JSON.stringify(payload));
    return ( this.http.post(apiUrl, payload, options));
  }
  
  // fetchGuestTokenFromBackend(): Promise<string>{
  //   return Promise.resolve( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibXlBcHBVc2VyIiwiZmlyc3RfbmFtZSI6Ik15QXBwIFVzZXIiLCJsYXN0X25hbWUiOiJNeUFwcCBVc2VyIn0sInJlc291cmNlcyI6W3sidHlwZSI6ImRhc2hib2FyZCIsImlkIjoiMmIyMDk1YWYtZmFkMC00OTEwLTkxNDItNWZhNzVjYmU2MDQ3In1dLCJybHNfcnVsZXMiOlt7ImNsYXVzZSI6IiJ9XSwiaWF0IjoxNjk5MzU3MjYyLjE3NTI4LCJleHAiOjE2OTkzNjA4NjIuMTc1MjgsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjgwODAvIiwidHlwZSI6Imd1ZXN0In0.VXstZr52_BsFdtN97HFH7fB-kBackjuoRCB8lWq3y_k');
  // }
    // this.supersetService.fetchData().subscribe(
    //   data => {
    //     this.supersetData = data;
    //     console.log(this.supersetData, 'getting the api data')
    //   },
    //   error => {
    //     console.error('Error fetching Superset data:', error);
    //   }
    // );
   
    getData(): Observable<any> {
      const apiUrl = 'http://localhost:8088/api/v1/dashboard/13/embedded';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk5NDM1NTQzLCJqdGkiOiIzYTUwNTc5Yi1iYjZjLTRjNzAtYTE4Mi04Y2QwYjAwMzAxMTciLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2OTk0MzU1NDMsImV4cCI6MTY5OTQzNjQ0M30.C1MO699s-_2VQYVDr7Xa_-w16GnQmtY-8MW_f9kTLl8', // Replace with your actual access token
      }); 
      const options = { headers: headers };
      return this.http.get<any>(apiUrl,options);
    }
  
}
