
// /* key-setting script */
// // 맞춤 측정 기준 & 맞춤 측정 항목 정의
// GACustomKey = {};
// for(i=1; i<201; i++){
// 	GACustomKey['Dimension'+i] = 'dimension' + i;
//     GACustomKey['Metric'+i] = 'metric' + i;
// }
// GACustomKey.UACode = 'UACode';

// GAHitKey = {};
// GAHitKey.CID = 'clientId';
// GAHitKey.Title = 'title';
// GAHitKey.UserId = 'userId';
// GAHitKey.URL = 'location';
// GAHitKey.EventCategory = 'eventCategory';
// GAHitKey.EventAction = 'eventAction';
// GAHitKey.EventLabel = 'eventLabel';
// GAHitKey.EventValue = 'eventValue';
// GAHitKey.NonInteraction = 'nonInteraction';

// GAHitKey.campaignContent = 'campaignContent';
// GAHitKey.campaignId = 'campaignId';
// GAHitKey.campaignKeyword = 'campaignKeyword';
// GAHitKey.campaignMedium = 'campaignMedium';
// GAHitKey.campaignSource = 'campaignSource';
// GAHitKey.campaignName = 'campaignName';

// GAActionFieldKey = {};
// GAActionFieldKey.TransactionID = 'id';
// GAActionFieldKey.TransactionRevenue = 'revenue';
// GAActionFieldKey.TransactionTax = 'tax';
// GAActionFieldKey.TransactionShipping = 'shipping';
// GAActionFieldKey.TransactionCouponCode = 'coupon';
// GAActionFieldKey.TransactionAffiliation = 'affiliation';
// GAActionFieldKey.ProductActionList = 'list';
// GAActionFieldKey.CheckoutStep = 'step';
// GAActionFieldKey.CheckoutOptions = 'option';
// GAActionFieldKey.PromotionID = 'id';
// GAActionFieldKey.PromotionName = 'name';
// GAActionFieldKey.PromotionCreative = 'creative';
// GAActionFieldKey.PromotionPosition = 'position';

// GAEcommerceStepKey = {};
// GAEcommerceStepKey.Impression = 'impressions';
// GAEcommerceStepKey.Detail = 'detail';
// GAEcommerceStepKey.Click = 'click';
// GAEcommerceStepKey.Add = 'add';
// GAEcommerceStepKey.Remove = 'remove';
// GAEcommerceStepKey.Checkout = 'checkout';
// GAEcommerceStepKey.Purchase = 'purchase';
// GAEcommerceStepKey.Refund = 'refund';
// GAEcommerceStepKey.PromotionImpression = 'promoView';
// GAEcommerceStepKey.PromotionClick = 'promoClick';

// GAProductKey = {};
// GAProductKey.ProductID = 'id';
// GAProductKey.ProductName = 'name';
// GAProductKey.ProductBrand = 'brand';
// GAProductKey.ProductCategory = 'category';
// GAProductKey.ProductVariant = 'variant';
// GAProductKey.ProductPrice = 'price';
// GAProductKey.ProductQuantity = 'quantity';
// GAProductKey.ProductCouponCode = 'coupon';
// GAProductKey.ProductPosition = 'position';
// GAProductKey.ImpressionList = 'list';

// /* Main Script */
// var Scheme = 'techb://';														// iOS UIWebView 스킴주소
// var UAcode_tving = 'UA-118660069-1';     								// 티빙 UA코드
// var UAcode_tvingMall = 'UA-118660069-2';    						// 티빙몰 UA코드
// var GTMcode = 'GTM-NWM45D8';        										// 티빙몰 GTM 컨테이너
// var AndroidWebview = 'GA_Android';											// Android userAgent
// var iOS_Webview_WK = 'GA_iOS_WK';												// WKWebView userAgent
// var iOS_WebView_UI = 'GA_iOS_UI';												// UIWebView userAgent
// var CustomObject = { dimension : { }, metric : { } };

