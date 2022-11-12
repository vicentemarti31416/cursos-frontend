import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  curso: Curso = new Curso();
  error: any;

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) this.cursoService.findById(id).subscribe(curso => this.curso = curso);
    })
  }

  public save(): void {
    this.cursoService.save(this.curso).subscribe(curso => {
      console.log(curso);
      Swal.fire('Curso creado correctamente', '', 'success');
      this.router.navigate(['/cursos']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

  public update(): void {
    this.cursoService.update(this.curso).subscribe(curso => {
      console.log(curso);
      Swal.fire('Curso actualizado correctamente', '', 'success');
      this.router.navigate(['/cursos']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

}
