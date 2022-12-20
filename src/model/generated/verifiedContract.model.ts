import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {ContractType} from "./_contractType"

@Entity_()
export class VerifiedContract {
    constructor(props?: Partial<VerifiedContract>) {
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
    compiledData!: unknown

    @Column_("jsonb", {nullable: false})
    args!: unknown

    @Column_("int4", {nullable: false})
    runs!: number

    @Column_("text", {nullable: false})
    target!: string

    @Index_()
    @Column_("varchar", {length: 7, nullable: true})
    type!: ContractType | undefined | null

    @Column_("jsonb", {nullable: true})
    contractData!: unknown | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    timestamp!: Date | undefined | null
}
