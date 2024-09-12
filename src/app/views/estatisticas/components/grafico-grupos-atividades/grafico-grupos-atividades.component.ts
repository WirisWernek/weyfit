import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AtividadeModel } from '../../../../models/atividade.model';
import { EstatisticasModel } from '../../../../models/estatisticas.model';
import { TotalAtividadesPorGrupoModel } from '../../../../models/total-atividades-grupo.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtividadeService } from '../../../../shared/services/atividade.service';
import { EstatisticasService } from '../../../../shared/services/estatisticas.service';

@Component({
	selector: 'app-grafico-grupos-atividades',
	standalone: true,
	imports: [],
	templateUrl: './grafico-grupos-atividades.component.html',
	styleUrl: './grafico-grupos-atividades.component.scss',
})
export class GraficoGruposAtividadesComponent implements OnInit {
	atividades: AtividadeModel[] = [];
	estatisticas = {} as EstatisticasModel;
	grafico: any = [];

	private atividadeService = inject(AtividadeService);
	private estatisticasService = inject(EstatisticasService);
	private alertService = inject(AlertService);

	ngOnInit(): void {
		this.estatisticasService
			.getEstatisticas()
			.then((value) => {
				value.forEach((doc) => {
					const data = doc.data();
					const estatisticasData = data['estatisticasAtividadesPorGrupo'] as TotalAtividadesPorGrupoModel;
					this.estatisticas = {
						series: estatisticasData.qtdSeries,
						cardios: estatisticasData.qtdCardios,
						dropsSets: estatisticasData.qtdDropSets,
						alongamentos: estatisticasData.qtdAlongamentos,
					};
					this._loadGrafico();
				});
			})
			.catch((err) => {
				this.alertService.showError(err);
			});
	}

	

	private _loadGrafico() {
		this.grafico = new Chart('grafico-grupos-atividades', {
			type: 'pie',
			data: {
				labels: ['Alongamento', 'Cardio', 'DropSets', 'Series'],
				datasets: [
					{
						label: 'Número de exercícios',
						data: [this.estatisticas.alongamentos, this.estatisticas.cardios, this.estatisticas.dropsSets, this.estatisticas.series],
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
}
