<template>
  <div class="el-header">
    <div class="logo">
      <a href="#"><h1></h1></a>
    </div>
    <div class="nav">
      <ul>
        <li><router-link  to="/work">工作台</router-link></li>
        <!-- <li><router-link  to="/serve">服务</router-link></li> -->
      </ul>
    </div>
    <div class="information">
      <div class="head">
        <img class="img" :src="lawyerInform.lawyerImageUrl">
      </div>
      <div class="name">
        <div>{{lawyerInform.lawyerName}}</div>
        <div>{{lawyerInform.lawyerRole}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import {getLawyerInform} from '../api/api'
export default {
    name:'Header',
    data(){
        return{
          lawyerInform:{
                
            },

        }
    },
    mounted(){
        getLawyerInform({
        }).then(res=>{  
            this.lawyerInform=res
            this.$store.commit('addInform',this.lawyerInform)
        }).catch(err=>{
            console.log(err)
        })
        
    }
}
</script>

<style scoped>
 li {
    list-style: none;
  }

  .el-header {
    background-color: rgb(50, 64, 87);
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
    .el-header .logo {
    float: left;
    width: 10%;
  }

  .el-header .nav {
    float: left;
    height: 100%;
    padding: 0;
  }
  .nav ul{
    height: 100%;
    margin: 0;
    padding: 0;
  }
   .nav li {
    float: left;
    height: 100%;
    width: 100px
  }
  .nav li a {
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none
  }
  .router-link-active{
    background-color: rgb(87,112,153);
  }

  .information{
    width: 200px;
    float: right;
    height: 100%;
    color: white;
    display: flex;
    align-items: center
    
  }
  .head{
    height: 48px;
    width: 48px;
    background-color: #fff;
    border: 1px white solid;
    border-radius: 100%;
    float: left;
  }
  .img{
     height: 48px;
    width: 48px;
    
    
    border-radius: 100%;

  }
  .information .name{
    float: left;
    margin-left: 20px
    
  }



</style>

