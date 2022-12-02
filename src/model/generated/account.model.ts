import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Transfer} from "./transfer.model"
import {TokenHolder} from "./tokenHolder.model"
import {Contract} from "./contract.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @Column_("text", {nullable: false})
    address!: string

    @Index_()
    @Column_("text", {nullable: true})
    evmAddress!: string | undefined | null

    @OneToMany_(() => Transfer, e => e.to)
    transfersTo!: Transfer[]

    @OneToMany_(() => Transfer, e => e.from)
    transfersFrom!: Transfer[]

    @OneToMany_(() => TokenHolder, e => e.signer)
    tokensHeld!: TokenHolder[]

    @OneToMany_(() => Contract, e => e.signer)
    contracts!: Contract[]
}
