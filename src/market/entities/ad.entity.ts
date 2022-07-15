import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Ad extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: false
    })
    approved: boolean;

    @Column({
        length: 50,
    })
    title: string;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    fuelType: string;

    @Column()
    mileage: number;

    @Column()
    power: number;

    @Column()
    defective: boolean;

    @Column()
    accidentFree: boolean;

    @Column({
        length: 1000,
    })
    details: string;

    @Column({
        type: 'float',
        precision: 8,
        scale: 2,
    })
    price: number;

    @Column({
        default: null,
        nullable: true,
    })
    photoFn: string;

    @Column()
    voivodeship: string;

    @Column()
    city: string;

    @Column()
    views: number;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    createdAt: Date;

    @ManyToOne(type => User, entity => entity.ads)
    @JoinColumn()
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Ad with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Ad with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Ad with id', this.id);
    }
}