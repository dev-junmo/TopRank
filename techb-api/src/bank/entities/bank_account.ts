import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CaEntity } from "@common-api/common-api";
import { Service } from "typedi";



@Entity({
    name: 'bank_account'
})
@Service()
export class BankAccount extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public account_seq: number;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public bank_name: string;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public account_num: string;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public 	account_name: string;

}