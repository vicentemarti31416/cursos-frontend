import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes-form',
  templateUrl: './examenes-form.component.html',
  styleUrls: ['./examenes-form.component.scss']
})
export class ExamenesFormComponent implements OnInit {

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
      if (id) this.examenService.findById(id).subscribe(examen => this.examen = examen);
    })
  }

  public save(): void {
    this.examenService.save(this.examen).subscribe(examen => {
      console.log(examen);
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
    this.examenService.update(this.examen).subscribe(examen => {
      console.log(examen);
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
