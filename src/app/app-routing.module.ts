import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'repositories',
    loadChildren: './repositories/repositories.module#RepositoriesModule',
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'repositories' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
