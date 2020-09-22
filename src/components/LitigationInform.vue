<template>
  <div>
    <div class="out-diadlg">
      <el-dialog
        title="案件简介"
        :visible.sync="dialogDisplay"
        width="476px"
        
        :close-on-click-modal="showClo"
        @close="closeOutDialog"
      >
      <span v-if="accept=='confirm'" class="time-text">{{useTime}}</span>
        <img
          class="img"
          v-if="accept=='accept'"
          src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8D%B0%E7%AB%A0%20%E6%8B%B7%E8%B4%9D%202%402x.png"
        />
        <span class="title1">案件编号：{{inform.caseId}}</span>
        <span class="title2">管辖法院：{{inform.competentCourt}}</span>
        <div class="body-item">
          <div class="box1">{{inform.caseType}}</div>
          <span class="text1">
            标的额：
            <span style="color:#FB0036;font-weight:bold">￥{{inform.quantities}}</span>
          </span>
        </div>

        <div class="body-item2">
          <div class="line"></div>
          <span class="text2">简介</span>
        </div>
        <span class="text2">{{inform.caseDescription}}</span>
        <div class="body-item2" style="margin-top:20px">
          <div class="line"></div>
          <span class="text2">律师费标准</span>
        </div>
        <span class="text2">{{inform.attorneyFeeStandard}}</span>

        <span slot="footer" class="dialog-footer" v-if="accept!='confirm'">
          <el-button v-if="accept=='noaccept'" class="buttom1" @click="acceptLitigation">我要接案</el-button>
          <el-button
            v-if="accept=='accept'"
            class="buttom2"
            style="width:100px"
            @click="acceptLitigation"
          >撤回申请</el-button>

          <el-button class="buttom2" @click="closeOutDialog">关 闭</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-if="accept=='confirm'">
          <el-button  class="buttom1"  @click="acceptLitigation('confirm')">确认承接</el-button>
          <el-button
            class="buttom2"
            style="width:100px"
             @click="acceptLitigation('refuse')"
          >拒绝承接</el-button>

        </span>
      </el-dialog>
    </div>

    <div class="inner-dialog">
      <el-dialog
        width="308px"
        :visible.sync="innerVisible"
        :showClose="showClo"
        :close-on-click-modal="showClo"
      >
        <span v-if="accept=='noaccept'">是否申请代理本案件</span>
        <span v-if="accept=='accept'">
          是否确认
          <span style="color:#407E70">撤销</span>代理本案
        </span>
        <span v-if="accept=='confirm'& confirm==true">是否确认<span style="color:#407E70">承接</span>本案件</span>
         <span v-if="accept=='confirm'& confirm==false">是否<span style="color:#FB0036">拒绝</span>代理本案件</span>
        

        <div class="footer" slot="footer" v-if="accept!='confirm'">
          <div class="footer-item1" @click="closeInnerDialog(true)">确认</div>
          <div class="footer-item2" @click="closeInnerDialog(false)">取消</div>
        </div>
        <div class="footer" slot="footer" v-if="accept=='confirm'">
          <div class="footer-item1" @click="closeInnerDialogConfirm(true)">确认</div>
          <div class="footer-item2" @click="closeInnerDialogConfirm(false)">取消</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { applyLitigation, cancelLitigation,confirmLitigation,confirmLitigationCancel } from "../api/api";
