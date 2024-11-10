import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TransactionService } from "./transaction.service";
import { TransactionDTO } from "./transaction.dto";
import { GetPaginatedListDTO } from "../../common/shared.dto";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get("/:address/count")
  async getCountTransactionByAddress(
    @Param("address") address: string
  ): Promise<number> {
    return this.transactionService.getCount(address);
  }

  @Get("/:address")
  async getTransactionListByAddress(
    @Param("address") address: string,
    @Query()
    { sort, ...pagination }: GetPaginatedListDTO
  ): Promise<TransactionDTO[]> {
    return (
      await this.transactionService.getList({
        address,
        ...pagination,
        orderBy: [
          { column: "blockNumber", sort },
          { column: "txIndex", sort },
        ],
      })
    ).map((transaction) => this.transactionService.mapToDTO(transaction));
  }

  @Get()
  async getTransactionList(
    @Query()
    { sort, ...pagination }: GetPaginatedListDTO
  ): Promise<TransactionDTO[]> {
    return (
      await this.transactionService.getList({
        ...pagination,
        orderBy: [{ column: "value", sort }],
      })
    ).map((transaction) => this.transactionService.mapToDTO(transaction));
  }
}
