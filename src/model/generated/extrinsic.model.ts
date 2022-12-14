import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {ExtrinsicStatus} from "./_extrinsicStatus"
import {ExtrinsicType} from "./_extrinsicType"

@Entity_()
export class Extrinsic {
    constructor(props?: Partial<Extrinsic>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockHeight!: number

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
}
