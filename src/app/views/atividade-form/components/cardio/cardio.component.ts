import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-cardio',
	standalone: true,
	imports: [],
	templateUrl: './cardio.component.html',
	styleUrl: './cardio.component.scss',
})
export class CardioComponent {
	@Input() form!: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	get cardios() {
		return (this.form.get('cardios') as FormArray).controls as FormGroup[];
	}

	deleteCardio(index: number) {
		return (this.form.get('cardios') as FormArray).removeAt(index);
	}

	addCardio() {
		const cardioForm = this.formBuilder.group({
			tempo: [0, Validators.required],
			nome: ['', Validators.required],
			distancia: [0, Validators.required],
			maquina: ['', Validators.required],
			estado: ['', Validators.required],
		});

		(this.form.get('cardios') as FormArray).push(cardioForm);
	}
}
