import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import {Extrinsic} from "./extrinsic.model"
import {Account} from "./account.model"

@Entity_()
export class Contract {
    constructor(props?: Partial<Contract>) {
        Object.assign(this, props)
    }

    /**
     * Address
     */
    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Extrinsic, {nullable: false})
    @JoinColumn_()
    extrinsic!: Extrinsic

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    signer!: Account

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
