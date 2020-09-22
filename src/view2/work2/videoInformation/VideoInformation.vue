<template>
  <div class="text">
    <span class="title-text">首页>工作台>视频详情</span>
    <div class="header">
      <span class="title1">服务详情</span>
    </div>

    <div class="serve-inform">
      <div class="inform-header">
        <span class="title2">服务信息</span>
        <span class="text1" style="color:rgba(250,0,32,1);margin-left:10px">{{serveInform.orderStatus}}</span>
      </div>
      <div class="inform-body">
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">服务编号：</span>
          <span class="text1" style="margin-left:8px">{{serveInform.orderId}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">预约发起时间：</span>
          <span class="text1" style="margin-left:8px">{{serveInform.appointBeginTime}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">预约时段：</span>
          <span class="text1" style="margin-left:8px">{{serveInform.appointTime}}</span>
        </div>
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">服务开始时间：</span>
          <span class="text1" style="margin-left:8px">{{serveInform.schedulingStartTime}}</span>
        </div>
       
        <div class="inform-item">
          <span class="text1" style="color:rgba(51,51,51,1)">使用产品：</span>
          <span class="text1" style="margin-left:8px">{{serveInform.productName}}</span>
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
            <span class="text1" style="margin-left:8px">{{peopleInform.userId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">用户昵称：</span>
            <span class="text1" style="margin-left:8px">{{peopleInform.userName}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">绑定手机：</span>
            <span class="text1" style="margin-left:8px">{{peopleInform.userMobile}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人姓名：</span>
            <span class="text1" style="margin-left:8px">{{peopleInform.clientName}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人身份证：</span>
            <span class="text1" style="margin-left:8px">{{peopleInform.clientCertId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">委托人手机号：</span>
            <span class="text1" style="margin-left:8px">{{peopleInform.clientMobile}}</span>
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
            <span class="text1" style="margin-left:8px">{{lawyerInform.lawyerId}}</span>
          </div>
          <div class="inform-item2">
            <span class="text1" style="color:rgba(51,51,51,1)">律师姓名：</span>
            <span class="text1" style="margin-left:8px">{{lawyerInform.lawyerName}}</span>
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
          <span class="text2">咨询类别：{{videoServiceInfo.consultType}}</span>
        </div>
        <div class="text-item1" v-if="textUrl!==''">
          <span class="text2">上传资料(文本)：</span>
          <a  v-bind="{href:textUrl}">点击下载</a>
        </div>
        <div class="text-item2">
          <div style="min-width:80px">
            <span class="text2">上传资料(图片)：</span>
          </div>
          <div style="display:flex;flex-wrap: wrap" v-viewer="{movable: false}">
            <div class="pic2"  v-for="(item,index) in imgList2" v-bind:key="index" >
               <img  style="width:100%;height:100%" v-bind="{src:item}" />
            </div>
          </div>
        </div>
        <div class="text-item2" style="margin-top:20px">
          <div style="min-width:80px">
            <span class="text2">问题描述：</span>
             <span class="text2">{{videoServiceInfo.questionDescPath}}</span>
          </div>
          
          <span></span>
        </div>

        <!-- <el-button size="mini" style="background:rgba(251,0,32,1);margin-top:40px;color:white">打回</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import {selectVideoByOrder} from "../../../api/api";

export default {
  name: "VideoInformation",
  components: {},
  data() {
    return {
      serveInform:{
            orderId: "无数据",
            appointBeginTime: "无数据",
            appointTime: "无数据",
            schedulingStartTime: "无数据",
            productName: "无数据",
            orderStatus: "无数据"
        },
        peopleInform:{
            userId: "无数据",
            userName: "无数据",
            userMobile: '无数据',
            clientName: "无数据",
            clientCertId: "无数据",
            clientMobile: "无数据",
        },
        lawyerInform:{
            lawyerId: "无数据",
            lawyerName: "无数据"
        },
        videoServiceInfo:{

        },
        textUrl:"",
        imgList:[]
    };
  },

  methods: {
     selectImg() {
      this.imgList = this.videoServiceInfo.otherTextPath.split(",");
      if (
        this.imgList[0].indexOf(".doc") !== -1 ||
        this.imgList[0].indexOf(".doxc") !== -1 ||
        this.imgList[0].indexOf(".txt") !== -1
      ) {
        this.textUrl = this.imgList[0];
        this.imgList.shift();
      }
     
    },
  },
  computed: {
    imgList2: function() {
      return this.imgList.filter(item => {
        return item != "";
      });
    }
  },
  mounted() {
      selectVideoByOrder({
      orderId: this.orderId
    }).then(res => {
      console.log(res);
      this.serveInform=res.consumedInfo
      this.peopleInform=res.clientInfo
      this.lawyerInform=res.consumedLawyerInfo
      this.videoServiceInfo=res.videoServiceInfo,
      this.selectImg()
      
     
    });
    
  },
  created(){
    this.orderId = this.$route.query.orderId
      console.log(this.orderId)
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
.text .user-inform,.lawyer-inform {
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