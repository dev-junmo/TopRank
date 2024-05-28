import {
    Component,
    Input,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

declare var daum: any;
const url = "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";

@Component({
  selector: 'btn-daum-address',
  template: `<button
              type="button"
              class="{{styleClass}}"
              (click)="openDaumApi()"
              >우편번호 찾기</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaumAddressComponent implements OnInit {

    @Output() result = new EventEmitter<Object>();
    @Input() options: any;

    public styleClass: String;
    private el: ElementRef;
    private debug: false;
  
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngOnInit(){      

        this.debug = this.options && this.options.debug ? this.options.debug : false;
        this.styleClass = this.options && this.options.class ? Array.isArray(this.options.class) ? this.options.class.join(" ") : this.options.class : '';
        this.loadDaumApi().then(()=>{
        this.print('Daum api has been loaded.');
        });
    }

    private print(msg){
        if(this.debug){
        console.log(`[${Math.floor(new Date().getTime()/1000)}]`, msg);
        }
    }

    private daumApiCallback(data){

        console.log('daumApiCallback data =>', data);

        this.print(data);
        
        let fullAddr = '', extraAddr = '', engAddr = '', zipCode = '';
        let fullAddrRoad, fullAddrJibun;

        // make 도로명주소
        fullAddrRoad = data.roadAddress;     
        if(data.bname !== '') {
            extraAddr += data.bname;
        }
        if(data.buildingName !== '') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        fullAddrRoad += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');

        // 지번 주소
        if (data.jibunAddress) {
            fullAddrJibun = data.jibunAddress;
        } else if (data.autoJibunAddress) {
            fullAddrJibun = data.autoJibunAddress;
        } else {
            fullAddrJibun = '지번주소를 알수 없습니다.';
        }

        // addr
        if (data.userSelectedType === 'R') {
            fullAddr = fullAddrRoad;
            engAddr = data.roadAddressEnglish;
            //zipCode = data.zonecode;
        } else {            
        
            fullAddr = fullAddrJibun;            
            engAddr = data.jibunAddressEnglish;            
        }

        // type
        let type: string = 'zibun';
        if (data.userSelectedType == 'R') {
            type = 'street';
        }

        this.result.emit({
            zip: data.zonecode,
            addr: this.replaceFullsizeCharacter(fullAddr),
            addrEng: this.replaceFullsizeCharacter(engAddr),
            jibunAddr: this.replaceFullsizeCharacter(fullAddrJibun),
            roadAddr: this.replaceFullsizeCharacter(fullAddrRoad),
            type: type
        });
    }

    replaceFullsizeCharacter(str) {
        if(!str) {
            return '';
        }
        let matched = str.match(/([ⅠⅡⅢⅣⅤⅥⅦⅧⅨ㈜·・家])/g);
        if(matched && Array.isArray(matched)) for(let match of matched) {
            if(match == '㈜') {
                str = str.replace(/㈜/g, '(주)');
            }
            else if(match == '·') {
                str = str.replace(/·/g, '.');
            }
            else if(match == '・') {
                str = str.replace(/・/g, '.');
            }
            else if(match == '家') {
                str = str.replace(/家/g, '가');
            }
            else {
                let replace_str = match.charCodeAt(0) - 8543;
                if(replace_str) {
                    str = str.replace(new RegExp(match, 'g'), replace_str);
                }
            }
        }

        return str;
    }

    openDaumApi(){
        
        let self = this;
        
        // popup
        if(!this.options || (!this.options.type || this.options.type==='popup')) {
        
            daum.postcode.load(() => {
                new daum.Postcode({
                    oncomplete: (data)=> self.daumApiCallback(data)
                }).open();
            });

        }else{
        if(!this.options.target){
            this.print('ERROR: Parent Component does not have a target element.');
            return false;
        }

        const $target = this.el.nativeElement.parentElement.querySelector(`#${this.options.target}`);
        this.print($target);
        switch(this.options.type){
            case 'layer':
                let width = this.options.width || 300;
                let height = this.options.height || 460;
                let border = this.options.border || 5;
                daum.postcode.load(() => {
                    new daum.Postcode({
                        oncomplete: (data)=> self.daumApiCallback(data),
                        onclose: ()=> $target.style.display = 'none',
                        width: '100%',
                        height: '100%'
                    }).embed($target);
                });
                $target.style.display = 'block';
                $target.style.width = `${width}px`;
                $target.style.height = `${height}px`;
                $target.style.border = `${border}px solid`;
                $target.style.left = `${(((window.innerWidth || document.documentElement.clientWidth) - width)/2 - border)}px`;
                $target.style.top = `${(((window.innerHeight || document.documentElement.clientHeight) - height)/2 - border)}px`;
                try{
                    $target.querySelector('#btnCloseLayer').onclick = ()=>{
                    $target.style.display = 'none';
                    };
                }catch(e){
                    this.print(`ERROR: ${e.message}`);
                }
                break;
            case 'inline':

                console.log('this.el.nativeElement =>', this.el.nativeElement);
              
                let currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                daum.postcode.load(() => {
                    new daum.Postcode({
                        oncomplete: (data)=> {
                        self.daumApiCallback(data);
                        document.body.scrollTop = currentScroll;
                        },
                        onclose: ()=> $target.style.display = 'none',
                        onresize : (size)=> $target.style.height = size.height+'px',
                        width: '100%',
                        height: '100%'
                    }).embed($target);
                });
                $target.style.display = 'block';
                try{
                    $target.querySelector('#btnFoldWrap').onclick = ()=>{
                    $target.style.display = 'none';
                    };
                }catch(e){
                    this.print(`ERROR: ${e.message}`);
                }
                break;
        }
        }
    }

    private loadDaumApi(){
        return new Promise((resolve, reject)=> {
        let script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;
        this.el.nativeElement.appendChild(script);
        resolve(true);
        });
    }
} 