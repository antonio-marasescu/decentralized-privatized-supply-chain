import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ContractModel } from '../../../models/contract.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsListComponent {
  @Input() dataSource: MatTableDataSource<ContractModel>;
  @Output() dataSelected: EventEmitter<string> = new EventEmitter<string>();

  columnsToDisplay = [
    'id',
    'name',
    'ownerId',
    'programCodeFileId',
    'version',
    'programCompilationStatus',
  ];
  columnToDisplayTitle = {
    id: 'ID',
    name: 'Name',
    ownerId: 'Owner',
    version: 'Version',
    programCodeFileId: 'Program ID',
    programCompilationStatus: 'Status',
  };
}
