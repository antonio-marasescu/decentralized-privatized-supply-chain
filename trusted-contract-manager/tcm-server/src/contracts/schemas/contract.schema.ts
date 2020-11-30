import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
  id: string;

  @Prop()
  name: string;

  @Prop()
  owner: number;

  @Prop()
  version: number;

  @Prop()
  programArtifactFileId: string;

  @Prop()
  programCodeFileId: string;

  @Prop()
  programSolidityContractFileId: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