// var gaLoad = { GTM: true, GA: true, APP: false };
// var browserInfo = navigator.userAgent;
// if(browserInfo.indexOf(AndroidWebview) > -1 || browserInfo.indexOf(iOS_Webview_WK) > -1 || browserInfo.indexOf(iOS_WebView_UI) > -1){
//     gaLoad.APP = true;
// }

// // GA 이벤트 전송 (WEB,APP) --> 맞춤 측정 기준이 페이지 내에 변경 및 추가가 있을 경우 사용
// function GADatasend_Event(GAInfo_GA) {

//     var GAInfo = {};
//     var _category = '';
//     var _action = '';
//     if (!gaLoad.APP) {
//         GAInfo.hitType = 'event';
//         for(key in GAInfo_GA) {
//             if(key.indexOf('dimension') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('metric') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('userId') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('location') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('title') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('eventLabel') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('eventValue') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('eventCategory') !== -1) {
//                 _category = GAInfo_GA[key];
//                 GAInfo[key] = GAInfo_GA[key];
//             }
//             if(key.indexOf('eventAction') !== -1) {
//                 _action = GAInfo_GA[key];
//                 GAInfo[key] = GAInfo_GA[key];
//             }
//         }
//         if (_category.length > 0 && _action.length > 0) {
//             ga('gp.send', GAInfo);
//             ga('gptving.send', GAInfo);
//         }
//     }
//     else {
//         var emptyObject = JSON.parse(JSON.stringify(CustomObject));
//         emptyObject.type = 'E';
//         for(key in GAInfo_GA) {
//             if(key.indexOf('dimension') !== -1) { emptyObject.dimension[key] = GAInfo_GA[key]; }
//             if(key.indexOf('metric') !== -1) { emptyObject.metric[key] = GAInfo_GA[key]; }
//             if(key.indexOf('userId') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//             if(key.indexOf('location') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//             if(key.indexOf('title') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//             if(key.indexOf('eventLabel') !== -1) { emptyObject['label'] = GAInfo_GA[key]; }
//             if(key.indexOf('eventValue') !== -1) { emptyObject['value'] = GAInfo_GA[key]; }
//             if(key.indexOf('eventCategory') !== -1) {
//                 _category = GAInfo_GA[key];
//                 emptyObject['category'] = GAInfo_GA[key];
//             }
//             if(key.indexOf('eventAction') !== -1) {
//                 _action = GAInfo_GA[key];
//                 emptyObject['action'] = GAInfo_GA[key];
//             }
//         }
//         if(_category.length > 0 && _action.length > 0 ) {
//             if (browserInfo.indexOf(AndroidWebview) > -1) {
//                 emptyObject['uacode'] = UAcode_tvingMall;
//                 window.Android.GA_DATA(JSON.stringify(emptyObject));
//                 emptyObject['uacode'] = UAcode_tving;
//                 window.Android.GA_DATA(JSON.stringify(emptyObject));
//             }
//             else if (browserInfo.indexOf(iOS_Webview_WK) > -1) {
//                 emptyObject['uacode'] = UAcode_tvingMall;
//                 webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//                 emptyObject['uacode'] = UAcode_tving;
//                 webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//             }
//             else if (browserInfo.indexOf(iOS_WebView_UI) > -1) {
//                 emptyObject['uacode'] = UAcode_tvingMall;
//                 window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//                 emptyObject['uacode'] = UAcode_tving;
//                 window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//             }
//         }
//     }
// }

// // GA 페이지뷰 전송 (WEB,APP)
// // 기본 페이지뷰를 제외하고 페이지뷰는 보내고 싶은데 맞춤 측정 기준의 변경 및 추가가 있을 때 사용하는 함수
// function GADatasend_Page(GAInfo_GA) {
//     var GAInfo = {};
//     if (!gaLoad.APP) {
//         GAInfo.hitType = 'pageview';
//         for(key in GAInfo_GA) {
//             if(key.indexOf('dimension') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('metric') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('userId') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('location') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//             if(key.indexOf('title') !== -1) { GAInfo[key] = GAInfo_GA[key]; }
//         }
//         ga('gp.send', GAInfo);
//         ga('gptving.send', GAInfo);
//     }
//     else {
//         var emptyObject = JSON.parse(JSON.stringify(CustomObject));
//         emptyObject.type = 'P';
//         for(key in GAInfo_GA) {
//             if(key.indexOf('dimension') !== -1) { emptyObject.dimension[key] = GAInfo_GA[key]; }
//             if(key.indexOf('metric') !== -1) { emptyObject.metric[key] = GAInfo_GA[key]; }
//             if(key.indexOf('userId') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//             if(key.indexOf('location') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//             if(key.indexOf('title') !== -1) { emptyObject[key] = GAInfo_GA[key]; }
//         }

