<template>
  <div class="login">
    <div class="bgc"></div>
    <div class="login_box">
      <div class="box_left">
        <img
          style="width:100%;height:100%;border-radius:16px 0px 0 16px;position: absolute"
          :src="imgUrl"
        />
        <div class="pic_title">
          <img
            style="width:80%;height:60%"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/logo.png"
          />
        </div>
      </div>
      <div class="box_right">
        <h1>麦律律师系统</h1>

        <el-form>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="input-box">
              <el-input v-model="loginForm.password" placeholder="请输入验证码"></el-input>
              <el-button
                class="el-button"
                @click="getMes"
                :loading="wait"
                :disabled="wait"
              >{{buttom_text}}</el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <!-- <div class="buttom"  @click="getMes">获取验证码</div> -->
          </el-form-item>

          <el-form-item>
            <el-button class="buttom"  @click="login">登录</el-button>
            <div
              v-if="this.token===true"
              style="color:red;width:100%;display:flex;justify-content: center"
            >登陆失败</div>
          </el-form-item>
        </el-form>

        <div class="agreement_box">
          <span class="agree_text">
            没有账号？
            <a href="https://www.mailvjt.com:8090/#/register" class="link">注册</a>
          </span>
          
        </div>

      </div>
    </div>
  </div>
</template>  

<script>
import { getMessage, lawyerLogin } from "../../api/api";
import imgSrc from "../../assets/pic/shutterstock_396850561-min.jpg";
export default {
  name: "Login",
  data() {
    return {
      imgUrl: imgSrc,
      loginForm: {
        username: "",
        password: ""
      },
      token: false,
      buttom_text: "获取",
      send_time: "",
      timestamp: {},
      wait: false
    };
  },
  methods: {
    login() {
      lawyerLogin({
        mobileNo: this.loginForm.username,
        code: this.loginForm.password
      })
        .then(res => {
          if (res) {
            clearInterval(this.timestamp);
            this.$router.push({
              path: "/work/index"
            });
          } else {
            this.token = true;
          }
        })
        .catch(err => {});
    },
    getMes() {
      getMessage({
        mobileNo: this.loginForm.username
      })
        .then(res => {
          window.console.log("验证码", res);
          if (!res) {
            window.alert("您的账户正在审核中");
          } else {
            this.send_time = new Date().getTime();
            this.timestamp = setInterval(this.timeCounter, 1000);
            this.wait = true;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    timeCounter() {
      let newTime = new Date().getTime();
      var runTime = parseInt((newTime - this.send_time) / 1000);
      runTime = runTime % (86400 * 365);
      runTime = runTime % (86400 * 30);
      runTime = runTime % 86400;
      var hour =
        Math.floor(runTime / 3600) < 10
          ? "0" + Math.floor(runTime / 3600).toString()
          : Math.floor(runTime / 3600).toString();
      runTime = runTime % 3600;
      var minute =
        Math.floor(runTime / 60) < 10
          ? "0" + Math.floor(runTime / 60).toString()
          : Math.floor(runTime / 60).toString();
      runTime = runTime % 60;
      if (runTime < 59) {
        var second =
          runTime < 10 ? "0" + runTime.toString() : runTime.toString();

        this.buttom_text = 60 - second + "s";
      } else {
        clearInterval(this.timestamp);
        this.buttom_text = "获取";
        this.wait = false;
      }
    }
  }
};
</script>

<style >
.login {
  background-color: rgb(131, 128, 128);
  height: 100%;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width:1200px;
}
.login .bgc {
  min-width:1200px;
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/pic/shutterstock_396850561-min.jpg);
  background-size: 100% 100%;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}
.login .login_box {
  height: 69.3rem;
  width: 102.7rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0%;
  display: flex;
  z-index: 1000;
}
.login .box_left {
  width: 42%;
  position: relative;
  display: flex;
  align-items: center;
}
.login .pic_title {
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.login .box_right {
  width: 58%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login h1 {
  font-size: 3.6rem;
  flex: 1;
}
.login form {
  flex: 2;
}
.login .el-input__inner {
  width: 371px;
  height: 54px;
  background: rgba(236, 233, 234, 1);
  border-radius: 27px;
  /* display: flex;
justify-content: center; */
  text-align: center;
}
.login input::-ms-input-placeholder {
  text-align: center;
  color: #9999;
}
.login input::-webkit-input-placeholder {
  text-align: center;
  color: #9999;
}


.login .el-button {
  width:40%;
  height: 54px;
  background: rgba(64, 126, 112, 1);
  border-radius: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 2.9rem;
}
.login .buttom {
  width: 371px;
  height: 54px;
  background: rgba(64, 126, 112, 1);
  border-radius: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 2.9rem;
}
.input-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  
}
.input-box .el-input{
  width: 50%;
}
.input-box .el-input__inner {
  width: 100%;
}
.agreement_box{
  flex:1;
  display: flex;
  /* align-items: center; */
  display: block;
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #cccccc;
  line-height: 29px;
}
a {
  color: rgb(100, 158, 253);
  text-decoration: none;
}
</style>
