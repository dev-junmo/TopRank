import { OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BSAlertService } from '../ui/bs-alert/index';
import { ServiceLocator } from '../core/service-locator';

// store
import { BSBaseStore } from './bs-base.store';

export class BSUpdateFormController implements OnInit {

    bsForm: FormGroup;
    public isUpdateMode: boolean = false;
    public title: string;
    public isMergeLoadingData: boolean = true;
    public config: any;

    //temp
    public extLoadParams: any;

    //private
    public _data: any;

    // providers
    protected fb: FormBuilder;
    //protected loading: Ng4LoadingSpinnerService;
    protected _router: Router;

    public forceGotoPrevPageAfterSubmit: boolean = true;

    constructor(
        public baseStore: BSBaseStore,
        router: Router,
        public activatedRouter: ActivatedRoute,
        protected alert: BSAlertService,
        public id: string = '') {

        this.fb = ServiceLocator.injector.get(FormBuilder);
        //this.loading = ServiceLocator.injector.get(Ng4LoadingSpinnerService);
        this._router = router;

        console.assert(this.fb);
        //console.assert(this.loading);

        console.assert(this.baseStore);
        console.assert(this._router);
        console.assert(this.activatedRouter);
        console.assert(this.alert);

    }

    ngOnInit() {
        this.init();
        this.afterInit();
        this.loadData();
    }


    init() {
        // config
        let config: any = {
            store: {
                command: this.baseStore.command,
                id: this.id,
                params: {}
            },
            title: {
               creat: '',
               update: ''
            },
            gotoPrevPageAfterSubmit: false
        };

        // get id from router
        if (this.activatedRouter.params) {
            this.activatedRouter.params.subscribe(params => {
                if (this.id === '') {   // 우선순위를 낮추기 위해, 없을 경우만 넣어주기 위해

                    // 아이디 예외처리 : create, update, list
                    if( params['id'] !== 'create' && params['id'] !== 'update' && params['id'] !== 'list' ) {
                        this.id = params['id'];
                    }
                }
                console.log("BSUpdateFormController::constructor params= ", params, this.id);
            });
        }

        // initController
        const config_ = this.initController(config);
        console.log("BSUpdateFormController::constructor config= ", config_);
        this.baseStore.command = config_.store.command;
        this.baseStore.getMethod = config_.store.getMethod;
        this.baseStore.putMethod = config_.store.putMethod;

        if (config_.store.id) {
            this.id = config_.store.id;
        }
        if (config_.store.params) {
            this.extLoadParams = config_.store.params;
        }
        this.isMergeLoadingData = config_.isMergeLoadingData;

        this.config = config_;

        // id가 있으면 update
        if (this.id) {
            this.isUpdateMode = true;
            this.title = config_.title.update;
        } else {
            this.isUpdateMode = false;
            this.title = config_.title.create;
        }

        // form control config
        const controlsConfig: any = this.preparedFormControlsConfig();
        console.assert(controlsConfig);
        this.bsForm = this.fb.group(controlsConfig);
        console.assert(this.bsForm);

        console.log("BSUpdateFormController::constructor form=", this.bsForm);

    }

    public afterInit() {

    }

    public setId(id:string) {
        this.id = id;
        this.config.store.id = id;
        this.isUpdateMode = true;
    }

    public loadData() {

        console.log("BSUpdateFormController::loadData id = ", this.id);
        if (!this.baseStore) return;

        if (!this.id) {
            this.initForCreateMode();
            return;
        }

        this.baseStore.get(this.id, this.extLoadParams).subscribe( resp => {
            this._data = resp;
            console.log("BSUpdateFormController::loadData before resp = ", resp, this.isUpdateMode);
            let data = this.preparedLoadData(resp);
            console.log("BSUpdateFormController::loadData after resp = ", data, this.isUpdateMode);
            this.bsForm.patchValue(data);
            this.afterPatchLoadData(data);
        });
    }

