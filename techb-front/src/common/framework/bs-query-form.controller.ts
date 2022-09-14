import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceLocator } from '../core/service-locator';

export class BOBaseQueryFormController implements OnInit, AfterViewInit {

    @Input() initialQuery: boolean = false;
    @Input() set setQuery(query) {
        console.log('BOBaseQueryFormController::setQuery query =>', query);

        if (!query) {
            console.assert(this.bsForm);
            if (this.bsForm) {
                this.bsForm.reset();
            }        
            console.log('setQuery2 reset');
            return;
        }

        // create form controls
        for(let name in query) {           
            if (!this.bsForm.get(name)) {
                console.log("BOBaseQueryFormController::setQuery::addControl name =>", name);
                let ctrl = this.bsForm.addControl(name, new FormControl(''));
            }
        }

        if (this.bsForm) {
            // timerout을 넣은 이유 : group checkbox가 patchValue가 안먹음, 1초이상 넣으니 먹음
            setTimeout(() => {
                this.bsForm.patchValue(query);
            }, 1000);
            console.log('setQuery::patchValue query, bsForm =>', query, this.bsForm);      
        }
    }
    @Output() query = new EventEmitter<Object>();

    bsForm: FormGroup;
    public isShowMoreForm: boolean = false;

    // providers
    protected fb: FormBuilder;

    constructor() {
        this.fb = ServiceLocator.injector.get(FormBuilder);
        console.assert(this.fb);

        
    }

    public getQuery() {
        return this.bsForm.value;
    }

    ngOnInit() {

        // ********생성자에 있던 코드를 여기로 옮김 
        // 생성자에 있으니까 preparedFormControlsConfig가 상속받는 class의 생성자보다 먼저 불림

        // form control config
        const controlsConfig: any = this.preparedFormControlsConfig();
        console.assert(controlsConfig);
        this.bsForm = this.fb.group(controlsConfig);
        console.assert(this.bsForm);
        console.log("BOBaseQueryFormController::ngOnInit controlsConfig, form=", controlsConfig, this.bsForm);
    }

    ngAfterViewInit() {

        console.log("BOBaseQueryFormController::ngAfterViewInit initialQuery =>", this.initialQuery);

        // #todo여기서 timeout을 써야 하는 이유
        // ngAfterViewInit 이 부분 말고 다른 상태를 써야 함 
        setTimeout(()=> {
            this.afterInitQueryForm();

             // 시작 시 submit을 한번 실행한다.
            if (this.initialQuery === true) {
                console.log("BOBaseQueryFormController 초기 onSubmit() 실행");
                this.submit();
            }

        },1);

       
    }

    afterInitQueryForm() {

    }

    reset() {

        console.assert(this.bsForm);
        if (this.bsForm) {
            this.bsForm.reset();
        }
    }

    submit() {
        this.initialQuery = false;   // 직접 submit버튼이 불리면 ngAfterViewInit();여기는 무시됨
        let query = this.willSubmit(this.bsForm.value);
        console.log("onSubmit bsForm =>", this.bsForm.value, query);
        this.query.next(query);
        this.didSubmited();
    }

    onSubmit() {
        this.submit();
    }

    //////////////////////////////////////////
    // overide

    preparedFormControlsConfig() {
        let config = {};

        return config;
    }

    // overide : submit전
    public willSubmit(query) {
        return query;
    }

    // overide : submit한 후처리에 필요
    public didSubmited() {

    }

    ////////////////////////////////////////////
    //

    public onClickShowMoreForm(){
        this.isShowMoreForm = !this.isShowMoreForm;
    }
}

