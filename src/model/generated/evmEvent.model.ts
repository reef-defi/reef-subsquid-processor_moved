import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Event} from "./event.model"
import {Block} from "./block.model"
import {EvmEventType} from "./_evmEventType"
import {EvmEventStatus} from "./_evmEventStatus"

@Entity_()
export class EvmEvent {
    constructor(props?: Partial<EvmEvent>) {
        Object.assign(this, props)
    }

    /**
     * 000000..00<blockNum>-000<index>-<shorthash>
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Event, {nullable: true})
    event!: Event

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("int4", {nullable: false})
    eventIndex!: number

    @Column_("int4", {nullable: false})
    extrinsicIndex!: number

    @Index_()
    @Column_("text", {nullable: false})
    contractAddress!: string

    @Column_("jsonb", {nullable: false})
    dataRaw!: unknown

    @Column_("jsonb", {nullable: false})
    dataParsed!: unknown

    @Index_()
    @Column_("text", {nullable: false})
    method!: string

    @Index_()
    @Column_("varchar", {length: 10, nullable: false})
    type!: EvmEventType

    @Index_()
    @Column_("varchar", {length: 7, nullable: false})
    status!: EvmEventStatus

    @Index_()
    @Column_("text", {nullable: true})
    topic0!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    topic1!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    topic2!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    topic3!: string | undefined | null
}
