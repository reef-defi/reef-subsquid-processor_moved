import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class Contract {
    constructor(props?: Partial<Contract>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicId!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    signer!: string | undefined | null

    @Column_("text", {nullable: false})
    bytecode!: string

    @Column_("text", {nullable: false})
    bytecodeContext!: string

    @Column_("text", {nullable: false})
    bytecodeArguments!: string

    @Column_("int4", {nullable: false})
    gasLimit!: number

    @Column_("int4", {nullable: false})
    storageLimit!: number

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
