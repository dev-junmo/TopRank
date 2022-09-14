import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { MemberSelectPopupService } from '@app/common/popup/member-single-select.popup/index';
import { MemberListStore } from '@app/common/store/member-list.store';

@Component({
    selector: 'coupon-issue',
    templateUrl: './coupon-issue.view.html',
    styleUrls: ['./coupon-issue.view.css'],
})
export class CouponIssueView implements OnInit {

    bsForm: FormGroup;

    @Input() data;

    public targetType = 'all';
    public coupon_count = 1;
    public members = [];
    public groups = [];

    // public groups =
    //     [
    //         // { label:"제한없음", value:0, checked: true},
    //         { label: "일반", value: 1, checked: false},
    //         { label: "VIP", value: 4, checked: false },
    //         { label: "VVIP", value: 2, checked: false},
    //         { label: "tvingKING", value: 3, checked: false},
    //     ]

    constructor(
        baseStore: BSBaseStore,
        private fb: FormBuilder,
        public memberStore: MemberListStore,
        private MemberSelectPopupService : MemberSelectPopupService,
        private router: Router,
        activatedRouter: ActivatedRoute,
        private alert: BSAlertService) {


    }

    ngOnInit() {
        console.log("CouponIssueView::ngOnInit data =>", this.data);
        this.memberStore.listOfGroups().subscribe(resp => {
            console.log('CouponIssueView::ngOnInit::listOfMemberGroupSales resp =>', resp);
            this.groups = resp.list;
        });
    }

    getSubmitData() {

        if (!this.data) { return null; }

        console.log("getSubmitData groups =>", this.groups);

        let data = {
            target_type: this.targetType,
            coupon_seq: this.data.coupon_seq,
            count: this.coupon_count,
            member_seqs: [],
            group_seqs: []
        };

        if (this.targetType == "member") {
            data.member_seqs = this.getMemberSeqs();
        } else if (this.targetType == "group") {
            data.group_seqs = this.getGroupsSeqs();
        }

        console.log("getSubmitData2 data =>", data);

        return data;
    }


    // preparedLoadData(resp) {

    //     console.log("BSUpdateFormController::preparedLoadData resp =", resp);
    //     return resp;
    // }

    // preparedSaveData(value) {

    //     return value;
    // }

    /////////////////////////////////////////////////////
    //

    onChangeTargetType(event) {

        console.log("onChangeTargetType event =>", this.targetType);

        // group, all, member      
        if (this.targetType !== 'member') {
            this.members = [];
        }
    }

    onClickSelectMember() {

        this.MemberSelectPopupService.popup(true).subscribe(resp => {
            console.log("onClickSelectMember resp =>", resp);

            if (resp == 'CANCEL') { return; }
            this.addMembers(resp);
        });
    }

    addMembers(newMembers) {

        for (let newMember of newMembers) {

            let exist = false;
            for(let member of this.members) {
                if (member.member_seq == newMember.member_seq) {
                    exist = true;
                    break;
                }
            }

            if (exist == false) {
                this.members.push(newMember);
            }
        }

    }

    getMemberSeqs() {
        let memberSeqs = [];

        for(let member of this.members) {
            memberSeqs.push(member.member_seq);
        }

        return memberSeqs;
    }

    getGroupsSeqs() {

        let seqs = [];
        for(let group of this.groups) {

            if (group.checked) {
                seqs.push(group.value);
            }
        }

        return seqs;
    }


    onClickDeleteMember(memberSeq) {

        console.log("onClickDeleteMember memberSeq, members =>", memberSeq, this.members);
        let i = 0;
        for(let member of this.members) {
            if (member.member_seq == memberSeq) {
                this.members.splice(i, 1);
                break;
            }
            i++;
        }
    }



//     쿠폰 발급 case -member
// {
// 	"target_type":"member",
// 	"coupon_seq":265,
// 	"member_seqs":[100002001,100002002] // member_seq 리스트로
// }

// 쿠폰발급 case 전체
// {
// "target_type":"all",
// 	"coupon_seq":265,
// }

// 쿠폰발급 case 그룹
// {
// "target_type":"group",
// 	"coupon_seq":265,
// 	"group_seqs”:[1,2]    //group_seqs (1 : 일반, 2 : vvip , 3: tivingKing, 4: VIP)
// }




}
