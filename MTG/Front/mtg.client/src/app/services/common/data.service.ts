import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public async getAsync<T>(url: string): Promise<HttpResponse<T>> {
    const response = this.http.get<HttpResponse<T>>(url);
    return await lastValueFrom(response);
  }

  public async postAsync<U, T>(url: string, body: U): Promise<HttpResponse<T>> {
    const response = this.http.post<HttpResponse<T>>(url, body);
    return await lastValueFrom(response);
  }

  public async putAsync<U, T>(url: string, body: U): Promise<HttpResponse<T>> {
    const response = this.http.put<HttpResponse<T>>(url, body);
    return await lastValueFrom(response);
  }

  public async deleteAsync<T>(url: string): Promise<HttpResponse<T>> {
    const response = this.http.delete<HttpResponse<T>>(url);
    return await lastValueFrom(response);
  }
}
