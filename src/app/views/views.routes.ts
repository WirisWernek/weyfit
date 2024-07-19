import { Routes } from '@angular/router';

export const VIEWS_ROUTES: Routes = [
	{
		path: 'atividades',
		title: 'Atividades',
		loadComponent: () => import('./atividades/atividades.component').then((c) => c.AtividadesComponent),
	},
	{
		path: 'atividade',
		title: 'Cadastro Atividade',
		loadComponent: () => import('./atividade-form/atividade-form.component').then((c) => c.AtividadeFormComponent),
	},
	{
		path: 'atividade/:id',
		title: 'Cadastro Atividade',
		loadComponent: () => import('./atividade-form/atividade-form.component').then((c) => c.AtividadeFormComponent),
	},
	{
		path: 'estatisticas',
		title: 'Estatísticas',
		loadComponent: () => import('./estatisticas/estatisticas.component').then((c) => c.EstatisticasComponent),
	},
	{
		path: 'importar',
		title: 'Importar Dados',
		loadComponent: () => import('./importar-dados/importar-dados.component').then((c) => c.ImportarDadosComponent),
	},
	{
		path: 'usuario',
		title: 'Usuário',
		loadComponent: () => import('./usuario/usuario.component').then((c) => c.UsuarioComponent),
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'atividades',
	},
];
