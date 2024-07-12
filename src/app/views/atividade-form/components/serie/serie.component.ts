import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-serie',
	standalone: true,
	imports: [],
	templateUrl: './serie.component.html',
	styleUrl: './serie.component.scss',
})
export class SerieComponent {
	@Input() form!: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

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
			qtdRepeticoes: [0, Validators.required],
			peso: [0, Validators.required],
		});

		(this.series[indexSerie].get('repeticoes') as FormArray).push(repeticaoForm);
	}
}
