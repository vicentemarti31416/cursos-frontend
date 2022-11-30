import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CursosFormComponent } from './components/cursos/cursos-form.component';
import { ExamenesPaginadorComponent } from './components/examenes/examenes-paginador.component';
import { AlumnosPaginadorComponent } from './components/alumnos/alumnos-paginador.component';
import { CursosPaginadorComponent } from './components/cursos/cursos-paginador.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';
import { VerExamenComponent } from './components/alumnos/ver-examen.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlumnosComponent,
    ExamenesComponent,
    CursosComponent,
    AlumnosFormComponent,
    CursosFormComponent,
    ExamenesPaginadorComponent,
    AlumnosPaginadorComponent,
    CursosPaginadorComponent,
    ExamenesFormComponent,
    AsignarAlumnosComponent,
    ResponderExamenComponent,
    VerExamenComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
