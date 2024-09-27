import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Badge {
    @PrimaryGeneratedColumn()
    @Index()
    badge_id: number;

    @Column({ nullable: false })
    badge_name: string;

    @Column({ nullable: false })
    badge_point: number;

    @Column({ nullable: false })
    badge_description: string;
    
    @Column({ nullable: false })
    user_id: number;

    @ManyToOne(()=>User,user=>user.badges)
    @JoinColumn({name:"user_id",referencedColumnName:"userId"})
    User: User;


}