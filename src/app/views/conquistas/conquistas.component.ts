import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TotalConquistasCardiosModel } from '../../models/total-conquistas-cardios.model';
import { TotalConquistasSeriesModel } from '../../models/total-conquistas-series.model';
import { ConquistasService } from '../../shared/services/conquistas.service';
import { ExercicioEnum } from './../../models/enums/exercicio.enum';

@Component({
	selector: 'app-conquistas',
	standalone: true,
	imports: [AsyncPipe, NgbAccordionModule],
	templateUrl: './conquistas.component.html',
	styleUrl: './conquistas.component.scss',
})
export class ConquistasComponent implements OnInit {
	consquistasService = inject(ConquistasService);
	conquistasCardios$!: Observable<TotalConquistasCardiosModel[]>;
	conquistasSeries$!: Observable<TotalConquistasSeriesModel[]>;

	ngOnInit(): void {
		this.conquistasCardios$ = this.consquistasService.getConquistasCardios();

		this.conquistasSeries$ = this.consquistasService.getConquistasSeries();
	}

	convert(exercicio: ExercicioEnum) {
		return exercicio;
	}
}
