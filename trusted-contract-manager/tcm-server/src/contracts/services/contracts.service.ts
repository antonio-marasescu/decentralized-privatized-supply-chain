import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contract, ContractDocument } from '../schemas/contract.schema';
import { Model } from 'mongoose';
import { ContractDto } from '../dto/contract.dto';
import { SaveContractDto } from '../dto/save-contract.dto';
import { defaultTo } from 'lodash';
import { ContractProgramStatusEnum } from '../schemas/contract-program-status.enum';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<ContractDocument>,
  ) {}

  async getAllContracts(): Promise<ContractDto[]> {
    const models = await this.contractModel.find();
    return models.map((m) => ContractDto.from(m));
  }

  async getAllContractsOfUser(userId: string): Promise<ContractDto[]> {
    const models = await this.contractModel.find({ ownerId: userId });
    return models.map((m) => ContractDto.from(m));
  }

  async saveContract(
    dto: SaveContractDto,
    ownerId: string,
  ): Promise<ContractDto> {
    const existingModel = await this.contractModel.findById(dto.id);
    const newModel: Contract = {
      id: defaultTo(dto?.id, null),
      name: defaultTo(dto.name || existingModel?.name, null),
      ownerId: defaultTo(ownerId || existingModel?.ownerId, null),
      version: existingModel?.version ? existingModel.version + 1 : 1.0,
      programCodeFileId: defaultTo(
        dto?.programCodeFileId || existingModel?.programCodeFileId,
        null,
      ),
      programArtifactFileId: defaultTo(
        existingModel?.programArtifactFileId,
        null,
      ),
      programSolidityContractFileId: defaultTo(
        existingModel?.programSolidityContractFileId,
        null,
      ),
      programCompilationStatus: ContractProgramStatusEnum.COMPILING,
    };
    const newContract = new this.contractModel(newModel);
    const savedContract = await newContract.save();
    return ContractDto.from(savedContract);
  }
}
