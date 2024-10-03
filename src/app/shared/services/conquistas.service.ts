import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtividadeModel } from '../../models/atividade.model';
import { TotalConquistasCardiosModel } from '../../models/total-conquistas-cardios.model';
import { TotalConquistasSeriesModel } from '../../models/total-conquistas-series.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConquistasService {

	itemCollection: CollectionReference;
	collectionName = 'conquistas';
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

	getConquistasSeries() {
		return this.http.get<TotalConquistasSeriesModel[]>(this.baseUrl + '/conquistas-series', { headers: this.headers });
	}
	
	getConquistasCardios() {
		return this.http.get<TotalConquistasCardiosModel[]>(this.baseUrl + '/conquistas-cardios', { headers: this.headers });
	}
}
