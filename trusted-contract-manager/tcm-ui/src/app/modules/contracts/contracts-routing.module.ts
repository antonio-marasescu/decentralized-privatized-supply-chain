import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContractsRoutingPaths } from './contracts-routing-paths';
import { ContractsListPageComponent } from './components/contracts-list-page/contracts-list-page.component';
import { ContractViewPageComponent } from './components/contract-view-page/contract-view-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ContractsRoutingPaths.LANDING_PAGE,
    pathMatch: 'full',
  },
  {
    path: ContractsRoutingPaths.LANDING_PAGE,
    component: ContractsListPageComponent,
    canActivate: [],
  },
  {
    path: ContractsRoutingPaths.VIEW_PAGE + '/:id',
    component: ContractViewPageComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}
