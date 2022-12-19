import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Event} from "./event.model"
import {StakingType} from "./_stakingType"

@Entity_()
export class Staking {
    constructor(props?: Partial<Staking>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    signer!: Account | undefined | null

    @Index_()
    @ManyToOne_(() => Event, {nullable: true})
    event!: Event | undefined | null

    @Index_()
    @Column_("varchar", {length: 6, nullable: false})
    type!: StakingType

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
