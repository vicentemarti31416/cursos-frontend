import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.scss']
})
export class AlumnosFormComponent implements OnInit {

  alumno: Alumno = new Alumno();
  error: any;

  constructor(
    private alumnoService: AlumnoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) this.alumnoService.findById(id).subscribe(alumno => this.alumno = alumno);
    })
  }

  public save(): void {
    this.alumnoService.save(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Alumno creado correctamente', '', 'success');
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

  public update(): void {
    this.alumnoService.update(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Alumno actualizado correctamente', '', 'success');
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 400) {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }

}
