import { DateTime, Json, Int } from '@subsquid/graphql-server';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { EvmEvent, EvmEventType } from '../../model';

@ObjectType()
export class EvmEventEntity {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  blockid!: string;

  @Field(() => String, { nullable: true })
  extrinsicid!: string;

  @Field(() => Int, { nullable: false })
  eventindex!: number;

  @Field(() => Int, { nullable: false })
  extrinsicindex!: number;

  @Field(() => String, { nullable: false })
  contractaddress!: string;

  @Field(() => Json, { nullable: false })
  rawdata!: JSON;

  @Field(() => String, { nullable: false })
  method!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => String, { nullable: false })
  status!: string;

  @Field(() => DateTime, { nullable: false })
  timestamp!: Date;

  @Field(() => Json, { nullable: true })
  signeddata!: JSON;

  constructor(props: Partial<EvmEventEntity>) {
    Object.assign(this, props);
  }
}

@InputType()
export class EvmEventDataParsedInput {
  @Field(() => String, { nullable: false })
  id!: string;
  
  @Field(() => String, { nullable: false })
  dataParsed!: string;

  constructor(props: Partial<EvmEventDataParsedInput>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class EvmEventResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [EvmEventEntity])
  async findBacktrackingEvmEvents(@Arg('id') id: string): Promise<EvmEventEntity[]> {
    const manager = await this.tx();
    const repository = manager.getRepository(EvmEventEntity);
    const query = `
      SELECT
        ee.id, ee.block_id as blockId, ev.extrinsic_id as extrinsicId, ee.event_index as eventIndex, 
        ee.extrinsic_index as extrinsicIndex, ee.contract_address as contractAddress, ee.data_raw as rawData, 
        ee.method, ee.type, ee.status, ex.timestamp as timestamp, ex.signed_data as signedData
      FROM evm_event as ee
      JOIN event as ev
        ON ev.id = ee.id
      JOIN extrinsic as ex
        ON ev.extrinsic_id = ex.id
      WHERE ee.contract_address = $1 AND ee.type = 'Unverified';
    `;
    const result = await repository.query(query, [id]);
    return result;
  }
  
  @Mutation(() => Boolean) async updateEvmEventsDataParsed(
    @Arg('evmEvents', () => [EvmEventDataParsedInput]) evmEvents: EvmEventDataParsedInput[],
  ): Promise<Boolean> {
    const manager = await this.tx();

    const updatePromises = evmEvents.map((evmEvent) => manager.update(
      EvmEvent, evmEvent.id, { dataParsed: JSON.parse(evmEvent.dataParsed), type: EvmEventType.Verified }
    ));
    await Promise.all(updatePromises);

    return true;
  }
}
