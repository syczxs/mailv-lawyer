<template>
  <div class="serve">
    <div class="header">
      <Header/>
    </div>
    
    <div class="body">
      <!-- 左侧 -->
      <div class="left">
        <div class="el-aside">
         <el-menu
            width="100%"
            class="el-menu-vertical-demo"
            background-color="rgb(50, 64, 87)"
            text-color="#fff"
            active-text-color="white"
            unique-opened router>

           <el-submenu index="/serve">
              <template slot="title">
                <span>服务列表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/serve/videoList">视频咨询</el-menu-item>
                <el-menu-item index="/serve/textList">文本处理</el-menu-item>
                <el-menu-item index="/serve/analyseList">专项意见分析书</el-menu-item>
                <el-menu-item index="/serve/consultationList">当面咨询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </div >
      </div>
      <!-- 右侧 -->
      <div class="right">
        <router-view/>
      </div>
    </div>
    
  </div>

</template>

<script>
import Header from '../../components/Header'


    export default {
        name: "Serve",
        components:{
          Header
           
        }
    }
</script>


<style scoped>
 
  .header{
    height: 60px;
    width: 100%;
  }
  .body{
    height: calc(100vh - 60px);
    display: flex
    
  }
  .left{
    width: 10%;
    height: 100%;

  }
  .el-aside{
    background-color: rgb(50, 64, 87);
    width: 100%;
    height: 100%;
  }
  .el-menu-vertical-demo{
    border-right: none;
  }
  .right{
    width: 90%;
    padding: 0;
    height: 100%;
    background-color: rgb(242,242,242);
  }




</style>