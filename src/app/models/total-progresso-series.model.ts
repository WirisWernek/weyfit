import { ExercicioEnum } from "./enums/exercicio.enum";

export interface TotalProgressoSeriesModel {
	exercicio: ExercicioEnum;
	maximo: number;
	minimo: number;
	media: number;
}