import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ContractProgramStatusEnum,
  ContractProgramStatusEnumValues,
} from './contract-program-status.enum';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  version: number;

  @Prop({ required: true })
  programArtifactFileId: string;

  @Prop()
  programCodeFileId: string;

  @Prop()
  programSolidityContractFileId: string;

  @Prop({ default: null, enum: ContractProgramStatusEnumValues })
  programCompilationStatus?: ContractProgramStatusEnum;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
