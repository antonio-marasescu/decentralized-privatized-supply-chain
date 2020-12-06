import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-view-page',
  templateUrl: './contract-view-page.component.html',
  styleUrls: ['./contract-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractViewPageComponent implements OnInit {
  contractId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contractsService: ContractsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.contractId = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params.subscribe((params) => {
      this.contractId = params.id;
      this.setup();
    });
    this.setup();
  }

  setup(): void {
    this.changeDetectorRef.markForCheck();
  }

  onCodeChanged(value: string): void {
    console.log('Code', value);
  }
}
