import { Json } from '@subsquid/graphql-server';
import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Contract } from '../../model';

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
}