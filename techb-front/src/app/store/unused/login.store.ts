// import { BSApi } from '../../../common/core/bs-api';
// import { Injectable } from '@angular/core';
// import { BSBaseStore } from '../bs-base.store';


// @Injectable()
// export class LoginStore extends BSBaseStore {

//     constructor(public api: BSApi) {
//         super(api, '');
//     }

//     login() {
//         let log = {
//             CUST_NO: "IR9QgoHqURrWo+O+yV//xw==", HG_NM: "tsFfCHq6mRyJCO0RlQRqjw==",
//             NM_CNFM_YN: "A8Oy0GlVQObJqp2yaJ2jFA==", NIC_NM: "+OYm3oTRk25wQ/wExVeKVQ==",
//             SEX_FG: "mjR/ZMojjF6FMMj5roInpw==", CJ_EMP_YN: "eVYAryGIo23wTIEPbnQ+QA==",
//             HOME_TEL_NO_1: "jvc9TjqyPOWqm3y7OFpnMg==", HOME_TEL_NO_2: "zSRPkzUw2Wbbls6kiLKm2g==",
//             HOME_TEL_NO_3: "g4W+bNyDc4+MfrSCUC2hzg==", HOME_ZIP_CD_1: "2/ezo0Aun4hV3yxhFb/ubQ==",
//             HOME_ZIP_CD_2: "jvc9TjqyPOWqm3y7OFpnMg==", HOME_ADDR_1: "RKvNnmNjCeT31z0jBASp/RHE2GWyv1wGRbkQY23eLc8=",
//             HOME_ADDR_2: "EzzJrKHh3sMS7K6Uv9RWPo1ruNW+k0+tvKY8qZrLO6w=", MOB_NO_1: "jvc9TjqyPOWqm3y7OFpnMg==",
//             MOB_NO_2: "zSRPkzUw2Wbbls6kiLKm2g==", MOB_NO_3: "g4W+bNyDc4+MfrSCUC2hzg==",
//             EMAIL_ADDR_1: "XcX9TZkrV5BaZDumsxlaWA==", EMAIL_ADDR_2: "wFJVTEEXiY+N7slBI7jOJQ==",
//             LEGL_BIRTH_DY: "v+zxsfy4O69yZcbeijc+Vg==", EMAIL_RECV_YN: "eVYAryGIo23wTIEPbnQ+QA==",
//             SMS_RECV_YN: "eVYAryGIo23wTIEPbnQ+QA==", isfree: "eVYAryGIo23wTIEPbnQ+QA==",
//             MBR_NO: "kGMonF9cSFW9f01lT59xVw==",
//             returnURL: "http://222.108.58.251"
//         };
//         // let headers = new Headers();
//         // headers.append('Content-Type', 'application/json');
//         // //headers.append('X-CSRF-Token', token.token);
//         // let options = new RequestOptions({ headers: headers, withCredentials: true });

//         this.api.post('_call_encdata.php', log).map(resp => resp).subscribe(resp => {
//             console.log(resp);

//         }); //회원연동 post (임시)
//         setTimeout(() => {
//             this.api.get('session').map(resp => resp.json()).subscribe(resp => {
//                 console.log("세션확인");
//                 console.log(resp);
//             });
//         }, 2000);


//     }

// }
