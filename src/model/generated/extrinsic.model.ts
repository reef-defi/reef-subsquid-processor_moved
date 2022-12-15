import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Block} from "./block.model"
import {ExtrinsicStatus} from "./_extrinsicStatus"
import {ExtrinsicType} from "./_extrinsicType"
import {Event} from "./event.model"
import {Contract} from "./contract.model"

@Entity_()
export class Extrinsic {
    constructor(props?: Partial<Extrinsic>) {
        Object.assign(this, props)
    }

    /**
     * 000000..00<blockNum>-000<index>-<shorthash>
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("int4", {nullable: false})
    index!: number

    @Index_()
    @Column_("text", {nullable: false})
    hash!: string

    @Column_("jsonb", {nullable: false})
    args!: unknown

    @Column_("text", {nullable: false})
    docs!: string

    @Index_()
    @Column_("text", {nullable: false})
    method!: string

    @Index_()
    @Column_("text", {nullable: false})
    section!: string

    @Index_()
    @Column_("text", {nullable: false})
    signer!: string

    @Column_("varchar", {length: 7, nullable: false})
    status!: ExtrinsicStatus

    @Column_("text", {nullable: true})
    errorMessage!: string | undefined | null

    @Column_("varchar", {length: 8, nullable: false})
    type!: ExtrinsicType

    @Column_("jsonb", {nullable: true})
    signedData!: unknown | undefined | null

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @OneToMany_(() => Event, e => e.extrinsic)
    events!: Event[]

}
