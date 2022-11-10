import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Common } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<T extends Common> {

  protected url: string;
  protected headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    protected httpClient: HttpClient
  ) { }

  public findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  public findAllPageable(page: string, size: string): Observable<any> {
    const params: HttpParams = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.httpClient.get<any>(`${this.url}/pageable`, {params: params});
  }

  public findById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  public save(type: T): Observable<T> {
    return this.httpClient.post<T>(this.url, type, {headers: this.headers});
  }

  public update(type: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${type.id}`, type, {headers: this.headers});
  }

  public deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

}
