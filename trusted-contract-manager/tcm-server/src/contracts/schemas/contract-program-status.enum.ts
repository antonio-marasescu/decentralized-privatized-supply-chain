export enum ContractProgramStatusEnum {
  COMPILING = 'Compiling',
  COMPILED = 'Compiled',
}

export const ContractProgramStatusEnumValues = Object.keys(
  ContractProgramStatusEnum,
)
  .map((key) => ContractProgramStatusEnum[key])
  .filter((k) => !(parseInt(k) >= 0));
