export class Asignatura {

    id: number;
    name: string;
    padre: Asignatura;
    hijos: Asignatura[] = [];
}