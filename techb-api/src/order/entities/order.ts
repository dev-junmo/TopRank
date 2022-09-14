import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn , OneToOne, JoinColumn} from "typeorm";
import { CaEntity, Member, YN } from "@common-api/common-api";
import { Service } from "typedi";
import * as Types from  "@common-api/common-api";

export enum OrderState {
    request = 'request', // 요청
    complete = 'complete', //완료
    cancel = 'cancel' //취소
}

@Entity({
    name: 'order_kw' 
})


@Service()
export class Order extends CaEntity { 
    @PrimaryGeneratedColumn({type: 'int'})
    public order_seq : number;

    @Column({type: 'enum', enum: OrderState})
    public 	state: OrderState;
   
    @Column({type: 'int'})
	public 	member_seq: number;

    // @Column({type: 'int'})
	// public product_seq: number;

    @Column({type: 'int'})
	public use_point: number;

    @Column({type: 'int'})
	public use_free_point: number;

    @Column({type: 'datetime'})
	public regist_date: Date;

    @Column({type: 'int'})
	public product_total_point: number;

    @Column({type: 'varchar',length: 255})
	public 	product_type: string;


    // @OneToOne(() => Product)
    // @JoinColumn({name:'product_seq', referencedColumnName : 'product_seq'})
    // public product: Product;

    // @OneToOne(() => Member)
    // @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    // public member: Member;


}