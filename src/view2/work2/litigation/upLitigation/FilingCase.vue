<template>
  <div class="filing-case">
    <span class="text2" style="margin-top:20px">上传立案资料</span>
    <div class="head-box">
      <div id="father1" class="body-item">
        <span class="text-title">案件受理通知书：</span>
        <div v-if="show">
          <el-button class="button1" id="addButton1">上传</el-button>
          <div
            v-if="!!urlList.case_notification.name && !!urlList.case_notification.url"
            class="upName"
          >
            <a :href="urlList.case_notification.url">{{urlList.case_notification.name}}</a>
            <img
              @click="delet1"
              style="widt:12px;height:12px;margin-left:10px"
              src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
            />
          </div>
        </div>
      </div>
      <div id="father2" class="body-item">
        <span class="text-title">诉讼费缴纳通知书：</span>
        <div v-if="show">
          <el-button class="button1" id="addButton2">上传</el-button>
          <div v-if="!!urlList.legal_costs.name && !!urlList.legal_costs.url" class="upName">
            <a :href="urlList.legal_costs.url">{{urlList.legal_costs.name}}</a>
            <img
              @click="delet1"
              style="widt:12px;height:12px;margin-left:10px"
              src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
            />
          </div>
        </div>
      </div>
      <span  style="color:red;margin-left:80px">上传完诉讼费缴纳通知书后请立即填写或修改诉讼费缴纳期限</span>
      <div class="body-item">
        <span class="text-title">诉讼费缴纳期限：</span>
        <el-date-picker
        v-if="show"
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
      <div class="body-item">
        <span class="text-title">
          诉讼费缴纳凭证：
          <span v-if="!urlList.paymentVoucherUrl">暂无</span>
          <a :href="urlList.paymentVoucherUrl" v-if="!!urlList.paymentVoucherUrl">凭证下载</a>
        </span>
      </div>
    </div>
    <span v-if="this.examine" class="text-green">完成上述资料上传之后，即可申请第一笔律师费。</span>

    <div v-if="!this.examine">
      <span class="text2">首笔律师费</span>

      <div style="height: 200px;margin-left:50px;margin-top:20px;position: relative;">
        <el-steps direction="vertical" finish-status="success" :active="caseState.active">
          <el-step :title="caseState.name" :description="caseState.reason"></el-step>
          <el-step title="打款"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <a v-if="caseState.active==3" :href="caseState.url" class="button3" >查看凭证</a>
      </div>
    </div>

    <div class="footer">
      <div class="footer-button1" @click="sendInform">上传资料</div>
      <div class="footer-button2" @click="cancelSend">取消</div>
    </div>
  </div>
</template>

