import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {Contract} from "./contract.model"
import {TransferType} from "./_transferType"

@Entity_()
export class Transfer {
    constructor(props?: Partial<Transfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Index_()
    @Column_("text", {nullable: false})
    extrinsicId!: string

    @Index_()
    @Column_("text", {nullable: true})
    toAddress!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    fromAddress!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    tokenContract!: Contract

    @Index_()
    @Column_("text", {nullable: true})
    tokenAddress!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    toEvmAddress!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    fromEvmAddress!: string | undefined | null

    @Column_("varchar", {length: 7, nullable: false})
    type!: TransferType

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    feeAmount!: bigint

    @Index_()
    @Column_("text", {nullable: true})
    denom!: string | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nftId!: bigint | undefined | null

    @Column_("text", {nullable: true})
    errorMessage!: string | undefined | null

    @Index_()
    @Column_("bool", {nullable: false})
    success!: boolean

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
