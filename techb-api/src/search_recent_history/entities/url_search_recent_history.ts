import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CaEntity } from "@common-api/common-api";
import { Service } from "typedi";

//import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'url_search_recent_history' 
})


@Service()
export class UrlSearchRecentHistory extends CaEntity { 

    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    public url_search_seq: number;

    @Column({type: 'int'})
    public member_seq : number;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public url: string;

    @Column({type: 'varchar', length: 255, nullable: true, comment: ''})
    public keyword: string;

}


