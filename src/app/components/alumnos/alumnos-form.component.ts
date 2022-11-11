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
  fotoSeleccionada: File;

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

  seleccionarFoto(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.name.endsWith('xcf') == true || this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar la foto', 'Debe seleccionar un archivo de tipo imágen', 'error')
      this.fotoSeleccionada = null;
    }
  }

  public crearConFoto(): void {
    this.alumnoService.addAlumnoWithPhoto(this.alumno, this.fotoSeleccionada).subscribe(alumno => {
      Swal.fire('Alumno creado correctamente', '', 'success');
      this.router.navigate(['/']);
    }
    )
  }

  public editarConFoto(): void {
    this.alumnoService.updateAlumnoWithPhoto(this.alumno, this.fotoSeleccionada).subscribe(alumno => {
      Swal.fire('Alumno actualizado correctamente', '', 'success');
      this.router.navigate(['/']);
    })
  }

}
