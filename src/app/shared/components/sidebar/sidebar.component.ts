import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuModel } from '../../../models/menu.model';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	constructor(public activeOffcanvas: NgbActiveOffcanvas) {}
	items: MenuModel[] = [
		{ nome: 'Atividades', icon: 'bi-activity', url: 'cliente/atividades' },
		{ nome: 'Estatísticas', icon: 'bi-graph-up-arrow', url: 'cliente/estatisticas' },
		{ nome: 'Importar Dados', icon: 'bi-database-up', url: 'cliente/importar' },
		{ nome: 'Usuário', icon: 'bi-person', url: 'cliente/usuario' },
		{ nome: 'Progressos', icon: 'bi-trophy', url: 'cliente/progressos' },
	];
}
