import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Alumno } from '../models/alumno';
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

  public findAllPageable(page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/page/${page}`);
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

  public addAlumnoWithPhoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.httpClient.post<Alumno>(this.url + "/save-with-photo", formData).pipe(
      catchError(e => {
        //if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para añadir esta alumno'));
        if (e.status === 400) return throwError(() => new Error('Los daton introducidos no son válidos'));
        Swal.fire('No ha sido posible añadir la alumno', 'Error al añadir la alumno', 'error');
        return throwError(() => new Error('Error al añadir la alumno'));
      })
    );
  }


  public updateAlumnoWithPhoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.httpClient.put<Alumno>(`${this.url}/update-with-photo/${alumno.id}`, formData).pipe(
      catchError(e => {
        //if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para actualizar esta alumno'));
        if (e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible actualizar la alumno', 'Error al actualizar la alumno', 'error');
        return throwError(() => new Error('Error al actualizar la alumno'));
      })
    );
  }

}
