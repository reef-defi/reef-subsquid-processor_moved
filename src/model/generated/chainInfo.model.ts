import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class ChainInfo {
    constructor(props?: Partial<ChainInfo>) {
        Object.assign(this, props)
    }

    /**
     * Name
     */
    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    count!: number
}
