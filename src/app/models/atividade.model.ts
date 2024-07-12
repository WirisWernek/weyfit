import { AlongamentoAtividadeModel } from './alongamento.atividade.model';
import { CardioAtividadeModel } from './cardio.atividade.model';
import { DropSetAtividadeModel } from './drop-set.atividade.model';
import { SerieAtividadeModel } from './serie.atividade.model';

export interface AtividadeModel {
	id?: string;
	nomeAtividade: string;
	dataAtividade: Date;
	userId?: string;

	cardios: CardioAtividadeModel[];
	series: SerieAtividadeModel[];
	alongamentos: AlongamentoAtividadeModel[];
	dropSets: DropSetAtividadeModel[];

}
