<template>
  <div class="text-card">
    <div style="height:8%;width:100%;display:flex;justify-content: center;">
      <div class="header">服务详情</div>
    </div>

    <!--服务信息-->
    <div class="serveInform">
      <div class="serveInformHead">
        <span class="titleSize">服务信息</span>
        <span style="font-weight: 600;margin-right: 10px;vertical-align:text-bottom">状态</span>
        <span>{{textConsumedInfo.orderStatus}}</span>
      </div>
      <div class="serveInformBody">
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">服务编号</span>
          <span>{{textConsumedInfo.orderId}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">服务类型</span>
          <span>{{textConsumedInfo.schedulingType}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">预约发起时间</span>
          <span>{{textConsumedInfo.createTime}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">预约时段</span>
          <span></span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">服务开始时间</span>
          <span></span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">使用产品</span>
          <span>{{textConsumedInfo.productName}}</span>
        </div>
      </div>
    </div>

    <!--用户信息-->
    <div class="userInform">
      <div class="userInformHead">
        <span class="titleSize">委托人信息</span>
      </div>
      <div class="userInformBody">
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">用户Id</span>
          <span>{{clientInfo.userId}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">用户昵称</span>
          <span>{{clientInfo.userName}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">绑定手机号</span>
          <span>{{clientInfo.userMobile}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人姓名</span>
          <span>{{clientInfo.clientName}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人身份证</span>
          <span>{{clientInfo.clientCertId}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人手机号</span>
          <span>{{clientInfo.clientMobile}}</span>
        </div>
      </div>
    </div>

    <div class="lawyerInform">
      <div class="lawyerInformHead">
        <span class="titleSize">服务律师信息</span>
      </div>
      <div class="lawyerInformBody">
        <div class="lawyerInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">律师编号</span>
          <span>{{textConsumedLawyerInfo.textLawyerId}}</span>
        </div>
        <div class="lawyerInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">律师姓名</span>
          <span>{{textConsumedLawyerInfo.textLawyerName}}</span>
        </div>
      </div>
    </div>

    <div class="serveData">
      <div style="height:10%">
        <span class="titleSize">服务资料</span>
      </div>
      <div
        v-if="textConsumedInfo.schedulingType==='改合同'"
        style="height:5%;width:100%;font-weight:600;padding-left:10%;display:flex;"
      >
        <span style="margin-right:20px">合同</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textServiceInfo.contractTextPath}"
          v:if="textServiceInfo.contractTextPath"
        >{{textServiceInfo.contractTextName}}</a>
        <span style="margin-right:20px" v-if="secondRecord==2">第一次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.finishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.finishTextName}}</a>
        <span style="margin-right:20px" v-if="secondRecord==3">第二次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.secondFinishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.secondFinishTextName}}</a>
      </div>
      <div
        v-if="textConsumedInfo.schedulingType==='写合同'"
        style="height:5%;width:100%;font-weight:600;padding-left:10%;display:flex;"
      >
        <span style="margin-right:20px">合同类别</span>
        <div
          style="maigin-left:10px"
          v-bind="{href:textServiceInfo.consultType}"
          v:if="textServiceInfo.contractTextPath"
        >{{textServiceInfo.consultType}}</div>
        <span style="margin-right:20px" v-if="secondRecord==2">第一次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.finishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.finishTextName}}</a>
        <span style="margin-right:20px" v-if="secondRecord==3">第二次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.secondFinishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.secondFinishTextName}}</a>
      </div>
      <div
        v-if="textConsumedInfo.schedulingType==='写律师函'"
        style="height:5%;width:100%;font-weight:600;padding-left:10%;display:flex;"
      >
        <span style="margin-right:20px">服务类型：写律师函</span>
        <span style="margin-right:20px" v-if="secondRecord==2">第一次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.finishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.finishTextName}}</a>
        <span style="margin-right:20px" v-if="secondRecord==3">第二次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.secondFinishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.secondFinishTextName}}</a>
      </div>
      <div
        v-if="textConsumedInfo.schedulingType==='其他文本处理'"
        style="height:5%;width:100%;font-weight:600;padding-left:10%;display:flex;"
      >
        <span style="margin-right:20px">服务类型:其他文件</span>
        <span style="margin-right:20px" v-if="secondRecord==2">第一次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.finishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.finishTextName}}</a>
        <span style="margin-right:20px" v-if="secondRecord==3">第二次提交内容</span>
        <a
          style="maigin-left:10px"
          v-bind="{href:textSecondInfo.secondFinishTextPath}"
          v-if="secondRecord==2"
        >{{textSecondInfo.secondFinishTextName}}</a>
      </div>
      <div style="height:35%;font-weight:600;padding-left:10%;display:flex">
        相关资料
        <div style="height:100%;display:flex">
          <div
            v-if="textUrl!==''"
            style="height:100%;width:100px;margin-left:10px;border:1px black solid;box-sizing: border-box;padding:1px;display:flex;align-items: center;justify-content:center"
          >
            <a style="width:50%;height:50%" v-bind="{href:textUrl}">
              <img
                style="width:100%;height:100%"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/wetchatapplet_mailv/images/my/WORD.png"
              />
            </a>
          </div>
          <div
            style="height:100%;width:100px;margin-left:10px;border:1px black solid;box-sizing: border-box;padding:1px"
            v-for="(item,index) in textServiceInfo.otherTextPath"
            v-bind:key="index"
            
          >
            <img v-if="!!item" style="width:100%;height:100%" v-bind="{src:item}" />
            <div v-else>未上传资料</div>
          </div>
        </div>

        <span v-if="secondRecord!=1">第二次提交补充</span>
        <div v-if="secondRecord!=1" style="height:100%;display:flex">
          <div
            style="height:100%;width:100px;margin-left:10px;border:1px black solid;box-sizing: border-box;padding:1px"
            v-for="(item,index) in textSecondInfo.secondPhotoPath"
            v-bind:key="index"
          >
            <img style="width:100%;height:100%" v-bind="{src:item}" />
          </div>
        </div>
      </div>

      <div
        style="height:35%;font-weight:600;padding-left:10%;display:flex;border-bottom: 1px black solid;"
      >
        问题描述
        <span style="font-weight:500;margin-left:10px">{{question}}</span>
        <div style="height:100%"></div>
      </div>
      <div style="height:15%;display:flex; align-items: center">
        <el-button
          size="small"
          v-if="textConsumedInfo.schedulingType==='改合同'"
          style="background-color:orange;color:white;"
          @click="showDialog"
        >打回</el-button>
      </div>
    </div>
    <el-dialog
      title="打回原因"
      :visible.sync="dialogDisplay"
      width="35%"
      :showClose="showClo"
      :close-on-click-modal="showClo"
    >
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="300"
        show-word-limit
      ></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="background-color:rgb(45, 202, 147);" @click="orderBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { select_textInform, ordre_back } from "../../api/api";
