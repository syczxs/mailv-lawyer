<template>
  <div class="up-litigation">
    <el-dialog
      title="案件简介"
      @close="closeDialog"
      :visible.sync="dialogDisplay"
      width="905px"
      :close-on-click-modal="showClo"
      
    >
      <div class="head-title-box">
        <div v-if="!hasFinish">
        <span v-if="tabSelected==0">基本信息</span>
        <span v-if="tabSelected==1">委托阶段</span>
        <span v-if="tabSelected==2">立案阶段</span>
        <span v-if="tabSelected==3">审判阶段</span>
        <span v-if="tabSelected==4">执行阶段</span>
        </div>
        <span v-if="hasFinish">已完成</span>
      </div>
      <div class="tabList">
        <div :class="[tabSelected==0? 'tab-item2':'tab-item']" @click="tabSwitch(0)">基本信息</div>
        <div :class="[tabSelected==1? 'tab-item2':'tab-item']" @click="tabSwitch(1)">委托阶段</div>
        <div :class="[tabSelected==2? 'tab-item2':'tab-item']" @click="tabSwitch(2)">立案阶段</div>
        <div :class="[tabSelected==3? 'tab-item2':'tab-item']" @click="tabSwitch(3)">审判(仲裁)阶段</div>
        <div :class="[tabSelected==4? 'tab-item2':'tab-item']" @click="tabSwitch(4)">执行阶段</div>
      </div>

      <div v-show="tabSelected==0">
        <EssentialInformation :essentialID="this.upLitigationID"></EssentialInformation>
      </div>

      <div v-if="tabSelected==1">
        <CommissionStage :lawyerID="this.lawyerId" :CommissionID="this.upLitigationCaseID" @fromCommission="getFromCommission"></CommissionStage>
      </div>

      <div v-if="tabSelected==2">
        <FilingCase :lawyerID="this.lawyerId" :filingCaseID="this.upLitigationCaseID" @fromFiling="getFromFiling"></FilingCase>
      </div>

      <div v-if="tabSelected==3">
        <TrialStage :lawyerID="this.lawyerId" :trialStageID="this.upLitigationCaseID" :trailCaseID="this.upLitigationCaseID" @fromTrial="getFromTrial"></TrialStage>
      </div>
         <div v-if="tabSelected==4">
        <ImplementStage :lawyerID="this.lawyerId" :ImplementID="this.upLitigationCaseID" @fromIm="getFromIm"></ImplementStage>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sendLitigationFile } from "../../../api/api";

import CommissionStage from "./upLitigation/CommissionStage";
import EssentialInformation from "./upLitigation/EssentialInformation";
import FilingCase from "./upLitigation/FilingCase";
import TrialStage from "./upLitigation/TrialStage";
import ImplementStage from './upLitigation/ImplementStage'
export default {
  name: "UpLitigation",
  components: {
    CommissionStage,
    EssentialInformation,
    FilingCase,
    TrialStage,
    ImplementStage
  },
  props: {
    lawyerId: {
      type: String,
      default: "",
    },
    upLitigationDialog: {
      type: Boolean,
      default: false,
    },
    upLitigationID: {
      type: Number,
      default: 0,
    },
    upLitigationCaseID: {
      type: String,
      default: "",
    },
    upLitigationState:{
      type: String,
      default: "",

    }
  },
  data() {
    return {
      dialogDisplay: false,
      showClo: false,
      tabSelected: 0,
      hasFinish:false,
      obj:{
        '已代理':0,
        '基本信息':0,
        '委托阶段':1,
        '立案阶段':2,
        '审判阶段':3,
        '执行阶段':4,

      },
      state:0

    };
  },
  methods: {
    closeDialog() { 
      this.dialogDisplay = false;
      this.$emit("fromUpDialog", false);
      this.tabSelected=0,
      this.hasFinish=false,
      this.state=0
      
    },
    tabSwitch(id) {
      this.tabSelected = id; 
    },
    getFromCommission(res){
      if(!res){
        this.closeDialog()
      }
    },
    getFromFiling(res){
      if(!res){
        this.closeDialog()
      }
    },
    getFromTrial(res){
       if(!res){
        this.closeDialog()
      }
    },
    getFromIm(res){
       if(!res){
        this.closeDialog()
      }

    }
  },
  mounted() {

  },

  watch: {
    upLitigationDialog() {
      if (this.upLitigationDialog) {
        this.dialogDisplay = true;
      }
    },
    upLitigationID() {
      console.log(this.upLitigationID)
    },
    upLitigationState(){
      console.log(this.upLitigationState)
      if(this.upLitigationState=="已完结"){
        this.tabSelected=0
        this.hasFinish=true
        this.state=5
      }else{
        this.tabSelected=this.obj[this.upLitigationState]
        this.state=this.tabSelected

      }  
      
    }
  },
};
</script>

<style >
.up-litigation .el-dialog {
  min-height: 820px;
  box-sizing: border-box;
  position: relative;
}
.up-litigation .el-dialog__header {
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
.up-litigation .head-title-box {
  width: 60px;
  height: 20px;
  border: 1px solid rgba(0, 183, 95, 1);
  opacity: 0.5;
  border-radius: 4px;
  position: absolute;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(14, 187, 103, 1);
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  left: 100px;
}
.up-litigation .el-dialog__body {
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 0px 20px 0 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.up-litigation .tabList {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px rgba(237, 237, 237, 1) solid;
}
.up-litigation .tab-item,
.tab-item2 {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: black;
  line-height: 50px;
  padding: 0 15px 0 15px;
}
.tab-item2 {
  color: #fb0036;
  border-bottom: 3px #fb0036 solid;
}
</style>
