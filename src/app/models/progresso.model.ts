import { TotalProgressoCardiosModel } from './total-progresso-cardios.model';
import { TotalProgressoSeriesModel } from './total-progresso-series.model';

export interface ProgressoModel {
	id: string;
	dataAtualizacao: Date;
	series: TotalProgressoSeriesModel[];
	cardios: TotalProgressoCardiosModel[];
}
