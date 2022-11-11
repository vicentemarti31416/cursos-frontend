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
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginadorComponent } from './components/paginador/paginador.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlumnosComponent,
    ExamenesComponent,
    CursosComponent,
    AlumnosFormComponent,
    PaginadorComponent
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
