import { Alumno } from "./alumno";
import { Common } from "./common";
import { CursoAlumno } from "./curso-alumno";
import { Examen } from "./examen";

export class Curso implements Common {

    id: number;
    name: string;
    created: string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
    cursoAlumnos: CursoAlumno[] = [];
}