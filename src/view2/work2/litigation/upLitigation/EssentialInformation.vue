<template>
  <div class="essential-information">
    <span class="title1">案件编号：{{inform.caseId}}</span>
    <span class="title2">管辖法院：{{inform.competentCourt}}</span>
    <div class="header-box">
      <div class="box1">{{inform.caseType}}</div>
      <span class="text1">
        标的额：
        <span style="color:#FB0036;font-weight:bold">￥{{inform.quantities}}</span>
      </span>
    </div>

    <div class="title-box">
      <div class="line"></div>
      <span class="text2">简介</span>
    </div>
    <span class="text2">{{inform.caseDescription}}</span>
    <div class="title-box" style="margin-top:20px">
      <div class="line"></div>
      <span class="text2">律师费标准</span>
    </div>
    <span class="text2">{{inform.quantities}}</span>

    <div class="title-box" style="margin-top:30px">
      <div class="line"></div>
      <span class="text2">基础资料扫描件</span>
    </div>
    <div style="display:flex;margin-top:20px" v-for="(item,index) in urlList"
            v-bind:key="index">
      <span class="a-text">{{item.name}}</span>
      <a class="a-botton" :href="item.url">下载</a>
    </div>
  </div>
</template>


<script>
import {myLitigationInform }from '../../../../api/api'
export default {
  name: "EssentialInformation",
  props: {
    essentialID: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      inform: {},
      urlList:[]
    };
  },
  methods: {},
  mounted() {
     myLitigationInform({
       id:this.essentialID,
       upload:false
     }).then(res=>{
       this.inform=res
       let arr=res.basicInformation.split(",")
       this.urlList=arr.map(item=>{
         return {
              url:item,
              name:item.split("/")[item.split("/").length-1]
          }
       })
        
     })
    
    
  },
  created() {},
  watch:{
    essentialID(){
      if(this.essentialID!=0){
        myLitigationInform({
       id:this.essentialID,
       upload:false
     }).then(res=>{
       this.inform=res
       let arr=res.basicInformation.split(",")
       this.urlList=arr.map(item=>{
         return {
              url:item,
              name:item.split("/")[item.split("/").length-1]
          }
       })
        
     })

      }
      
      
      
    }
  }
 
};
</script>

<style>
.essential-information .title1 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: block;
  margin-top: 20px;
}

.essential-information .title2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  margin-top: 11px;
  display: block;
}
.up-litigation .header-box {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 21px;
  margin-bottom: 20px;
}
.up-litigation .box1 {
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
.up-litigation .text1 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}

.essential-information .title-box {
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
.essential-information .text2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}

.essential-information .a-text {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-decoration: underline;
  color: rgba(29, 171, 202, 1);
  line-height: 24px;
}
</style>