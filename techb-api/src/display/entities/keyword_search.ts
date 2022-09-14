import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { CaEntity, SEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import * as Types from  "@common-api/common-api";


@SEntity({
    name : 'keyword_search'
})
export class KeywordSearch extends CaEntity { 
    
    @PrimaryGeneratedColumn({type: 'int'})
    public keyword_seq : number;

    @Column({type: 'varchar',length: 255})
    public 	keyword: string;

}