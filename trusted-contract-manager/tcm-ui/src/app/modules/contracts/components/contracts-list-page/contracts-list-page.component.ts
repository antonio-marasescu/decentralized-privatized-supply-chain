import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContractModel } from '../../models/contract.model';
import { ContractsService } from '../../services/contracts.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../../shared/app-route-paths';
import { ContractsRoutingPaths } from '../../contracts-routing-paths';

@Component({
  selector: 'app-contracts-list-page',
  templateUrl: './contracts-list-page.component.html',
  styleUrls: ['./contracts-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsListPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  dataSource = new MatTableDataSource<ContractModel>([]);

  contractsSource$: Observable<ContractModel[]>;
  contractsSourceSubscription: Subscription;

  constructor(
    private contractsService: ContractsService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.contractsSource$ = this.contractsService.getAllContracts();
    this.contractsSourceSubscription = this.contractsSource$.subscribe(
      (contracts) => {
        this.dataSource = new MatTableDataSource<ContractModel>(contracts);
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRef.markForCheck();
      },
    );
  }

  onElementSelected(id: string): void {
    this.router.navigate([
      AppRoutePaths.CONTRACTS,
      ContractsRoutingPaths.VIEW_PAGE,
      id,
    ]);
  }

  onCreate() {
    this.router.navigate([
      AppRoutePaths.CONTRACTS,
      ContractsRoutingPaths.CREATE_PAGE,
    ]);
  }

  ngOnDestroy(): void {
    this.contractsSourceSubscription?.unsubscribe();
  }
}
