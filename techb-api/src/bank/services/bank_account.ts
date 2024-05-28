import { CaService, Logger } from "@common-api/common-api";
import { BankAccountModel } from "../models/bank_account";
import { BankAccount } from "../entities/bank_account";
import * as moment from 'moment';
import { Inject, Service } from "typedi";

export class BankAccountCreateParams extends BankAccount { 
   
}

@Service()
export class BankAccountService extends CaService<BankAccount> { 

    @Inject(()=> BankAccountModel)
    protected model: BankAccountModel;

    constructor() {
        super();
    }

 
}