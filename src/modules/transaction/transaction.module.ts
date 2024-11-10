import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { Transaction } from "../../database/models/transaction.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
