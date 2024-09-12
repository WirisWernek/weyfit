import { TotalAtividadesPorGrupoModel } from "./total-atividades-grupo.model";
import { TotalAtividadesModel } from "./total-atividades.model";
import { TotalCardiosModel } from "./total-cardios.model";

export interface EstatisticasGeraisModel {
	id?: string;
	dataAtualizacao: Date;
	estatisticasGruposAtividades: TotalAtividadesModel[];
	estatisticasCardios: TotalCardiosModel[];
	estatisticasAtividadesPorGrupo: TotalAtividadesPorGrupoModel;
}