export default {
  name: "TextInform",
  data() {
    return {
      orderId: "",
      textConsumedInfo: {},
      clientInfo: {},
      textConsumedLawyerInfo: {},
      textServiceInfo: {},
      questionOBJ: {},
      textUrl: "",
      question: "",
      secondRecord: 1,
      textSecondInfo: {},
      dialogDisplay: false,
      showClo: false,
      textarea: ""
    };
  },
  methods: {
    selectImg() {
      if (!!this.textServiceInfo.otherTextPath[0]) {
        if (
          this.textServiceInfo.otherTextPath[0].indexOf(".doc") !== -1 ||
          this.textServiceInfo.otherTextPath[0].indexOf(".doxc") !== -1 ||
          this.textServiceInfo.otherTextPath[0].indexOf(".txt") !== -1
        ) {
          this.textUrl = this.textServiceInfo.otherTextPath[0];
          this.textServiceInfo.otherTextPath.shift();
        }
      }
    },
    takeText() {
      if (this.textConsumedInfo.schedulingType === "其他文本处理") {
        var str = "";
        str =
          "委托目的：" +
          this.questionOBJ.objective +
          "。" +
          "事实描述:" +
          this.questionOBJ.describe +
          "。";
        this.question =
          str + "描述问题：" + this.textServiceInfo.questionDescPath;
      } if(this.textConsumedInfo.schedulingType === "写合同"){
          var str = "";
        for (let key in this.questionOBJ) {
          let arr=key.split("|")
          if(!!arr[1]){
            str = str +arr[0]+":"+ this.questionOBJ[key] + "。/";

          }else{
            str = str +key+":"+ this.questionOBJ[key] + "。/";
          }
          
        }
        this.question =
          str + "描述问题：" + this.textServiceInfo.questionDescPath + "。";

      }
      else {
        var str = "";
        for (let key in this.questionOBJ) {
          str = str +key+":"+ this.questionOBJ[key] + "。/";
        }
        this.question =
          str + "描述问题：" + this.textServiceInfo.questionDescPath + "。";
      }
      console.log(this.textSecondInfo);
      if (!!this.textSecondInfo.secondSuggestion) {
        this.question =
          this.question +
          "问题描述补充：" +
          this.textSecondInfo.secondSuggestion;
      }
    },
    orderBack() {
      ordre_back({
        orderId: this.orderId,
        backReason: this.textarea
      }).then(res => {
        console.log(res);
        (this.dialogDisplay = false), (this.textarea = "");
      });
    },
    showDialog() {
      this.dialogDisplay = true;
    }
  },
  created() {
    console.log;
    this.orderId = this.$route.query.orderId;
    console.log(this.orderId);
  },
  mounted() {
    select_textInform({
      orderId: this.orderId
    }).then(res => {
      console.log(res, "123");
      this.textConsumedInfo = res.textConsumedInfo;
      this.clientInfo = res.clientInfo;
      (this.textConsumedLawyerInfo = res.textConsumedLawyerInfo),
        (this.textServiceInfo = res.textServiceInfo);
      this.questionOBJ = JSON.parse(res.textServiceInfo.factorDescJson);
      console.log(this.questionOBJ);

      if (!!res.textServiceRecord) {
        if (!!res.textServiceRecord.secondFinishTextName) {
          this.secondRecord = 3;
          this.textSecondInfo = res.textServiceRecord;
        } else {
          this.secondRecord = 2;
          this.textSecondInfo = res.textServiceRecord;
        }
      }
      this.selectImg();
      this.takeText();
    });
  }
};
</script>

