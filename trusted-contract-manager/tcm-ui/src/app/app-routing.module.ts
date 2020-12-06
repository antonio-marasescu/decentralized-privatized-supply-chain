import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './shared/app-route-paths';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthLoginComponent } from './shared/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './shared/components/auth-register/auth-register.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutePaths.CONTRACTS, pathMatch: 'full' },
  { path: AppRoutePaths.LOGIN, component: AuthLoginComponent },
  { path: AppRoutePaths.REGISTER, component: AuthRegisterComponent },
  {
    path: AppRoutePaths.CONTRACTS,
    loadChildren: () =>
      import('./modules/contracts/contracts.module').then(
        (m) => m.ContractsModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: AppRoutePaths.LOGIN,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
