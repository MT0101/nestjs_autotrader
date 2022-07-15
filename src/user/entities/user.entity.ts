import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    BaseEntity,
    Column,
    Entity, JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "../../market/entities/ad.entity";


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @OneToMany(type => Ad, entity => entity.user)
    @JoinColumn()
    ads: Ad[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }
}