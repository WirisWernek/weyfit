import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-error-modal',
	standalone: true,
	imports: [],
	templateUrl: './error-modal.component.html',
	styleUrl: './error-modal.component.scss',
})
export class ErrorModalComponent {
	erros!: string[];

	constructor(public activeModal: NgbActiveModal) {}

	voltar() {
		this.activeModal.close();
	}
}
