import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ defaultRaw: "gen_random_uuid()", type: "uuid" })
  id!: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property({ onCreate: () => new Date() })
  createdAt?: Date = new Date();
}
