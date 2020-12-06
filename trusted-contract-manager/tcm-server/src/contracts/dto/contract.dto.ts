import { ContractDocument } from '../schemas/contract.schema';
import { ContractProgramStatusEnum } from '../schemas/contract-program-status.enum';

export class ContractDto {
  id: string;
  name: string;
  ownerId: string;
  version: number;
  programArtifactFileId: string;
  programCodeFileId: string;
  programSolidityContractFileId: string;
  programCompilationStatus: ContractProgramStatusEnum;

  constructor(values: Partial<ContractDto>) {
    this.id = values.id;
    this.name = values.name;
    this.ownerId = values.ownerId;
    this.version = values.version;
    this.programArtifactFileId = values.programArtifactFileId;
    this.programCodeFileId = values.programCodeFileId;
    this.programSolidityContractFileId = values.programSolidityContractFileId;
    this.programCompilationStatus = values.programCompilationStatus;
  }

  static from(model: ContractDocument): ContractDto {
    return new ContractDto(model);
  }
}
