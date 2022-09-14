import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { CaEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import { Member } from "@common-api/common-api";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum BankNameType {
    신한은행 = '신한은행', 
    기업은행 = '기업은행',
    국민은행 = '국민은행'
}

export enum WithdrawalStateType { 
    complete = 'complete', //완료
    request = 'request', //대기
    cancel = 'cancel', //취소
}


@Entity({
    name: 'reward_point_withdraw' 
})

    // 인출일때 인출 신청 정보 기록하기
    // if (reward_state == RewardStateType.withdrawal) {
    //     rewardPoint.bank_account = params.bank_account;
    //     rewardPoint.bank_account_holder = params.bank_account_holder;
    //     rewardPoint.bank_name = params.bank_name;
    //     rewardPoint.withdraw_point = params.withdraw_point;
    //     rewardPoint.withdrawal_state = WithdrawalStateType.request;
    // }


@Service()
export class RewardPointWithdraw extends CaEntity { 

    // @OneToOne(() => RewardPoint)
    // @JoinColumn({name: 'reward_point_seq', referencedColumnName: 'reward_point_seq'})
    // public reward_point_seq: number;

    // @OneToOne(() => RewardPoint)
    // @JoinColumn({name: 'remains', referencedColumnName: 'remains'})
    // public remains: number;
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public reward_point_withdraw_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @OneToOne(() => Member)
    @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    public member: Member;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public bank_account: number;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public bank_account_holder: string;
    
    @Column({type: 'enum',enum: BankNameType })
    public bank_name: BankNameType;

    @Column({type: 'int'})
    public withdraw_point: number;

    @Column({type: 'enum',enum: WithdrawalStateType })
    public withdraw_state: WithdrawalStateType;    
}