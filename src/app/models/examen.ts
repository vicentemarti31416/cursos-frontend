import { Asignatura } from "./asignatura";
import { Common } from "./common";
import { Pregunta } from "./pregunta";

export class Examen implements Common {

    id: number;
    name: string;
    created: string;
    preguntas: Pregunta[] = [];
    asignatura: Asignatura;
    isAnswered: boolean;
}