import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

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

  delete(alumno: Alumno): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: `¿Estás seguro? de querer borrar al alumno ${alumno.nombre}`,
      text: "Los cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.deleteById(alumno.id).subscribe(
          response => {
            this.alumnos = this.alumnos.filter(alumno => alumno !== alumno)
            swalWithBootstrapButtons.fire(
              'Borrado',
              `El alumno ${alumno.nombre} ha sido borrado`,
              'success'
            )
          })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha borrado el alumno',
          'error'
        )
      }
    })
  }

}
