import { Contract } from '../schemas/contract.schema';

export class ContractDto {
  id: string;
  name: string;
  owner: number;
  version: number;
  programArtifactHash: string;
  programCodeHash: string;
  programSolidityContractHash: string;

  constructor(values: Partial<ContractDto>) {
    this.id = values.id;
    this.name = values.name;
    this.owner = values.owner;
    this.version = values.version;
    this.programArtifactHash = values.programArtifactHash;
    this.programCodeHash = values.programCodeHash;
    this.programSolidityContractHash = values.programSolidityContractHash;
  }

  static from(model: Contract): ContractDto {
    return new ContractDto(model);
  }
}
