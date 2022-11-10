import { Alumno } from "./alumno";
import { Pregunta } from "./pregunta";

export class Respuesta {

    id: string;
    text: string;
    alumno: Alumno;
    pregunta: Pregunta;
}