<template>
  <div>
    <div class="commission-stage" v-if="true">
      <span class="text3">请填写您所在律所的收款银行账号，将用于麦律给您结算相关律师费。</span>

      <div class="input-box">
        <span class="text4">账户名称：</span>
        <el-input v-model="bankInform.accountName"></el-input>
        <span class="text4">银行卡号：</span>
        <el-input v-model="bankInform.bankNumber"></el-input>
      </div>
      <div class="input-box">
        <span class="text4">银行名称：</span>
        <el-input v-model="bankInform.bankName"></el-input>
        <span class="text4">支行名称：</span>
        <el-input v-model="bankInform.branchName"></el-input>
      </div>

      <span
        style="font-size:14px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(51,51,51,1);line-height:24px;display:block"
      >上传资料</span>
      <span class="text4" style="color:red;">如果上传文件有多分，请压缩成压缩包上传</span>

      <div class="up-box">
        <div id="father1" class="father">
          <span class="up-text">委托代理合同（盖章版）扫描件:</span>
          <div>
            <button class="button1" id="addButton1">上传</button>
            <div v-if="!!contract.url && !!contract.name" class="upName">
              <a :href="contract.url">{{contract.name}}</a>
              <img
                @click="delet1"
                style="widt:12px;height:12px;margin-left:10px"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
              />
            </div>
          </div>
        </div>

        <div id="father2" class="father">
          <span class="up-text">起诉状:</span>
          <div>
            <button class="button1" id="addButton2">上传</button>
            <div v-if="!!Indictment.url && !!Indictment.name" class="upName">
              <a :href="Indictment.url">{{Indictment.name}}</a>
              <img
                @click="delet2"
                style="widt:12px;height:12px;margin-left:10px"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
              />
            </div>
          </div>
        </div>

        <div id="father3" class="father">
          <span class="up-text">证据目录:</span>
          <div>
            <button class="button1" id="addButton3">上传</button>
            <div v-if="!!evidence.url && !!evidence.name" class="upName">
              <a :href="evidence.url">{{evidence.name}}</a>
              <img
                @click="delet3"
                style="widt:12px;height:12px;margin-left:10px"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
              />
            </div>
          </div>
        </div>

        <div id="father4" class="father">
          <span class="up-text">当事人授权委托书电子稿:</span>
          <div>
            <button class="button1" id="addButton4">上传</button>
            <div v-if="!!empower_letter.url && !!empower_letter.name" class="upName">
              <a :href="empower_letter.url">{{empower_letter.name}}</a>
              <img
                @click="delet4"
                style="widt:12px;height:12px;margin-left:10px"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
              />
            </div>
          </div>
        </div>
      </div>

      <span
        style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:24px;margin-top:15px;display:block"
      >完成上述资料上传之后，请把《委托代理合同》（盖章版）邮寄给我司，并填写快递单号。</span>
      <span class="text5">
        邮寄地址：杭州市余杭区良渚街道起梦科创园A2-517
        <br />收件人：上海麦律网络科技有限公司杭州分公司
        <br />联系电话：4000007151
      </span>

      <div class="foot-box">
        <span class="text6">快递单号(如有)：</span>
        <el-input v-model="caseCourierNumber"></el-input>
      </div>
    </div>
    <div class="footer">
      <div class="footer-button1" @click="sendInform">上传资料</div>
      <div class="footer-button2" @click="cancelSend">取消</div>
    </div>
  </div>
</template>