//         if (browserInfo.indexOf(AndroidWebview) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.Android.GA_DATA(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             window.Android.GA_DATA(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_Webview_WK) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_WebView_UI) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//         }
//     }
// }

// // 1. analytics.js & gtm.js 로드
// // 2. 초기 맞춤 측정 기준 설정 (GTM, GA, APP)
// // 3. 초기 화면 전송
// function GA_Init(GAInfo) {

//     //앱에서 실행된 웹뷰가 아닐경우
//     if (!gaLoad.APP) {
//         if(browserVersionCheck === 'MSIE 5' || browserVersionCheck === 'MSIE 6' || browserVersionCheck === 'MSIE 7' || browserVersionCheck === 'MSIE 8') {
//             gaLoad.GTM = false;
//         }
//         if (gaLoad.GTM) {
//             //dataLayer 맞춤 측정 설정
//             GTMsetCustomDimension(GAInfo);

//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//                 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer',GTMcode);
//         }
//         if (gaLoad.GA) {

//             (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//                 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//                 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//             })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

//             ga('create', UAcode_tvingMall, 'auto', 'gp');
//             ga('create', UAcode_tving, 'auto', 'gptving');

//             ga('gp.set', 'anonymizeIp', true);
//             ga('gptving.set', 'anonymizeIp', true);

//             ga('gp.require', 'ec');

//             for(key in GAInfo){
//                 switch(true){
//                     case (key.indexOf('dimension') !== -1):
//                     case (key.indexOf('metric') !== -1):
//                     case (key.indexOf('title') !== -1):
//                     case (key.indexOf('userId') !== -1):
//                     case (key.indexOf('campaignContent') !== -1):
//                     case (key.indexOf('campaignId') !== -1):
//                     case (key.indexOf('campaignKeyword') !== -1):
//                     case (key.indexOf('campaignMedium') !== -1):
//                     case (key.indexOf('campaignSource') !== -1):
//                     case (key.indexOf('campaignName') !== -1):
//                         ga('gp.set', key, GAInfo[key]);
//                         ga('gptving.set', key, GAInfo[key]);
//                         break;
//                 }
//             }
//             if(!gaLoad.GTM) GADatasend_Page(GAInfo);
//         }
//     }
//     else {
//         for(key in GAInfo) {
//             if(key.indexOf('dimension') !== -1) CustomObject.dimension[key] = GAInfo[key];
//             if(key.indexOf('metric') !== -1) CustomObject.metric[key] = GAInfo[key];
//             if(key.indexOf('title') !== -1) CustomObject[key] = GAInfo[key];
//             if(key.indexOf('userId') !== -1) CustomObject[key] = GAInfo[key];
//         }
//         GADatasend_Page(GAInfo);
//     }
// }

// // 일반 이벤트 세팅 --> 페이지 로드할때와 맞춤 측정 기준의 변경이 없을 경우에는 사용하는 함수
// function GA_Event(_category, _action, _label) {
//     if (!gaLoad.APP) {
//         var GAInfo = {};
//         GAInfo.hitType = 'event';
//         GAInfo.eventCategory = _category;
//         GAInfo.eventAction = _action;
//         GAInfo.eventLabel = _label;
//         ga('gp.send', GAInfo);
//         ga('gptving.send', GAInfo);
//         // log.
//         console.log('gp.send', GAInfo);
//         console.log('gptving.send', GAInfo);
//     }
//     else {
//         var emptyObject = JSON.parse(JSON.stringify(CustomObject));
//         emptyObject.type = 'E';

