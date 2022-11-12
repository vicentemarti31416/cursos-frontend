import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
