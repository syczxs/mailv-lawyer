<template>
  <div class="work">
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

            <el-menu-item index="/work/index">
                <template slot="title">
                  <span>首页</span>
                </template>
            </el-menu-item>

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
        name: "Work",
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