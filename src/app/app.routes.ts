import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AtividadeFormComponent } from './views/atividade-form/atividade-form.component';
import { AtividadesComponent } from './views/atividades/atividades.component';
import { EstatisticasComponent } from './views/estatisticas/estatisticas.component';
import { ImportarDadosComponent } from './views/importar-dados/importar-dados.component';
import { LoginComponent } from './views/login/login.component';
import { UsuarioComponent } from './views/usuario/usuario.component';

export const routes: Routes = [
  {
    path: 'cliente',
    component: LayoutComponent,
    children: [
      {
        path: 'atividades',
        title: 'Atividades',
        component: AtividadesComponent,
      },
      {
        path: 'atividade',
        title: 'Cadastro Atividade',
        component: AtividadeFormComponent,
      },
      {
        path: 'atividade/:id',
        title: 'Cadastro Atividade',
        component: AtividadeFormComponent,
      },
      {
        path: 'estatisticas',
        title: 'Estatísticas',
        component: EstatisticasComponent,
      },
      {
        path: 'importar',
        title: 'Importar Dador',
        component: ImportarDadosComponent,
      },
      {
        path: 'usuario',
        title: 'Usuário',
        component: UsuarioComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'atividades',
      },
    ],
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];
