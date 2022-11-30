import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Examen } from '../models/examen';
import { Respuesta } from '../models/respuesta';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private baseEndpoint = 'http://localhost:8090/respuestas';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(protected http: HttpClient) { }

  crear(respuestas: Respuesta[]): Observable<Respuesta[]>{
    return this.http.post<Respuesta[]>(`${this.baseEndpoint}/respuestas`, respuestas, {headers: this.cabeceras});
  }

  obtenerRespuestasPorAlumnoPorExamen(alumno: Alumno, examen: Examen): Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(`${this.baseEndpoint}/alumnoId/${alumno.id}/examenId/${examen.id}`);
  }
  
}
