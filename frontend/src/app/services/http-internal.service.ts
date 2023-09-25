import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpInternalService {
  public baseUrl: string = environment.apiUrl;

  public headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {}

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public getRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this.httpClient.get<T>(this.buildUrl(url), {
      headers: this.getHeaders(),
      params: httpParams,
    });
  }

  public postRequest<T>(url: string, payload: object): Observable<T> {
    return this.httpClient.post<T>(this.buildUrl(url), payload, {
      headers: this.getHeaders(),
    });
  }

  public putRequest<T>(url: string, payload: object): Observable<T> {
    return this.httpClient.put<T>(this.buildUrl(url), payload, {
      headers: this.getHeaders(),
    });
  }

  public deleteRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this.httpClient.delete<T>(this.buildUrl(url), {
      headers: this.getHeaders(),
      params: httpParams,
    });
  }

  private buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return this.baseUrl + url;
  }
}
