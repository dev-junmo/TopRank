import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CaEntity } from "@common-api/common-api";
import { Service } from "typedi";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'goods_search_recent_history' 
})


@Service()
export class GoodsSearchRecentHistory extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public goods_search_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public goods: string;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public keyword: string;

}


