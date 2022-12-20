import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class NewlyVerifiedContractQueue {
    constructor(props?: Partial<NewlyVerifiedContractQueue>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string
}
