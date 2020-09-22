<template>
  <div class="trial-stage">
    <span class="text2" style="margin-top:20px">上传审判资料</span>

    <div class="body-item">
      <span class="title-text">开庭传票：</span>
      <div id="father1" class="father1" v-if="show">
        <el-button class="button1" id="addButton1">上传</el-button>
        <div v-if="!!court_summons.name && !!court_summons.url" style="margin:10px 0px 10px 10px">
          <a :href="court_summons.url">{{court_summons.name}}</a>
          <img
            @click="delet1"
            style="widt:12px;height:12px;margin-left:10px"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
          />
        </div>
      </div>
    </div>

    <div class="body-item">
      <span class="title-text">一审裁判文书：</span>
      <div id="father2" class="father1" v-if="show">
        <el-button class="button1" id="addButton2">上传</el-button>
        <div
          v-if="!!legal_instrument.name && !!legal_instrument.url"
          style="margin:10px 0px 10px 10px"
        >
          <a :href="legal_instrument.url">{{legal_instrument.name}}</a>
          <img
            @click="delet2"
            style="widt:12px;height:12px;margin-left:10px"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
          />
        </div>
      </div>
    </div>

    <div class="body-item">
      <span class="title-text">二审裁判文书（如有）：</span>
      <div id="father3" class="father1" v-if="show">
        <el-button class="button1" id="addButton3">上传</el-button>
        <div
          v-if="!!legal_instrument_second.name && !!legal_instrument_second.url"
          style="margin:10px 0px 10px 10px"
        >
          <a :href="legal_instrument_second.url">{{legal_instrument_second.name}}</a>
          <img
            @click="delet3"
            style="widt:12px;height:12px;margin-left:10px"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
          />
        </div>
      </div>
    </div>

    <div class="body-item">
      <span class="title-text">证据原件快递单号：</span>
      <span>{{expressNumber}}</span>
    </div>

    <div class="body-item">
      <span class="title-text">点击确认收到的原件：</span>
      <el-popover placement="right" width="450" trigger="click" v-model="visible">
        <el-checkbox-group v-model="checkList">
       <el-checkbox v-for="item in filesList" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <el-button size="mini" style="margin-top:10px" @click="sendConfirm">确认</el-button>
        <el-button slot="reference">查看</el-button>
      </el-popover>
      
    </div>

    <span
      style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:24px;margin-top:15px;display:block"
    >完成开庭传票上传后，我司将把证据原件寄给您。</span>
    <span
      style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:24px;margin-top:15px;display:block"
    >完成上述资料上传之后，请把法律文书邮寄给我司，并填写快递单号。</span>
    <span class="text5">
      邮寄地址：杭州市余杭区良渚街道起梦科创园A2-517
      <br />收件人：上海麦律网络科技有限公司杭州分公司
      <br />联系电话：4000007151
    </span>

    <div class="foot-box">
      <span class="text6">快递单号(如有)：</span>
      <el-input v-model="caseCourierNumber" v-if="show"></el-input>
    </div>

    <div class="footer">
      <div class="footer-button1" @click="sendInform">上传资料</div>
      <div class="footer-button2" @click="cancelSend">取消</div>
    </div>
  </div>
</template>

