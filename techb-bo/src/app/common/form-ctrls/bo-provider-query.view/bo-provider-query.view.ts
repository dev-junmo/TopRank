import { Component, Injectable, Input, ContentChildren, QueryList, AfterContentInit, OnInit } from '@angular/core';
import { ProviderStore } from '@app/common/store/provider.store';

// import { BOBaseForm } from '@app/common/form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// //import { BOProviderOptionConfig } from './bo-provider-query-config';

// import {NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
// import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';
// import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
 
@Component({
  selector: 'bo-provider-query-view',
  templateUrl: './bo-provider-query.view.html',
  styleUrls: ['./bo-provider-query.view.css']
})
export class BOProviderQueryView implements OnInit {

    //@ContentChildren(BSProviderOptionConfig) optionConfigs: QueryList<BSPeriodOptionConfig>;
    //public subForm: FormGroup;

    public apiUrl = 'admin/provider/provider';
    public allProviders;
    public providers;
    public selProviders = [];

    subForm: FormGroup;

    public _formGroup: FormGroup; 

    @Input() set formGroup(form: FormGroup) {
        
        this._formGroup = form;
        setTimeout(()=> {           
            console.log('set formGroup form =>', form);
            this.loadProviderByFormGroup( this._formGroup); 
        }, 1500);       
    }    
        
    @Input() hasCompany(value) {
    
        if (value) {
            this.apiUrl = 'admin/provider/provider?no_company=Y';
        } else {
            this.apiUrl = 'admin/provider/provider';
        }        
    }

    constructor(public providerStore: ProviderStore,
        private formBuilder: FormBuilder) {
        
        this.subForm = this.formBuilder.group({
            _provider_seq: [],            
        });
    }

    ngOnInit() { 
        console.log('BOProviderQueryView::ngOnInit');
        this.loadProvider();     
                
    }

    loadProvider() {
        this.providerStore.listAll().subscribe( resp => {
            this.allProviders = resp.list;
            console.log('BOProviderQueryView::loadProvider resp =>', resp);
            this._loadProviderList(resp.list);            
        });
    }

    _loadProviderList(list) {

        this.providers = []; //[{provider_seq:'0', provider_name: '입점사 전체(본사제외)'}];

        for(let provider of list) {
            this.providers.push({
                provider_seq: provider.provider_seq,
                provider_name: provider.provider_name 
            });
        }

        this.providers.sort((a, b)=> { return a.provider_name.localeCompare(b.provider_name); });

        this.patchSelProviders();
        //this.updateFromData();
        
        console.log("BOProviderQueryView::loadProvider2 providers =>", this.providers);
    }

    loadProviderByFormGroup(form) {
        
        console.log('loadProviderByFormGroup form =>', form);

        // form에서 provider_seq[0]로 된 컨트롤 순환
        let name = 'provider_seq[0]';
        let ix = 0;
        let ctrl = this._formGroup.get(name);

        while(ctrl) {
            console.log("loadProviderByFormGroup ctrl =>", ctrl);           
            this.addProviderBySeq(ctrl.value);
            ix++;
            name = 'provider_seq[' + ix + ']';
            ctrl = this._formGroup.get(name);
        }
        //this.updateFromData();
    }

    // loadDefaultData() {

    //     console.log('loadDefaultData _formGroup =>', this._formGroup);

    //     // 로딩은 20개 까지만 함
    //     for(let i = 0; i < 20; i++) {
    //         let ctrl: AbstractControl = this.createControl('provider_seq[' + i + ']');            
    //         if (ctrl) {
    //             ctrl.valueChanges.subscribe(seq => {
    //                 console.log('BOProviderQueryView::loadDefaultData::valueChanges seq =>', seq);

    //                 this.addProviderBySeq(seq);
    //             });
    //         }
    //     }
    // }
    
    //////////////////////////////////
    // 입점사 선택
    onClickProvider(seq) {
        console.log("onClickProvider seq, _provider_seq =>", seq, this.subForm.get('_provider_seq'));
        
        this.addProviderBySeq(seq);        
        this.updateFromData();

        this._formGroup.get('base_inclusion').setValue('');
        this.subForm.get('_provider_seq').setValue(null);
        console.log("onClickProvider2 seq =>", seq, this.providers);
    }

    onKeywordChanged(keyword) {
        console.log('onKeywordChanged keyword =>', keyword);
        if(!keyword || keyword.length == 0) {
            this._loadProviderList(this.allProviders);
            return;
        }

        let list = this.allProviders.filter((item) => {
            let name = item.provider_name;
            return name.indexOf(keyword) !== -1;
        });
        this._loadProviderList(list);
    }

    onClickDeleteSelProvider(seq) {

        console.log('onClickDeleteSelProvider seq =>', seq);
        this._deleteSelProvider(seq);
        this.updateFromData();
    }

    // 입점사 전체 체크
    onChangeAllProviders(checked) {
        console.log('onChangeAllProviders checked =>', checked);

        if (checked == true) {
            this.selProviders = [];
        }
        
        this.updateFromData();
    }

    // 본사 체크
    onChangeCompany(checked) {
        console.log('onChangeCompay checked =>', checked); 

    }

