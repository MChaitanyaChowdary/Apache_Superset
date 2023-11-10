
// superset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import cors from 'cors';
// import express from 'express';


// // const express = require('express');
// const app = express();

// app.use(cors());

// const port = 4200;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


@Injectable({
  providedIn: 'root'
})

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 8088;

// // Use CORS middleware
// app.use(cors({
//   origin: 'http://localhost:4200', // Adjust as needed
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// }));


export class SupersetService {

  private apiUrl = 'http://localhost:8088/api'; 

  constructor(private http: HttpClient) { 
    // this.getApiResult()
  }

  // postData(data:any): Observable<any> {
  //   const url = `http://localhost:8088/api/v1/security/login`;
  //   const payload ={
  //     "username": "admin",
  //     "password": "@chaithu#apache013",
  //     "provider": "db"
  //   };
    // return this.http.post(url, payload, { withCredentials: true })
    // .subscribe(
    //   (response) => {
    //     console.log('Response from createChart:', response);
    //   },
    //   (error) => {
    //     console.error('Error creating chart:', error);
    //   }
    // );
    // console.log('this.http.post(url, payload)',this.http.post(url, payload))
  // }

  // getApiResult() {
  //   let apiRes = this.postData().subscribe({
  //     next: (res) => {
  //       console.log('res: ', res)
  //     },
  //     error: (err) => {
  //       console.log('error: ', err)
  //     }
  //   })
  // }
  

  fetchData(): Observable<any> {
    const url = `${this.apiUrl}/v1/chart/182/data/`; // Replace with your Superset endpoint
    const headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin': 'http://localhost:8088',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk4MzgzODM5LCJqdGkiOiIzOTUzODFjNi05YmJhLTQwMTEtYjBiZi0xYWQzNjViODJjMzMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2OTgzODM4MzksImV4cCI6MTY5ODM4NDczOX0.ElGgpb5pVjV4gYXyt5Uqn7wcogrNcUUmYxYryBySSWs', // Replace with your actual access token
      // 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // allowedHeaders: 'Content-Type,Authorization',
    }); 
    return this.http.get(url, { headers });

  }
}
