export class Dictionary {

    static KOR_DIC: any = {
        clip_name: '클립명',
        clip_url: '클립링크',
        program_name: '프로그램명',
        pc_url: 'PC연결 URL',
        subject: '항목제목',
        mobile_url: 'MOBILE연결 URL',

        // 입점사등록
        provider_name: '입점사 업체명',

        // 개인결제
        order_cellphone: '주문자 휴대폰번호',
        order_phone: '주문자 전화번호',
        order_email: '주문자 이메일'
    };

    static KOR(message: string) {

        for(let word in Dictionary.KOR_DIC) {

            let target = "{{" + word + "}}";
            message = message.replace(target, Dictionary.KOR_DIC[word]);

            target = word;
            message = message.replace(target, Dictionary.KOR_DIC[word]);
        }

        // for(let word in KOR_DIC) {

        //     let target = word;
        //     message = message.replace(target, KOR_DIC[word]);
        // }

        return message;
    }
}
