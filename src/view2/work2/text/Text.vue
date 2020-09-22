<template>
  <div class="text">
    <span class="title-text">首页>工作台>文本处理</span>
    <div class="header">
      <span class="title1">服务详情</span>
    </div>

    <div class="serve-inform">
      <div class="inform-header">
        <span class="title2">服务信息</span>
        <span
          class="text1"
          style="color:rgba(250,0,32,1);margin-left:10px"
        >{{textConsumedInfo.orderStatus}}</span>
      </div>
      <div class="inform-body">
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">服务编号：</span>
          <span class="text1" style="margin-left:8px">{{textConsumedInfo.orderId}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">服务类型：</span>
          <span class="text1" style="margin-left:8px">{{textConsumedInfo.schedulingType}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">提交时间：</span>
          <span class="text1" style="margin-left:8px">{{textConsumedInfo.createTime}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">完成时间：</span>
          <span class="text1" style="margin-left:8px"></span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">服务开始时间：</span>
          <span class="text1" style="margin-left:8px"></span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">使用产品：</span>
          <span class="text1" style="margin-left:8px">{{textConsumedInfo.productName}}</span>
        </div>
      </div>
    </div>

    <div class="informs">
      <div class="user-inform">
        <div class="inform-header">
          <span class="title2">委托人信息</span>
        </div>
        <div class="inform-body">
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">用户id：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.userId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">用户昵称：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.userName}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">绑定手机号：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.userMobile}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人姓名：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.clientName}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人身份证：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.clientCertId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人手机号：</span>
            <span class="text1" style="margin-left:8px">{{clientInfo.clientMobile}}</span>
          </div>
        </div>
      </div>
      <div class="lawyer-inform">
        <div class="inform-header">
          <span class="title2">服务律师信息</span>
        </div>
        <div class="inform-body">
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">律师编号：</span>
            <span class="text1" style="margin-left:8px">{{textConsumedLawyerInfo.textLawyerId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">律师姓名：</span>
            <span class="text1" style="margin-left:8px">{{textConsumedLawyerInfo.textLawyerName}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-inform">
      <div class="inform-header">
        <span class="title2">服务资料</span>
      </div>
      <div class="text-body">
        <div class="text-item1">
          <span v-if="textConsumedInfo.schedulingType==='改合同'" class="text2">合同：</span>
          <span v-if="textConsumedInfo.schedulingType==='写律师函'" class="text2">服务类型：写律师函</span>
          <span v-if="textConsumedInfo.schedulingType==='其他文本处理'" class="text2">服务类型：其他文本处理</span>
          <span
            v-if="textConsumedInfo.schedulingType==='写合同'"
            class="text2"
          >合同类型：{{textServiceInfo.consultType}}</span>
          <a
            style="maigin-left:10px"
            v-bind="{href:textServiceInfo.contractTextPath}"
            v:if="textServiceInfo.contractTextPath"
          >{{textServiceInfo.contractTextName}}</a>
          <span style="margin-right:20px;margin-left:20px" v-if="secondRecord==2" class="text2">第一次提交内容</span>
          <a
            style="maigin-left:10px"
            v-bind="{href:textSecondInfo.finishTextPath}"
            v-if="secondRecord==2"
          >{{textSecondInfo.finishTextName}}</a>
          <span style="margin-right:20px" v-if="secondRecord==3" class="text2">第二次提交内容</span>
          <a
            style="maigin-left:10px"
            v-bind="{href:textSecondInfo.secondFinishTextPath}"
            v-if="secondRecord==2"
          >{{textSecondInfo.secondFinishTextName}}</a>
        </div>

        <div class="text-item1" v-if="textUrl!==''">
          <span class="text2">上传资料(文本)：</span>
          <a v-bind="{href:textUrl}">点击下载</a>
        </div>

        <div class="text-item2">
          <div style="min-width:80px">
            <span class="text2">上传资料：</span>
          </div>
          <div style="display:flex;flex-wrap: wrap"  v-viewer="{movable: false}">
            <div
              class="pic2"
              v-for="(item,index) in textServiceInfo.otherTextPath"
              v-bind:key="index"
            >
              <img style="width:100%;height:100%" v-bind="{src:item}" />
            </div>
          </div>
        </div>

        <div class="text-item2" v-if="secondRecord!=1">
          <div style="min-width:80px">
            <span class="text2">第二次补充提交：</span>
          </div>
          <div style="display:flex;flex-wrap: wrap"  v-viewer="{movable: false}">
            <div
              class="pic2"
              v-for="(item,index) in textSecondInfo.secondPhotoPath"
              v-bind:key="index"
            >
              <img v-if="!!item" style="width:100%;height:100%" v-bind="{src:item}" />
            </div>
            
            
          </div>
        </div>

        <div class="text-item2">
          <div style="min-width:80px">
            <span class="text2">{{question}}</span>
          </div>
        </div>

        <el-button
          size="mini"
          style="background:rgba(251,0,32,1);margin-top:40px;color:white;margin-bottom:20px"
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
        <el-button type="primary" style="background-color:white;color:black" @click="cancel">取 消</el-button>
        <el-button type="primary" style="background-color:rgb(45, 202, 147);" @click="orderBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
import { select_textInform, ordre_back } from "../../../api/api";

export default {
  name: "Text2",
  components: {},
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
      } else {
        this.textServiceInfo.otherTextPath.shift();
      }
    },
    cancel(){
       this.dialogDisplay=false,
      this.textarea=""

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
      }
      if (this.textConsumedInfo.schedulingType === "写合同") {
        var str = "";
        for (let key in this.questionOBJ) {
          let arr = key.split("|");
          if (!!arr[1]) {
            str = str + arr[0] + ":" + this.questionOBJ[key] + "。/";
          } else {
            str = str + key + ":" + this.questionOBJ[key] + "。/";
          }
        }
        this.question =
          str + "描述问题：" + this.textServiceInfo.questionDescPath + "。";
      } else {
        var str = "";
        for (let key in this.questionOBJ) {
          str = str + key + ":" + this.questionOBJ[key] + "。/";
        }
        this.question =
          str + "描述问题：" + this.textServiceInfo.questionDescPath + "。";
      }

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
        if(res){
          (this.dialogDisplay = false), (this.textarea = ""); 
        }
        
      });
    },
    showDialog() {
      this.dialogDisplay = true;
    }
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
  },
  created() {
    this.orderId = this.$route.query.orderId;
  }
};
</script>

