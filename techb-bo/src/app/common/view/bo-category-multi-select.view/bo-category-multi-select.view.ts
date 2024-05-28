import { Component, OnInit, Input } from '@angular/core';
import { CategoryStore } from '../../store/category.store';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

@Component({
  selector: 'bo-category-multi-select-view',
  templateUrl: './bo-category-multi-select.view.html',
  styleUrls: ['./bo-category-multi-select.view.css']
})
export class BOCategoryMultiSelectView implements OnInit {

    @Input() selectedCategories;

    public bsForm: FormGroup;

    public category = [[]];
    private selectCategory = [[]];

    public activeCateBtn:boolean = false;

    constructor(
        private fb: FormBuilder,
        private categoryStore :CategoryStore,
        private alert: BSAlertService
    ) {


    }

    ngOnInit() {

        console.assert(this.selectedCategories);

        let config = {
            categories: this.fb.array([]),
        }

        this.bsForm = this.fb.group(config);
        //this.bsForm.patchValue(this._data);

        this.categoryStore.get().subscribe(resp => {
            this.category[0] = resp.list;
            this.loadCategory();
        });
    }

    get categoriesFormArray(): FormArray {
        return this.bsForm.get('categories') as FormArray;
    }

    loadCategory() {

        console.log("loadCategory selectedCategories =>" , this.selectedCategories);

        if (!this.selectedCategories || this.selectedCategories.length == 0) {
            return;
        }

        // 선택된 카테고리가 있으면
        for(let category of this.selectedCategories) {

            let fg = this.fb.group({
                category_code: category.category_code,
                category_name: category.category_name,
                //link: code.link,
                //category_link: code.link,
                //title: code.title
            });
            this.categoriesFormArray.push(fg);
        }
    }

    categoriesFromGroup(idx) {
        let formArray = this.bsForm.get('categories');
        let name: string = idx.toString();
        return formArray.get(name);
    }

    //카테고리
    // onClickCategory(num, item) {

    //     console.log("onClickCategory num, item =>", num, item);

    //     if(num == 2) {
    //         this.selectCategory = [];
    //         this.category.splice(3);
    //         this.category.splice(4);
    //         this.selectCategory[num - 2] = item;
    //     } else if (num == 3) {
    //         this.selectCategory.splice(2);
    //         this.selectCategory.splice(3);
    //         this.category.splice(4);
    //         this.selectCategory[num - 2] = item;
    //     } else {
    //         this.selectCategory[num - 2] = item;
    //     }
    //     this.activeCateBtn = true;
    //     this.loadCategotyList(num, item);
    // }

    //카테고리
    onClickCategory(index, item) {        
        console.log('onClickCategory index =>', index);

        // clear
        this.category.splice(index + 1);        
        this.selectCategory.splice(index + 1);

        this.selectCategory[index]=item;

        // list reload
        if (index < 3) {
            this.categoryStore.getChildren(item.category_code).subscribe(resp => {
                this.category[index+1] = resp.list;
            });    
        }
        
        this.activeCateBtn = true;        
        console.log('onClickCategory categoryList, selectCategory =>', this.category, this.selectCategory);
    }

    // loadCategotyListloadCategotyList(num, item) {

    //     console.log("loadCategotyList num, item =>", num, item);

    //     this.categoryStore.getChildren(item.category_code).subscribe(resp => {
    //         this.category[num] = resp.list;
    //         console.log(this.category);
    //         console.log(this.selectCategory);
    //     });
    // }

    // selectedCategory : parent포함 array

    addCategory(selectedCategory) {

        console.log("addCategory categoriesFormArray =>", this.categoriesFormArray);

        let _title;
        let item ;
        let name = '';
        let i = 0;

        for(let _cate of selectedCategory) {
            name += _cate.title;

            let cate = {
                title: _cate.title,
                category_code: _cate.category_code,
                category_name: name,
                link: 0,
                category_link: 0
            }

            if(!this.categoriesFormArray.controls || this.categoriesFormArray.controls.length < 1) {
                cate.link = 1;
                cate.category_link = 1;
            }

            // 마지막 depth의 카테고리 1개만 추가한다.
            if (i == selectedCategory.length-1) {
                this._addCategory(cate);
            }

            if (i < selectedCategory.length-1) {
                name += ' > ';
            }
            i++;
        }
    }

    _addCategory(_cate) {     //cate :    1, 1/2, 1/2/3, 1/2/3/4

        if (this.categoriesFormArray.controls) {
            for(let item of this.categoriesFormArray.controls) {
                console.log(_cate.category_code , item.value.category_code);
                if(_cate.category_code == item.value.category_code) {
                    this.alert.show("이미 선택한 카테고리입니다.");
                    return;
                }
            }
        }

        let fg = this.fb.group(_cate);
        this.categoriesFormArray.push(fg)

        console.assert(this.selectedCategories);

        // update selectedCategories
        let category = {
            category_code: _cate.category_code,
            category_name: _cate.category_name
        };
        this.selectedCategories.push(category);


        console.log("_addCategory =>",this.categoriesFormArray);
    }

    onClickRemoveCategory(idx) {

        console.log('onClickRemoveCategory idx, categoriesFormArray, selectedCategories =>',
            idx, this.categoriesFormArray, this.selectedCategories);
        this.categoriesFormArray.removeAt(idx);
        this.selectedCategories.splice(idx, 1);

        console.log('onClickRemoveCategory2 idx, categoriesFormArray, selectedCategories =>',
            idx, this.categoriesFormArray, this.selectedCategories);
    }


    // 카테고리 등록 버튼 클릭

    onClickSelectCategory() {
        console.log("selectCategory = ",this.selectCategory);
        // if(this.selectCategory.length < 2) {
        //     return;
        // }
        this.addCategory(this.selectCategory);
        // this.strCategoryFullName(this.selectCategory);
    }

}
