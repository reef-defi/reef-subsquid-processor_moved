import { Arg, Mutation, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Contract, ContractType, VerifiedContract } from '../../model';

@Resolver()
export class VerifiedContractResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async saveVerifiedContract(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('filename') filename: string,
    @Arg('source') source: string,
    @Arg('optimization') optimization: boolean,
    @Arg('compilerVersion') compilerVersion: string,
    @Arg('args') args: string,
    @Arg('runs') runs: number,
    @Arg('target') target: string,
    @Arg('type') type: string,
    @Arg('compiledData') compiledData: string,
    @Arg('contractData') contractData: string,
    @Arg('timestamp') timestamp: number,
  ): Promise<Boolean> {
    const manager = await this.tx();

    const contract = await manager.findOneBy(Contract, { id: id });
    if (!contract) {
      console.log(`ERROR inserting verified contract ${id}: contract not found in DB.`);
      return false;
    }
    
    const verifiedContract = new VerifiedContract({
      id,
      contract,
      name,
      filename,
      source: JSON.parse(source),
      optimization,
      compilerVersion,
      args: JSON.parse(args),
      runs,
      target,
      type: type as ContractType,
      compiledData: JSON.parse(compiledData),
      contractData: JSON.parse(contractData),
      timestamp: new Date(timestamp)
    });

    await manager.save(verifiedContract);
    return true;
  }
}
