import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CaEntity } from "@common-api/common-api";
import { Service } from "typedi";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'store_search_recent_history' 
})


@Service()
export class StoreSearchRecentHistory extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public store_search_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public store: string;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public keyword: string;

}


