import { Migration } from '@mikro-orm/migrations';

export class Migration20241110131004 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "transaction" ("id" uuid not null default gen_random_uuid(), "updated_at" timestamptz not null, "created_at" timestamptz not null, "from" varchar(66) not null, "to" varchar(66) null, "block_number" bigint null, "tx_index" int null, "value" decimal(32, 0) not null, "gas_limit" decimal(32, 0) not null, "gas_used" decimal(32, 0) not null, "gas_price" decimal(32, 0) null, "active" boolean not null, "transaction_date" timestamptz not null, constraint "transaction_pkey" primary key ("id"));`);
    this.addSql(`create index "transaction_from_index" on "transaction" ("from");`);
    this.addSql(`create index "transaction_to_index" on "transaction" ("to");`);
    this.addSql(`create index "transaction_value_index" on "transaction" ("value");`);
    this.addSql(`create index "transaction_block_number_tx_index_index" on "transaction" ("block_number", "tx_index");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "transaction" cascade;`);
  }

}