    public clearData() {
        console.assert(this.bsForm);
        if (this.bsForm) {
            this.bsForm.reset();
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }


    //todo
    // 이걸 직접호출하기에는 이름이 적절하지 않음
    // submit을 만들고 이건 override로 처리 해야 함

    submit() {

        this.onSubmit();
    }

    submitOnly() {
        this.forceGotoPrevPageAfterSubmit = false;
        this.onSubmit();
    }

    submitAndBack() {
        this.forceGotoPrevPageAfterSubmit = true;
        this.onSubmit();
    }

    onSubmit() {
        // check validate
        if (!this.bsForm.valid) {
            this.validateAllFormFields(this.bsForm);
            this.alert.show("필수 입력값이 입력되지 않았습니다. 입력폼을 확인해주세요.");
            return;
        }

        this.alert.confirm("저장 하시겠습니까?").subscribe((result) => {
            let data = this.preparedSaveData(this.bsForm.value);
            if (data == false) {
                return;
            }

            if (this.isUpdateMode === true &&
                this.isMergeLoadingData === true &&
                this._data) {
                console.log("BSUpdateFormController::onSubmit _data = ", data, this._data, this.isUpdateMode);
                this._data = Object.assign(this._data, data);
                data = this._data;
                console.log("BSUpdateFormController::onSubmit _data2 = ", this._data, this.isUpdateMode);
            }

            if (this.isUpdateMode === true) {
                this.baseStore.update(this.id, data).subscribe( resp => {
                    this.alert.show("저장 되었습니다.").subscribe( res => {
                        this.loadData();
                    });
                    this.didSubmited(resp);
                    if (this.forceGotoPrevPageAfterSubmit) {

                        // ** 수정페이지 중에 다른 수정으로 이동, 서밋하면 다시 이전 페이지로 간다.
                        // history back이니

                        // 수정이 경우 수정 후 리스트 하면 쿼리 유지를 위해 history back한다.
                        if (window.history.length > 0) {
                            window.history.back();
                        } else {
                            this._router.navigate(['../..'], { relativeTo:this.activatedRouter });
                        }
                    }

                    this.forceGotoPrevPageAfterSubmit = false;
                });
            } else {
                this.baseStore.create(data).subscribe( resp => {
                    this.alert.show("생성 되었습니다.");
                    this.clearData();
                    this.didSubmited(resp);
                    if (this.forceGotoPrevPageAfterSubmit) {
                        this._router.navigate(['..'], { relativeTo:this.activatedRouter });
                        //window.history.back();
                    }

                    this.forceGotoPrevPageAfterSubmit = false;
                });
            }


        });
    }

    ///////////////////////////////////////////////////////
    // overide
    // 별도의 스토어를 안만들어도 되는 경우
    // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
    // 2. initController를 override해서 command를 꼭 정의해주어야 한다.

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);

        // command
        // let config: any = {
        //     store: {
        //         command: this.baseStore.command,
        //         id:this.baseStore.id
        //     }
        // };


        return config;
    }

    //////////////////////////////////////////
    // overide

    preparedFormControlsConfig() {
        let config = {};

        return config;
    }

    //////////////////////////////////////////
    // overide

    preparedLoadData(resp) {
        console.log("BSUpdateFormController::preparedLoadData resp =", resp);

        return resp;
    }

    afterPatchLoadData(data) {

        return data;
    }

    initForCreateMode() {

    }

    //////////////////////////////////////////
    // overide

    preparedSaveData(value) {
        console.log("BSUpdateFormController::preparedSaveData resp =>", value);

        return value;
    }

    //////////////////////////////////////////
    // overide : submit한 후처리에 필요

    public didSubmited(resp = null) {

    }

    public gotoListPage() {

      console.assert(this.activatedRouter);
      console.log('BSDatatableController::gotoListPage url =>', this._router.url);

      // #todo 시간있을 떄 코드 개선이 필요함
      let urls = this._router.url.split('/');
      if (urls[urls.length - 1]) {
          let last: string = urls[urls.length - 1];

          console.log('gotoListPage last.substr(0, 6) =>', last.substr(0, 6));

          if(last.substr(0, 6) === 'create') {
              this._router.navigate(['../list'],{ relativeTo: this.activatedRouter });
          } else {
            if(urls[urls.length - 2].substr(0, 6) === 'update' ||
                urls[urls.length - 2].substr(0, 4) === 'view') {
                this._router.navigate(['../../list'],{ relativeTo: this.activatedRouter });
            } else {
                this._router.navigate(['../../../list'],{ relativeTo: this.activatedRouter });
            }

          }
      } else {
        this._router.navigate(['../../list'],{ relativeTo: this.activatedRouter });
      }
    }


    ////////////////////////////////////////////////////////////////////////
    // public API

    // public getFormGroup(arrayName: string, idx: string) {
    //     let formArray = this.bsForm.get(arrayName);
    //     let name: string = idx.toString();
    //     return formArray.get(name);
    // }
}

