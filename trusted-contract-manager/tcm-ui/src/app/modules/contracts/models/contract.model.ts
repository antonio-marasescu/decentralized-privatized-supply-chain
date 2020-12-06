import { ContractsProgramStatusModelEnum } from './contracts-program-status-model.enum';

export interface ContractModel {
  id?: string;
  name: string;
  ownerId: string;
  version: number;
  programArtifactFileId: string;
  programCodeFileId?: string;
  programSolidityContractFileId?: string;
  programCompilationStatus?: ContractsProgramStatusModelEnum;
}
