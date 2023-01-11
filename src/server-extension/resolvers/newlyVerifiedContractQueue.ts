import { Arg, Mutation, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { NewlyVerifiedContractQueue } from '../../model';

@Resolver()
export class NewlyVerifiedContractQueueResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async deleteNewlyVerifiedContractQueue(
    @Arg('id') id: string
  ): Promise<Boolean> {
    const manager = await this.tx();
    await manager.delete(NewlyVerifiedContractQueue, { id });
    return true;
  }
}
