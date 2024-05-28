import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { CaEntity, SEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import * as Types from  "@common-api/common-api";
import { Goods } from "../../goods/entities/goods";
import { Order } from "../../order/entities/order";
import { Member } from "@common-api/common-api";

export enum ProductState {
    ready = 'ready', // 승인대기
    confirm = 'confirm', // 승인
    cancel = 'cancel' //취소
}

@Entity({
    name: 'product' 
})

@Service()
export class Product extends CaEntity { 
    @PrimaryGeneratedColumn({type: 'int'})
    public product_seq : number;

    @ManyToOne(() => Goods, (goods) => goods.products)
    @JoinColumn({name: 'goods_seq', referencedColumnName: 'goods_seq'})
    public goods: Goods;

    @OneToOne(() => Order)
    @JoinColumn({name: 'order_seq', referencedColumnName: 'order_seq'})
    public order: Order;

    @OneToOne(() => Member)
    @JoinColumn({name: 'member_seq', referencedColumnName: 'member_seq'})
    public member: Member;

    @Column({type: 'int'})
    public 	goods_seq: number;

    @Column({type: 'int'})
    public 	order_seq: number;

    @Column({type: 'int'})
    public 	member_seq: number;

    @Column({type: 'varchar',length: 255})
    public 	goods_name: string;

    ////////////
   
    @Column({type: 'varchar',length: 255})
	public 	keyword: string;

    @Column({type: 'varchar',length: 255})
	public 	product_type: string;

    @Column({type: 'int'})
	public 	product_period: number;

    @Column({type: 'enum', enum: YN})
	public auto_extension: YN;

    @Column({type: 'enum', enum: YN})
    public 	is_auto_extension_priority: YN;

    @Column({type: 'datetime' })
    public end_date: Date;

    @Column({type: 'datetime' })
    public start_date: Date;

    @Column({type: 'varchar', length: 255})
	public 	product_mid: string;

    @Column({type: 'varchar', length: 255})
	public 	price_mid: string;

    @Column({type: 'varchar', length: 255})
	public 	content_mid: string;

    @Column({type: 'varchar', length: 255})
	public 	option_mid: string;

    // 사용여부
    @Column({type: 'enum', enum: YN})
	public enabled: YN;

    // 승인
    // @Column({type: 'enum', enum: YN})
	// public confirm: YN;

    // 상태
    @Column({type: 'enum', enum: ProductState})
    public state: ProductState;
}