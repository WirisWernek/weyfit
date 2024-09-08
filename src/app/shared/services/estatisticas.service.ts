import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AtividadeModel } from '../../models/atividade.model';
import { TotalAtividadesModel } from '../../models/total-atividades.model';
import { TotalCardiosModel } from '../../models/total-cardios.model';

@Injectable({
	providedIn: 'root',
})
export class EstatisticasService {
	private baseUrl = environment.baseUrl + '/atividade';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	});

	http = inject(HttpClient);

	popularBase(atividades: AtividadeModel[]) {
		return this.http.post<void>(`${this.baseUrl}`, atividades,{
			headers: this.headers,
		 });
	}

	getTotalCardios() {
		return this.http.get<TotalCardiosModel[]>(`${this.baseUrl}/total-cardios`, {
			headers: this.headers,
		});
	}

	getTotalAtividades() {
		return this.http.get<TotalAtividadesModel[]>(`${this.baseUrl}/total-atividades`, {
			headers: this.headers,
		});
	}
}
