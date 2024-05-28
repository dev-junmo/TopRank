--common api

-- 0.2.3
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- 테이블 구조 `ca_config`
--

CREATE TABLE `ca_config` (
  `groupcd` varchar(45) NOT NULL,
  `codecd` varchar(45) NOT NULL,
  `value` text DEFAULT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ca_config`
--

INSERT INTO `ca_config` (`groupcd`, `codecd`, `value`, `regist_date`) VALUES
('basic', 'title', '##변경##', now()); -- 프로젝트명

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_email_log`
--

CREATE TABLE `ca_email_log` (
  `seq` int(11) NOT NULL,
  `from_email` varchar(255) DEFAULT NULL,
  `to_email` varchar(255) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `contents` text DEFAULT NULL,
  `memo` text DEFAULT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_template`
--

CREATE TABLE `ca_template` (
  `template_seq` int(11) NOT NULL,
  `group_code` varchar(20) DEFAULT NULL,
  `template_code` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `contents` text DEFAULT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_date` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ca_template`
--

INSERT INTO `ca_template` (`template_seq`, `group_code`, `template_code`, `description`, `subject`, `contents`, `regist_date`, `update_date`) VALUES
(1, 'email', 'find_password', NULL, '[{{basic.title}}] 비밀번호 찾기', '임시 비밀번호는 [{{password}}] 입니다.', '2022-05-23 19:09:48.000000', '2022-05-23 19:09:52.000000');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `ca_config`
--
ALTER TABLE `ca_config`
  ADD PRIMARY KEY (`groupcd`,`codecd`);

--
-- 테이블의 인덱스 `ca_email_log`
--
ALTER TABLE `ca_email_log`
  ADD PRIMARY KEY (`seq`);

--
-- 테이블의 인덱스 `ca_template`
--
ALTER TABLE `ca_template`
  ADD PRIMARY KEY (`template_seq`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `ca_email_log`
--
ALTER TABLE `ca_email_log`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `ca_template`
--
ALTER TABLE `ca_template`
  MODIFY `template_seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

--0.2.5
-- 추천인코드
ALTER TABLE `ca_member` CHANGE `recommend` `parent_recommend_code` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '추천인코드', CHANGE `recommend_send` `recommend_code` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '본인의 추천인코드';

-- 0.3.0
--Media
-- 테이블 구조 `ca_file`
--

CREATE TABLE `ca_file` (
  `id` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `mime` varchar(100) NOT NULL,
  `org_name` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `path` varchar(200) NOT NULL,
  `dir_path` varchar(200) NOT NULL,
  `url` varchar(255) NOT NULL,
  `regist_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `ca_file`
--
ALTER TABLE `ca_file`
  ADD PRIMARY KEY (`id`);




--- 0.3.3
--
-- 테이블 구조 `ca_member_group_log`
--

CREATE TABLE `ca_member_group_log` (
  `log_seq` int(11) NOT NULL,
  `member_seq` int(11) NOT NULL,
  `prev_group_seq` int(11) NOT NULL,
  `chg_group_seq` int(11) NOT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `ca_member_group_log`
--
ALTER TABLE `ca_member_group_log`
  ADD PRIMARY KEY (`log_seq`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `ca_member_group_log`
--
ALTER TABLE `ca_member_group_log`
  MODIFY `log_seq` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


--0.4.0

--
-- 테이블 구조 `ca_board`
--

CREATE TABLE `ca_board` (
  `seq` int(11) NOT NULL,
  `type` enum('B','A') NOT NULL,
  `id` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `totalnum` bigint(20) NOT NULL,
  `skin_type` enum('default','goods') NOT NULL,
  `skin` varchar(30) NOT NULL,
  `category` text NOT NULL,
  `pagenum` int(11) NOT NULL,
  `head_html_` text NOT NULL,
  `foot_html_` text NOT NULL,
  `auth_read` text NOT NULL,
  `auth_read_use` enum('Y','N') NOT NULL,
  `auth_write_use` enum('Y','N') NOT NULL,
  `auth_write` text NOT NULL,
  `auth_reply_use` enum('Y','N') NOT NULL,
  `auth_reply` text NOT NULL,
  `auth_cmt_use` enum('Y','N') NOT NULL,
  `auth_cmt` text NOT NULL,
  `icon_new_use` enum('Y','N') NOT NULL,
  `icon_new_day` tinyint(4) NOT NULL,
  `icon_new_img` varchar(100) NOT NULL,
  `icon_hot_use` enum('Y','N') NOT NULL,
  `icon_hot_visit` int(11) NOT NULL,
  `icon_hot_img` varchar(100) NOT NULL,
  `autowrite_use` enum('Y','N') NOT NULL,
  `file_use` enum('Y','N') NOT NULL,
  `file_type` enum('all','img') NOT NULL,
  `spam_use` enum('Y','N') NOT NULL,
  `secret_use` enum('A','Y','N') NOT NULL,
  `write_show` enum('ID','ID-NONE','NAME','NAME-NONE','NIC','NIC-NONE','ID-NAME','ID-NAME-NONE','ID-NIC','ID-NIC-NONE') NOT NULL,
  `write_admin` varchar(50) NOT NULL,
  `admin_regist_view` char(1) DEFAULT NULL,
  `icon_admin_img` varchar(100) DEFAULT NULL,
  `write_admin_type` enum('TXT','IMG') NOT NULL,
  `list_show` text NOT NULL,
  `goods_num` int(11) NOT NULL,
  `icon_review_img` varchar(100) NOT NULL,
  `goods_review_type` enum('IMAGE','INT','TEXT') DEFAULT NULL,
  `gallerycell` varchar(100) NOT NULL,
  `cntlength` int(11) NOT NULL,
  `subjectcut` int(11) DEFAULT NULL,
  `contcut` int(11) DEFAULT NULL,
  `bulk_show` varchar(255) DEFAULT NULL,
  `bulk_totprice` tinyint(4) DEFAULT NULL,
  `bulk_payment_type` enum('all','bank') DEFAULT NULL,
  `auth_write_cmt` varchar(255) DEFAULT NULL,
  `viewtype` enum('page','layer') DEFAULT NULL,
  `video_use` enum('Y','N') DEFAULT NULL,
  `video_type` varchar(100) DEFAULT NULL,
  `video_size` varchar(100) DEFAULT NULL,
  `video_size_mobile` varchar(100) DEFAULT NULL,
  `reviewcategory` text DEFAULT NULL,
  `content_default` text DEFAULT NULL,
  `show_name_type` enum('HID','ALL') NOT NULL,
  `show_grade_type` enum('TXT','IMG') NOT NULL,
  `content_default_mobile` text DEFAULT NULL,
  `video_screen` varchar(100) NOT NULL,
  `gallery_list_w` int(11) DEFAULT NULL,
  `gallery_list_h` int(11) DEFAULT NULL,
  `onlyimage_use` enum('Y','N') DEFAULT NULL,
  `writer_date` enum('none','all','regit','login') DEFAULT NULL,
  `recommend_type` enum('1','2','3') NOT NULL,
  `cmt_recommend_type` enum('1','2') NOT NULL,
  `auth_recommend_use` enum('Y','N') NOT NULL,
  `auth_cmt_recommend_use` enum('Y','N') NOT NULL,
  `icon_recommend_img` varchar(40) DEFAULT NULL,
  `icon_none_rec_img` varchar(40) DEFAULT NULL,
  `icon_recommend1_img` varchar(40) DEFAULT NULL,
  `icon_recommend2_img` varchar(40) DEFAULT NULL,
  `icon_recommend3_img` varchar(40) DEFAULT NULL,
  `icon_recommend4_img` varchar(40) DEFAULT NULL,
  `icon_recommend5_img` varchar(40) DEFAULT NULL,
  `icon_cmt_recommend_img` varchar(40) DEFAULT NULL,
  `icon_cmt_none_rec_img` varchar(40) DEFAULT NULL,
  `sub_title` varchar(30) DEFAULT NULL,
  `searchbox_use` enum('Y','N') NOT NULL,
  `searchbox_type` enum('category','review') NOT NULL,
  `categorybox_use` enum('Y','N') NOT NULL,
  `head_slide_banner_use` enum('Y','N') NOT NULL,
  `list_type` enum('default','faq','banner','review') NOT NULL,
  `notice_use` enum('Y','N') NOT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_date` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_board_auth`
--

CREATE TABLE `ca_board_auth` (
  `seq` int(11) NOT NULL,
  `boardid` varchar(30) NOT NULL,
  `board_act` enum('0','1') NOT NULL,
  `board_view` enum('0','1','2') NOT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `manager_seq` int(11) NOT NULL,
  `r_manager_seq` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_board_comment`
--

CREATE TABLE `ca_board_comment` (
  `seq` int(11) NOT NULL,
  `boardid` varchar(30) NOT NULL,
  `parent` int(11) NOT NULL,
  `depth` tinyint(4) NOT NULL,
  `cmtparent` int(11) NOT NULL,
  `display` tinyint(4) NOT NULL,
  `mseq` int(11) NOT NULL,
  `mid` varchar(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pw` varchar(50) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `ip` varchar(25) NOT NULL,
  `agent` varchar(150) DEFAULT NULL,
  `hit` int(11) NOT NULL,
  `sns` enum('facebook','twitter','cyworld','google+','naver','kakao','daum','none','instagram') NOT NULL,
  `adddata` text NOT NULL,
  `hidden` tinyint(4) NOT NULL,
  `recommend` int(11) DEFAULT NULL,
  `none_rec` int(11) DEFAULT NULL,
  `recommend1` int(11) DEFAULT NULL,
  `recommend2` int(11) DEFAULT NULL,
  `recommend3` int(11) DEFAULT NULL,
  `recommend4` int(11) DEFAULT NULL,
  `recommend5` int(11) DEFAULT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_date` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `delete_date` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_board_data`
--

CREATE TABLE `ca_board_data` (
  `seq` int(11) NOT NULL,
  `boardid` varchar(30) NOT NULL,
  `gid` double NOT NULL,
  `depth` tinyint(4) NOT NULL,
  `parent` int(11) NOT NULL,
  `hidden` tinyint(4) NOT NULL,
  `secret` tinyint(4) NOT NULL,
  `display` tinyint(4) NOT NULL,
  `notice` tinyint(4) NOT NULL,
  `member_seq` int(11) NOT NULL,
  `manager_seq` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pw` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel1` varchar(255) DEFAULT NULL,
  `tel2` varchar(255) DEFAULT NULL,
  `category` varchar(30) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `contents` mediumtext NOT NULL,
  `re_subject` varchar(200) DEFAULT NULL,
  `re_contents` text DEFAULT NULL,
  `re_date` datetime DEFAULT NULL,
  `re_mseq` text DEFAULT NULL,
  `upload` text DEFAULT NULL,
  `re_upload` text DEFAULT NULL,
  `hit` int(11) NOT NULL,
  `sns` enum('facebook','twitter','cyworld','google+','naver','kakao','daum','none','instagram') NOT NULL,
  `comment` int(11) NOT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_date` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `delete_date` datetime(6) DEFAULT NULL,
  `ext_date` datetime NOT NULL,
  `cmt_date` datetime NOT NULL,
  `cmt_position` enum('none','bottom','top') NOT NULL,
  `cmt_per_page` int(11) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `agent` varchar(150) DEFAULT NULL,
  `rsms` enum('Y','N') NOT NULL,
  `remail` enum('Y','N') NOT NULL,
  `adddata` text NOT NULL,
  `asort` varchar(10) DEFAULT NULL,
  `goods_seq` text DEFAULT NULL,
  `order_seq` bigint(20) DEFAULT NULL,
  `file_key_w` varchar(255) DEFAULT NULL,
  `file_key_i` varchar(255) DEFAULT NULL,
  `videotmpcode` varchar(100) NOT NULL,
  `score` tinyint(4) DEFAULT NULL,
  `score_avg` int(11) DEFAULT NULL,
  `editor` tinyint(4) NOT NULL,
  `onlynotice` enum('0','1') DEFAULT NULL,
  `insert_image` enum('none','bottom','top') DEFAULT NULL,
  `onlypopup` enum('y','d','0') DEFAULT NULL,
  `onlypopup_sdate` date DEFAULT NULL,
  `onlypopup_edate` date DEFAULT NULL,
  `thumbnail_url` text DEFAULT NULL,
  `banner_url` text DEFAULT NULL,
  `mobile_contents` text DEFAULT NULL,
  `mobile_thumbnail` varchar(255) DEFAULT NULL,
  `mobile_banner` varchar(255) DEFAULT NULL,
  `link_url` text DEFAULT NULL,
  `mobile_link_url` text DEFAULT NULL,
  `recommend` int(11) DEFAULT NULL,
  `recommend1` int(11) DEFAULT NULL,
  `recommend2` int(11) DEFAULT NULL,
  `recommend3` int(11) DEFAULT NULL,
  `recommend4` int(11) DEFAULT NULL,
  `recommend5` int(11) DEFAULT NULL,
  `none_rec` int(11) DEFAULT NULL,
  `npay_answer_send` enum('Y','N') DEFAULT NULL,
  `npay_product_order_id` text DEFAULT NULL,
  `npay_inquiry_id` varchar(20) DEFAULT NULL,
  `npay_answer_id` varchar(20) DEFAULT NULL,
  `send_mbqna` enum('Y','N') DEFAULT NULL,
  `skin` varchar(30) DEFAULT NULL,
  `mobile_image_arr` text DEFAULT NULL,
  `hidden_cmt_use` enum('use','unuse') DEFAULT NULL,
  `view_key` varchar(255) DEFAULT NULL,
  `mid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `ca_board_data_visible_group`
--

CREATE TABLE `ca_board_data_visible_group` (
  `visible_group_seq` int(11) NOT NULL,
  `seq` int(11) DEFAULT NULL,
  `group_seq` int(11) DEFAULT NULL,
  `regist_date` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 인덱스 `ca_board`
--
ALTER TABLE `ca_board`
  ADD PRIMARY KEY (`seq`);

--
-- 테이블의 인덱스 `ca_board_auth`
--
ALTER TABLE `ca_board_auth`
  ADD PRIMARY KEY (`seq`);

--
-- 테이블의 인덱스 `ca_board_comment`
--
ALTER TABLE `ca_board_comment`
  ADD PRIMARY KEY (`seq`);

--
-- 테이블의 인덱스 `ca_board_data_visible_group`
--
ALTER TABLE `ca_board_data_visible_group`
  ADD PRIMARY KEY (`visible_group_seq`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `ca_board`
--
ALTER TABLE `ca_board`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `ca_board_auth`
--
ALTER TABLE `ca_board_auth`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `ca_board_comment`
--
ALTER TABLE `ca_board_comment`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `ca_board_data`
--
ALTER TABLE `ca_board_data`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `ca_board_data_visible_group`
--
ALTER TABLE `ca_board_data_visible_group`
  MODIFY `visible_group_seq` int(11) NOT NULL AUTO_INCREMENT;
