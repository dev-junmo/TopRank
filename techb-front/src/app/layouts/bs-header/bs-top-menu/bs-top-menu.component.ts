import { Component,ViewChild,Output,Input , OnInit ,EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router ,NavigationEnd ,UrlSegment } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/pipe';

@Component({
  selector: 'bs-top-menu',
  templateUrl: './bs-top-menu.component.html',
  styleUrls: ['./bs-top-menu.component.css']
})
export class BsTopMenuComponent implements OnInit {

    private _navigation: any;
    @Input() set navigation(data) {
        this._navigation = data;
        this.loadNavigation();
        this.unselectAll();
    }

    @Output() mouseOverItem = new EventEmitter();
    @Output() mouseLeaveItem = new EventEmitter();

    private currUrl: string = "";
    private selectedMenuName: string = "";

    private program : boolean = false;
    private starauction : boolean = false;
    private brand : boolean = false;
    private myct : boolean = false;
    private FASHION : boolean = false;
    private STARGOODS : boolean = false;
    private LIFE : boolean = false;
    private KIDS : boolean = false;
    private TECH : boolean = false;
    private CULTURE : boolean = false;

    private menuList = [];  // 메인메뉴 4개 : program, brand, funshop, myct 
    private naviList: any;

    private activated: any = [];

    constructor(protected aRouter: ActivatedRoute, protected router: Router) {
        this.loadMenuActive();
    }

    ngOnInit() {
    }

    onClickItem(url) {
        this.router.navigateByUrl(url);
        //this.router.navigate(url);
    } 

    loadNavigation() {
        this.naviList = [];
        this.menuList = [];
        for(let item of this._navigation) {
            if (!item) {
                continue;
            }
            if(item.navigation_seq) {
                this.menuList.push(item);
            } else {                
                item.showtitle = item.title;
                item.isShow = false;
                this.naviList.push(item);
            }
        }
        console.log("loadNavigation _navigation, naviList, menuList =>" , this._navigation, this.naviList, this.menuList);
    }

    public unselectAll() {
        this.program = false;
        this.starauction = false;
        this.brand = false;
    }

    loadMenuActive() {
        this.router.events.subscribe((event:any) => {
            // NavigationEnd
            if (event instanceof NavigationEnd) {

                this.currUrl = event.url;
                this.selectedMenuName = '';

                let url = event.url.split('/')
                console.log("loadMenuActive::router.events event.url =>", this.currUrl);
                // if (url.length == 2) {
                //     if (url[1] == 'program') {
                //         this.selectedMenuName = "program";
                //     }
                //     else if (url[1] == 'starauction') {
                //         this.selectedMenuName = "starauction";
                //     }
                 
                //     else if (url[1] == 'brand') {
                //         this.selectedMenuName = "brand";
                //     }
                //     else if (url[1] == 'myct') {
                //         this.selectedMenuName = "myct";
                //     } else {
                //         this.selectedMenuName = "";
                //     }
                // } 
                
                // 주소가 'goods/category' 이면
                if(url.length > 2 && url[1] == 'goods' && url[2] == 'category') {
                    let categoryCode = url[3].split('?')[0];
                    for(let item of this.naviList) {
                        if (categoryCode == item.category_code){
                            this.selectedMenuName = item.title;
                        }
                    }
                }
                // else if (url[2] == 'program') {
                //     this.selectedMenuName = "program";
                // } else if (url[2] == 'starauction') {
                //     this.selectedMenuName = "starauction";
                // } 
                
                // else if (url.length > 4 && url[2] == 'brand' && url[4].substring(0,4) == '0032') {
                //     this.selectedMenuName = "starauction";
                // }
                // else if (url[2] == 'brand') {
                //     this.selectedMenuName = "brand";
                // } else if (url[2] == 'myct') {
                //     this.selectedMenuName = "myct";
                // } else {
                //     this.selectedMenuName = "";
                // }
        
                console.log('loadMenuActive::NavigationEnd selectedMenuName =>', this.selectedMenuName);
            }
        })
    }

    hoverItem(itemTitle, event,  item?) {
        console.log("BsTopMenuComponent::hoverItem title=", itemTitle);
        this.updateMenuStateInOver(itemTitle, event, item);
    }

    // 메뉴위에 마우스가 올라갔을 때 메뉴 선택 표시 갱신
    updateMenuStateInOver(itemTitle, event, item?) {
        console.log('showMenu itemTitle, event, item =>', itemTitle, event, item);
        this.unselectAll();

        // title에 따라서 플로팅 시 메뉴가 결정된다. 
        // program -> program  메뉴
        // '' -> 메뉴 없음
        // 나머지 -> 카테고리 메뉴 

        // if(itemTitle == 'starauction') {
        //     itemTitle = '';
        //     this.starauction = true;
        //     //return;
        // }
        // if(itemTitle == 'brand') {
        //     itemTitle = '';
        //     this.brand = true;
        //     //return;
        // }
        // if(itemTitle == 'myct') {
        //     itemTitle = '';
        //     this.myct = true;
        //     console.log("item item item ==" , this.myct);
        //     //return;
        // }
        // if(itemTitle == 'program') {
        //     this.program = true;
        // } 

        // if(itemTitle == 'FASHION') item.isShow = true;
        // if(itemTitle == 'STAR GOODS') item.isShow = true;
        // if(itemTitle == 'LIFE') item.isShow = true;
        // if(itemTitle == 'KIDS') item.isShow = true;
        // if(itemTitle == 'TECH+') item.isShow = true;
        // if(itemTitle == 'CULTURE') item.isShow = true;

        // top menu에서 선택 표시 갱신 
        if (item) {
            for(let _item of this.naviList) {
                console.log('showMenu2 _item =>', _item, item);
                if (_item.category_code == item.category_code) {
                    item.isShow = true;                
                } else {
                    //_item.isShow = false;
                }
            }            
        }        
        this.mouseOverItem.emit({title: itemTitle, event: event , item: item});
    }

    leaveItem(itemTitle, event, item?) {

        console.log("BsTopMenuComponent::leaveItem title, event = ", itemTitle, event);

        // if(itemTitle == 'starauction') {
        //     this.starauction = false;
        // } else if(itemTitle == 'brand') {
        //     this.brand = false;
        // } else  if(itemTitle == 'program') {
        //     this.program = false;
        // } else  if(itemTitle == 'myct') {
        //     this.myct = false;
        // } else if(item){
        //     item.isShow = false;
        // }
        if (item) {
            item.isShow = false;
        }
        
        this.mouseLeaveItem.emit({title: itemTitle, event: event});
    }

    

}

  // public getPageUrl(pageNumber: number): Observable<string> {
    // const url: Observable<string> = this.aRouter.url.pipe(
    //     map((segments: UrlSegment[]) => {
    //     let segmentsString = segments.join("/");
    //     let pageUrl = `/${segmentsString}?startIndex=${pageNumber}`;
    //     return pageUrl;
    //     })
    // );
    // return url;
    // }