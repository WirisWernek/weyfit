import { RepeticoesModel } from "./repeticoes.model";

export interface DropSetAtividadeModel {
	nome: string;
	qtdRepeticoesIdeal: number;
	sets: RepeticoesModel[];
}
