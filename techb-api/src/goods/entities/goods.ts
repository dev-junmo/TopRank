import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { CaEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import * as Types from  "@common-api/common-api";

import { Product } from "../../product/entities/product";

@Entity({
    name: 'goods' 
})


@Service()
export class Goods extends CaEntity { 
    @PrimaryGeneratedColumn({type: 'int'})
    public goods_seq : number;

    @OneToMany(() => Product, (product) => product.goods)
    public products: Product[];
    
    ///////

    @Column({type: 'varchar',length: 255})
    public 	goods_name: string;
   
    @Column({type: 'varchar',length: 255})
	public 	goods_price: string;

    @Column({type: 'varchar', length: 255})
	public goods_platform: string;

    @Column({type: 'varchar', length: 255})
	public store_name: string;

    @Column({type: 'varchar', length: 255})
	public categories: string;

    @Column({type: 'varchar', length: 255})
	public goods_uri: string;

    @Column({type: 'enum', enum: YN})
	public is_ad: YN;

    @Column({type: 'int'})
	public sales_rank_current_rank: number;

    @Column({type: 'int'})
	public sales_rank_total_rank: number;

    @Column({type: 'int'})
	public sales_rank_page_count: number;

    @Column({type: 'int'})
	public sales_rank_page_rank: number;

    @Column({type: 'int'})
	public reviews_review_total: number;

    @Column({type: 'float'})
	public reviews_avg_score: number;

    @Column({type: 'int'})
	public reviews_sales_total: number;

    @Column({type: 'enum', enum: YN})
	public is_subscribe: YN;

    @Column({type: 'varchar', length: 255})
	public price_mid: string;

    @Column({type: 'varchar', length: 255})
	public content_mid: string;

    @Column({type: 'varchar', length: 255})
	public option_mid: string;

    @Column({type: 'varchar', length: 255})
	public goods_mid: string;

}