    get providersFormArray(): FormArray {
        return this._formGroup.get('provider') as FormArray;
    }

    addProviderBySeq(seq) {

        console.log('addProviderBySeq providers =>', this.providers);

        if (!seq || seq == 'null') { return; }

        // '입점사 전체 - 본사제외' 선택 시
        // if (seq == 0) {
        //     this.selProviders = [];
        // } else {             
        //     this._deleteSelProvider(0);
        // }

        // providerName 을 얻는다.
        // 다만 provider lsit가 로딩 전에는 providerName을 얻을 수 없음
        let providerName;
        if (this.providers && this.providers.length > 0) {
            for(let provider of this.providers) {
                if (provider.provider_seq == seq) {
                    providerName = provider.provider_name;
                    break;
                }
            }    
        } 
        
        let exist = false;
        for(let provider of this.selProviders) {
            if (provider.provider_seq == seq) {
                exist = true;
                break;
            }
        }

        // 추가
        if (!exist) {
            this.selProviders.push({provider_seq: seq, provider_name: providerName});
            //this.providersFormArray.push(this.formBuilder.group({ }))
            //this.providersFormArray.push( );
        }

    }

    _deleteSelProvider(seq) {
        let i = 0;
        for(let provider of this.selProviders) {
            if (provider.provider_seq == seq) {
                this.selProviders.splice(i, 1);
                break;
            }
            i++;
        }       
    }

    // 
    patchSelProviders() {
        for(let provider of this.selProviders) {
            if (!provider.provider_name) {
                for(let _provider of this.providers) {
                    if (provider.provider_seq == _provider.provider_seq) {
                        provider.provider_name = _provider.provider_name;
                        break;
                    }
                }    
            }
        }
    }

    updateFromData() {
 
        console.log('updateFromData selProviders =>', this.selProviders);          
        
        // 이전에 세팅된 값 삭제
        // RemoveAll controls
        let name = 'provider_seq[0]';
        let ix = 0;
        let ctrl = this._formGroup.get(name);
        while(ctrl) {
            console.log("removeControl =>", name);
            this.removeControl(name);
            
            ix++;
            name = 'provider_seq[' + ix + ']';
            //name = 'provider_seq'+ ix;
            ctrl = this._formGroup.get(name);
        }

        // 새로운 컨트롤 추가
        let i = 0;
        for(let item of this.selProviders) {
            console.log("add control =>", item.provider_name);
            let ctrl = this.createControl('provider_seq['+i+']');
            ctrl.setValue(item.provider_seq);
            i++;
        }

        // 새로 선택 된  기간유형으로 값세팅
        // if (data.periodType && data.periodType !== '선택' /* && data.sdate && data.edate*/) {

        //     let startDateCtrl: AbstractControl;
        //     let endDateCtrl: AbstractControl;

        //     startDateCtrl = this.createControl(data.periodType + '[min]');
        //     endDateCtrl = this.createControl(data.periodType + '[max]');

        //     console.assert(startDateCtrl);
        //     console.assert(endDateCtrl);

        //     if (data.sdate) {
        //         const _moment1 = moment(data.sdate);
        //         startDateCtrl.setValue(_moment1.format('YYYY-MM-DD'));    
        //     } else {
        //         startDateCtrl.setValue(null);
        //     }
            
        //     if (data.edate) {
        //         const _moment2 = moment(data.edate);
        //         endDateCtrl.setValue(_moment2.format('YYYY-MM-DD'));    
        //     } else {
        //         endDateCtrl.setValue(null);
        //     }           

        //     // 데이타 바뀌어서 startDate, endDate
        //     startDateCtrl.valueChanges.subscribe(data => {
        //         console.log("updatePeriodContorls2 startDateCtrl data, modelStart =>", data, this.modelStart);

        //         if (this.modelStart !== data) {
        //             console.log("updatePeriodContorls22 sdate set data =>", data);
        //             this.subForm.get('sdate').setValue(data);                   
        //         }              
                
        //         this.updateSelectIndex();
                
        //     });

        //     endDateCtrl.valueChanges.subscribe(data => {
        //         console.log("updatePeriodContorls3 endDateCtrl data, modelEnd =>", data, this.modelEnd);

        //         if (this.modelEnd !== data) {
        //             console.log("updatePeriodContorls33 edata set data =>", data);
        //             this.subForm.get('edate').setValue(data);
        //         }             

        //         this.updateSelectIndex();    
        //     });
        // }
    }   

    //////////////////////////////////////////////////////////////
    //  
    createControl(name) {
        // 폼컨트롤 선언을 안했어도 자동으로 컨트롤을 추가함
        let ctrl: AbstractControl = this._formGroup.get(name);
        if (!ctrl) {
            this._formGroup.addControl(name, new FormControl(''));
            ctrl =  this._formGroup.get(name);
        }
        return ctrl;
    }

    removeControl(name) {

        // 폼컨트롤 선언을 안했어도 자동으로 컨트롤을 추가함
        let ctrl: AbstractControl = this._formGroup.get(name);
        if (ctrl) {
            this._formGroup.removeControl(name);
        }
    }
    
}