//         if (_category != null && _category.length > 0) { emptyObject['category'] = _category; }
//         if (_action != null && _action.length > 0) { emptyObject['action'] = _action; }
//         if (_label != null && _label.length > 0) { emptyObject['label'] = _label; }

//         if (browserInfo.indexOf(AndroidWebview) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.Android.GA_DATA(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             window.Android.GA_DATA(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_Webview_WK) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_WebView_UI) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//             emptyObject['uacode'] = UAcode_tving;
//             window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//         }
//     }
// }

// function GTMsetCustomDimension(GAInfo_GTM) {
//     var GAInfo = {};
//     for(key in GAInfo_GTM) {
//         if(key.indexOf('dimension') !== -1) {
//             var res = key.replace(/[^0-9]/g,"");
//             if(res.length > 0) {
//                 if(res.length === 1) GAInfo['dm00' + res] = GAInfo_GTM[key];
//                 else if(res.length === 2) GAInfo['dm0' + res] = GAInfo_GTM[key];
//                 else if(res.length === 3) GAInfo['dm' + res] = GAInfo_GTM[key];
//             }
//         }
//         if(key.indexOf('metric') !== -1) {
//             var res = key.replace(/[^0-9]/g,"");
//             if(res.length > 0) {
//                 if(res.length === 1) GAInfo['cm00' + res] = GAInfo_GTM[key];
//                 else if(res.length === 2) GAInfo['cm0' + res] = GAInfo_GTM[key];
//                 else if(res.length === 3) GAInfo['cm' + res] = GAInfo_GTM[key];
//             }
//         }
//         if(key.indexOf('userId') !== -1) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.indexOf('location') !== -1) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.indexOf('title') !== -1) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignContent/)) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignId/)) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignKeyword/)) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignMedium/)) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignName/)) { GAInfo[key] = GAInfo_GTM[key]; }
//         if(key.match(/campaignSource/)) { GAInfo[key] = GAInfo_GTM[key]; }
//     }
//     dataLayer = [GAInfo];
// }

// // 전자 상거래 이벤트 --> 전자 상거래 실행시 사용하는 함수
// // 상품 노출 단계, 상품 클릭 단계, 상품 상세 단계, 장바구니 담기 단계, 장바구니 제거 단계, 주문서 작성, 결제 완료 단계, 환불 단계
// // 프로모션 노출 단계, 프로모션 클릭 단계
// function GADataSend_Ecommerce(EcommerceStep, GAAction, GAProduct, GAInfo){
//     if(GAAction != null && EcommerceStep !== 'promoView' && EcommerceStep !== 'promoClick') var GAActionField = GAAction;
//     if(!gaLoad.APP) {
//         var GAInfoObj = {};
//         var EcommerceCategory = 'Ecommerce';
//         var EcommerceAction = EcommerceStep.substring(0,1).toUpperCase() + EcommerceStep.substring(1).toLowerCase();
//         for(key in GAInfo) {
//             if(key.indexOf('dimension') !== -1) { GAInfoObj[key] = GAInfo[key]; }
//             if(key.indexOf('metric') !== -1) { GAInfoObj[key] = GAInfo[key]; }
//             if(key.indexOf('userId') !== -1) { GAInfoObj[key] = GAInfo[key]; }
//             if(key.indexOf('location') !== -1) { GAInfoObj[key] = GAInfo[key]; }
//             if(key.indexOf('title') !== -1) { GAInfoObj[key] = GAInfo[key]; }
//             if(key.indexOf('nonInteraction') !== -1) { GAInfoObj[key] = '1'; }
//         }

