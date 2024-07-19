import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
	{
		path: 'cliente',
		component: LayoutComponent,
		loadChildren: () => import('./views/views.routes').then((r) => r.VIEWS_ROUTES),
	},
	{
		path: 'auth',
		loadComponent: () => import('./views/login/login.component').then((c) => c.LoginComponent),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth',
	},
];
