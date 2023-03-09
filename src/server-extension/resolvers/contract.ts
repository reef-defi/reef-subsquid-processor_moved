import { Json } from '@subsquid/graphql-server';
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Contract, Extrinsic, Account } from '../../model';
import { emptyAccount, emptyExtrinsic } from '../../processor';

@ObjectType()
export class ContractEntity {
  @Field(() => String, { nullable: false })
  address!: string;

  @Field(() => String, { nullable: false })
  bytecode!: string;

  @Field(() => Json, { nullable: true })
  compiledData!: JSON;

  @Field(() => Json, { nullable: true })
  source!: JSON;

  @Field(() => Json, { nullable: true })
  args!: JSON;

  @Field(() => String, { nullable: true })
  name!: string;

  @Field(() => String, { nullable: true })
  filename!: string;

  constructor(props: Partial<ContractEntity>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class ContractResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [ContractEntity])
  async findContract(@Arg('id') id: string): Promise<ContractEntity[]> {
    const manager = await this.tx();
    const repository = manager.getRepository(Contract);
    const query = `
      SELECT 
        c.id as address, c.bytecode, vc.compiled_data, vc.source, vc.args, vc.name, vc.filename
      FROM contract as c
      LEFT JOIN verified_contract as vc
        on c.id = vc.id
      WHERE c.id ILIKE $1
    `;
    const result = await repository.query(query, [id]);
    return result;
  }

  @Mutation(() => Boolean) async saveContract(
    @Arg('id') id: string,
    @Arg('extrinsicId') extrinsicId: string,
    @Arg('signerAddress') signerAddress: string,
    @Arg('bytecode') bytecode: string,
    @Arg('bytecodeContext') bytecodeContext: string,
    @Arg('bytecodeArguments') bytecodeArguments: string,
    @Arg('gasLimit') gasLimit: string,
    @Arg('storageLimit') storageLimit: string,
    @Arg('timestamp') timestamp: number,
  ): Promise<Boolean> {
    const manager = await this.tx();

    const extrinsic = extrinsicId == '-1' ? emptyExtrinsic 
      : await manager.findOneBy(Extrinsic, { id: extrinsicId });
    if (!extrinsic) {
      console.log(`ERROR inserting contract ${id}: extrinsic not found in DB.`);
      return false;
    }

    const signer = signerAddress == '0x' ? emptyAccount 
      : await manager.findOneBy(Account, { id: signerAddress });
    if (!signer) {
      console.log(`ERROR inserting contract ${id}: signer not found in DB.`);
      return false;
    }

    const contract = new Contract({
      id,
      extrinsic,
      signer,
      bytecode,
      bytecodeContext,
      bytecodeArguments,
      gasLimit: BigInt(gasLimit),
      storageLimit: BigInt(storageLimit),
      timestamp: new Date(timestamp)
    });

    await manager.save(contract);
    return true;
  }
}