import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];
  paginador: any;

  constructor(
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.cursoService.findAllPageable(page).subscribe(response => {
        this.cursos = response.content as Curso[];
        this.paginador = response;
      });
    });
  }


  delete(curso: Curso): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: `¿Estás seguro? de querer borrar al curso ${curso.name}`,
      text: "Los cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.deleteById(curso.id).subscribe(
          response => {
            this.cursos = this.cursos.filter(curso => curso !== curso);
            this.router.navigate(['/']);
            swalWithBootstrapButtons.fire(
              'Borrado',
              `El curso ${curso.name} ha sido borrado`,
              'success'
            )
          })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha borrado el curso',
          'error'
        )
      }
    })
  }

}
