import { MaquinaEnum } from "./enums/maquina.enum";

export interface CardioAtividadeModel {
	tempo: Date;
	distancia: number;
	maquina: MaquinaEnum;
	estado: string;
	nome: string;
}
