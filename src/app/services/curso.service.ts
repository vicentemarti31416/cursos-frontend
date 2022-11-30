import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected override url: string = 'http://localhost:8090/cursos';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public asignarAlumno(idCurso: number, alumno: Alumno): Observable<Curso> {
    return this.httpClient.put<Curso>(`${this.url}/${idCurso}/add-alumno`, alumno, {headers: this.headers});
  }

  public quitarAlumno(idCurso: number, alumno: Alumno): Observable<Curso> {
    return this.httpClient.put<Curso>(`${this.url}/${idCurso}/remove-alumno`, alumno, {headers: this.headers});
  }

  public buscarPorAlumnoId(idAlumno: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.url}/find-curso/${idAlumno}`)
  }

}
