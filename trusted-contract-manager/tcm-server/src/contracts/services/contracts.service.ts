import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from '../schemas/contract.schema';
import { Model } from 'mongoose';
import { ContractDto } from '../dto/contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<ContractDocument>,
  ) {}

  async getAllContracts(): Promise<ContractDto[]> {
    const models = await this.contractModel.find();
    return models.map((m) => ContractDto.from(m));
  }

  async getAllContractsOfUser(userId: number): Promise<ContractDto[]> {
    const models = await this.contractModel.find({ owner: userId });
    return models.map((m) => ContractDto.from(m));
  }

  async createContract(dto: ContractDto): Promise<ContractDto> {
    const newContract = new this.contractModel({
      name: dto.name,
      owner: dto.owner,
      version: dto.version,
    });
    const savedContract = await newContract.save();
    return ContractDto.from(savedContract);
  }
}
