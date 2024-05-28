import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn  } from "typeorm";
import { CaEntity } from "@common-api/common-api";
import { Service } from "typedi";

import { Product } from "../../product/entities/product";
import { Member } from "@common-api/common-api";
import { PointCharge } from "./point_charge";

export enum PointType{
    free = 'free',
    charge = 'charge'
}

export enum ActionType {
    plus = 'plus',
    minus = 'minus'
}

export enum StateType {
    expired = 'expired',
    cancel = 'cancel',
    use  = 'use',
    charge = 'charge'
}


@Entity({
    name: 'point' 
})


@Service()
export class Point extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public point_seq: number;

    @Column({type: 'int'})
    public product_seq : number;

    @Column({type: 'int'})
    public member_seq : number;

    @OneToOne(() => Product)
    @JoinColumn({name: 'product_seq', referencedColumnName: 'product_seq'})
    public product: Product;

    @OneToOne(() => Member)
    @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    public member: Member;

    // @OneToOne(() => PointCharge)
    // public point_charge: PointCharge;

    //

    @Column({type: 'enum' ,enum : PointType})
    public point_type: PointType;

    @Column({type: 'enum' ,enum : ActionType})
    public action: ActionType;

    @Column({type: 'int'})
    public point: number;

    @Column({type: 'int'})
    public remains: number;

    @CreateDateColumn({type: 'datetime' })
    public regist_date: Date;

    @Column({type: 'datetime'})
    public expire_date: Date;
    
    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public memo: string;

    @Column({type: 'int'})
    public total_remain: number;

    @Column({type: 'enum' ,enum : StateType})
    public state: StateType;
    
}


