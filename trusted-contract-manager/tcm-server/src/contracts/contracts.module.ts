import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONTRACTS_SCHEMAS } from './schemas/all-schemas';
import { ContractsService } from './services/contracts.service';
import { ContractsController } from './controllers/contracts.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature(CONTRACTS_SCHEMAS),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
