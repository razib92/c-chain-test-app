import {
  Address,
  ParseAccount,
  PublicClient as ViemPublicClient,
  RpcSchema,
  Transport,
  GetTransactionReturnType,
  BlockTag,
  GetTransactionReceiptReturnType,
  OnBlockParameter,
} from "viem";
import { avalanche } from "viem/chains";

export type PublicClient = ViemPublicClient<
  Transport,
  typeof avalanche,
  ParseAccount<Address>,
  RpcSchema
>;

export type Block = OnBlockParameter<typeof avalanche, false, BlockTag>;

export type BlockTransaction = GetTransactionReturnType<
  typeof avalanche,
  BlockTag
> &
  Pick<GetTransactionReceiptReturnType<typeof avalanche>, "gasUsed" | "status">;
