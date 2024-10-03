import { ExercicioEnum } from "./enums/exercicio.enum";

export interface TotalConquistasSeriesModel {
	exercicio: ExercicioEnum;
	maximo: number;
	minimo: number;
	media: number;
}