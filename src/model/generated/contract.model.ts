import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import {Account} from "./account.model"
import {Transfer} from "./transfer.model"
import {TokenHolder} from "./tokenHolder.model"

@Entity_()
export class Contract {
    constructor(props?: Partial<Contract>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @Column_("text", {nullable: false})
    address!: string

    @Index_()
    @Column_("int4", {nullable: true})
    extrinsicId!: number | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    signer!: Account | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    signerAddress!: string | undefined | null

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

    @OneToMany_(() => Transfer, e => e.tokenContract)
    transfers!: Transfer[]

    @OneToMany_(() => TokenHolder, e => e.tokenContract)
    tokenHolders!: TokenHolder[]
}
