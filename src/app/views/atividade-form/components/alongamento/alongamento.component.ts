import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-alongamento',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './alongamento.component.html',
	styleUrl: './alongamento.component.scss',
})
export class AlongamentoComponent {
	@Input() form!: FormGroup;
	@Input() contador!: number;

	constructor(private formBuilder: FormBuilder) {}

	get alongamentos() {
		return (this.form.get('alongamentos') as FormArray).controls as FormGroup[];
	}

	deleteAlongamento(index: number) {
		return (this.form.get('alongamentos') as FormArray).removeAt(index);
	}

	addAlongamento() {
		const alongamentoForm = this.formBuilder.group({
			tempo: [0, Validators.required],
			nome: ['', Validators.required],
		});

		(this.form.get('alongamentos') as FormArray).push(alongamentoForm);
	}
}
