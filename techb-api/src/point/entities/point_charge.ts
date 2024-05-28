import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { CaEntity, Member } from "@common-api/common-api";
import { Service } from "typedi";
import { BankAccount } from "../../bank/entities/bank_account";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum StateType {
    request = 'request', 
    complete = 'complete', 
    cancel = 'cancel'
}

export enum ReceiptsType {
    business = 'business',
    personal = 'personal'

}

@Entity({
    name: 'point_charge' 
})


@Service()
export class PointCharge extends CaEntity { 
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public point_charge_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @Column({type: 'int'})
    public account_seq : number;

    @OneToOne(() => Member)
    @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    public member: Member;

    @OneToOne(() => BankAccount)
    @JoinColumn({name: 'account_seq', referencedColumnName: 'account_seq'})
    public bank: BankAccount;

  
    ////////////////
    @Column({type: 'enum', enum: StateType })
	public state: StateType;

    @Column({type: 'int'})
    public charge_point: number;

    @Column({type: 'int'})
    public charge_free_point: number;

    @Column({type: 'datetime' })
    public regist_date: Date;    

    @Column({type: 'varchar', length: 255, comment: ''})
    public 	cash_receipt_is_apply_receipt: string;

    @Column({type: 'varchar', length: 255, comment: ''})
    public  cash_receipt_receipts_type: string;

    @Column({type: 'varchar', length: 255, comment: ''})
    public 	cash_receipt_company_number: string;

    @Column({type: 'varchar', length: 255, comment: ''})
    public 	cash_receipt_phone_number: string;

    @Column({type: 'varchar', length: 255, comment: ''})
    public  depositor: string;

    @Column({type: 'datetime' })
    public nobankbook_expired_date: Date;

    @Column({type: 'int'})
    public payment_total_price: number;

}


