import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AtividadeModel } from '../../../../models/atividade.model';
import { EstatisticasModel } from '../../../../models/estatisticas.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtividadeService } from '../../../../shared/services/atividade.service';

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
	private alertService = inject(AlertService);

	ngOnInit(): void {
		this.atividadeService.getAtividades().subscribe({
			next: (value) => {
				console.log(value);
				this.atividades = value;
				this.loadEstatisticas();
				this._loadGrafico();
			},
			error: (err) => {
				this.alertService.showError(err);
			},
		});
	}

	loadEstatisticas() {
		this.estatisticas = {
			treinos: this.numeroTreinos(),
			series: this.numeroSeries(),
			cardios: this.numeroCardios(),
			dropsSets: this.numeroDropSets(),
			alongamentos: this.numeroAlongamentos(),
		};
	}

	private numeroTreinos(): number {
		return this.atividades.length;
	}

	private numeroSeries(): number {
		return this.atividades.reduce((acc, atividade) => acc + atividade.series.length, 0);
	}
	private numeroCardios(): number {
		return this.atividades.reduce((acc, atividade) => acc + atividade.cardios.length, 0);
	}
	private numeroDropSets(): number {
		return this.atividades.reduce((acc, atividade) => acc + atividade.dropSets.length, 0);
	}
	private numeroAlongamentos(): number {
		return this.atividades.reduce((acc, atividade) => acc + atividade.alongamentos.length, 0);
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
