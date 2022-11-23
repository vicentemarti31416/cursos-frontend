import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.scss']
})
export class AsignarAlumnosComponent implements OnInit {

  curso: Curso;
  alumnosInscritos: number[] = [];
  alumnosFiltrados: Alumno[] = [];
  //cursos: Curso[] = [];
  str: string;

  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      this.cursoService.findById(id).subscribe(curso => {
        this.curso = curso;
      })
    })
  }
 
  asignarAlumno(alumno: Alumno): void {
    this.cursoService.asignarAlumno(this.curso.id, alumno).subscribe(curso => {
      this.cursoService.findById(this.curso.id).subscribe(curso => {
        this.curso = curso;
        this.filtrar(this.str);
      });
    });
  }

  filtrar(str: string): void {
    str = str !== undefined ? str.trim() : '';
    if (str !== '') {
      this.alumnoService.filtrar(str).subscribe(alumnos => {this.alumnosFiltrados = alumnos.filter(alumno => {
          let filtro = true;
          this.alumnosInscritos.forEach(alumnoInscritoId => {
            if (alumno.id == alumnoInscritoId) {
              filtro = false;
            }
          });
          return filtro;
        })
      });
    }
  }
  

}



