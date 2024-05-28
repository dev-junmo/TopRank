import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProviderStore } from '@app/common/store/provider.store';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { CategoryStore } from '../../../../../../common/store/category.store';
import { OrderReturnStore } from '../../../../../../common/store/order-return.store';

//import { BoardStore } from '@app/common/store/board.store';
//import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

@Component({
    selector: 'app-provider-delivery-create',
    templateUrl: './provider-delivery-create.component.html',
    styleUrls: ['./provider-delivery-create.component.css'],
})
export class ProviderDeliveryCreateComponent implements OnInit {

    bsForm: FormGroup;

    public _data;

    @Input() set data(value) {
        this._data = JSON.parse(JSON.stringify(value));
    }

    get data() {
        return this._data;
    }

    @Input() set deliveryCompanyData(value) {
        this.deliveryCompanyList = value;
        this.deliveryCompanyCodeList = Object.keys(value);
    }

    @Input() providerId;
    @Input() formItem;

    // private category = [[]];
    // private selectCategory = [[]];
    //private categoryList = [];

    private deliveryCompanyList;
    public deliveryCompanyCodeList;

    public deliveryCodes = [];

    admin;

    //company_code

    constructor(
        baseStore: BSBaseStore,
        private fb: FormBuilder,
        //private categoryStore :CategoryStore,
        private orderReturnStore: OrderReturnStore,
        private providerStore : ProviderStore,
        private router: Router,
        activatedRouter: ActivatedRoute,
        private alert: BSAlertService) {

    }

    ngOnInit() {
        
        console.log("ProviderDeliveryCreate ngOnInit data =>", this._data);

        let config = {
            use_yn: [],
            summary: '',
            company_code: [],

            delivery_cost_policy: 'free',

            ifpay_free_price: '',
            ifpay_delivery_cost: '',
            pay_delivery_cost: '',

            return_delivery_cost: '',

            order_delivery_free: '',

            delivery_price: '',
            add_delivery_cost: [],
            categories: []
        };

        this.bsForm = this.fb.group(config);
        this.bsForm.patchValue(this._data);

        // this.categoryStore.get().subscribe(resp => {
        //     this.category[1] = resp.list;
        // });

        this.deliveryCodes = this._data.company_code;

        //this.getDelivery();
    }

    getDelivery() {
        this.orderReturnStore.getDeliveryComCode().subscribe(resp => {
            this.deliveryCompanyList = resp;
            this.deliveryCompanyCodeList = Object.keys(resp);
            console.log("택배사 리스트 == " ,this.deliveryCompanyCodeList , this.deliveryCompanyList);
        });
    }

    onClickSelectDeli(_item) {

        console.log('value' , _item);

        let exist = false;
        for( let item of this.deliveryCodes) {
                if(item === _item) {
                    this.alert.show('동일한 택배사는 등록할 수 없습니다.');
                    exist = true;
                    break;
                }
        }

        if(!exist) {
            this.deliveryCodes.push(_item);
        }
        console.log(this.deliveryCodes);
    }

    onClickDelDelivery(_item) {

        for(let i = this.deliveryCodes.length; i --;){
            if(this.deliveryCodes[i] == _item) {
                this.deliveryCodes.splice(i, 1);
            }
        }
    }

    loadData() {

    }

    preparedLoadData(resp) {

        console.log("BSUpdateFormController::preparedLoadData resp =", resp);
        return resp;
    }

    preparedSaveData(value) {
        value = this.formItem;
        value.provider_id = this.providerId;
        console.log("preparedSaveData value =>", value);
        value.company_code = this.deliveryCodes;

        let IPItems= [];
        if(value.limit_ip.length > 0) {
            for(let item of value.limit_ip) {
                IPItems.push(item.ip1 +'.'+ item.ip2 +'.'+ item.ip3 +'.'+ item.ip4);
            }
            value.limit_ip = IPItems;
        }
        return value;
    }

    getSubmitData() {

        console.log("getSubmitData _data =>", this._data);

        let obj = Object.assign(this._data, this.bsForm.value);
        console.log("getSubmitData form, data =>", obj);

        return obj;
    }

    changeSelectedGoodsList(seqs) {
        this._data.issue_goods = seqs;
    }
}
