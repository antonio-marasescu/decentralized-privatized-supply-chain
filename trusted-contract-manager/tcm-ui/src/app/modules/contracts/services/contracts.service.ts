import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ContractModel } from '../models/contract.model';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { catchError } from 'rxjs/operators';
import { SaveContractModel } from '../models/save-contract.model';

@Injectable({ providedIn: 'any' })
export class ContractsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  getAllContracts(): Observable<ContractModel[]> {
    return this.http
      .get<ContractModel[]>('api/contracts', this.httpOptions)
      .pipe(
        catchError((err) => {
          this.notificationsService.showMessage(err.message);
          return of(null);
        }),
      );
  }

  saveContract(model: SaveContractModel): Observable<ContractModel> {
    return this.http
      .post<ContractModel>('api/contracts', model, this.httpOptions)
      .pipe(
        catchError((err) => {
          this.notificationsService.showMessage(err.message);
          return of(null);
        }),
      );
  }
}
