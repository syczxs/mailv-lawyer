<template>
  <div class="video-card">
    <div
      style="width:100%;height:10%; display: flex;justify-content: center;align-items: center;box-sizing:border-box;background-color:white"
    >
      <div class="header">视频咨询</div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="video-header">
           <div
            style="width:50%;height:100%;display:flex;align-items: center;justify-content: center;font-size:20px"
          >{{this.useProduct}}</div>

          
          <div
            style="width:50%;height:100%;display:flex;align-items: center;justify-content: center;font-size:20px"
          >使用时长{{resTime}}</div>
        </div>
        <div class="video-body">
          <video-call :roomId="roomId" :userIdFrom="clientInfo.userId" @getFromVideo="getFromVideo"></video-call>
        </div>
        <div class="video-footer">
          <!-- <div class="video-footer-buttom" style="background:black;color:white">全屏</div>
          <div v-if="startVideo==false" @click="startTimes" class="video-footer-buttom" style="background:rgb(45,202,147);color:white">开始计时</div>
          <div v-if="startVideo==true" class="video-footer-buttom" style="background:rgb(45,202,147);color:white">暂停计时</div>
          <div class="video-footer-buttom" style="background:red;color:white">关闭视频</div> -->
        </div>
      </div>
      <div class="body-right">
        <div style="width:100%;height:20%;padding-left:2%">
          <div class="inform-header">
            <div
              style="width:100%;height:30%;font-size:20px;padding-left:20px;padding-top:10px;font-weight:600"
            >委托人信息</div>
            <div class="inform-body">
              <div class="inform-item">
                <div class="font">用户id：</div>
                {{clientInfo.userId}}
              </div>
              <div class="inform-item">
                <div class="font">用户昵称：</div>
                {{clientInfo.userName}}
              </div>
              <div class="inform-item">
                <div class="font">绑定手机:</div>
                {{clientInfo.userMobile}}
              </div>
              <div class="inform-item">
                <div class="font">委托人姓名：</div>
                {{clientInfo.clientName}}
              </div>
              <div class="inform-item">
                <div class="font">委托人身份证</div>
                ：{{clientInfo.clientCertId}}
              </div>
              <div class="inform-item">
                <div class="font">委托人手机号;</div>
                {{clientInfo.clientMobile}}
              </div>
            </div>
          </div>
        </div>

        <div style="width:100%;height:80%;padding-left:2%">
          <div
            style="width:100%;font-size:20px;padding-left:20px;padding-top:10px;font-weight:600"
          >服务提交资料</div>
          <div
            style="width:100;font-size:18px;padding-left:20px;margin-top:10px"
          >咨询类别: {{videoServiceInfo.consultType}}</div>
          <div style="height:25%;font-weight:600;padding-left:20%;display:flex">
            相关资料
            <div style="height:100%;display:flex">
              <div
                v-if="textUrl!=''"
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
                v-for="(item,index) in imgList"
                v-bind:key="index"
              >
                <img v-if="item!=''" style="width:100%;height:100%" v-bind="{src:item}" />
                <div v-else> 未上传相关资料</div>
                
              </div>
            </div>
          </div>
          <div style="padding-left:20px;font-size:16px">
            <span>描述问题:</span>
            <span>{{videoServiceInfo.questionDescPath}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCall from "../../components/VideoCall";
import { selectVideoByOrder, } from "../../api/api";
export default {
  name: "Video",
  components: {
    "video-call": VideoCall
  },
  data() {
    return {
      orderId: "",
      clientInfo: {},
      videoServiceInfo: {},
      imgList: [],
      textUrl: "",
      timing:"",
      roomId:"",
      resTime:"",
      startTime:"",
      // startVideo:false,
      timer2:"",
      hasUseTime:0,
      useProduct:""
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
      console.log(this.textUrl,this.imgList)
     
    },
    timeStamp() {
      console.log(this.timing)
      let maxtime = this.timing * 60-this.hasUseTime;
      let timer = setInterval(() => {
        if((this.timing-maxtime)==300){
          if(useProduct=="麦苗会员套餐"){
            window.alert("套餐用户没有上线可关闭次页面")
          }
          

        }
        if (maxtime >= 0) {
          let minutes = Math.floor(maxtime / 60);
          let seconds = Math.floor(maxtime % 60);
          let msg =  minutes + "分" + seconds + "秒";
          this.resTime=msg
          --maxtime;
        } else {
          clearInterval(timer); 
          this.resTime=""
        }
      }, 1000);
    },
    getFromVideo(){
      this.timeStamp()
  
    },
    timeCHeck(){
       let nowTime = parseInt(Number(new Date().getTime()) / 1000) ;
        let aaa = this.startTime.replace(/\.|\-/g, '/')
        
        let data = parseInt(Number(new Date(aaa).getTime())/1000)
        if(nowTime==data){
         
          clearInterval(this.timer2)
          this.timeStamp()
        }if(nowTime>data){
          this.hasUseTime=nowTime-data
          
          clearInterval(this.timer2)
          this.timeStamp()

        }
    }
    // startTimes(){
    //   startVideoTime({
    //     userId:this.clientInfo.userId
    //   }).then(res=>{
    //     console.log("开始计时")
        
    //     this.startVideo=true
    //   }).catch(err=>{
    //     console.log("计时失败")
    //   })

    // }
  },
  created() {},
  mounted() {
    this.orderId = this.$route.query.orderId;
    console.log(this.orderId);
    selectVideoByOrder({
      orderId: this.orderId
    }).then(res => {
      console.log(res);
      this.clientInfo = res.clientInfo;
      this.videoServiceInfo = res.videoServiceInfo;
      this.selectImg();
      this.roomId=res.videoServiceInfo.videoRoomId;

      if(res.consumedInfo.productName=="麦苗会员套餐"){
        this.timing=30
        this.useProduct="麦苗会员套餐"
        
      }else{
        this.timing=res.consumedInfo.subjectTime;
        this.useProduct="单词卡"+res.consumedInfo.subjectTime+"分钟"

      }
      this.startTime=res.consumedInfo.schedulingStartTime
      this.timer2=setInterval(this.timeCHeck,1000)
      // this.timeStamp()

      
      this.resTime=this.timing+"分钟"
     
    });
  }
};
</script>


<style scoped>
.video-card {
  width: 98%;
  height: 96%;
  margin-left: 1%;
  margin-top: 1%;

  box-sizing: border-box;
}
.header {
  width: 96%;
  height: 70%;
  border-bottom: 1px black solid;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 25px;
}

.body {
  width: 100%;
  height: 89%;
  margin-top: 1%;

  box-sizing: border-box;
  display: flex;
}
.body-left {
  width: 30%;
  height: 100%;
  margin-right: 1%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.video-header {
  width: 95%;
  height: 7%;
  background-color: rgb(45, 202, 147);
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.video-body {
  width: 95%;
  height: 90%;
  /* background-color: rgb(102,102,102); */
}
.video-footer {
  display: none;
  width: 95%;
  height: 10%;
  /* display: flex; */
  align-items: center;
  justify-content: space-around;
  align-items: center;
}
.video-footer-buttom {
  width: 30%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.body-right {
  width: 69%;
  height: 100%;
  margin-right: 0%;
  background-color: #fff;
}
.inform-header {
  width: 96%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px black solid;
}
.inform-body {
  width: 100%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
}
.inform-item {
  height: 50%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.font {
  font-weight: 600;
}
</style>