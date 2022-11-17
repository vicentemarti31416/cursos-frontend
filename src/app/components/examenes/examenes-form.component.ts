import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes-form',
  templateUrl: './examenes-form.component.html',
  styleUrls: ['./examenes-form.component.scss']
})
export class ExamenesFormComponent implements OnInit {

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];
  examen: Examen = new Examen();
  error: any;

  constructor(
    private examenService: ExamenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) this.examenService.findById(id).subscribe(examen => {
        this.examen = examen;
        this.cargarHijos();
      })
    })
    this.examenService.findAllAsignaturas().subscribe(asignaturas => 
      this.asignaturasPadre = asignaturas.filter(a => !a.padre));
  }

  cargarHijos(): void {
    this.asignaturasHija = this.examen.asignaturaPadre? 
    this.examen.asignaturaPadre.hijos:
     [];
  }

  compararAsignaturas(o1: Asignatura, o2: Asignatura): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  public crearPregunta(): void {
    this.examen.preguntas.push(new Pregunta());
  }

  public eliminarPregunta(pregunta: Pregunta): void {
    this.examen.preguntas = this.examen.preguntas.filter(p => p.text !== pregunta.text);
  }

  public eliminarVacias(): void {
    this.examen.preguntas = this.examen.preguntas.filter(p => p.text !== null && p.text?.length > 0);
  }

  public asignarTexto(pregunta: Pregunta, event: any): void {
    pregunta.text = event.target.value as string;
  }

  public save(): void {
    this.eliminarVacias();
    if (this.examen.preguntas.length == 0) {
      Swal.fire('El examen no tiene preguntas', '', 'error');
      return;
    }
    this.examenService.save(this.examen).subscribe(examen => {
      Swal.fire('Examen creado correctamente', '', 'success');
      this.router.navigate(['/examenes']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

  public update(): void {
    this.eliminarVacias();
    if (this.examen.preguntas.length == 0) {
      Swal.fire('El examen no tiene preguntas', '', 'error');
      return;
    }
    this.examenService.update(this.examen).subscribe(examen => {
      Swal.fire('Examen actualizado correctamente', '', 'success');
      this.router.navigate(['/examenes']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

}
