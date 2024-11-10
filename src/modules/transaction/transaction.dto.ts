import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TransactionDTO {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  from!: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  to?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  value!: bigint;
}
