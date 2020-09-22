<template>
  <div class="my-litigation-inform">
      <el-dialog
        title="案件简介"
        :visible.sync="dialogDisplay"
        width="476px"
        @close='closeDialog'
        :close-on-click-modal="showClo"
      >
        
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

      


        <div class="body-item2" style="margin-top:30px">
          <div class="line"></div>
          <span class="text2">基础资料扫描件</span>
        </div>
        <div v-for="(item,index) in urlList" v-bind:key="index" style="display:flex"
        > <span class="text3" >{{item.name}}</span> <a class="a-botton" :href="item.url">下载</a> </div>
        
        
      </el-dialog>
    </div>

 
</template>

<script>

export default {
  name: "MyLitigationInform",
  props: {
    litigationDialog: {
      type: Boolean,
      default: false
    },
    litigationInform: {
      type: Object,
      default: {}
    },
    // lawyerId: {
    //   type: String,
    //   default: ""
    // },
    // accept: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      dialogDisplay: false,
      showClo: false,
      inform: {},
      urlList:[]
    };
  },
  methods: {
      //关闭弹框的事件
    closeDialog(){
      this.dialogDisplay = false;
      this.$emit("getFromInform", false);
    },
  },

  watch: {
    litigationDialog() {
      console.log(this.litigationDialog);

      this.dialogDisplay = this.litigationDialog;
    },
    litigationInform() {
      this.inform = this.litigationInform;
      let arr1=this.litigationInform.basicInformation.split(",")
      let arr2=arr1.map(item=>{
          return {
              url:item,
              name:item.split("/")[item.split("/").length-1]
          }
      })
      this.urlList=arr2
      
    },
    
  }
};
</script>

<style >
.my-litigation-inform .el-dialog {
  min-height: 562px;
  box-sizing: border-box;
  position: relative;
}
.my-litigation-inform  .el-dialog__header {
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
.my-litigation-inform  .el-dialog__body {
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 23px 20px 0 20px;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
}
.my-litigation-inform  .title1 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.my-litigation-inform  .title2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  margin-top: 11px;
}
.my-litigation-inform  .body-item {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 21px;
  margin-bottom: 20px;
}
.my-litigation-inform .box1 {
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
.my-litigation-inform .text1 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}
.my-litigation-inform  .body-item2 {
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
.my-litigation-inform  .text2 {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.my-litigation-inform  .text3{
  
font-size:14px;
font-family:Microsoft YaHei;
font-weight:400;
text-decoration:underline;
color:rgba(29,171,202,1);
line-height:24px;
}
.a-botton{
    width:60px;
    height:20px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(204,204,204,1);
    border-radius:4px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration:none;
    color: rgba(102,102,102,1);
    margin-left: 20px;

}




</style>
