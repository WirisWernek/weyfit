import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TotalCardiosModel } from '../../../../models/total-cardios.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { EstatisticasService } from '../../../../shared/services/estatisticas.service';

@Component({
	selector: 'app-grafico-cardio',
	standalone: true,
	imports: [],
	templateUrl: './grafico-cardio.component.html',
	styleUrl: './grafico-cardio.component.scss',
})
export class GraficoCardioComponent implements OnInit {
	grafico: any = [];
	cardios: TotalCardiosModel[] = [];

	private alertService = inject(AlertService);
	private estatisticasService = inject(EstatisticasService);

	ngOnInit(): void {
		this.estatisticasService
			.getEstatisticas()
			.then((value) => {
				value.forEach((doc) => {
					const data = doc.data();
					this.cardios = data['estatisticasCardios'] as TotalCardiosModel[];
					this._load();
				});
			})
			.catch((err) => {
				this.alertService.showError(err);
			});
	}

	private _load() {
		this.grafico = new Chart('grafico-total-cardios', {
			type: 'pie',
			data: {
				labels: this.cardios.map((c) => c.maquina),
				datasets: [
					{
						label: 'Tempo em Minutos',
						data: this.cardios.map((c) => c.tempo),
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
