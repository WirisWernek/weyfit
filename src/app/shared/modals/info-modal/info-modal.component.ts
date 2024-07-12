import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
	alertas!: string[]

	constructor(public activeModal: NgbActiveModal) {}
	continuar() {
	   this.activeModal.close()
	}
}
