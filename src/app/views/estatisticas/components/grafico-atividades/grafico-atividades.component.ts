import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TotalAtividadesModel } from '../../../../models/total-atividades.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { EstatisticasService } from '../../../../shared/services/estatisticas.service';

@Component({
	selector: 'app-grafico-atividades',
	standalone: true,
	imports: [],
	templateUrl: './grafico-atividades.component.html',
	styleUrl: './grafico-atividades.component.scss',
})
export class GraficoAtividadesComponent implements OnInit {
	grafico: any = [];
	atividades: TotalAtividadesModel[] = [];

	private alertService = inject(AlertService);
	private estatisticasService = inject(EstatisticasService);

	ngOnInit(): void {
		this.estatisticasService
			.getEstatisticas()
			.then((value) => {
				value.forEach((doc) => {
					const data = doc.data();
					this.atividades = data['estatisticasGruposAtividades'] as TotalAtividadesModel[];
					this._load();
				});
			})
			.catch((err) => {
				this.alertService.showError(err);
			});
	}

	private _load() {
		this.grafico = new Chart('grafico-total-atividades', {
			type: 'bar',
			data: {
				labels: this.atividades.map((c) => this.formatarData(new Date(c.data))),
				datasets: [
					{
						label: 'Numero de Atividades',
						data: this.atividades.map((c) => c.qtdCardios + c.qtdSeries + c.qtdDropSets + c.qtdAlongamentos),
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: false,
					},
				},
			},
		});
	}

	formatarData(data: Date): string{
			const dia  = data.getDate().toString()
			const diaF = (dia.length == 1) ? '0'+dia : dia
			const mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
			const mesF = (mes.length == 1) ? '0'+mes : mes
			const anoF = data.getFullYear();
		return diaF+"/"+mesF+"/"+anoF;
	}
}
