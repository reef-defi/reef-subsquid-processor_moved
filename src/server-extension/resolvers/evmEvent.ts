import { Json } from '@subsquid/graphql-server';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { EvmEvent, EvmEventType } from '../../model';


@InputType()
export class EvmEventCompiledDataInput {
  @Field(() => String, { nullable: false })
  id!: string;
  
  @Field(() => String, { nullable: false })
  compiledData!: string;

  constructor(props: Partial<EvmEventCompiledDataInput>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class EvmEventResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async updateEvmEventCompiledDatas(
    @Arg('evmEvents', () => [EvmEventCompiledDataInput]) evmEvents: EvmEventCompiledDataInput[],
  ): Promise<Boolean> {
    const manager = await this.tx();

    const updatePromises = evmEvents.map((evmEvent) => manager.update(
      EvmEvent, evmEvent.id, { dataParsed: JSON.parse(evmEvent.compiledData), type: EvmEventType.Verified }
    ));
    await Promise.all(updatePromises);

    return true;
  }
}
