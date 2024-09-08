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
  styleUrl: './grafico-atividades.component.scss'
})
export class GraficoAtividadesComponent implements OnInit {
	grafico: any = [];
	atividades: TotalAtividadesModel[] = [];
	
	private alertService = inject(AlertService);
	private estatisticasService = inject(EstatisticasService);

	ngOnInit(): void {
		this.estatisticasService.getTotalAtividades().subscribe({
			next: (value) => {
				this.atividades = value;
				this._load();
			},
			error: (err) => {
				this.alertService.showError(err);
		}});
	}

	private _load() {
		this.grafico = new Chart('grafico-total-atividades', {
			type: 'bar',
			data: {
				labels: this.atividades.map((c) => new Date(c.data).toLocaleDateString()),
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


}
