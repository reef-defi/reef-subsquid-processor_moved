import { BigInteger } from '@subsquid/graphql-server';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql'
import { EntityManager, In } from 'typeorm'
import { Account, Block, Extrinsic, Transfer, TransferType, VerifiedContract } from '../../model';

@InputType()
export class TransferInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  blockId!: string;

  @Field(() => String, { nullable: true })
  extrinsicId!: string;

  @Field(() => String, { nullable: true })
  toId!: string;

  @Field(() => String, { nullable: true })
  fromId!: string;

  @Field(() => String, { nullable: true })
  tokenId!: string;

  @Field(() => String, { nullable: true })
  toEvmAddress!: string;

  @Field(() => String, { nullable: true })
  fromEvmAddress!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => BigInteger, { nullable: false })
  amount!: bigint;

  @Field(() => BigInteger, { nullable: false })
  feeAmount!: bigint;

  @Field(() => String, { nullable: true })
  denom!: string;

  @Field(() => BigInteger, { nullable: true })
  nftId!: bigint;

  @Field(() => String, { nullable: true })
  errorMessage!: string;

  @Field(() => Boolean, { nullable: false })
  success!: boolean;

  @Field(() => BigInteger, { nullable: false })
  timestamp!: bigint;

  constructor(props: Partial<TransferInput>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class TransferResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async saveTransfers(
    @Arg('transfers', () => [TransferInput]) transfers: TransferInput[],
  ): Promise<Boolean> {
    const manager = await this.tx();

    const blockIds = transfers.map((transfer) => transfer.blockId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const blocks: Block[] = await manager.findBy(Block, { id: In(blockIds) });

    const extrinsicIds = transfers.map((transfer) => transfer.extrinsicId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const extrinsics: Extrinsic[] = await manager.findBy(Extrinsic, { id: In(extrinsicIds) });

    const toIds = transfers.map((transfer) => transfer.toId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const tos: Account[] = await manager.findBy(Account, { id: In(toIds) });

    const fromIds = transfers.map((transfer) => transfer.fromId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const froms: Account[] = await manager.findBy(Account, { id: In(fromIds) });

    const tokenIds = transfers.map((transfer) => transfer.tokenId)
      .filter((id, index, self) => id && self.indexOf(id) === index);
    const tokens: VerifiedContract[] = await manager.findBy(VerifiedContract, { id: In(tokenIds) });
    
    const entities: Transfer[] = transfers.map((transfer) => {
      let block: Block | undefined = undefined;
      if (transfer.blockId) {
        block = blocks.find((b) => b.id === transfer.blockId);
      }

      let extrinsic: Extrinsic | undefined = undefined;
      if (transfer.extrinsicId) {
        extrinsic = extrinsics.find((e) => e.id === transfer.extrinsicId);
      }

      let to: Account | undefined = undefined;
      if (transfer.toId) {
        to = tos.find((a) => a.id === transfer.toId);
      }

      let from: Account | undefined = undefined;
      if (transfer.fromId) {
        from = froms.find((a) => a.id === transfer.fromId);
      }

      let token: VerifiedContract | undefined = undefined;
      if (transfer.tokenId) {
        token = tokens.find((t) => t.id === transfer.tokenId);
      }
  
      return new Transfer({
        id: transfer.id,
        block,
        extrinsic,
        to,
        from,
        token,
        toEvmAddress: transfer.toEvmAddress,
        fromEvmAddress: transfer.fromEvmAddress,
        type: transfer.type as TransferType,
        amount: transfer.amount,
        feeAmount: transfer.feeAmount,
        denom: transfer.denom,
        nftId: transfer.nftId,
        errorMessage: transfer.errorMessage,
        success: transfer.success,
        timestamp: new Date(Number(transfer.timestamp))
      });
    });

    await manager.save(entities);
    return true;
  }
}
