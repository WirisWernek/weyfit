import { Injectable } from '@angular/core';
import { MaquinaEnum } from '../../models/enums/maquina.enum';

@Injectable({
	providedIn: 'root',
})
export class MaquinaService {
	getMaquinas() {
		console.log(Object.values(MaquinaEnum))
		return Object.values(MaquinaEnum).map((x) => x.toString());
	}
}
