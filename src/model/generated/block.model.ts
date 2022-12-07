import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Account} from "./account.model"
import {Transfer} from "./transfer.model"

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: false})
    author!: string

    @Column_("text", {nullable: false})
    stateRoot!: string

    @Column_("text", {nullable: false})
    parentHash!: string

    @Column_("text", {nullable: false})
    extrinsicRoot!: string

    @Index_()
    @Column_("bool", {nullable: false})
    finalized!: boolean

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("timestamp with time zone", {nullable: true})
    processorTimestamp!: Date | undefined | null

    @OneToMany_(() => Account, e => e.block)
    accounts!: Account[]

    @OneToMany_(() => Transfer, e => e.block)
    transfers!: Transfer[]
}
