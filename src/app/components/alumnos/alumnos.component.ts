import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.alumnoService.findAll().subscribe(alumnos => this.alumnos = alumnos);
  }

}
