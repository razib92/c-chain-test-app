import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum ListOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export class GetPaginatedListDTO {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  size?: number;

  @ApiPropertyOptional({ enum: ListOrder })
  @IsEnum(ListOrder)
  sort?: ListOrder;
}
