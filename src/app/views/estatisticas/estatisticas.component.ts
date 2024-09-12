import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AtividadeModel } from '../../models/atividade.model';
import { EstatisticasGeraisModel } from '../../models/estatisticas-gerais.model';
import { TotalAtividadesPorGrupoModel } from '../../models/total-atividades-grupo.model';
import { TotalAtividadesModel } from '../../models/total-atividades.model';
import { TotalCardiosModel } from '../../models/total-cardios.model';
import { AlertService } from '../../shared/services/alert.service';
import { AtividadeService } from '../../shared/services/atividade.service';
import { EstatisticasService } from './../../shared/services/estatisticas.service';
import { GraficoAtividadesComponent } from './components/grafico-atividades/grafico-atividades.component';
import { GraficoCardioComponent } from './components/grafico-cardio/grafico-cardio.component';
import { GraficoGruposAtividadesComponent } from './components/grafico-grupos-atividades/grafico-grupos-atividades.component';

@Component({
	selector: 'app-estatisticas',
	standalone: true,
	imports: [JsonPipe, DatePipe, GraficoCardioComponent, GraficoAtividadesComponent, GraficoGruposAtividadesComponent],
	templateUrl: './estatisticas.component.html',
	styleUrl: './estatisticas.component.scss',
})
export class EstatisticasComponent implements OnInit {
	atividades: AtividadeModel[] = [];
	estatisticasGerais: EstatisticasGeraisModel = {} as EstatisticasGeraisModel;

	estatisticasGruposAtividades: TotalAtividadesModel[] = [];
	estatisticasCardios: TotalCardiosModel[] = [];
	estatisticasAtividadesPorGrupo: TotalAtividadesPorGrupoModel = {} as TotalAtividadesPorGrupoModel;

	numeroTreinos = 0;

	private atividadeService = inject(AtividadeService);
	private alertService = inject(AlertService);
	private estatisticasService = inject(EstatisticasService);

	ngOnInit(): void {
		this._load();
		this._getEstatisticas();
		this.getUltimaEstaistica();
	}

	private _load() {
		this.atividadeService.getAtividades().subscribe({
			next: (value) => {
				this.atividades = value;
				this.numeroTreinos = this.atividades.length;
			},
			error: (err) => {
				this.alertService.showError(err);
			},
		});
	}

	popularBase() {
		this.estatisticasService.popularBase(this.atividades).subscribe({
			complete: () => {
				this.alertService.showSuccess('Base populada com sucesso');
				window.location.reload();
			},
			error: (err) => {
				this.alertService.showError(err);
			},
		});
	}

	atualizarEstatisticas() {
		this.estatisticasService.atualizarEstatisticas(
			this.estatisticasGruposAtividades,
			this.estatisticasCardios,
			this.estatisticasAtividadesPorGrupo
		);
	}

	getUltimaEstaistica() {
		this.estatisticasService.getEstatisticas().then((value) => {
			value.forEach((doc) => {
				const data = doc.data();
				data['dataAtualizacao'] = new Date(data['dataAtualizacao'].toDate());
				this.estatisticasGerais = data as EstatisticasGeraisModel;
			});
		});
	}

	private _getEstatisticas() {
		this.estatisticasService.getTotalCardios().subscribe({
			next: (value) => {
				this.estatisticasCardios = value;
				this._load();
			},
			error: (err) => {
				this.alertService.showError(err.message);
			},
		});

		this.estatisticasService.getTotalAtividades().subscribe({
			next: (value) => {
				this.estatisticasGruposAtividades = value;
				this._load();
			},
			error: (err) => {
				this.alertService.showError(err.message);
			},
		});

		this.estatisticasService.getTotalAtividadePorGrupo().subscribe({
			next: (value) => {
				this.estatisticasAtividadesPorGrupo = value;
				this._load();
			},
			error: (err) => {
				this.alertService.showError(err.message);
			},
		});
	}
}
