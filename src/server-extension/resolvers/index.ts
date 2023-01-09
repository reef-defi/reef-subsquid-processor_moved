import "reflect-metadata";
import { Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { VerificationRequestResolver } from "./verificationRequest";
import { VerifiedContractResolver } from "./verifiedContract";
import { ContractResolver } from "./contract";
import { TokenHolderResolver } from "./tokenHolder";
import { TransferResolver } from "./transfer";
import { EvmEventResolver } from "./evmEvent";

@ObjectType()
export class Ping {
  @Field(() => String, { nullable: false })
  message!: string

  constructor(message: string) { this.message = message }
}

@Resolver()
export class PingResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => Ping)
  async ping(): Promise<Ping> {
    return new Ping(`Custom API extension works!`)
  }
}

export {
  VerificationRequestResolver,
  VerifiedContractResolver,
  ContractResolver,
  TokenHolderResolver,
  TransferResolver,
  EvmEventResolver
}