export default {
  name: "LitigationInform",
  props: {
    litigationDialog: {
      type: Boolean,
      default: false
    },
    litigationInform: {
      type: Object,
      default: {}
    },
    lawyerId: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      innerVisible: false,
      dialogDisplay: false,
      showClo: false,
      inform: {},
      pickTime:"",
      useTime:"倒计时",
      useTimeStamp:{},
      confirm:true
    };
  },
  methods: {
    timeStamp(){
       let nowTime = parseInt(new Date().getTime()) / 1000;
          let deadline =
            parseInt(new Date(this.pickTime).getTime()) / 1000 + 6 * 60 * 60;
          if (deadline - nowTime > 0) {
            let runTime = deadline - nowTime;
            let year = Math.floor(runTime / 86400 / 365);
            runTime = runTime % (86400 * 365);
            let month = Math.floor(runTime / 86400 / 30);
            runTime = runTime % (86400 * 30);
            let day = Math.floor(runTime / 86400);
            runTime = runTime % 86400;
            let hour = Math.floor(runTime / 3600);
            runTime = runTime % 3600;
            let minute = Math.floor(runTime / 60);
            runTime = runTime % 60;
            let second = Math.floor(runTime);
            this.useTime =
              "倒计时" + hour + "小时" + minute + "分钟" + second + "秒";
          
        }
    },
    acceptLitigation(res) {
      this.innerVisible = true;
      if(res=="confirm"){
        this.confirm=true
      }else if(res=="refuse"){
        this.confirm=false

      }
      
    },
    closeInnerDialog(res) {
      if (res) {
        if (this.accept=="noaccept") {
          applyLitigation({
            id: this.inform.id,
            lawyerId: this.lawyerId
          }).then(res => {
            if (res) {
              window.alert("申请成功")
              this.innerVisible = false;
            } else {
              window.alert("申请失败");
            }
          });
        } else {
          cancelLitigation({
            id: this.inform.id,
            lawyerId: this.lawyerId
          }).then(res => {
            if (res) {
              window.alert("撤销成功")
              this.innerVisible = false;
            } else {
              window.alert("撤销失败");
            }
          });
        }
      } else {
        this.innerVisible = false;
      }
    },
    closeInnerDialogConfirm(res){
      if(res){
        if(this.confirm){
          confirmLitigation({
             id: this.inform.id,
            lawyerId: this.lawyerId
          }).then(res=>{
            if (res) {
              window.alert("承接成功")
              this.innerVisible = false;
              this.closeOutDialog() 
              
            } else {
              window.alert("承接失败");
            }
            this.closeOutDialog()   
          })

        }else{
         
          confirmLitigationCancel({
             id: this.inform.id,
            lawyerId: this.lawyerId
          }).then(res=>{
            if (res) {
              window.alert("拒绝成功")
              this.innerVisible = false;
              this.closeOutDialog() 
            } else {
              window.alert("拒绝失败");
            } 
            this.closeOutDialog()  
          })

        }
      }else{
        this.innerVisible=false
      }

    },
    
  
    closeOutDialog() {
      this.dialogDisplay = false;
      this.$emit("getFromInform", false);
      if(this.accept=="confirm"){
        clearInterval(this.useTimeStamp)
      }
    }
  },
  //   computed: {
  //     getInform: function() {
  //       return this.changeInform;
  //     }
  //   },

  watch: {
    litigationDialog() {

      this.dialogDisplay = this.litigationDialog;
    },
    litigationInform() {
      this.inform = this.litigationInform;
      if(this.accept=="confirm"){
        this.pickTime=this.inform.pickTime
        this.useTimeStamp=setInterval(this.timeStamp,1000)
        
      }
    }
  }
};
</script>

<style >
.ligitation-inform .out-diadlg .el-dialog {
  min-height: 562px;
  box-sizing: border-box;
  position: relative;
}
.ligitation-inform .out-diadlg .el-dialog__header {
  box-sizing: border-box;
  height: 50px;
  /* padding: 40px; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px rgba(237, 237, 237, 1) solid;
}
.ligitation-inform .out-diadlg .el-dialog__body {
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 23px 20px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ligitation-inform .out-diadlg .title1 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.ligitation-inform .out-diadlg .title2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  margin-top: 11px;
}
.out-diadlg .body-item {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 21px;
  margin-bottom: 20px;
}
.out-diadlg .box1 {
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  height: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ligitation-inform .out-diadlg.text1 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}
.ligitation-inform .out-diadlg .body-item2 {
  height: 20px;
  display: flex;
  align-items: center;
}
.line {
  width: 2px;
  height: 15px;
  background: rgba(26, 193, 148, 1);
  border-radius: 1px;
  margin-right: 10px;
}
.ligitation-inform .out-diadlg .text2 {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}

.ligitation-inform .out-diadlg .el-dialog__footer {
  display: block;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 0%;
  position: absolute;
  bottom: 0px;
}
.ligitation-inform .out-diadlg .dialog-footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ligitation-inform .out-diadlg .buttom1,
.buttom2 {
  width: 96px;
  height: 32px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttom1 {
  background-color: #428073;
  color: aliceblue;
}
.inner-dialog .el-dialog {
  height: 166px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
}
.inner-dialog .el-dialog__header {
  padding: 0;
  height: 0;
}

.inner-dialog .el-dialog__body {
  width: 100%;
  height: 123px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  font-size: 18px;
  padding: 0;
}
.inner-dialog .el-dialog__footer {
  width: 100%;
  padding: 0;
  height: 43px;
}
.inner-dialog .el-dialog__footer .footer {
  display: flex;
  width: 100%;
  height: 100%;
}
.inner-dialog .el-dialog__footer .footer-item1,
.footer-item2 {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #407e70;
  color: white;
}
.footer-item2 {
  background-color: #fff;
  color: black;
}
.img {
  width: 111px;
  height: 93px;
  position: absolute;
  right: 50px;
  top: 20px;
}
.time-text{
  position: absolute;
  
  height:11px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,150,0,1);
  top: 20px;
  left:100px

}
</style>
