import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Extrinsic} from "./extrinsic.model"
import {Event} from "./event.model"
import {Account} from "./account.model"

@Index_(["height", "id"], {unique: true})
@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    /**
     * 000000..00<blockNum>-<shorthash>
     */
    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @Column_("int4", {nullable: false})
    height!: number

    @Index_({unique: true})
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

    @OneToMany_(() => Extrinsic, e => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Event, e => e.block)
    events!: Event[]

    @OneToMany_(() => Account, e => e.block)
    accounts!: Account[]
}