<script>
import {
  trialStageSearch,
  trialStageSend,
  upFileBack,
  trailSelect2,
  confirmEvidence
} from "../../../../api/api";
import { upFile, delet } from "../../../../api/plupload4";
export default {
  name: "TrialStage",
  props: {
    lawyerID: {
      type: String,
      default: "",
    },
    trialStageID: {
      type: String,
      default: "",
    },
    trailCaseID: {
      type: String,
      defaulr: "",
    },
  },

  data() {
    return {
      show: true,
      //开庭传票
      court_summons: {
        name: "",
        url: "",
      },
      //法律文书
      legal_instrument: {
        name: "",
        url: "",
      },
      legal_instrument_second: {
        name: "",
        url: "",
      },
      caseCourierNumber: "",
      checkList: [],
      filesList: [
      ],
      expressNumber: "",
      visible:false
    };
  },
  methods: {
    getInform() {
      trialStageSearch({
        lawyerId: this.lawyerID,
        caseId: this.trialStageID,
      }).then((res) => {
        this.caseCourierNumber = res.caseCourierNumber;
        this.caseCourierNumber = res.courierNumber;
        if (!!res.courtSummonsUrl) {
          this.court_summons.url = res.courtSummonsUrl;
          this.court_summons.name = res.courtSummonsUrl
            .split("/")
            [res.courtSummonsUrl.split("/").length - 1].slice(13);
        }
        if (!!res.firstTrialUrl) {
          this.legal_instrument.url = res.firstTrialUrl;
          this.legal_instrument.name = res.firstTrialUrl
            .split("/")
            [res.firstTrialUrl.split("/").length - 1].slice(13);
        }
        if (!!res.secondTrial) {
          this.legal_instrument_second.url = res.secondTrial;
          this.legal_instrument_second.name = res.secondTrial
            .split("/")
            [res.secondTrial.split("/").length - 1].slice(13);
        }
      });
    },
    getInform2() {
      trailSelect2({
        caseId: this.trailCaseID,
      }).then((res) => {
        console.log(res,"123s");
        this.filesList = res.toBeConfirmedList;
        this.expressNumber = res.caseCourierNumber;
        this.checkList=res.confirmedList
      });
    },
    sendInform() {
      trialStageSend({
        caseId: this.trialStageID,
        courierNumber: this.caseCourierNumber,
      }).then((res) => {
        if (res) {
          window.alert("上传成功");
          this.$emit("fromTrial", false);
        } else {
          window.alert("提交失败");
        }
      });
    },
    cancelSend() {
      this.$emit("fromTrial", false);
    },
    sendConfirm(){
      confirmEvidence({
        caseId:this.trialStageID,
        youCategoryName:this.checkList.join()
      }).then(res=>{
        if(res){
          window.alert("提交成功")
          this.visible=false
        }
      })
      
    },
    up1() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/court_summons/";
        upFile("addButton1", "father1", dir, false, true).then((res) => {
          this.court_summons.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.court_summons.name = res[0].lastName;
          upFileBack({
            fileName: "开庭传票",
            fileUrl: this.court_summons.url,
            caseId: this.trialStageID,
            casePhase: 3,
          }).then((res) => {
            this.up1();
          });
        });
      });
    },
    delet1() {
      this.court_summons.url = "";
      this.court_summons.name = "";
    },
    up2() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/legal_instrument/";
        upFile("addButton2", "father2", dir, false, true).then((res) => {
          this.legal_instrument.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.legal_instrument.name = res[0].lastName;
          upFileBack({
            fileName: "一审法律文书",
            fileUrl: this.legal_instrument.url,
            caseId: this.trialStageID,
            casePhase: 3,
          }).then((res) => {
            this.up2();
          });
        });
      });
    },
    delet2() {
      this.legal_instrument.url = "";
      this.legal_instrument.name = "";
    },
    up3() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/legal_instrument_second/";
        upFile("addButton3", "father3", dir, false, true).then((res) => {
          this.legal_instrument_second.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.legal_instrument_second.name = res[0].lastName;
          upFileBack({
            fileName: "二审法律文书",
            fileUrl: this.legal_instrument_second.url,
            caseId: this.trialStageID,
            casePhase: 3,
          }).then((res) => {
            this.up3();
          });
        });
      });
    },
    delet3() {
      this.legal_instrument_second.url = "";
      this.legal_instrument_second.name = "";
    },
  },
  mounted() {
    console.log(this.$parent.$parent.state, "阶段");
    this.getInform();
    this.getInform2()
    this.up1(), this.up2(), this.up3();

    if (this.$parent.$parent.state < 3) {
      this.show = false;
    }
  },
  created() {},
  watch: {
    trialStageID() {
      if (this.trialStageID != 0) {
        this.getInform();
        if (this.$parent.$parent.state < 3) {
          this.show = false;
        }
      }
    },
  },
};
</script>

<style>
.trial-stage .text2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: block;
}
.trial-stage .title-text {
  width: 200px;
  text-align: right;
}
.trial-stage .body-item {
  display: flex;
  align-items: center;
}
.trial-stage .text5 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.trial-stage .foot-box {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
}
.trial-stage .foot-box .text6 {
  width: 150px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.trial-stage .foot-box .el-input__inner {
  width: 713px;
  height: 30px;
  border: 1px solid rgba(216, 220, 229, 1);
  border-radius: 4px;
}

.button1 {
  width: 96px;
  height: 32px;
  background: rgba(0, 104, 183, 1);
  border-radius: 4px;
  border: none;
  color: white;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>