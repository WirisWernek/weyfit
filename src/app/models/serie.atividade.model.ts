import { MaquinaEnum } from './enums/maquina.enum';
import { RepeticoesModel } from './repeticoes.model';

export interface SerieAtividadeModel {
	qtdRepeticoesIdeal: number;
	repeticoes: RepeticoesModel[];
	maquina: MaquinaEnum;
	nome: string;
}
