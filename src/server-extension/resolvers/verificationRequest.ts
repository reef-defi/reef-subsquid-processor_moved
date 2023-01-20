import { Arg, Mutation, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { VerificationRequest } from '../../model';

@Resolver()
export class VerificationRequestResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Mutation(() => Boolean) async saveVerificationRequest(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('filename') filename: string,
    @Arg('source') source: string,
    @Arg('optimization') optimization: boolean,
    @Arg('compilerVersion') compilerVersion: string,
    @Arg('args') args: string,
    @Arg('runs') runs: number,
    @Arg('target') target: string,
    @Arg('success') success: boolean,
    @Arg('message') message: string,
    @Arg('license') license: string,
    @Arg('timestamp') timestamp: number,
  ): Promise<Boolean> {
    const manager = await this.tx();
    
    const verificationRequest = new VerificationRequest({
      id,
      name,
      filename,
      source: JSON.parse(source),
      optimization,
      compilerVersion,
      args: JSON.parse(args),
      runs,
      target,
      success,
      message,
      license,
      timestamp: new Date(timestamp)
    });

    await manager.save(verificationRequest);
    return true;
  }
}
