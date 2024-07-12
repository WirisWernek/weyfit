import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	Firestore,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from '@angular/fire/firestore';
import { Observable, from, take } from 'rxjs';

import { AtividadeModel } from '../../models/atividade.model';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class AtividadeService {
	itemCollection: CollectionReference;
	collectionName: string = 'atividade';
	user!: User;

	constructor(private firestore: Firestore, private authService: AuthService) {
		this.itemCollection = collection(this.firestore, this.collectionName);
		authService
			.getUser()
			.pipe(take(1))
			.subscribe({
				next: (value) => {
					if (value !== null) {
						this.user = value;
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	getAtividades(): Observable<AtividadeModel[]> {
		return collectionData(this.itemCollection, { idField: 'id' }) as Observable<AtividadeModel[]>;
	}

	getByIdAtividade(id: string) {
		return getDoc(doc(this.firestore, this.collectionName, id));
	}

	insertAtividade(atividade: AtividadeModel): Observable<DocumentReference<DocumentData, DocumentData>> {
		this._setUserID(atividade);
		const promisse = addDoc(this.itemCollection, atividade);
		return from(promisse);
	}

	updateAtividade(id: string, atividade: AtividadeModel): Observable<void> {
		this._setUserID(atividade);
		const docInstance = doc(this.firestore, this.collectionName, id);

		const instance = {
			nomeAtividade: atividade.nomeAtividade,
			dataAtividade: atividade.dataAtividade,
			alongamentos: atividade.alongamentos,
			cardios: atividade.cardios,
			series: atividade.series,
			dropSets: atividade.dropSets,
		};
		const promisse = updateDoc(docInstance, instance);
		return from(promisse);
	}

	deleteAtividade(id: string): Observable<void> {
		const docInstance = doc(this.firestore, this.collectionName, id);
		const promisse = deleteDoc(docInstance);
		return from(promisse);
	}

	private _setUserID(atividade: AtividadeModel) {
		if (atividade.userId === null || atividade.userId === undefined || atividade.userId.trim() === '') {
			atividade.userId = this.user.uid;
		}
	}
}
