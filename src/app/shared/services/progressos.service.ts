import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addDoc, collection, CollectionReference, deleteDoc, Firestore, getDocs, limit, orderBy, query } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtividadeModel } from '../../models/atividade.model';
import { ProgressoModel } from '../../models/progresso.model';
import { TotalProgressoCardiosModel } from '../../models/total-progresso-cardios.model';
import { TotalProgressoSeriesModel } from '../../models/total-progresso-series.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

	itemCollection: CollectionReference;
	collectionName = 'progressos';
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

	getProgressos() {
		const q = query(this.itemCollection, orderBy('dataAtualizacao', 'desc'), limit(1));
		return getDocs(q);
	}

	async atualizarProgressos(
		series: TotalProgressoSeriesModel[],
		cardios: TotalProgressoCardiosModel[],
	) {
		const idUsuario = this._getUserID();
		const dados = {
			id: idUsuario,
			dataAtualizacao: new Date(),
			series: series,
			cardios: cardios,
		} as ProgressoModel;

		await this.clear().catch((err) => {
			console.error(err);
		});
		addDoc(this.itemCollection, dados).then(() => {
			console.log('Progresso atualizado com sucesso');
		});
	}

	async clear() {
		const q = query(this.itemCollection);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			deleteDoc(doc.ref);
		});
	}

	getProgressoSeries() {
		return this.http.get<TotalProgressoSeriesModel[]>(this.baseUrl + '/conquistas-series', { headers: this.headers });
	}
	
	getProgressoCardios() {
		return this.http.get<TotalProgressoCardiosModel[]>(this.baseUrl + '/conquistas-cardios', { headers: this.headers });
	}

	private _getUserID() {
		return this.user.uid;
	}
}
