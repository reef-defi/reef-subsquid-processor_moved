import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class VerificationRequest {
    constructor(props?: Partial<VerificationRequest>) {
        Object.assign(this, props)
    }

    /**
     * Address
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    name!: string

    @Index_()
    @Column_("text", {nullable: true})
    filename!: string | undefined | null

    @Column_("jsonb", {nullable: false})
    source!: unknown

    @Column_("bool", {nullable: false})
    optimization!: boolean

    @Column_("text", {nullable: false})
    compilerVersion!: string

    @Column_("jsonb", {nullable: false})
    args!: unknown

    @Column_("int4", {nullable: false})
    runs!: number

    @Column_("text", {nullable: false})
    target!: string

    @Index_()
    @Column_("bool", {nullable: false})
    success!: boolean

    @Column_("text", {nullable: true})
    message!: string | undefined | null

    @Column_("text", {nullable: true})
    license!: string | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    timestamp!: Date | undefined | null
}