//         switch (EcommerceStep.toLowerCase()) {
//             case 'impressions':
//                 if(GAAction !== null && GAProduct !== null) {
//                     for(var i = 0; i < GAProduct.length; i++){
//                         GAProduct[i].list = GAActionField.list;
//                     }
//                     GA_Impression_Product(GAProduct);
//                 }
//                 break;
//             case 'detail':
//             case 'click':
//             case 'add':
//             case 'remove':
//             case 'checkout':
//             case 'purchase':
//             case 'refund':
//                 ga('gp.ec:setAction', EcommerceStep, GAActionField);
//                 if(GAProduct !== null) { GA_Product(GAProduct); }
//                 break;
//             case 'promoview':
//                 if(GAAction !== null) { GA_Promotion_WEB(GAAction); }
//                 break;
//             case 'promoclick':
//                 ga('gp.ec:setAction', 'promo_click');
//                 if(GAAction !== null) { GA_Promotion_WEB(GAAction); }
//             default:
//                 break;
//         }
//         ga('gp.send', 'event', EcommerceCategory, EcommerceAction, GAInfoObj);
//     }
//     else {
//         var emptyObject = JSON.parse(JSON.stringify(CustomObject));
//         emptyObject.type = 'E';
//         emptyObject.category = 'Ecommerce';
//         emptyObject.action = EcommerceStep.substring(0,1).toUpperCase() + EcommerceStep.substring(1).toLowerCase();
//         for(key in GAInfo) {
//             if(key.indexOf('dimension') !== -1) { emptyObject.dimension[key] = GAInfo[key]; }
//             if(key.indexOf('metric') !== -1) { emptyObject.metric[key] = GAInfo[key]; }
//             if(key.indexOf('userId') !== -1) { emptyObject[key] = GAInfo[key]; }
//             if(key.indexOf('location') !== -1) { emptyObject[key] = GAInfo[key]; }
//             if(key.indexOf('title') !== -1) { emptyObject[key] = GAInfo[key]; }
//             if(key.indexOf('nonInteraction') !== -1) { emptyObject[key] = '1'; }
//         }

//         var step = EcommerceStep.toLowerCase();
//         emptyObject.ecommerce = {};
//         emptyObject.ecommerce[step] = {};
//         switch (EcommerceStep.toLowerCase()) {
//             case 'impressions':
//             case 'detail':
//             case 'click':
//             case 'add':
//             case 'remove':
//             case 'checkout':
//             case 'purchase':
//             case 'refund':
//                 if(GAAction !== null) { emptyObject.ecommerce[step]['actionField'] = GAActionField; }
//                 if(GAProduct !== null) { emptyObject.ecommerce[step]['products'] = GAProduct; }
//                 break;
//             case 'promoview':
//             case 'promoclick':
//                 var step = EcommerceStep.toLowerCase();
//                 if(GAAction !== null) { emptyObject.ecommerce[step]['promotions'] = GAActionField; }
//                 break;
//             default:
//                 break;
//         }

//         if (browserInfo.indexOf(AndroidWebview) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.Android.GA_DATA(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_Webview_WK) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(emptyObject));
//         }
//         else if (browserInfo.indexOf(iOS_WebView_UI) > -1) {
//             emptyObject['uacode'] = UAcode_tvingMall;
//             window.location = Scheme + encodeURIComponent(JSON.stringify(emptyObject));
//         }
//     }
// }

// function GA_Product(cart) {
//     for(var i = 0; i < cart.length; i++) {
//         var product = cart[i];
//         ga('gp.ec:addProduct', product);
//     }
// }

// function GA_Impression_Product(cart) {
//     for(var i = 0; i < cart.length; i++) {
//         var product = cart[i];
//         ga('gp.ec:addImpression', product);
//     }
// }

// function GA_Promotion_WEB(GAAction) {
//     for(key in GAAction) {
//         if(key.indexOf('promo') !== -1) {
//             var promotionObj = GAAction[key];
//             ga('gp.ec:addPromo', promotionObj);
//         }
//     }
// }

// function GA_Promotion_APP(GAAction){
//     var promoArray = [];
//     for(key in GAAction) {
//         if(key.indexOf('promo') !== -1) {
//             var promotionObj = GAAction[key];
//             promoArray.push(promotionObj);
//         }
//     }
//     return promoArray;
// }