<script>
import { commissionInform, upFileBack,commissionSend} from "../../../../api/api";
import { upFile, delet } from "../../../../api/plupload4";
export default {
  name: "CommissionStage",
  props: {
    lawyerID: {
      type: String,
      default: "",
    },
    CommissionID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      
      inform: {},
      bankInform: {
        accountName: "",
        bankName: "",
        bankNumber: "",
        branchName: "",
      },
      caseCourierNumber: "",
      contract: {
        url: "",
        name: "",
      },
      Indictment: {
        url: "",
        name: "",
      },
      evidence: {
        url: "",
        name: "",
      },
      empower_letter: {
        url: "",
        name: "",
      },
    };
  },
  methods: {
    
    getInform(){
          commissionInform({
      lawyerId: this.lawyerID,
      caseId: this.CommissionID,
    }).then((res) => {
     
      this.bankInform.accountName = res.accountName;
      this.bankInform.bankName = res.bankName;
      this.bankInform.bankNumber = res.bankNumber;
      this.bankInform.branchName = res.branchName;
      this.caseCourierNumber=res.caseCourierNumber
      if (!!res.contractUrl) {
        this.contract.url = res.contractUrl;
        this.contract.name = res.contractUrl
          .split("/")
          [res.contractUrl.split("/").length - 1].slice(13);
      }
      if(!!res.plaintiffUrl){
         this.Indictment.url = res.plaintiffUrl;
      this.Indictment.name = res.plaintiffUrl
        .split("/")
        [res.plaintiffUrl.split("/").length - 1].slice(13);

      }
      if(!!res.evidenceUrl){
        this.evidence.url = res.evidenceUrl;
      this.evidence.name = res.evidenceUrl
        .split("/")
        [res.evidenceUrl.split("/").length - 1].slice(13);

      }
      if(!!res.entrustUrl){
        this.empower_letter.url = res.entrustUrl;
      this.empower_letter.name = res.entrustUrl
        .split("/")
        [res.entrustUrl.split("/").length - 1].slice(13);
        
      }     
    });

    },
    sendInform() {
      if ((!this.contract.name) && (!this.contract.url) ) {
        window.alert("请先上传委托代理合同（盖章版）扫描件");
      }else{
        commissionSend({
        lawyerId: this.lawyerID,
        caseId: this.CommissionID,
        bankName: this.bankInform.bankName,
        accountName: this.bankInform.accountName,
        bankNumber: this.bankInform.bankNumber,
        branchName: this.bankInform.branchName,
        caseCourierNumber: this.caseCourierNumber,
      }).then((res) => {
        if(res){
        window.alert("上传成功")
        this.$emit("fromCommission", false);
        }else{
          window.alert("提交失败")
        }
      });
      }     
    },
    cancelSend(){
      this.$emit("fromCommission", false);

    },
    up1() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/contract_scanning/";
        upFile("addButton1", "father1", dir, false, true).then((res) => {
          this.contract.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.contract.name = res[0].lastName;
          upFileBack({
            fileName: "委托合同盖章版扫描件",
            fileUrl: this.contract.url,
            caseId: this.CommissionID,
            casePhase: 1,
          }).then((res) => {
            this.up1();
          });
        });
      });
    },
    delet1() {
      this.contract.url = "";
      this.contract.name = "";
    },
    up2() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/Indictment/";
        upFile("addButton2", "father2", dir, false, true).then((res) => {
          this.Indictment.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.Indictment.name = res[0].lastName;
          upFileBack({
            fileName: "起诉状",
            fileUrl: this.Indictment.url,
            caseId: this.CommissionID,
            casePhase: 1,
          }).then((res) => {
            this.up2();
          });
        });
      });
    },
    delet2() {
      this.Indictment.url = "";
      this.Indictment.name = "";
    },
    up3() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/evidence/";
        upFile("addButton3", "father3", dir, false, true).then((res) => {
          this.evidence.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.evidence.name = res[0].lastName;
          upFileBack({
            fileName: "证据目录",
            fileUrl: this.evidence.url,
            caseId: this.CommissionID,
            casePhase: 1,
          }).then((res) => {
            this.up3();
          });
        });
      });
    },
    delet3() {
      this.evidence.url = "";
      this.evidence.name = "";
    },
    up4() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/empower_letter/";
        upFile("addButton4", "father4", dir, false, true).then((res) => {
          this.empower_letter.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.empower_letter.name = res[0].lastName;
          upFileBack({
            fileName: "授权委托书电子稿",
            fileUrl: this.empower_letter.url,
            caseId: this.CommissionID,
            casePhase: 1,
          }).then((res) => {
            this.up4();
          });
        });
      });
    },
    delet4() {
      this.empower_letter.url = "";
      this.empower_letter.name = "";
    },
  },
  mounted() {
    this.getInform()
    this.up1();
    this.up2();
    this.up3();
    this.up4();
    
  },
  created() {},
  watch:{
    CommissionID(){
      if(this.CommissionID!=0){
        this.getInform()
        

      }
      

    }
  }
};
</script>

<style>
.commission-stage .text3 {
  display: block;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  margin-top: 21px;
}
.commission-stage .input-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 48px;
}
.commission-stage .input-box .text4 {
  min-width: 80px;
  display: inline-block;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.commission-stage .input-box .el-input__inner {
  width: 326px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
}
.commission-stage .up-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.commission-stage .father {
  display: flex;
  height: 60px;
  align-items: center;
}
.commission-stage .up-text{
  width:250px;
  text-align: right;
}

.commission-stage .button1 {
  width: 96px;
  height: 32px;
  background: rgba(0, 104, 183, 1);
  border-radius: 4px;
  border: none;
  color: white;
  margin-left: 20px;
}
.commission-stage .upName {
  margin: 5px 0 0 20px;
}

.commission-stage .text5 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.commission-stage .foot-box {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
}
.commission-stage .foot-box .text6 {
  width: 150px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.commission-stage .foot-box .el-input__inner {
  width: 713px;
  height: 30px;
  border: 1px solid rgba(216, 220, 229, 1);
  border-radius: 4px;
}
.up-litigation .footer {
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(238, 238, 238, 1);
}
.footer-button2,
.footer-button1 {
  width: 96px;
  height: 32px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-button1 {
  background-color: #428073;
  color: aliceblue;
}
</style>