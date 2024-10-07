import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TotalProgressoCardiosModel } from '../../models/total-progresso-cardios.model';
import { TotalProgressoSeriesModel } from '../../models/total-progresso-series.model';
import { ProgressoService } from '../../shared/services/progressos.service';
import { ExercicioEnum } from './../../models/enums/exercicio.enum';
import { ProgressoModel } from './../../models/progresso.model';

@Component({
	selector: 'app-progresso',
	standalone: true,
	imports: [AsyncPipe, NgbAccordionModule, DatePipe],
	templateUrl: './progresso.component.html',
	styleUrl: './progresso.component.scss',
})
export class ProgressoComponent implements OnInit {
	progressoService = inject(ProgressoService);
	progressoCardios!: TotalProgressoCardiosModel[];
	progressoSeries!: TotalProgressoSeriesModel[];
	progresso!: ProgressoModel;

	ngOnInit(): void {
		this._getCalculoProgresso();
		this.getProgresso();
	}

	getProgresso() {
		this.progressoService.getProgressos().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				data['dataAtualizacao'] = new Date(data['dataAtualizacao'].toDate());
				this.progresso = data as ProgressoModel;
			});
		});
	}

	private _getCalculoProgresso() {
		this.progressoService.getProgressoCardios().subscribe({
			next: (value) => {
				this.progressoCardios = value;
			},
			error: (err) => {
				console.error(err);
			},
		});

		this.progressoService.getProgressoSeries().subscribe({
			next: (value) => {
				this.progressoSeries = value;
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	atualizarProgresso() {
		this.progressoService.atualizarProgressos(this.progressoSeries, this.progressoCardios).then(() => {
			console.log('Progresso atualizado com sucesso');
		});
	}

	convert(exercicio: ExercicioEnum) {
		return exercicio;
	}
}
