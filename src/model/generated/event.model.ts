import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Extrinsic} from "./extrinsic.model"
import {Block} from "./block.model"

@Entity_()
export class Event {
    constructor(props?: Partial<Event>) {
        Object.assign(this, props)
    }

    /**
     * 000000..00<blockNum>-000<index>-<shorthash>
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Extrinsic, {nullable: true})
    extrinsic!: Extrinsic

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Index_()
    @Column_("int4", {nullable: false})
    index!: number

    @Column_("text", {nullable: false})
    phase!: string

    @Index_()
    @Column_("text", {nullable: false})
    section!: string

    @Index_()
    @Column_("text", {nullable: false})
    method!: string

    @Column_("jsonb", {nullable: false})
    data!: unknown

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
