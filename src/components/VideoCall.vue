<template>
  <div class="video_call">
    <div class="info_container">
      <div class="user">
        <label for="userId" class="bmd-label-floating">用户ID:</label>
        <input type="text" class="form-control" name="userId" id="userId" v-model="userId" />
      </div>
      <div class="room">
        <label for="roomId" class="bmd-label-floating">房间号:</label>
        <input type="text" class="form-control" name="roomId" id="roomId" v-model="roomValue" />
      </div>
      <button id="join" type="button" class="joinbtn" @click="joinRoom">加入房间</button>
    </div>
    <div class="stream_container">
      <div id="local_stream" class="video-placeholder">
        <div id="local_video_info" class="video-info"></div>
      </div>
      <div id="remote_stream" class="video-placeholder">
        <div id="remote_video_info" class="video-info"></div>
      </div>
       <div class="fun_con">
      <!-- <div class="full">全屏</div>
      <div v-if="startVideo==false" @click="startTimes" class="pause">开始计时</div>
      <div v-if="startVideo==true" class="pause">暂停计时</div>-->
      <div class="close_video" @click="leave">关闭视频</div>
    </div>
    </div>
   
  </div>
</template>

<script>
import TRTC from "trtc-js-sdk";
import { startVideoTime } from "../api/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      client: "",
      userId: "",
      roomValue: "",
      sdkAppId: "",
      userSig: "",
      localStream: "",
      remoteStreams: [],
      isJoined_: false,
      startVideo: false
    };
  },
  props: {
    roomId: {
      type: String
    },
    userIdFrom: {
      type: String
    }
  },
  created() {
    this.userId = "user_" + parseInt(Math.random() * 100000000);
    // this.roomValue = '889988';
    this.sdkAppId = genTestUserSig(this.userId).sdkAppId;
    this.userSig = genTestUserSig(this.userId).userSig;
  },
  mounted() {},

  methods: {
    async joinRoom() {
      if (this.isJoined_) {
        console.warn("duplicate RtcClient.join() observed");
        return;
      }
      // 创建 client
      if (this.client) return;
      this.client = TRTC.createClient({
        mode: "videoCall",
        sdkAppId: this.sdkAppId,
        userId: this.userId,
        userSig: this.userSig
      });
      // 处理 client 事件
      this.handleEvents();

      try {
        // join the room
        await this.client.join({ roomId: this.roomValue });
        console.log("进房成功");
        this.isJoined_ = true;
      } catch (error) {
        console.error("failed to join room because: " + error);
        console.log("进房错误！");
        return;
      }

      try {
        // 采集摄像头和麦克风视频流
        await this.createLocalStream({ audio: true, video: true });
        console.log("摄像头及麦克风采集成功！");
      } catch (error) {
        console.log("请确认已连接摄像头和麦克风并授予其访问权限！");
        try {
          await this.createLocalStream({ audio: false, video: true });
          console.log("采集摄像头成功！");
        } catch (error) {
          console.error("createLocalStream with video failed: " + error);
          return;
        }
      }
      // 在名为 ‘local_stream’ 的 div 容器上播放本地音视频
      this.localStream.play("local_stream");
      await this.publish();
      console.log("发布本地流成功！");
    },
    handleEvents() {
      this.client.on("peer-join", evt => {
        const userId = evt.userId;
        console.log("peer-join " + userId);
      });
      // 处理远端流增加事件
      this.client.on("stream-added", evt => {
        const remoteStream = evt.stream;
        const id = remoteStream.getId();
        const userId = remoteStream.getUserId();
        console.log(
          `远端流增加 - : [${userId}] ID: ${id} type: ${remoteStream.getType()}`
        );
        console.log("subscribe to this remote stream");
        // 远端流默认已订阅所有音视频，此处可指定只订阅音频或者音视频，不能仅订阅视频。
        // 如果不想观看该路远端流，可调用 this.client.unsubscribe(remoteStream) 取消订阅
        this.client.subscribe(remoteStream);
      });

      // 远端流订阅成功事件
      this.client.on("stream-subscribed", evt => {
        const remoteStream = evt.stream;
        const id = remoteStream.getId();
        // this.remoteStreams.push(remoteStream);
        // this.addView(id);
        // 在指定的 div 容器上播放音视频
        // remoteStream.stop("remote_stream");
        remoteStream.play("remote_stream");

        console.log("远端流订阅成功 -", id);
        this.$emit("getFromVideo", true);
        // window.alert("用户已经进入房间，如果画面还是黑屏状态，请关闭视频后重进房间")
        // this.$notify({
        //   title: "提示",
        //   message:
        //     "用户已经进入房间，如果画面还是黑屏状态，请关闭视频后重进房间！",
        //   position: "top-left"
        // });
      });
      this.client.on("stream-removed", event => {
        const remoteStream = event.stream;
        remoteStream.stop("remote_stream");
        console.log(
          "remoteStream ID: " + remoteStream.getId() + " has been removed"
        );
        // 停止播放并删除相应<video>标签
      });
    },
    //创建本地流
    async createLocalStream(options) {
      this.localStream = TRTC.createStream({
        audio: options.audio, // 采集麦克风
        video: options.video, // 采集摄像头
        userId: this.userId
        // cameraId: getCameraId(),
        // microphoneId: getMicrophoneId()
      });
      // 设置视频分辨率帧率和码率
      this.localStream.setVideoProfile("480p");
      await this.localStream.initialize();
    },
    // 发布本地流
    async publish() {
      try {
        // 发布本地流
        await this.client.publish(this.localStream);
        console.log("发布本地流成功！");
      } catch (error) {
        console.error("failed to publish local stream " + error);
        console.log("发布本地流失败！");
      }
    },
    addView(id) {
      if (!$("#" + id)[0]) {
        $("<div/>", {
          id,
          class: "video-view"
        }).appendTo("#video_grid");
      }
    },
    async leave() {
      if (!this.isJoined_) {
        console.warn("leave() - leave without join()d observed");
        // Toast.error('请先加入房间！');
        this.$notify({
          title: "提示",
          message: "请先加入房间！",
          position: "top-left"
        });
        return;
      }

      if (this.isPublished_) {
        // ensure the local stream has been unpublished before leaving.
        await this.unpublish(true);
      }

      try {
        // leave the room
        await this.client_.leave();
        Toast.notify("退房成功！");
        this.$notify({
          title: "提示",
          message: "退房成功！",
          position: "top-left"
        });
        this.isJoined_ = false;
      } catch (error) {
        console.error("failed to leave the room because " + error);
        location.reload();
      } finally {
        // 停止本地流，关闭本地流内部的音视频播放器
        this.localStream.stop();
        // 关闭本地流，释放摄像头和麦克风访问权限
        this.localStream.close();
        this.localStream = null;
      }
    },
    startTimes() {
      startVideoTime({
        userId: this.userIdFrom
      })
        .then(res => {
          console.log("开始计时");
          this.startVideo = true;
          this.$emit("getFromVideo", true);
        })
        .catch(err => {
          console.log("计时失败");
        });
    }
  },
  watch: {
    roomId() {
      this.roomValue = this.roomId;
      console.log(this.roomId);
    }
    // userId(){
    //   this.userid=this.userId
    // }
  }
};
</script>

<style scoped>
.full {
  width: 30%;
  height: 80%;
  border-radius: 10px;
  background: #333333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pause {
  width: 30%;
  height: 80%;
  border-radius: 10px;
  background: #2dca93;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close_video {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ff0000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.fun_con {
  width:100%;
  position:absolute;
  display: flex;
  justify-content: center;
  height: 15%;
  bottom: 8%;
}
.video_call {
  width: 100%;
  height: 100%;
  /* border:1px solid #808080; */
}
.rtc-primary-bg {
  color: #fff;
  background-color: #00a4ff !important;
  align-items: center;
  
}

.user,
.room {
  width: 45%;
}

.joinbtn {
  width: 16%;
}

.form-control {
  width: 65%;
}

#local_stream {
  width: 10vw;
  height: 10vw;
  position: absolute;
  z-index: 10;
  right: 0px;
}

#local_video_info {
  position: absolute;
}

#local_video_info,
#remote_video_info {
  width: 100%;
  width: 100%;
}
#remote_stream {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
.stream_container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.info_container {
  display: flex;
  margin: 5px;
}
</style>
