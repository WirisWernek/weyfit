import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ExercicioService } from './../../../../shared/services/exercicio.service';

@Component({
	selector: 'app-serie',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgbAccordionModule],
	templateUrl: './serie.component.html',
	styleUrl: './serie.component.scss',
})
export class SerieComponent implements OnInit {
	@Input() form!: FormGroup;

	exercicios: string[] = [];

	formBuilder = inject(FormBuilder);
	exercicioService = inject(ExercicioService);

	ngOnInit(): void {
		this.exercicios = this.exercicioService.getExercicios();
	}

	get series() {
		return (this.form.get('series') as FormArray).controls as FormGroup[];
	}

	deleteSerie(index: number) {
		return (this.form.get('series') as FormArray).removeAt(index);
	}

	addSerie() {
		const serieForm = this.formBuilder.group({
			qtdRepeticoesIdeal: [0, Validators.required],
			maquina: ['', Validators.required],
			nome: ['', Validators.required],
			repeticoes: this.formBuilder.array([]),
		});

		(this.form.get('series') as FormArray).push(serieForm);
	}

	repeticoes(indexSerie: number) {
		return (this.series[indexSerie].get('repeticoes') as FormArray).controls as FormGroup[];
	}

	async deleteRepeticao(indexSerie: number, indexRepeticao: number) {
		return (this.series[indexSerie].get('repeticoes') as FormArray).removeAt(indexRepeticao);
	}

	async addRepeticao(indexSerie: number) {
		const repeticaoForm = this.formBuilder.group({
			qtdRepeticoes: [ null, Validators.required],
			peso: [ null, Validators.required],
		});

		(this.series[indexSerie].get('repeticoes') as FormArray).push(repeticaoForm);
	}
}
