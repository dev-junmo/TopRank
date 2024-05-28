import { CaService, Logger, YN } from "@common-api/common-api";
import { DisplayHomeModel } from "../models/display_home";
import { DisplayHome } from "../entities/display_home";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class DisplayHomeCreateParams extends DisplayHome { 
  
}



export class DisplayHomeUpdateParams extends DisplayHome { 

   
}



@Service()
export class DisplayHomeService extends CaService<DisplayHome> { 

    @Inject(()=> DisplayHomeModel)
    protected model: DisplayHomeModel;

    constructor() {
        super();
    }

    
    // public async createFromExport(params: DisplayHomeCreateParams) {

    //     try {

    //         let displayHome = new DisplayHome();
            
    //         displayHome.keyword_search = params.keyword_search;
    //         displayHome.pc_img = params.pc_img;
    //         displayHome.mobile_img = params.mobile_img;       
        
            
    //         await this.model.create(displayHome);


    //         return {
    //             code: 200,
    //             message: "success"
    //         };
    //     } catch(e) {
    //         Logger.error('display_home ', e);
    //         return {};
    //         //throw new PKError(500, 'Server Error => ' + e);
    //     }
    // }

 


 

}