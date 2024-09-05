import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeModel } from '../../models/atividade.model';
import { AlertService } from '../../shared/services/alert.service';
import { AtividadeService } from '../../shared/services/atividade.service';

@Component({
	selector: 'app-atividades',
	standalone: true,
	imports: [AsyncPipe, DatePipe],
	templateUrl: './atividades.component.html',
	styleUrl: './atividades.component.scss',
})
export class AtividadesComponent implements OnInit {
	atividades: AtividadeModel[] = [];

	private router = inject(Router);
	private atividadeService = inject(AtividadeService);
	private alertService = inject(AlertService);

	ngOnInit(): void {
		this._load();
	}

	private _load() {
		this.atividadeService.getAtividades().subscribe({
			next: (value) => {
				const sortedAtividades = value.sort(function (a: AtividadeModel, b: AtividadeModel) {
					if (new Date(a.dataAtividade) > new Date(b.dataAtividade)) {
						return -1;
					}
					if (new Date(a.dataAtividade) < new Date(b.dataAtividade)) {
						return 1;
					}
					return 0;
				});
				this.atividades = sortedAtividades;
			},
			error: (err) => {
				this.alertService.showError(err);
			},
		});
	}

	open(index: string | undefined) {
		if (index !== undefined) {
			this.router.navigateByUrl(`cliente/atividade/${index}`);
		}
	}

	novaAtividade() {
		this.router.navigateByUrl(`cliente/atividade`);
	}

	count(atividade: AtividadeModel): number {
		return atividade.alongamentos.length + atividade.cardios.length + atividade.dropSets.length + atividade.series.length;
	}

	private _sort(a: AtividadeModel, b: AtividadeModel) {
		if (a.dataAtividade < b.dataAtividade) {
			return -1;
		}
		if (a.dataAtividade < b.dataAtividade) {
			return 1;
		}
		return 0;
	}
}
