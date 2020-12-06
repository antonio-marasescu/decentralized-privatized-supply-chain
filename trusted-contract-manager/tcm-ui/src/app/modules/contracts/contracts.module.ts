import { SharedModule } from '../../shared/shared.module';
import { ContractsRoutingModule } from './contracts-routing.module';
import { NgModule } from '@angular/core';
import { ContractsListPageComponent } from './components/contracts-list-page/contracts-list-page.component';
import { ContractsService } from './services/contracts.service';
import { ContractsListComponent } from './components/contracts-list-page/contracts-list/contracts-list.component';
import { ContractViewPageComponent } from './components/contract-view-page/contract-view-page.component';
import { ContractViewEditorComponent } from './components/contract-view-page/contract-view-editor/contract-view-editor.component';

@NgModule({
  declarations: [
    ContractsListPageComponent,
    ContractsListComponent,
    ContractViewEditorComponent,
    ContractViewPageComponent,
  ],
  imports: [SharedModule, ContractsRoutingModule],
  providers: [ContractsService],
})
export class ContractsModule {}
