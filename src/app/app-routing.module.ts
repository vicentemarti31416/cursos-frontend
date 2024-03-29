import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';
import { VerExamenComponent } from './components/alumnos/ver-examen.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import { CursosFormComponent } from './components/cursos/cursos-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form.component';
import { ExamenesComponent } from './components/examenes/examenes.component';

const routes: Routes = [
  { path: '', component: AlumnosComponent, pathMatch: 'full' },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumnos/page/:page', component: AlumnosComponent },
  { path: 'alumnos/form', component: AlumnosFormComponent },
  { path: 'alumnos/form/:id', component: AlumnosFormComponent },
  { path: 'alumnos/responder-examen/:id', component: ResponderExamenComponent },
  { path: 'alumnos/ver-examen/:examenId/:alumnoId', component: VerExamenComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/page/:page', component: CursosComponent },
  { path: 'cursos/form', component: CursosFormComponent },
  { path: 'cursos/form/:id', component: CursosFormComponent },
  { path: 'cursos/asignar-alumnos/:id', component: AsignarAlumnosComponent },
  { path: 'examenes', component: ExamenesComponent },
  { path: 'examenes/page/:page', component: ExamenesComponent },
  { path: 'examenes/form', component: ExamenesFormComponent },
  { path: 'examenes/form/:id', component: ExamenesFormComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
