import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { CaEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import { StateType } from "./point_charge";
import { Member } from "@common-api/common-api";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum RewardStateType {
    charge = 'charge', //충전
    withdrawal = 'withdrawal', //인출
    exchange = 'exchange' //전환

}

export enum ActionType {
    plus = 'plus', 
    minus = 'minus'
}

@Entity({
    name: 'point_reward' 
})


@Service()
export class RewardPoint extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public reward_point_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @OneToOne(() => Member)
    @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    public member: Member;

    ////////////

    @Column({type: 'enum' ,enum : ActionType})
    public action: ActionType;

    @Column({type: 'enum' ,enum : RewardStateType})
    public reward_state: RewardStateType;

    @CreateDateColumn({type: 'datetime' })
    public regist_date: Date;

    @Column({type: 'int'})
    public remains: number; 
    
    @Column({type: 'int'})
    public reward_point: number;   
    
    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public memo: string;
}


