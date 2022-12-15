import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {Contract} from "./contract.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Native address
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: true})
    evmAddress!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("jsonb", {nullable: true})
    identity!: unknown | undefined | null

    @Index_()
    @Column_("bool", {nullable: false})
    active!: boolean

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    freeBalance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lockedBalance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    availableBalance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reservedBalance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    vestedBalance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    votingBalance!: bigint

    @Column_("int4", {nullable: false})
    nonce!: number

    @Column_("int4", {nullable: false})
    evmNonce!: number

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @OneToMany_(() => Contract, e => e.signer)
    contracts!: Contract[]
}