// var browserVersionCheck = (function(){
//     var userAgentbrowser = navigator.userAgent, tem,
//         M = userAgentbrowser.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
//     if(/trident/i.test(M[1])){
//         tem = /\brv[ :]+(\d+)/g.exec(userAgentbrowser) || [];
//         return 'IE '+(tem[1] || '');
//     }
//     if(M[1]=== 'Chrome'){
//         tem = userAgentbrowser.match(/\b(OPR|Edge)\/(\d+)/);
//         if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
//     }
//     M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
//     if((tem = userAgentbrowser.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
//     return M.join(' ');
// })();

// // 해당 함수를 useWinload window.onload 시에 호출 부탁드립니다.
// function useWinload(){
//     if (browserVersionCheck !== 'MSIE 5' && browserVersionCheck !== 'MSIE 6' && browserVersionCheck !== 'MSIE 7' && browserVersionCheck !== 'MSIE 8') {
//         var gpGaEventClickClass = document.getElementsByClassName('gp_className');
//         for (var i = 0; i < gpGaEventClickClass.length; i++) {
//             gpGaEventClickClass[i].addEventListener('click', function(event) {
//                 var gpGaEventAttrCategory = event.target.getAttribute('ga-category');
//                 var gpGaEventAttrAction = event.target.getAttribute('ga-action');
//                 var gpGaEventAttrLabel = event.target.getAttribute('ga-label');

//                 if (gpGaEventAttrCategory !== null && gpGaEventAttrAction !== null) {
//                     if (gpGaEventAttrLabel !== null || gpGaEventAttrLabel !== undefined)
//                         GA_Event(gpGaEventAttrCategory, gpGaEventAttrAction, gpGaEventAttrLabel);
//                     else GA_Event(gpGaEventAttrCategory, gpGaEventAttrAction, undefined);
//                 }

//                 if (gpGaEventAttrCategory === null && gpGaEventAttrAction === null) {
//                     console.log('gp_className 클래스를 가진 태그에 카테고리와 액션을 추가해주세요.');
//                 }
//             });
//         }
//     }
//     else {
//         document.getElementsByClassName = function(cl) {
//             var retnode = [];
//             var elem = this.getElementsByTagName('*');
//             for (var i = 0; i < elem.length; i++) {
//                 if ((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1) retnode.push(elem[i]);
//             }
//             return retnode;
//         };
//         var gpGaEventClickClass = document.getElementsByClassName('gp_className');
//         for (var i = 0; i < gpGaEventClickClass.length; i++) {
//             gpGaEventClickClass[i].attachEvent('onclick', function(event) {
//                 var gpGaEventAttrCategory = undefined;
//                 var gpGaEventAttrAction = undefined;
//                 var gpGaEventAttrLabel = undefined;

//                 for (var i = 0; i < event.srcElement.attributes.length; i++) {
//                     if (event.srcElement.attributes[i].name === 'ga-category') {
//                         gpGaEventAttrCategory = event.srcElement.attributes('ga-category').value;
//                     } else if (event.srcElement.attributes[i].name === 'ga-action') {
//                         gpGaEventAttrAction = event.srcElement.attributes('ga-action').value;
//                     } else if (event.srcElement.attributes[i].name === 'ga-label') {
//                         gpGaEventAttrLabel = event.srcElement.attributes('ga-label').value;
//                     }
//                 }
//                 if (gpGaEventAttrCategory !== undefined && gpGaEventAttrAction !== undefined) {
//                     if (gpGaEventAttrLabel !== null || gpGaEventAttrLabel !== undefined)
//                         GA_Event(gpGaEventAttrCategory, gpGaEventAttrAction, gpGaEventAttrLabel);
//                     else GA_Event(gpGaEventAttrCategory, gpGaEventAttrAction, undefined);
//                 }

//                 if (gpGaEventAttrCategory === undefined && gpGaEventAttrAction === undefined) {
//                     console.log('gp_className 클래스를 가진 태그에 카테고리와 액션을 추가해주세요.');
//                 }
//             });
//         }
//     }
// }


// // window.onload = function(){
// //     GA_Init();
// // }

