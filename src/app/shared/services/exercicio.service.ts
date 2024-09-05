import { Injectable } from '@angular/core';
import { ExercicioEnum } from '../../models/enums/exercicio.enum';


@Injectable({
	providedIn: 'root',
})
export class ExercicioService {
	getExercicios() {
		return Object.values(ExercicioEnum);
	}
}
