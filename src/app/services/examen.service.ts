import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  protected override url: string = 'http://localhost:8090/examenes';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  
}
