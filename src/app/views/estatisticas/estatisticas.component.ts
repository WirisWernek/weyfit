import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AtividadeModel } from '../../models/atividade.model';
import { AlertService } from '../../shared/services/alert.service';
import { AtividadeService } from '../../shared/services/atividade.service';
import { EstatisticasService } from './../../shared/services/estatisticas.service';
import { GraficoAtividadesComponent } from "./components/grafico-atividades/grafico-atividades.component";
import { GraficoCardioComponent } from "./components/grafico-cardio/grafico-cardio.component";
import { GraficoGruposAtividadesComponent } from "./components/grafico-grupos-atividades/grafico-grupos-atividades.component";

@Component({
	selector: 'app-estatisticas',
	standalone: true,
	imports: [JsonPipe, GraficoCardioComponent, GraficoAtividadesComponent, GraficoGruposAtividadesComponent],
	templateUrl: './estatisticas.component.html',
	styleUrl: './estatisticas.component.scss',
})
export class EstatisticasComponent implements OnInit {
	atividades: AtividadeModel[] = [];
	numeroTreinos = 0;

	private atividadeService = inject(AtividadeService);
	private alertService = inject(AlertService);
	private estatisticasService = inject(EstatisticasService);

	ngOnInit(): void {
		this._load();
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

	
}
