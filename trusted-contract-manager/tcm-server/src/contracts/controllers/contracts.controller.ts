import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContractDto } from '../dto/contract.dto';
import { ContractsService } from '../services/contracts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('contracts')
@UseGuards(AuthGuard())
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  async getAll(): Promise<ContractDto[]> {
    return this.contractsService.getAllContracts();
  }
}
