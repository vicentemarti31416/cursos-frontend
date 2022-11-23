import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {

  protected override url: string = 'http://localhost:8090/usuarios';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public filtrar(str: string): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${this.url}/buscar/${str}`);
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
