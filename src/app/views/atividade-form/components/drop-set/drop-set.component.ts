import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-drop-set',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgbAccordionModule],
	templateUrl: './drop-set.component.html',
	styleUrl: './drop-set.component.scss',
})
export class DropSetComponent {
	@Input() form!: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	get dropSets() {
		return (this.form.get('dropSets') as FormArray).controls as FormGroup[];
	}

	deleteDropSet(index: number) {
		return (this.form.get('dropSets') as FormArray).removeAt(index);
	}

	addDropSet() {
		const dropSetForm = this.formBuilder.group({
			qtdRepeticoesIdeal: [0, Validators.required],
			nome: ['', Validators.required],
			sets: this.formBuilder.array([]),
		});

		(this.form.get('dropSets') as FormArray).push(dropSetForm);
	}

	sets(indexDropSets: number) {
		return (this.dropSets[indexDropSets].get('sets') as FormArray).controls as FormGroup[];
	}

	deleteSet(indexDropSet: number, indexSet: number) {
		return (this.dropSets[indexDropSet].get('sets') as FormArray).removeAt(indexSet);
	}

	addSet(indexDropSet: number) {
		const serieForm = this.formBuilder.group({
			qtdRepeticoes: [0, Validators.required],
			peso: [0, Validators.required],
		});

		(this.dropSets[indexDropSet].get('sets') as FormArray).push(serieForm);
	}
}
