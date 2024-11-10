import { Injectable } from "@nestjs/common";

import { TransactionRepository } from "./transaction.repository";
import { Transaction } from "../../database/models/transaction.entity";
import { TransactionDTO } from "./transaction.dto";
import { ListOrder } from "../../common/shared.dto";

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async save(transaction: Transaction): Promise<void> {
    this.transactionRepository.create(transaction);
    await this.transactionRepository.persistAndFlush(transaction);
  }

  async getList({
    address,
    page = 0,
    size = 20,
    orderBy = [],
  }: {
    address?: string;
    page?: number;
    size?: number;
    orderBy?: {
      column: "value" | "blockNumber" | "txIndex";
      sort?: ListOrder;
    }[];
  }): Promise<Transaction[]> {
    return this.transactionRepository.find(
      {
        ...(address ? { $or: [{ from: address }, { to: address }] } : {}),
      },
      {
        orderBy: [
          ...orderBy.map((order) => ({
            [order.column]: order.sort ?? ListOrder.ASC,
          })),
        ],
        limit: size,
        offset: page * size,
      }
    );
  }

  async getCount(address?: string): Promise<number> {
    return this.transactionRepository.count({
      ...(address ? { $or: [{ from: address }, { to: address }] } : {}),
    });
  }

  mapToDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value,
    };
  }
}
