import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AlongamentoAtividadeModel } from '../../models/alongamento.atividade.model';
import { AtividadeModel } from '../../models/atividade.model';
import { CardioAtividadeModel } from '../../models/cardio.atividade.model';
import { DropSetAtividadeModel } from '../../models/drop-set.atividade.model';
import { SerieAtividadeModel } from '../../models/serie.atividade.model';
import { AlertService } from '../../shared/services/alert.service';
import { AtividadeService } from '../../shared/services/atividade.service';
import { AlongamentoComponent } from './components/alongamento/alongamento.component';

@Component({
	selector: 'app-atividade-form',
	standalone: true,
	imports: [NgbAccordionModule, FormsModule, ReactiveFormsModule, AlongamentoComponent],
	templateUrl: './atividade-form.component.html',
	styleUrl: './atividade-form.component.scss',
})
export class AtividadeFormComponent implements OnInit {
	form: FormGroup;
	docId: string = '';
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private atividadeService: AtividadeService,
		private alertService: AlertService
	) {
		this.form = this.configurarNovoFormulario();
	}

	ngOnInit(): void {
		this.activeRoute.params.subscribe({
			next: (value) => {
				if (value['id']) {
					this.docId = value['id'];
					this.alertService.showLoading(true);
					this.atividadeService.getByIdAtividade(this.docId).then((value) => {
						const formRaw = value.data()!;

						this.form.patchValue({
							nomeAtividade: formRaw['nomeAtividade'],
							dataAtividade: formRaw['dataAtividade'],
						});
						this._preencherAlongamentos(formRaw['alongamentos']);
						this._preencherCardios(formRaw['cardios']);
						this._preencherDropSets(formRaw['dropSets']);
						this._preencherSeries(formRaw['series']);
					});
					this.alertService.showLoading(false);
				}
			},
			error: (err) => {
				this.alertService.showError(err);
				console.error(err);
			},
		});
	}

	save() {
		this.alertService.showLoading(true);
		const formRaw = this.form.getRawValue() as AtividadeModel;

		if (this.docId !== '') {
			this.atividadeService.updateAtividade(this.docId, formRaw).subscribe({
				complete: () => {
					this.alertService.showLoading(false);
					this.alertService.showSuccess('Atividade atualizada com sucesso, tá que tá heim?!');
					this.router.navigateByUrl('/cliente/atividades');
				},
				error: (err) => {
					this.alertService.showError(err);
					console.error(err);
				},
			});
		} else {
			this.atividadeService.insertAtividade(formRaw).subscribe({
				complete: () => {
					this.alertService.showLoading(false);
					this.alertService.showSuccess('Nova atividade registrada com sucesso, mandou bem heim?!');
					this.router.navigateByUrl('/cliente/atividades');
				},
				error: (err) => {
					this.alertService.showError(err);
					console.error(err);
				},
			});
		}
	}

	configurarNovoFormulario(): FormGroup {
		return this.formBuilder.group({
			nomeAtividade: ['', Validators.required],
			dataAtividade: ['', Validators.required],
			userId: [''],
			alongamentos: this.formBuilder.array([]),
			cardios: this.formBuilder.array([]),
			series: this.formBuilder.array([]),
			dropSets: this.formBuilder.array([]),
		});
	}

	private _preencherAlongamentos(alongamentos: AlongamentoAtividadeModel[]) {
		alongamentos.forEach((value) => {
			const alongamentoForm = this.formBuilder.group({
				tempo: [value.tempo, Validators.required],
				nome: [value.nome, Validators.required],
			});

			(this.form.get('alongamentos') as FormArray).push(alongamentoForm);
		});
	}

	private _preencherCardios(cardios: CardioAtividadeModel[]) {
		cardios.forEach((value) => {
			const cardioForm = this.formBuilder.group({
				tempo: [value.tempo, Validators.required],
				nome: [value.nome, Validators.required],
				distancia: [value.distancia, Validators.required],
				maquina: [value.maquina, Validators.required],
				estado: [value.estado, Validators.required],
			});

			(this.form.get('cardios') as FormArray).push(cardioForm);
		});
	}

	private _preencherSeries(series: SerieAtividadeModel[]) {
		series.forEach((value) => {
			const serieForm = this.formBuilder.group({
				qtdRepeticoesIdeal: [value.qtdRepeticoesIdeal, Validators.required],
				maquina: [value.maquina, Validators.required],
				nome: [value.nome, Validators.required],
				repeticoes: this.formBuilder.array([]),
			});

			value.repeticoes.forEach((repeticao) => {
				const repeticaoForm = this.formBuilder.group({
					qtdRepeticoes: [repeticao.qtdRepeticoes, Validators.required],
					peso: [repeticao.peso, Validators.required],
				});

				(serieForm.get('repeticoes') as FormArray).push(repeticaoForm);
			});

			(this.form.get('series') as FormArray).push(serieForm);
		});
	}

	private _preencherDropSets(dropSets: DropSetAtividadeModel[]) {
		dropSets.forEach((value) => {
			const dropSetForm = this.formBuilder.group({
				qtdRepeticoesIdeal: [value.qtdRepeticoesIdeal, Validators.required],
				nome: [value.nome, Validators.required],
				sets: this.formBuilder.array([]),
			});

			value.sets.forEach((set) => {
				const serieForm = this.formBuilder.group({
					qtdRepeticoes: [set.qtdRepeticoes, Validators.required],
					peso: [set.peso, Validators.required],
				});

				(dropSetForm.get('sets') as FormArray).push(serieForm);
			});

			(this.form.get('dropSets') as FormArray).push(dropSetForm);
		});
	}
}
