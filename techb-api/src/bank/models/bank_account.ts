import { CaModel } from "@common-api/common-api";
import { BankAccount } from "../entities/bank_account";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface BankAccountFilter extends BankAccount { //change this
}

@Service()
export class BankAccountModel extends CaModel<BankAccount> { //change this
    
    constructor() {
        super(BankAccount); //change this
    }
}