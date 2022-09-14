import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public sideMenu;
    private _sideMenu: any = [{
        stype : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : ' 주문관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        auth: 'order_view',
        ////notiCount    : 2,
        url : 'list',
        items : [{
            title : '주문조회',
            url : 'order/list',
            auth: 'order_view',
            selected: true,
            important: true
        },
        {
            title : '입금대기', //15
            url : 'order/order-reception-list',
            auth: 'order_view',
            selected: false
        },
        {
            title : '결제완료', //25
            auth: 'order_view',
            url : 'order/payment-complete-list',
            selected: false
        },
        {
            title : '상품준비중', // 35
            auth: 'order_view',
            url : 'order/products-preparing-list',
            selected: false
        },
        {
            title : '출고준비중', // 45
            auth: 'order_view',
            url : 'order/shipment-preparing-list',
            selected: false
        },
        {
            title : '출고완료', // 55
            auth: 'order_view',
            url : 'order/shipment-complete-list',
            selected: false
        },
        {
            title : '배송중', // 65
            auth: 'order_view',
            url : 'order/delivering-list',
            selected: false
        },
        {
            title : '배송완료', // 75
            auth: 'order_view',
            url : 'order/delivery-complete-list',
            selected: false
        },
        {
            title : '구매확정',
            auth: 'order_view',
            url : 'order/purchase-confirm-list',
            selected: false
        },
        {
            title : '주문취소',
            auth: 'order_view',
            url : 'cancel/list',
            selected: false
        },
        // {
        //     title : '관리자주문관리',
        //     url : 'manager-order',
        //     selected: false
        // },
        // {
        //     title : '개인결제관리',
        //     url : 'private-payment',
        //     selected: false
        // },
        ]
    },
    {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : '출고처리',
        auth: 'order_goods_export',
        // icon: 'flaticon-cogwheel',
        show : true,
        ////notiCount    : 2,
        url : 'list',
        items : [
        {
            title : '출고처리',
            auth: 'order_goods_export',
            url : 'shipment/ready-list',
            selected: false
        }
    ]},
    {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : ' 출고관리',
        auth: 'order_goods_export',
        // icon: 'flaticon-cogwheel',
        show : true,
        ////notiCount    : 2,
        url : 'list',
        items : [
        // {
        //     title : '출고처리 - 대기리스트',
        //     url : 'shipment/ready-list',
        //     selected: false
        // },
        {
            title : '출고조회',
            url : 'shipment/list',
            auth: 'order_goods_export',
            selected: true,
            important: true
        },
        {
            title : '출고준비중',
            auth: 'order_goods_export',
            url : 'shipment/preparing-list',
            selected: false
        },
        {
            title : '출고완료',
            auth: 'order_goods_export',
            url : 'shipment/complete-list',
            selected: false
        },
        {
            title : '배송중',
            auth: 'order_goods_export',
            url : 'shipment/delivering-list',
            selected: false
        },
        {
            title : '배송완료',
            auth: 'order_goods_export',
            url : 'shipment/delivery-complete-list',
            selected: false
        }
    ]},
        {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : '반품/교환/환불 관리',
        auth: 'refund_view',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount    : 2,
        url : 'cancel',
        items : [
            // {
            //     title : '결제중단/실패',
            //     url : 'cancel',
            //     selected: true
            // },
            // {
            //         title : '결제취소',
            //         url : 'cancel',
            //         selected: true
            // },

            // {
            //     title : '교환추가',
            //     url : 'exchange-list',
            //     selected: false
            // },
            // {
            //     title : '취소',
            //     url : 'cancel/list',
            //     selected: false
            // },
            {
                title : '반품',
                url : 'return/list',
                auth: 'refund_view',
                selected: false
            },
            {
                title : '교환',
                url : 'exchange/list',
                auth: 'refund_view',
                selected: false
            },
            {
                title : '환불',
                url : 'refund/list',
                auth: 'refund_view',
                selected: false
            },



        ]
    },
    // {
    //     stype    : 'bs-type-sideitem',
    //     id : 'id-sidemenu-00',
    //     title : ' 매출증빙 관리',
    //     show : true,
    //     items : [
    //         {
    //             title : '매출증빙 리스트',
    //             url : 'order/sale-proof',
    //             selected: false
    //         },
    //     ]
    // },
    {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : ' 기타관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        ////notiCount    : 2,
        url : 'list',
        items : [
            {
                title : '매출증빙 관리',
                auth: 'sales_view',
                url : 'order/sale-proof',
                selected: false
            },
            {
                title : '개인결제 관리',
                auth: 'personal_act',
                url : 'private-payment',
                selected: false
            },
        ]
    },
    ];

    private _sideProviderMenu: any = [{

        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : ' 주문관리',
        show : true,
        url : 'list',
        items : [{
            title : '주문조회',
            url : 'order/list',
            selected: true,
            important: true
        },
        {
            title : '입금대기', //15
            url : 'order/order-reception-list',
            selected: false
        },
        {
            title : '결제완료', //25
            url : 'order/payment-complete-list',
            selected: false
        },
        {
            title : '상품준비중', // 35
            url : 'order/products-preparing-list',
            selected: false
        },
        {
            title : '출고준비중', // 45
            url : 'order/shipment-preparing-list',
            selected: false
        },
        {
            title : '출고완료', // 55
            url : 'order/shipment-complete-list',
            selected: false
        },
        {
            title : '배송중', // 65
            url : 'order/delivering-list',
            selected: false
        },
        {
            title : '배송완료', // 75
            url : 'order/delivery-complete-list',
            selected: false
        },
        // {
        //     title : '구매확정',
        //     url : 'order/purchase-confirm-list',
        //     selected: false
        // },
        {
            title : '주문취소',
            url : 'cancel/list',
            selected: false
        },

        ]
    },
    {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : '출고처리',
        // icon: 'flaticon-cogwheel',
        show : true,
        ////notiCount    : 2,
        url : 'list',
        items : [
        {
            title : '출고처리',
            url : 'shipment/ready-list',
            selected: false
        }
    ]},
    {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : ' 출고관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        ////notiCount    : 2,
        url : 'list',
        items : [
        // {
        //     title : '출고처리 - 대기리스트',
        //     url : 'shipment/ready-list',
        //     selected: false
        // },
        {
            title : '출고조회',
            url : 'shipment/list',
            selected: true,
            important: true
        },
        {
            title : '출고준비중',
            url : 'shipment/preparing-list',
            selected: false
        },
        {
            title : '출고완료',
            url : 'shipment/complete-list',
            selected: false
        },
        {
            title : '배송중',
            url : 'shipment/delivering-list',
            selected: false
        },
        {
            title : '배송완료',
            url : 'shipment/delivery-complete-list',
            selected: false
        }
    ]},
        {
        stype    : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : '반품/교환/환불 관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount    : 2,
        url : 'cancel',
        items : [
            {
                title : '반품',
                url : 'return/list',
                selected: false
            },
            {
                title : '교환',
                url : 'exchange/list',
                selected: false
            },
            {
                title : '환불',
                url : 'refund/list',
                selected: false
            },



        ]
    },
    ];

    public authData;
    public boardAuthData;  

    constructor(private appConfig: AppConfigService, public boAuthService: BOAuthService) {
        console.log("SetupComponent isProvider =>", this.appConfig.isProvider);

        this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;

        if (this.appConfig.isProvider) {
            this.sideMenu = this._sideProviderMenu;
        } else {
            this.sideMenu = this._sideMenu;
        }
    }


    ngOnInit() {
    }
    
    // // 승인
    // onClickConfirm(item) {
    //     if (!item) { return; }
    //     let msg = `해당 상품을 승인하시겠습니까?`;
    //     this.alert.confirm(msg).subscribe((result) => {
    //         this.productStore.confirm(item.product_seq).subscribe(resp => {
    //             console.log('ProductListPage.confirm resp =>', resp);
    //             this.alert.show('승인처리가 완료되었습니다.').subscribe(() => {
    //                 this.reloadList();
    //             });
    //         });
    //     });   
    // }

    // // 취소
    // onClickCancel(item) {
    //     if (!item) { return; }
    //     let msg = `해당 상품을 취소하시겠습니까?`;
    //     this.alert.confirm(msg).subscribe((result) => {
    //         this.productStore.cancel(item.product_seq).subscribe(resp => {
    //             console.log('ProductListPage.cancel resp =>', resp);
    //             this.alert.show('취소처리가 완료되었습니다.').subscribe(() => {
    //                 this.reloadList();
    //             });
    //         });
    //     });   
    // }

}
