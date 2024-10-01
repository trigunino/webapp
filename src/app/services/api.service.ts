import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://your-api-endpoint.com';

  constructor(private http: HttpClient) {}

  // Example GET request
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // Example POST request
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Example PUT request
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Example DELETE request
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}
