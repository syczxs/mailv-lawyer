<template>
  <div class="video-card">
    <span class="title-text">首页>工作台>进入视频</span>
    <div class="header">视频咨询</div>

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
        <!-- <div class="video-footer"></div> -->
      </div>
      <div class="body-right">
        <div class="user-inform">
          <div class="user-inform-header">
            <span class="title2">委托人信息</span>
          </div>
          <div class="user-inform-body">
            <div class="inform-item">
              <span class="title2">用户id：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.userId}}</span>
            </div>
            <div class="inform-item">
              <span class="title2">用户昵称：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.userName}}</span>
            </div>
            <div class="inform-item">
              <span class="title2">绑定手机：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.userMobile}}</span>
            </div>
            <div class="inform-item">
              <span class="title2">委托人姓名：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.clientName}}</span>
            </div>
            <div class="inform-item">
              <span class="title2">委托人身份证：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.clientCertId}}</span>
            </div>
            <div class="inform-item">
              <span class="title2">委托人手机号：</span>
              <span class="title2" style="color:rgba(102,102,102,1)">{{clientInfo.clientMobile}}</span>
            </div>
          </div>
        </div>

        <div class="text-inform">
          <div class="user-inform-header">
            <span class="title2">委托人信息</span>
          </div>

          <div class="text-body">
            <div class="text-item1">
              <span class="text2">咨询类别：{{videoServiceInfo.consultType}}</span>
            </div>
            <div class="text-item1" v-if="textUrl!==''">
              <span class="text2">上传资料(文本)：</span>
              <a v-bind="{href:textUrl}">点击下载</a>
            </div>
            <div class="text-item2">
              <div style="min-width:80px">
                <span class="text2">上传资料(图片)：</span>
              </div>
              <div style="display:flex;flex-wrap: wrap" v-viewer="{movable: false}">
                <div class="pic2" v-for="(item,index) in imgList2" v-bind:key="index">
                  <img style="width:100%;height:100%" v-bind="{src:item}" />
                </div>
              </div>
            </div>
            <div class="text-item2" style="margin-top:20px">
              <div style="min-width:80px">
                <span class="text2">问题描述：</span>
                <span class="text2">{{videoServiceInfo.questionDescPath}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认弹窗 -->
    <div class="confirm">
      <Confirm
        :confirmDialog="confirm.confirmDialog"
        :operation="confirm.inform"
        :title="confirm.title"
        @getFromConfirm="getFromConfirm"
      />
    </div>
  </div>
</template>

<script>
import VideoCall from "../../../components/VideoCall";
import Confirm from "../../../components/confirm2/Confirm";
import { selectVideoByOrder } from "../../../api/api";
export default {
  name: "Video",
  components: {
    "video-call": VideoCall,
    Confirm
  },
  data() {
    return {
      orderId: "",
      clientInfo: {},
      videoServiceInfo: {},
      imgList: [],
      textUrl: "",
      timing: "",
      roomId: "",
      resTime: "",
      startTime: "",
      // startVideo:false,
      timer2: "",
      hasUseTime: 0,
      useProduct: "",
      confirm: {
        confirmDialog: false,
        title: "",
        inform: ""
      }
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
      console.log(this.textUrl, this.imgList);
    },
    timeStamp() {
      console.log(this.timing);
      let maxtime = this.timing * 60 - this.hasUseTime;
      let timer = setInterval(() => {
        console.log(maxtime)
        if (maxtime == 1500) {
          if (this.useProduct == "麦苗会员套餐") {
           
             this.confirm.confirmDialog = true,
              this.confirm.title = "提示",
              this.confirm.inform = "用户未按时进入房间，订单已取消";
          }
        }
        if (maxtime >= 0) {
          let minutes = Math.floor(maxtime / 60);
          let seconds = Math.floor(maxtime % 60);
          let msg = minutes + "分" + seconds + "秒";
          this.resTime = msg;
          --maxtime;
        } else {
          clearInterval(timer);
          this.resTime = "";
        }
      }, 1000);
    },

    getFromConfirm(date1, date2, date3) {
      console.log(date2);
      if (
        (date2 == "用户未按时进入房间，订单已取消") |
        (date2 ==
          "用户已进入房间，如果一直没有画面(屏幕黑色)，请关闭房间后重新进入房间")
      ) {
        this.confirm.confirmDialog = false;
        this.confirm.title = "";
        this.confirm.inform = "";
      }
    },
    getFromVideo(date) {
     
      this.confirm.confirmDialog = true,
      this.confirm.title = "提示",
      this.confirm.inform ="用户已进入房间，如果未显示画面(屏幕黑色)，请关闭房间后重新进入房间";
     
  
      // this.timeStamp();
    },
    timeCHeck() {
      let nowTime = parseInt(Number(new Date().getTime()) / 1000);
      let aaa = this.startTime.replace(/\.|\-/g, "/");

      let data = parseInt(Number(new Date(aaa).getTime()) / 1000);
      if (nowTime == data) {
        clearInterval(this.timer2);
        this.timeStamp();
      }
      if (nowTime > data) {
        this.hasUseTime = nowTime - data;

        clearInterval(this.timer2);
        this.timeStamp();
      }
    },
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

  computed: {
    imgList2: function() {
      return this.imgList.filter(item => {
        return item != "";
      });
    }
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
      this.roomId = res.videoServiceInfo.videoRoomId;

      if (res.consumedInfo.productName == "麦苗会员套餐") {
        this.timing = 30;
        this.useProduct = "麦苗会员套餐";
      } else {
        this.timing = res.consumedInfo.subjectTime;
        this.useProduct = "单词卡" + res.consumedInfo.subjectTime + "分钟";
      }
      this.startTime = res.consumedInfo.schedulingStartTime;
      this.timer2 = setInterval(this.timeCHeck, 1000);
      // this.timeStamp()

      this.resTime = this.timing + "分钟";
    });
    
  }
};
</script>


<style scoped>
.video-card{
  min-width: 1500px;
}
.video-card .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.video-card .title2 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.video-card .header {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  padding-left: 20px;
  box-sizing: border-box;
}
.body {
  width: 100%;
  margin-top: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.video-card .body-left {
  max-width: 540px;
  height: 700px;
  background-color: #fff;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  padding: 20px 10px 20px 10px;
  margin-right: 19px;
}
.video-header {
  width: 100%;
  height: 50px;
  background: rgba(0, 183, 95, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
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
  flex: 1;
}
.user-inform {
  width: 100%;
  height: 130px;
  background-color: #fff;
  padding: 0px 20px 0 20px;
  box-sizing: border-box;
}
.video-card .user-inform-header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px rgba(238, 238, 238, 1) solid;
  display: flex;
  align-items: center;
}
.video-card .user-inform-body {
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.video-card .inform-item {
  height: 50%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-card .text-inform {
  width: 100%;
  min-height: 590px;
  margin-top: 16px;
  background-color: #fff;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.video-card .text-item1 {
  height: 50px;
  display: flex;
  align-items: center;
}
.video-card .text-item2 {
  width: 100%;
  display: flex;
}
.video-card .pic2 {
  width: 75px;
  height: 120px;
  margin-right: 40px;
  margin-bottom: 20px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
}
.video-card .text2 {
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  /* line-height:50px; */
}
</style>