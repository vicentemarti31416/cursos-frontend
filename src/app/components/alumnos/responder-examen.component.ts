import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.scss']
})
export class ResponderExamenComponent implements OnInit {

  alumno: Alumno;
  curso: Curso;
  examenes: Examen[] = [];
  preguntas: Pregunta[] = [];
  paginador: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      this.alumnoService.findById(id).subscribe(alumno => {
        this.alumno = alumno;
        this.cursoService.buscarPorAlumnoId(alumno.id).subscribe(curso => {
          this.curso = curso;
          this.examenes = curso?.examenes? curso.examenes: []
        })
      })
    })
  }

}
