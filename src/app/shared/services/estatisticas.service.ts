import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
	addDoc,
	collection,
	collectionData,
	CollectionReference,
	deleteDoc,
	doc,
	Firestore,
	getDocs,
	limit,
	orderBy,
	query,
} from '@angular/fire/firestore';

import { Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtividadeModel } from '../../models/atividade.model';
import { EstatisticasGeraisModel } from '../../models/estatisticas-gerais.model';
import { TotalAtividadesPorGrupoModel } from '../../models/total-atividades-grupo.model';
import { TotalAtividadesModel } from '../../models/total-atividades.model';
import { TotalCardiosModel } from '../../models/total-cardios.model';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class EstatisticasService {
	itemCollection: CollectionReference;
	collectionName = 'estatisticas';
	atividades$!: Observable<AtividadeModel[]>;
	user!: User;
	http = inject(HttpClient);
	firestore = inject(Firestore);
	authService = inject(AuthService);

	private baseUrl = environment.baseUrl + '/atividade';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	});

	constructor() {
		this.itemCollection = collection(this.firestore, this.collectionName);
		this.authService
			.getUser()
			.pipe(take(1))
			.subscribe({
				next: (value) => {
					if (value !== null) {
						this.user = value;
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	popularBase(atividades: AtividadeModel[]) {
		return this.http.post<void>(`${this.baseUrl}`, atividades, {
			headers: this.headers,
		});
	}

	getTotalCardios() {
		return this.http.get<TotalCardiosModel[]>(`${this.baseUrl}/total-cardios`, {
			headers: this.headers,
		});
	}

	getTotalAtividadePorGrupo() {
		return this.http.get<TotalAtividadesPorGrupoModel>(`${this.baseUrl}/total-grupos`, {
			headers: this.headers,
		});
	}

	getTotalAtividades() {
		return this.http.get<TotalAtividadesModel[]>(`${this.baseUrl}/total-atividades`, {
			headers: this.headers,
		});
	}

	getEstatisticas() {
		const q = query(this.itemCollection, orderBy('dataAtualizacao', 'desc'), limit(1));
		return getDocs(q);
	}

	async atualizarEstatisticas(
		estatisticasGruposAtividades: TotalAtividadesModel[],
		estatisticasCardios: TotalCardiosModel[],
		estatisticasAtividadesPorGrupo: TotalAtividadesPorGrupoModel
	) {
		const idUsuario = this._getUserID();
		const dados = {
			id: idUsuario,
			dataAtualizacao: new Date(),
			estatisticasGruposAtividades: estatisticasGruposAtividades,
			estatisticasCardios: estatisticasCardios,
			estatisticasAtividadesPorGrupo: estatisticasAtividadesPorGrupo,
		} as EstatisticasGeraisModel;

		await this.clear().catch((err) => {
			console.error(err);
		});
		addDoc(this.itemCollection, dados).then(() => {
			console.log('Estatísticas atualizadas com sucesso');
		});
	}

	async clear() {
		const itens = collectionData(this.itemCollection, { idField: 'id' }) as Observable<AtividadeModel[]>;
		itens
			.subscribe({
				next: (value) => {
					value.forEach((item) => {
						deleteDoc(doc(this.firestore, this.collectionName, item.id!));
					});
				},
				error: (err) => {
					console.error(err);
				},
			})
			.unsubscribe();
	}

	private _getUserID() {
		return this.user.uid;
	}
}
