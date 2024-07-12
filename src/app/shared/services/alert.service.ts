import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { LoadingModalComponent } from '../modals/loading-modal/loading-modal.component';
import { SuccessModalComponent } from '../modals/success-modal/success-modal.component';


@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(private modalService: NgbModal) {}
	modalRefLoading$!: Observable<NgbModalRef>;

	showError(...erros: string[]) {
		const modalRef = this.modalService.open(ErrorModalComponent, environment.defaultModalOptions);
		if (modalRef.componentInstance) modalRef.componentInstance.erros = erros;
	}

	showInfo(...alertas: string[]) {
		const modalRef = this.modalService.open(InfoModalComponent, environment.defaultModalOptions);
		if (modalRef.componentInstance) modalRef.componentInstance.alertas = alertas;
	}

	showSuccess(...mensagens: string[]) {
		const modalRef = this.modalService.open(SuccessModalComponent, environment.defaultModalOptions);
		if (modalRef.componentInstance) modalRef.componentInstance.mensagens = mensagens;
	}

	showLoading(show: boolean) {
		if (show) {
			this.modalRefLoading$ = of(
				this.modalService.open(LoadingModalComponent, {
					...environment.defaultModalOptions,
					backdrop: 'static',
					animation: true,
					keyboard: false,
					size: 'sm',
				})
			);
		} else {
			this.modalRefLoading$.subscribe({
				next: (value) => {
					value.close();
				},
				error: (err) => {
					this.showError(err);
				},
			});
		}
	}
}
