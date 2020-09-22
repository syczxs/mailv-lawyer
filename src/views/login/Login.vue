<template>
  <div class="login_card">
    <div class="login_box">
      <div class="header">
        麦律科技律师系统
      </div>
      <div class="body">
        <el-form class="el-form" ref="ruleForm" label-width="100px" size="small" >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="loginForm.username" style="width: 80%;"/>
          </el-form-item>
          <el-form-item label="手机验证码">
            <el-input v-model="loginForm.password" style="width: 40%;margin-right: 30px;margin-left: -70px"/>
            <el-button type="primary" class="el-button" @click="getMes" :loading="wait" :disabled="wait">{{buttom_text}}</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" class="el-button" style="width:278px;height:45px" @click="login">登录</el-button>
        <div v-if="this.token===true" style="color:red">登陆失败</div>
      </div>

    </div>
  </div>
</template>  

<script>
import {getMessage,lawyerLogin} from '../../api/api'
  export default {
    name: "Login",
    data(){
      
      return{
        loginForm:{
          username:'',
          password:'',
        },
        token:false,
        buttom_text:'获取',
        send_time:'',
        timestamp:{

        },
        wait:false,
       
      }
      
      
     
    },
    methods: {
      login() {
       lawyerLogin({
         mobileNo:this.loginForm.username,
         code:this.loginForm.password
       }).then(res=>{
         if(res){
           clearInterval(this.timestamp)
         this.$router.push({
          path: '/work/index',  
           
        })
         }else{ 
           this.token=true
           
         }
       }).catch(err=>{
        
       })
      },
      getMes(){
        getMessage({
          mobileNo:this.loginForm.username
        }).then(res=>{
         
          window.console.log('验证码',res)
           if(!res){
            window.alert("您的账户正在审核中")
          }else{
            this.send_time = new Date().getTime();
          this.timestamp=setInterval(this.timeCounter,1000)
          this.wait=true

          }
          
          
        }).catch(err=>{
          window.console.log(err)
        })
      },
      timeCounter(){
          let newTime = new Date().getTime();
          var runTime =parseInt((newTime - this.send_time) / 1000);
            runTime = runTime % (86400 * 365);
            runTime = runTime % (86400 * 30);
            runTime = runTime % 86400;
            var hour = Math.floor(runTime / 3600)<10? '0'+( Math.floor(runTime / 3600)).toString() : ( Math.floor(runTime / 3600)).toString();
            runTime = runTime % 3600;
            var minute = Math.floor(runTime / 60)<10?'0'+(Math.floor(runTime / 60)).toString():(Math.floor(runTime / 60)).toString();
            runTime = runTime % 60;
            if(runTime<59){
              var second = runTime<10?'0'+runTime.toString():runTime.toString();
             
              this.buttom_text=(60-second)+'s'
            }else{
              clearInterval(this.timestamp)
              this.buttom_text="获取";
              this.wait=false
            }
            
         
      },
     


    }
  }

</script>

<style >


 
  .login_card{
    width: 100%;
    height: 100%;
    background-color: rgb(131, 128, 128);
  }

  .login_card .login_box {
    height: 300px;
    width: 500px;
    background-color: rgb(242, 242, 242);
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }

  .login_card .header {
    box-sizing: border-box;
    padding-top: 35px;
    height: 30%;
    text-align: center;
    font-weight: 700;
    font-size: 3vh;
  }

  .login_card .body {
    height: 40%;
  }

  .login_card .footer {
    height: 30%;
    text-align: center;
  }

  .login_card .el-form {
    text-align: center;
  }

  .login_card .el-button {
    background-color: rgb(45, 202, 147);
    border-color: rgb(45, 202, 147);
  }


</style>
