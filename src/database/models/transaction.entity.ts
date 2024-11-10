import {
  Entity,
  EntityRepositoryType,
  Index,
  Property,
  Unique,
} from "@mikro-orm/core";

import { BaseEntity } from "./base.entity";
import { TransactionRepository } from "../../modules/transaction/transaction.repository";

@Index({ properties: ["blockNumber", "txIndex"] })
@Entity({ repository: () => TransactionRepository })
export class Transaction extends BaseEntity {
  @Property({ length: 66 })
  @Index()
  from!: string;

  @Property({ length: 66, nullable: true, default: null })
  @Index()
  to?: string | null;

  @Property({ type: "bigint", nullable: true, default: null })
  blockNumber?: bigint | null;

  @Property({ type: 'integer', nullable: true, default: null })
  txIndex?: number | null;

  @Property({ columnType: "decimal(32, 0)" })
  @Index()
  value!: bigint;

  @Property({ columnType: "decimal(32, 0)" })
  gasLimit!: bigint;

  @Property({ columnType: "decimal(32, 0)" })
  gasUsed!: bigint;

  @Property({ columnType: "decimal(32, 0)", nullable: true, default: null })
  gasPrice?: bigint | null;

  @Property()
  active!: boolean;

  @Property({ onCreate: () => new Date() })
  transactionDate!: Date;

  [EntityRepositoryType]?: TransactionRepository;
}
