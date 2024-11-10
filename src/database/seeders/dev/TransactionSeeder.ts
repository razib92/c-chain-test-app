import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CsvParser } from "nest-csv-parser";
import fs from "fs";

import { Transaction } from "../../models/transaction.entity";

class CSVEntity {
  timestamp: Date;
  status: boolean;
  block_number: bigint;
  tx_index: number;
  from: string;
  to: string;
  value: bigint;
  gas_limit: bigint;
  gas_used: bigint;
  gas_price: bigint;
}

export class TransactionSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const csvParser = new CsvParser();
    const size = 100000;
    let index = 0;

    let data = await this.getCSVLines(csvParser, size, index);
    await this.create(em, data.list);
    console.log(`SEEDING TO INDEX: ${index + size}`);

    while (data.list.length) {
      index += size;
      data = await this.getCSVLines(csvParser, size, index);
      await this.create(em, data.list);
      console.log(`SEEDING TO INDEX: ${index + size}`);
    }
  }

  private async getCSVLines(
    csvParser: CsvParser,
    size: number,
    index: number
  ): Promise<{ list: CSVEntity[] }> {
    const stream = fs.createReadStream("./data/transactions.csv");

    return await csvParser.parse(stream, CSVEntity, size, index, {
      separator: ",",
    });
  }

  private async create(
    em: EntityManager,
    transactions: CSVEntity[]
  ): Promise<void> {
    if (transactions.length) {
      const fork = em.fork();
      await fork.begin();

      transactions.forEach((transaction) => {
        fork.create(Transaction, {
          from: transaction.from,
          to: transaction.to,
          blockNumber: transaction.block_number,
          txIndex: transaction.tx_index,
          value: transaction.value,
          gasLimit: transaction.gas_limit,
          gasUsed: transaction.gas_used,
          gasPrice: transaction.gas_price,
          active: transaction.status ?? false,
          transactionDate: transaction.timestamp,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      await fork.commit();
    }
  }
}