<style scoped>
.text-card {
  width: 98%;
  height: 96%;
  margin-left: 1%;
  margin-top: 1%;
  background-color: white;
  padding: 0% 1% 0% 1%;
}
.header {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px black solid;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
}
.titleSize {
  font-weight: 600;
  font-size: 3vh;
  margin-right: 10px;
}

.inside-head {
  width: 96%;
  height: 8%;
  font-size: 3vh;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px black solid;
}
.serveInform,
.userInform {
  height: 15%;
  width: 96%;
}

.serveInformHead,
.userInformHead {
  height: 40%;
  display: flex;
  align-items: flex-end;
}

.serveInformBody {
  height: 60%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.userInformBody {
  height: 60%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.serveInformBodySon {
  width: 25%;
  text-align: center;
}

.userInformBodySon {
  width: 33%;
  text-align: center;
}

.lawyerInform {
  height: 12%;
  width: 96%;
}

.lawyerInformHead {
  height: 60%;
  display: flex;
  align-items: flex-end;
}

.lawyerInformBody {
  height: 40%;
  width: 50%;
  display: flex;
  align-items: center;
}

.lawyerInformBodySon {
  width: 33%;
  text-align: center;
}
.serveData {
  height: 50%;
}

.text-card >>> .el-dialog {
  border-radius: 20px;
  height: 40%;
  box-sizing: border-box;
}
.text-card >>> .el-dialog__header {
  box-sizing: border-box;
  height: 20%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-card >>> .el-dialog__body {
  height: 60%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;
}
.text-card >>> .body-item {
  margin-bottom: 5%;
}

.text-card >>> .el-dialog__footer {
  height: 20%;
  box-sizing: border-box;
  border-top: 1px rgb(215, 215, 215) solid;
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 0%;
}
.text-card >>> .el-textarea {
  height: 100%;
}
.text-card >>> .el-textarea__inner {
  height: 100%;
}
</style>