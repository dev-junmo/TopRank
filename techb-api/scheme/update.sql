--product 컬럼명 변경
ALTER TABLE `product` CHANGE `category` `product_type` varchar(255);
ALTER TABLE `product` CHANGE `period` `product_period` varchar(255);


--order_tb 테이블명 변경
ALTER TABLE `order_tb` RENAME `order_kw`;


--point 컬럼명 변경
ALTER TABLE `point` CHANGE `amount` `point` int(11);


--display_home 컬럼명 변경
ALTER TABLE `display_home` CHANGE `pc_img` `home_footer_banner_pc` varchar(255);
ALTER TABLE `display_home` CHANGE `mobile_img` `home_footer_banner_mobile` varchar(255);

--goods table member_seq 추가
ALTER TABLE `goods` ADD member_seq int comment '멤버 seq'

--ca_member_group 등급값 수정 
UPDATE  `ca_member_group` SET `point_price`= 0 WHERE group_seq = 1 ; 
UPDATE  `ca_member_group` SET `point_price`= 5000001 WHERE group_seq = 2 ; 
UPDATE  `ca_member_group` SET `point_price`= 10000001 WHERE group_seq = 3 ; 
UPDATE  `ca_member_group` SET `point_price`= 30000001 WHERE group_seq = 4 ; 
UPDATE  `ca_member_group` SET `point_price`= 50000001 WHERE group_seq = 5 ; 

--point table order_seq 추가 
ALTER TABLE `point` ADD order_seq int comment 'order seq'

ALTER TABLE `point` CHANGE `expire_date` `expire_date` TIMESTAMP NULL COMMENT '만료일';

-- point_charge 에 cash_receipt 컬럼 추가 
ALTER TABLE `point_charge` ADD is_apply_receipt enum('Y','N') not null comment '현금영수증신청여부';
ALTER TABLE `point_charge` ADD receipts_type varchar(255) not null comment '개인/사업자';
ALTER TABLE `point_charge` ADD company_number  varchar(255) comment '사업자등록번호';
ALTER TABLE `point_charge` ADD phone_number varchar(255)  comment '핸드폰번호';
ALTER TABLE `point_charge` ADD account_seq int(11) not null comment 'account_seq';
ALTER TABLE `point_charge` ADD depositor varchar(255) not null comment '입금자명';
ALTER TABLE `point_charge` ADD nobankbook_expired_date datetime not null comment '계좌만료일';

-- product.product_type,product_period  comment 수정  
ALTER TABLE `product` MODIFY product_type varchar(255) COMMENT '상품 타입(A/B/C)';
ALTER TABLE `product` MODIFY product_period varchar(255) COMMENT '상품기간(7일,30일,90일)';

--product 자동연장 우선순위지정
ALTER TABLE `product` ADD is_auto_extension_priority enum('Y','N') not null COMMENT '자동연장 우선순위지정';

--point charge 현금영수증 타입
ALTER TABLE `point_charge` MODIFY cash_receipt_receipts_type enum('personal','business') COMMENT '개인/사업자';

-- goods 컬럼명 수정 및 컬럼 추가 
ALTER TABLE `goods` CHANGE `goods_category_name` `is_agoods_category_name` varchar(255);
ALTER TABLE `goods` ADD is_ad enum('Y','N') not null COMMENT '외부광고';
ALTER TABLE `goods` ADD sales_rank_current_rank int not null COMMENT '최근랭킹';
ALTER TABLE `goods` ADD sales_rank_total_rank int not null COMMENT '최종랭킹';
ALTER TABLE `goods` ADD sales_rank_page_count int not null COMMENT '페이지카운트';
ALTER TABLE `goods` ADD sales_rank_page_rank int not null COMMENT '페이지순위';
ALTER TABLE `goods` ADD reviews_review_total int not null COMMENT '후기갯수';
ALTER TABLE `goods` ADD reviews_avg_score FLOAT(3) not null COMMENT '후기평균점수';
ALTER TABLE `goods` ADD reviews_sales_total int not null COMMENT '판매량';

--point charge 타입 변경
ALTER TABLE `point_charge` MODIFY charge_point int(11) COMMENT '충전포인트';
ALTER TABLE `point_charge` MODIFY charge_free_point int(11) COMMENT '충전무료포인트';

--point point_type enum('free', 'charge', 'reward') -> enum('free', 'charge')
ALTER TABLE `point` MODIFY point_type enum('free', 'charge') COMMENT '포인트타입(무료,충전)';

--point expire_date, regist_date type 변경
ALTER TABLE `point` MODIFY expire_date Datetime COMMENT '만료일';
ALTER TABLE `point` MODIFY regist_date Datetime not null COMMENT '사용일';

--point_charge 최종결제금액 
ALTER TABLE `point_charge` ADD payment_total_price int not null COMMENT '최종결제금액'; 


--order_kw regist_date 추가 / expire_date 삭제
ALTER TABLE `order_kw` drop expire_date;
ALTER TABLE `order_kw` ADD regist_date datetime not null ;

--product에서 regist_date , expire_date 추가 
ALTER TABLE `product` ADD regist_date datetime not null COMMENT '서비스시작일';
ALTER TABLE `product` ADD expire_date datetime not null COMMENT '서비스만료일';

--point 총잔액 추가
ALTER TABLE `point` ADD total_remain int(11) not null COMMENT '포인트 총잔액';

--product MIDs, 사용여부,승인여부 추가
ALTER TABLE `product` ADD product_mid varchar(255) not null COMMENT '상품고유번호MID';
ALTER TABLE `product` ADD price_mid varchar(255) not null COMMENT '가격비교MID';
ALTER TABLE `product` ADD content_mid varchar(255) not null COMMENT '컨텐츠MID';
ALTER TABLE `product` ADD option_mid varchar(255) not null COMMENT '옵션MID';
ALTER TABLE `product` ADD enabled  enum('Y','N') not null DEFAULT 'Y' COMMENT '사용여부';
--ALTER TABLE `product` ADD confirm  enum('Y','N') not null DEFAULT 'N' COMMENT '승인여부';

--order 승인여부
ALTER TABLE `order_kw` CHANGE `valid_state` `state` enum('request', 'complete', 'cancel');

--product regist_date -> start_date / expire_date -> end_date 
ALTER TABLE `product` CHANGE `regist_date` `start_date` Datetime COMMENT '서비스 시작일';
ALTER TABLE `product` CHANGE `expire_date` `end_date` Datetime COMMENT '서비스 만료일';


--point_reward  reward_state 변경
ALTER TABLE `point_reward` MODIFY reward_state enum('charge','withdrawal','exchange') COMMENT '상태(적립, 인출, 전환)';

--point state 추가
ALTER TABLE `point` ADD state enum('expired','cancel','use','charge') COMMENT '사용상태';

--reward point 인출승인
--ALTER TABLE `point` ADD withdrawal_state enum('Y','N') COMMENT '현금인출승인' null; 

-- order_kw 최종결제포인트/product_type 추가 
ALTER TABLE `order_kw` ADD product_total_point int COMMENT '최종결제포인트';
ALTER TABLE `order_kw` ADD product_type varchar(255) COMMENT '상품 타입(A/B/C)';
