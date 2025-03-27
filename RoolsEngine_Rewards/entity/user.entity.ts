import {  Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./badge.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId: number;

    @OneToMany(()=>Badge,(badge)=>badge.user_id)
    badges: Badge[];
  
}