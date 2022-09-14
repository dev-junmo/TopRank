
--point 
CREATE TABLE point
(
    `point_seq`    int(11)                             NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `point_type`   enum('free', 'charge', 'reward')    NOT NULL    COMMENT '포인트타입(무료,유료,리워드)', 
    `state`        enum('plus', 'minus')               NOT NULL    COMMENT '상태(증액,감액)', 
    `amount`       int(11)                             NOT NULL    COMMENT '금액', 
    `remains`      int(11)                             NOT NULL    COMMENT '잔액', 
    `expire_date`  timestamp                           NOT NULL    COMMENT '만료일', 
    `regist_date`  timestamp                           NOT NULL    COMMENT '사용일', 
    `member_seq`   int(11)                             NOT NULL    COMMENT '멤버seq', 
    `comment`      varchar(255)                        NOT NULL    COMMENT '내역', 
     PRIMARY KEY (point_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--point charge 
CREATE TABLE point_charge
(
    `point_charge_seq`   int(11)                                  NOT NULL    AUTO_INCREMENT COMMENT '포인트충전seq', 
    `state`              enum('request', 'complete', 'cancel')    NOT NULL    COMMENT '결제상태', 
    `charge_point`       varchar(255)                             NOT NULL    COMMENT '충전포인트', 
    `charge_free_point`  varchar(255)                             NOT NULL    COMMENT '충전무료포인트', 
    `member_seq`         int(11)                                  NOT NULL    COMMENT '멤버seq', 
    `regist_date`        timestamp                                NOT NULL    DEFAULT current_timestamp() COMMENT '충전신청일자', 
     PRIMARY KEY (point_charge_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--order 
CREATE TABLE order_kw
(
    `order_seq`       int(11)                          NOT NULL    AUTO_INCREMENT COMMENT 'order_seq', 
    `member_seq`      int(11)                          NOT NULL, 
    `product_seq`     int(11)                          NOT NULL, 
    `use_point`       int(11)                          NOT NULL    COMMENT '사용포인트', 
    `use_free_point`  int(11)                          NOT NULL    COMMENT '사용무료포인트', 
    `expired_date`    datetime(6)                      NOT NULL    COMMENT '서비스만료일', 
    `valid_state`     ENUM(request,complete,cancel)    NOT NULL    COMMENT '상태', 
     PRIMARY KEY (order_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--goods
CREATE TABLE goods
(
    `goods_seq`            int(11)         NOT NULL    AUTO_INCREMENT COMMENT 'goods_seq', 
    `goods_name`           varchar(255)    NOT NULL    COMMENT '상품명', 
    `goods_price`          varchar(255)    NOT NULL    COMMENT '상품가격', 
    `goods_platform`       varchar(255)    NOT NULL    COMMENT '플랫폼', 
    `store_name`           varchar(255)    NOT NULL    COMMENT '스마트스토어이름', 
    `goods_category_name`  varchar(255)    NOT NULL    COMMENT '카테고리', 
    `goods_uri`            varchar(255)    NOT NULL    DEFAULT 'UNIQUE' COMMENT '상세페이지', 
    CONSTRAINT PK_goods PRIMARY KEY (goods_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;


--product
CREATE TABLE product
(
    `product_seq`     int(11)          NOT NULL    AUTO_INCREMENT, 
    `member_seq`      int(11)          NOT NULL, 
    `goods_seq`       int(11)          NOT NULL, 
    `keyword`         varchar(255)     NOT NULL    COMMENT '키워드', 
    `product_type`    VARCHAR(255)     NOT NULL    COMMENT '종류', 
    `product_period`  varchar(255)     NOT NULL    COMMENT '기간', 
    `auto_extension`  enum(’Y’,’N’)    NOT NULL    COMMENT '자동연장여부 (자동,수동)', 
     PRIMARY KEY (product_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;


--display_home
CREATE TABLE display_home
(
    `display_home_seq`  INT(10)         NOT NULL    AUTO_INCREMENT, 
    `pc_img`            VARCHAR(255)    NULL, 
    `mobile_img`        VARCHAR(255)    NULL, 
    `keyword_search`    VARCHAR(255)    NULL, 
     PRIMARY KEY (display_home_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;


--최근검색기록
--keyword_search_recent_history
CREATE TABLE keyword_search_recent_history
(
    `keyword_search_seq`  int(11)               NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `member_seq`                int(11)         NULL        COMMENT '멤버seq', 
    `keyword`                   VARCHAR(255)    NULL        COMMENT '키워드', 
     PRIMARY KEY (keyword_search_front_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--store_search_recent_history
CREATE TABLE store_search_recent_history
(
    `store_search_seq`  int(11)         NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `member_seq`        int(11)         NULL        COMMENT '멤버seq', 
    `store`             VARCHAR(255)    NULL        COMMENT '스토어명', 
    `keyword`           VARCHAR(255)    NULL        COMMENT '키워드', 
     PRIMARY KEY (store_search_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--url_search_recent_history
CREATE TABLE url_search_recent_history
(
    `url_search_seq`  int(11)         NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `member_seq`      int(11)         NULL        COMMENT '멤버seq', 
    `url`             VARCHAR(255)    NULL        COMMENT '상품주소', 
    `keyword`         VARCHAR(255)    NULL        COMMENT '키워드', 
     PRIMARY KEY (url_search_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--goods_search_recent_history
CREATE TABLE goods_search_recent_history
(
    `goods_search_seq`  int(11)         NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `member_seq`        int(11)         NULL        COMMENT '멤버seq', 
    `goods`             VARCHAR(255)    NULL        COMMENT '굿즈', 
    `keyword`           VARCHAR(255)    NULL        COMMENT '키워드', 
     PRIMARY KEY (goods_search_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;

--bank
CREATE TABLE bank_account
(
    `account_seq`   INT(11)         NOT NULL    AUTO_INCREMENT COMMENT 'account_seq', 
    `bank_name`     VARCHAR(255)    NULL        COMMENT '은행명', 
    `account_num`   VARCHAR(255)    NULL        COMMENT '계좌번호', 
    `account_name`  VARCHAR(255)    NULL        COMMENT '예금주명', 
     PRIMARY KEY (account_seq) 
) engine=InnoDB default character set utf8 collate utf8_general_ci;

-- point_reward 테이블
CREATE TABLE point_reward
(
    `reward_point_seq`  INT(11)                      NOT NULL    AUTO_INCREMENT COMMENT 'seq', 
    `member_seq`        INT(11)                      NOT NULL    COMMENT '멤버seq', 
    `action`            ENUM('plus','minus')         NULL        COMMENT '상태(증액,감액)', 
    `reward_state`      ENUM('add','out','trans')    NULL        COMMENT '상태', 
    `regist_date`       DATETIME                     NULL        COMMENT '사용일',
    `reward_point`      INT(11)                      NULL        COMMENT '리워드포인트',  
    `remains`           VARCHAR(255)                 NULL        COMMENT '잔액', 
    `memo`              VARCHAR(255)                 NULL        COMMENT '메모', 
     PRIMARY KEY (reward_point_seq)
) engine=InnoDB default character set utf8 collate utf8_general_ci;


