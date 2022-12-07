import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Contract} from "./contract.model"
import {Account} from "./account.model"
import {TokenHolderType} from "./_tokenHolderType"

@Index_(["tokenAddress", "signer", "nftId"], {unique: true})
@Entity_()
export class TokenHolder {
    constructor(props?: Partial<TokenHolder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    tokenContract!: Contract

    @Index_({unique: true})
    @Column_("text", {nullable: false})
    tokenAddress!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    signer!: Account | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    signerAddress!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    evmAddress!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nftId!: bigint | undefined | null

    @Column_("varchar", {length: 8, nullable: false})
    type!: TokenHolderType

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("jsonb", {nullable: false})
    info!: unknown

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
