import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class Event {
    constructor(props?: Partial<Event>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockHeight!: number

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicId!: string | undefined | null

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
