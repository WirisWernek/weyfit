import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MaquinaService } from './../../../../shared/services/maquina.service';

@Component({
	selector: 'app-cardio',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgbAccordionModule],
	templateUrl: './cardio.component.html',
	styleUrl: './cardio.component.scss',
})
export class CardioComponent implements OnInit{
	@Input() form!: FormGroup;
	maquinas: string[] = [];
	
	formBuilder = inject(FormBuilder);
	maquinaService = inject(MaquinaService);
	
	ngOnInit(): void {
		this.maquinas = this.maquinaService.getMaquinas();
	}

	get cardios() {
		return (this.form.get('cardios') as FormArray).controls as FormGroup[];
	}

	deleteCardio(index: number) {
		return (this.form.get('cardios') as FormArray).removeAt(index);
	}

	addCardio() {
		const cardioForm = this.formBuilder.group({
			tempo: [null, Validators.required],
			nome: ['', Validators.required],
			distancia: [null, Validators.required],
			maquina: ['', Validators.required],
			estado: ['', Validators.required],
		});

		(this.form.get('cardios') as FormArray).push(cardioForm);
	}
}
