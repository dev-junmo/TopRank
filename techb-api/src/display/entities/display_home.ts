import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { CaEntity, YN } from "@common-api/common-api";
import { Service } from "typedi";
import * as Types from  "@common-api/common-api";

export enum UseStatus {
	use = 'use',	//사용
	unuse = 'unuse' // 미사용
}

@Entity({
	name: 'display_home'
})

export class DisplayHome extends CaEntity {
    @PrimaryGeneratedColumn({type: 'int'})
	public display_home_seq: number;

	@Column({type: 'varchar', length: 255, nullable: true})
    public home_footer_banner_pc: string;
 
	@Column({type: 'varchar', length: 255, nullable: true})
    public home_footer_banner_mobile: string;

	@Column({type: 'varchar', length: 255, nullable: true})
    public keyword_search: string;

}

