import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Examen } from 'src/app/models/examen';
import { Respuesta } from 'src/app/models/respuesta';
import { Pregunta } from 'src/app/models/pregunta';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ExamenService } from 'src/app/services/examen.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import Swal from 'sweetalert2';
import { formatCurrency } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.scss']
})
export class VerExamenComponent implements OnInit {

  alumno: Alumno;
  examen: Examen;
  preguntas: Pregunta[] = [];
  active: boolean = true;
  texto: string;
  respuestas: Respuesta[] = [];
  respuestasMap: Map<number, Respuesta> = new Map<number, Respuesta>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private examenService: ExamenService,
    private respuestaService: RespuestaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let examenId: number = +params.get('examenId');
      let alumnoId: number = +params.get('alumnoId');
      this.examenService.findById(examenId).subscribe(examen => {
        this.examen = examen;
        console.log();
        this.preguntas = examen?.preguntas? examen.preguntas: [];
        this.alumnoService.findById(alumnoId).subscribe(alumno => {
          this.alumno = alumno
          this.respuestaService.obtenerRespuestasPorAlumnoPorExamen(alumno, examen).subscribe(respuestas => {
            this.respuestas = respuestas;
            console.log(respuestas);
          })
        })
      })
    })
  }

  responderPregunta(pregunta: Pregunta, event: any): void {
    const text = event.target.value as string;
    let respuesta = new Respuesta();
    respuesta.text = text;
    respuesta.alumno = this.alumno;
    respuesta.pregunta = pregunta;
    let examen = new Examen();
    examen.id = this.examen.id;
    respuesta.pregunta.examen = examen;
    this.respuestasMap.set(pregunta.id, respuesta);
  }

  guardarRespuestas(): void {
    let respuestas = Array.from(this.respuestasMap.values());
    this.respuestaService.crear(respuestas).subscribe(respuestas => {
      this.examen.answered = true;
      Swal.fire('Respuestas guardadas correctamente', '', 'success');
      this.router.navigate([`alumnos/responder-examen/${this.alumno.id}`]);
    })
  }

  changeActive(): void {
    this.active = !this.active;
    console.log(this.active);
  }

}
