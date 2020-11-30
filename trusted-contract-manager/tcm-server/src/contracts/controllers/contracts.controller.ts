import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContractDto } from '../dto/contract.dto';
import { ContractsService } from '../services/contracts.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../core/shared/decorators/current-user.decorator';
import { JwtResponseDto } from '../../core/auth/dto/jwt-response.dto';
import { SaveContractDto } from '../dto/save-contract.dto';

@Controller('contracts')
@UseGuards(AuthGuard())
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtResponseDto): Promise<ContractDto[]> {
    return this.contractsService.getAllContractsOfUser(user.id);
  }

  @Post()
  async createContract(
    @CurrentUser() user: JwtResponseDto,
    @Body() saveContractDto: SaveContractDto,
  ): Promise<ContractDto> {
    return this.contractsService.saveContract(saveContractDto, user.id);
  }
}
