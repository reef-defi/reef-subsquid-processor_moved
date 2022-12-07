import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Block} from "./block.model"
import {Contract} from "./contract.model"
import {EvmEventType} from "./_evmEventType"
import {EvmEventStatus} from "./_evmEventStatus"

@Entity_()
export class EvmEvent {
    constructor(props?: Partial<EvmEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("int4", {nullable: false})
    eventIndex!: number

    @Column_("int4", {nullable: false})
    extrinsicIndex!: number

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract

    @Column_("text", {nullable: false})
    contractAddress!: string

    @Column_("jsonb", {nullable: false})
    dataRaw!: unknown

    @Column_("jsonb", {nullable: false})
    dataParsed!: unknown

    @Column_("text", {nullable: false})
    method!: string

    @Column_("varchar", {length: 10, nullable: false})
    type!: EvmEventType

    @Column_("varchar", {length: 7, nullable: false})
    status!: EvmEventStatus

    @Column_("text", {nullable: true})
    topic0!: string | undefined | null

    @Column_("text", {nullable: true})
    topic1!: string | undefined | null

    @Column_("text", {nullable: true})
    topic2!: string | undefined | null

    @Column_("text", {nullable: true})
    topic3!: string | undefined | null
}
