import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-success-modal',
	standalone: true,
	imports: [],
	templateUrl: './success-modal.component.html',
	styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
	mensagens!: string[];
	constructor(public activeModal: NgbActiveModal) {}
	voltar() {
		this.activeModal.close();
	}
}
