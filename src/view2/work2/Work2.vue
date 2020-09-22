<template>
  <div class="work">
    <div class="index-left">
      <div style="width:100%;height:60px;display:flex;justify-content: center;align-items: center;">
        <img style="width:70%;height:70%" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E8%B5%84%E6%BA%90%201%404x.png">
      </div>
      <div style="width:100%">
        <el-menu
            width="100%"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="white"
            text-color="black"
            active-text-color="green"
            unique-opened router>
            <el-submenu index="/work2">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:70px;">首页</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/work/index">工作台</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/work/scheduling">
                <template slot="title">
                  <i class="el-icon-date"></i>
                  <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:70px;">预约排班</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/work/settlement">
                <template slot="title" >
                  <i class="el-icon-s-ticket"></i>
                  <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:70px;">金额结算</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/work/litigation-list">
                <template slot="title" >
                  <i class="el-icon-s-check"></i>
                  <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:70px;">案件列表</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/work/my-litigation">
                <template slot="title" >
                  <i class="el-icon-s-custom"></i>
                  <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:70px;">我的案件</span>
                </template>
            </el-menu-item>

            
          </el-menu>
      </div>
    </div>

    <div class="index-main">
      <div class="main-header">
        <div class="pic">
          <img style="width:100%;height:100%" :src="lawyerInform.inform.lawyerImageUrl">
        </div>
        <div style="height:80%;width:100px;display:flex;flex-direction: column;justify-content:center;align-items:center">
          <span style="display:block">{{lawyerInform.inform.lawyerName}}</span>
          <span style="display:block">{{lawyerInform.inform.lawyerRole}}</span>

        </div>
        <div style="width:30px;height:30px;margin-right:30px" @click="outLine">
          <img style="width:100%;height:100%" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E7%BB%93%E6%9D%9F.png">
        </div>
      </div>
      <div class="main-bgc">
          <!-- <span class="title-text">首页>工作台</span> -->
          <router-view/>

      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import {getLawyerInform,lawyerLeave, checkLogin} from '../../api/api';


export default {
  name: "Work2",
  components: {
    Header
  },
  data(){
    return{
      //页面律师数据
      lawyerInform: {
        inform: {}
      
      },
      timeStamp:{}

    }
  },
  methods:{
      //获取用户信息
    getInform() {
      getLawyerInform({})
        .then(res => {
          this.lawyerInform.inform = res;
        })
        .catch(err => {
          console.log(err)
          this.$router.push({
            path: "/login"
          });
        });
    },
    outLine(){
      lawyerLeave().then(res=>{
         this.$router.push({
          path: '/login',  
           
        })

      })
    },
    loginCheck(){
       checkLogin().then(res=>{
        //  console.log(res)

       })
    }
  },
  mounted(){
    this.getInform();
    this.timeStamp=setInterval(this.loginCheck,10000)

  }
};
</script>


<style>
.work {
  min-height: 100vh;
  display: flex;
  box-sizing: border-box;
}
.index-left {
  width: 20rem;
  max-width:20rem;
  box-sizing: border-box;
  
 
}
.index-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.main-header {
  height:60px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  
}
.main-bgc{
    background:rgba(240,242,245,1);
    flex: 1;
    padding: 0 2rem 2rem 2rem ;
    box-sizing: border-box;
 
}
.title-text{
    display: block;
    font-size:1.4rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:2.6rem;
    margin: 1rem 0 1rem 2rem;
    box-sizing: border-box;
}
.pic{
  height:40px;
  width:40px;
  border-radius: 50%;
  overflow: hidden;
}
 
</style>