<script>
import {
  filingCaseSearch,
  upFileBack,
  filingCaseSend,
} from "../../../../api/api";
import { upFile, delet } from "../../../../api/plupload4";
export default {
  name: "FilingCase",
  props: {
    lawyerID: {
      type: String,
      default: "",
    },
    filingCaseID: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      show:true,
      value1: [],
      examine: true,
      caseState: {
        active: 0,
        name: "",
        reason: "",
        url:""
      },
      urlList: {
        case_notification: {
          name: "",
          url: "",
        },
        legal_costs: {
          name: "",
          url: "",
        },
        paymentVoucherUrl: "",
      },
    };
  },
  methods: {
    getInform() {
      filingCaseSearch({
        caseId: this.filingCaseID,
        lawyerId: this.lawyerID,
      }).then((res) => {
        console.log(res)
       
        if (!!res.openCasesUrl) {
          this.urlList.case_notification.url = res.openCasesUrl;
          this.urlList.case_notification.name = res.openCasesUrl
            .split("/")
            [res.openCasesUrl.split("/").length - 1].slice(13);
        }
        if (!!res.legalFeesUrl) {
          this.urlList.legal_costs.url = res.legalFeesUrl;
          this.urlList.legal_costs.name = res.legalFeesUrl
            .split("/")
            [res.legalFeesUrl.split("/").length - 1].slice(13);
        }
        if (!!res.receivedStartTime & !!res.receivedEndTime) {
          this.value1[0] = res.receivedStartTime;
          this.value1[1] = res.receivedEndTime;
        }

        if (res.auditStatus == null) {
          this.examine = true;
        } else {
          this.examine = false;
          if (
            res.auditStatus == "待运营审核" ||
            res.auditStatus == "待财务审核"
          ) {
            this.caseState.active = 0;
            this.caseState.name = "平台审核";
          }
          if (res.auditStatus == "运营驳回" || res.auditStatus == "财务驳回"){
             this.caseState.active = 0;
          this.caseState.name = "平台审核";
          this.caseState.reason = res.rejectedStr;
          }
          if (res.auditStatus == "待财务打款" ){
             this.caseState.active = 1;
          this.caseState.name = "审核通过";
          this.caseState.reason = res.rejectedStr;
          }
           if (res.auditStatus == "结算完成" ){
             this.caseState.active = 3;
          this.caseState.name = "审核通过";
          this.caseState.reason = res.rejectedStr;
          this.caseState.url=res.moneyCertificatesUrl
          }
           
        }
        if (res.paymentVoucherUrl != null) {
          this.urlList.paymentVoucherUrl = res.paymentVoucherUrl;
        }
        this.urlList.paymentVoucherUrl = res.paymentVoucherUrl;
      });
    },
    sendInform() {
      filingCaseSend({
        caseId: this.filingCaseID,
        receivedStartTime: this.value1[0],
        receivedEndTime: this.value1[1],
      }).then((res) => {
        if (res) {
          window.alert("上传成功")
          this.$emit("fromFiling", false);
        } else {
          window.alert("提交失败");
        }
      });
    },
    cancelSend() {
      this.$emit("fromFiling", false);
    },
    up1() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/case_notification/";
        upFile("addButton1", "father1", dir, false, true).then((res) => {
          this.urlList.case_notification.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.case_notification.name = res[0].lastName;
          upFileBack({
            fileName: "案件受理通知书",
            fileUrl: this.urlList.case_notification.url,
            caseId: this.filingCaseID,
            casePhase: 2,
          }).then((res) => {
            this.up1();
          });
        });
      });
    },
    delet1() {
      this.urlList.case_notification.url = "";
      this.urlList.case_notification.name = "";
    },
    up2() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/legal-costs/";
        upFile("addButton2", "father2", dir, false, true).then((res) => {
          this.urlList.legal_costs.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.legal_costs.name = res[0].lastName;
          upFileBack({
            fileName: "诉讼费缴纳通知书",
            fileUrl: this.urlList.legal_costs.url,
            caseId: this.filingCaseID,
            casePhase: 2,
          }).then((res) => {
            this.up2();
          });
        });
      });
    },
    delet2() {
      this.urlList.legal_costs.url = "";
      this.urlList.legal_costs.name = "";
    },
  },
  mounted() {
    this.getInform();
    this.up1();
    this.up2();
   
    if(this.$parent.$parent.state<2){
          this.show=false
        }
  },
  created() {},
  watch: {
    filingCaseID() {
      if (this.filingCaseID != 0) {
        this.getInform();
      
        if(this.$parent.$parent.state<2){
          this.show=false
        }
      }
    },
  },
};
</script>

<style>
.filing-case .text2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: block;
 
  
}

.filing-case .body-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.filing-case .text-title {
  width: 200px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: flex;
  justify-content: flex-end;
}
.filing-case .text-green {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(14, 187, 103, 1);
  line-height: 24px;
}
.filing-case .button1 {
  width: 96px;
  height: 32px;
  background: rgba(0, 104, 183, 1);
  border-radius: 4px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filing-case .upName {
  margin: 5px 0 0 20px;
}
.filing-case .button3{
  text-decoration-line: none;
  color: black;
  width: 90px;
  height: 26px;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  position:absolute;
  left:120px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>