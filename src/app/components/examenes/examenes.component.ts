import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss']
})
export class ExamenesComponent implements OnInit {

  examenes: Examen[] = [];
  paginador: any;

  constructor(
    private examenService: ExamenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.examenService.findAllPageable(page).subscribe(response => {
        this.examenes = response.content as Examen[];
        this.paginador = response;
      });
    });
  }


  delete(examen: Examen): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: `¿Estás seguro? de querer borrar al examen ${examen.name}`,
      text: "Los cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.deleteById(examen.id).subscribe(
          response => {
            this.examenes = this.examenes.filter(examen => examen !== examen);
            this.router.navigate(['/']);
            swalWithBootstrapButtons.fire(
              'Borrado',
              `El examen ${examen.name} ha sido borrado`,
              'success'
            )
          })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha borrado el examen',
          'error'
        )
      }
    })
  }


}
