import { Alumno } from "./alumno";
import { Common } from "./common";
import { Examen } from "./examen";

export class Curso implements Common {

    id: number;
    name: string;
    created: string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
}