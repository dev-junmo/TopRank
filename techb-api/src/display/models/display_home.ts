import { CaModel } from "@common-api/common-api";
import { DisplayHome } from '../entities/display_home';
import { Service } from 'typedi';
import { SelectQueryBuilder} from 'typeorm';


export interface DisplayHomeFilter {

}

@Service()
export class DisplayHomeModel extends CaModel<DisplayHome> {
    
    constructor() { 
        super(DisplayHome); 
    }

  
  
}
