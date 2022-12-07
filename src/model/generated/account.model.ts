import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "typeorm"
import {TokenHolder} from "./tokenHolder.model"
import {Contract} from "./contract.model"
import {Block} from "./block.model"

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

    @OneToMany_(() => TokenHolder, e => e.signer)
    tokensHeld!: TokenHolder[]

    @OneToMany_(() => Contract, e => e.signer)
    contracts!: Contract[]

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block
}
