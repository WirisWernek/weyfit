import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
	atividades$!: Observable<AtividadeModel[]>;

	constructor(private router: Router, private atividadeService: AtividadeService, private alertService: AlertService) {}

	ngOnInit(): void {
		this.atividades$ = this.atividadeService.getAtividades();
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
}
