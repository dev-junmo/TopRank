import { Injectable } from '@angular/core';
import { BSApi } from '../core/bs-api';
import { BSAlertService } from '../ui/bs-alert/index';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BSBankAccountService {

    // tslint:disable-next-line:max-line-length
    private bankList = [{"groupcd":"inqueryBankCode","codecd":"02","value":"한국산업은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"03","value":"기업은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"04","value":"KB 국민은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"05","value":"외환은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"06","value":"국민은행 구)주택","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"07","value":"수협중앙회","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"11","value":"NH 농협은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"12","value":"단위농협","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"16","value":"축협중앙회","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"20","value":"우리은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"21","value":"구)조흥은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"22","value":"상업은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"23","value":"SC 은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"24","value":"한일은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"25","value":"서울은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"26","value":"구)신한은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"27","value":"한국씨티은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"31","value":"대구은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"32","value":"부산은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"34","value":"광주은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"35","value":"제주은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"37","value":"전북은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"38","value":"강원은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"39","value":"경남은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"41","value":"비씨카드","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"45","value":"새마을금고","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"48","value":"신협","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"50","value":"상호저축은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"53","value":"씨티은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"54","value":"홍콩상하이은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"55","value":"도이치은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"56","value":"ANB 암로","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"57","value":"JP 모건","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"59","value":"미쓰비시도쿄은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"60","value":"BOA(Bank Of America)","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"64","value":"산림조합","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"70","value":"신안상호저축은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"71","value":"우체국","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"81","value":"KEB 하나은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"83","value":"평화은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"87","value":"신세계","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"88","value":"신한은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"89","value":"케이뱅크은행","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"90","value":"카카오뱅크","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D1","value":"유안타증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D2","value":"KB 증권(현대)","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D3","value":"미래에셋증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D4","value":"한국투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D5","value":"우리투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D6","value":"하이투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D7","value":"HMC 투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D8","value":"SK 증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"D9","value":"대신증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DA","value":"하나금융투자","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DB","value":"신한금융투자","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DC","value":"동부증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DD","value":"유진투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DE","value":"메리츠증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DF","value":"신영증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DG","value":"대우증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DH","value":"삼성증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DI","value":"교보증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DJ","value":"키움증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DK","value":"이트레이드","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DL","value":"솔로몬증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DM","value":"한화투자증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DN","value":"NH증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DO","value":"부국증권","regist_date":null},{"groupcd":"inqueryBankCode","codecd":"DP","value":"LIG 증권","regist_date":null}];
    public valid: boolean = false;


    constructor(private api: BSApi, protected alert: BSAlertService) {

        // this.api.get('member/refundaccount/inquery_bank_code').subscribe(resp => {
        //     this.bankList = resp;
        // });

        // 가다다 순으로 정렬함
        this.bankList.sort((a, b)=> { return a.value.localeCompare(b.value); });
    }

    //이니시스 예금주 확인 은행코드 조회
    getBankList() {
        return this.bankList;
    }

    // 예금주 얻기
    getBankAccountHolder(bankName, bankAccount) {

        const subject = new Subject<any>();
        console.log("checkAccount bankName, bankCode =>", bankName, bankAccount);

        let bankCode = this.bankNameTobankCode(bankName);

        if (!bankCode) {
            // this.alert.show("은행명을 확인 할 수 없어 계좌확인이 불가합니다.");
            return;
        }

        // 새로 값을 바꿨을 수 있으니 false해서 진행
        this.valid = false;
        this._getBankAccountHolder(bankCode, bankAccount).subscribe(resp => {
            if (resp.code == '000') {
                subject.next(resp.strRet);
                //this.formReturn.get('bank_depositor').setValue(resp.strRet);
                this.valid = true;
            }
            else if (resp.code == '010' || resp.code == '011') {
                // this.alert.show('실계좌명 확인에 실패하였습니다. 은행정보를 확인해주세요.');
                subject.error(resp.code);
            }
            else if (resp.code == '111' || resp.code == '110') {
                // this.alert.show('실계좌명 확인에 실패하였습니다. 다시시도해 주세요.');
                subject.error(resp.code);
            }
        });
        return subject.asObservable();
    }

    private bankNameTobankCode(bankName) {
        console.assert(this.bankList);
        let bankCode = '';
        for (let item of this.bankList) {
            if (item.value == bankName) {
                bankCode = item.codecd;
            }
        }
        return bankCode;
    }

    //이니시스 예금주 확인

    private _getBankAccountHolder(bankCode, bankAccount) {
        console.log("checkDepositor  value.bank_account, value.bank_code =>", bankAccount, bankCode);
        return this.api.get('shop/order/inicis/result_name?noacct=' + bankAccount + '&banksett=' + bankCode);
    }
}
