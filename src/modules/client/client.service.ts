import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createPublicClient, Hash, http } from "viem";
import { avalanche } from "viem/chains";

import { TransactionService } from "../transaction/transaction.service";
import { Transaction } from "../../database/models/transaction.entity";
import { Block, BlockTransaction, PublicClient } from "./client.type";
import { EnvironmentVars } from "../../config/environment.config";

@Injectable()
export class ClientService {
  private client: PublicClient;

  constructor(
    private readonly configService: ConfigService<EnvironmentVars, true>,
    private readonly transactionService: TransactionService
  ) {
    if (this.configService.get("START_VIEM_CLIENT")) {
      this.client = this.createClient();
      this.runClient();
    }
  }

  private createClient(): PublicClient {
    return createPublicClient({
      chain: avalanche,
      transport: http(),
    });
  }

  private async runClient(): Promise<void> {
    this.client.watchBlocks({
      onBlock: (block: Block) => {
        block.transactions.forEach(async (hash) => {
          const transaction = await this.getTransaction(hash);
          if (transaction) this.saveTransaction({ block, transaction });
        });
      },
    });
  }

  private async getTransaction(
    hash: Hash
  ): Promise<BlockTransaction | undefined> {
    try {
      const [transaction, receipt] = await Promise.all([
        this.client.getTransaction({ hash }),
        this.client.getTransactionReceipt({ hash }),
      ]);

      const { gasUsed, status } = receipt;

      return { ...transaction, gasUsed, status };
    } catch {
      console.log(`TRANSACTION NOT FOUND: ${hash}`);
    }

    return undefined;
  }

  private async saveTransaction({
    block,
    transaction,
  }: {
    block: Block;
    transaction: BlockTransaction;
  }) {
    const transactionObj = new Transaction();
    transactionObj.from = transaction.from;
    transactionObj.to = transaction.to ? transaction.to.toString() : null;
    transactionObj.blockNumber = transaction.blockNumber;
    transactionObj.txIndex = transaction.transactionIndex;
    transactionObj.value = transaction.value;
    transactionObj.gasLimit = block.gasLimit;
    transactionObj.gasUsed = transaction.gasUsed;
    transactionObj.gasPrice = transaction.gasPrice;
    transactionObj.active = transaction.status === "success" ? true : false;
    transactionObj.transactionDate = new Date(Number(block.timestamp) * 1000);

    this.transactionService.save(transactionObj);
  }
}