<style scope>
.text {
  width: 100%;
  min-width: 1200px;
  /* height:50rem; */
  background: rgba(240, 242, 245, 1);
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
}
.text .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.text .header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
}
.text .title1 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
}

.text .text1 {
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(101, 101, 101, 1);
}
.text .text2 {
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  /* line-height:50px; */
}
.text .serve-inform {
  width: 100%;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0px 20px 0 20px;
  margin-top: 16px;
}
.text .inform-header {
  height: 50px;
  border-bottom: 1px rgba(237, 237, 237, 1) solid;
  display: flex;
  align-items: center;
}
.text .inform-body {
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: space-around; */
}
.text .inform-item,
.text .inform-item2 {
  width: 20%;
  height: 30%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.text .inform-item2 {
  width: 33.3%;
}
.text .informs {
  width: 100%;
  height: 133px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
.text .user-inform,
.lawyer-inform {
  width: 49.5%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.text .text-inform {
  margin-top: 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  min-height: 450px;
}
.text .text-body {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
.text .text-item1 {
  height: 50px;
  display: flex;
  align-items: center;
}
.text .text-item2 {
  width: 100%;
  display: flex;
}
.text .pic2 {
  width: 75px;
  height: 120px;
  margin-right: 40px;
  margin-bottom: 20px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
}
</style>