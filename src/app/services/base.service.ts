import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    private http: HttpClient,
    private entity: string = '') {
    this.baseUrl = environment.prefixCors +
      environment.apiUrl + `?apikey=${environment.apiKey}&page=10&r=json`; //just limit the result to 10 for dev purposes
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token') || null) ?
      JSON.parse(localStorage.getItem('token')).token : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  public get(param?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${param ? param : ''}`,
      { headers: this.commonHeaders() });
  }
}
