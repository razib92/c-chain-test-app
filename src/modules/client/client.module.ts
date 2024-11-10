import { Module } from "@nestjs/common";

import { TransactionModule } from "../transaction/transaction.module";
import { ClientService } from "./client.service";

@Module({
  imports: [TransactionModule],
  providers: [ClientService],
})
export class ClientModule {}
