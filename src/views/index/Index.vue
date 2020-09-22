<template>
<div class="index">
    <header>
        <div class="head_left">
            <img style="height:3.241vh;" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%9B%BE%E5%B1%82%203%20%E6%8B%B7%E8%B4%9D%208.png">
        </div>
        <div class="head_right">
            <span class="text1">我已经是麦律用户</span>
            <a class="head_a" href="www.baidu.com">快速登录</a>
        </div>       
    </header>

    <div class="main" :style="bacImage"> 
        <div class="box1"></div>
        <span class="text2">让法律服务人人可享，触手可及</span>
        <div class="box2">
            <div class="buttom">
                <img style="width:4.074vh" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/duilvshi.png">
                <span class="text3">我是律师用户</span>
            </div>
            <div class="buttom" @click="show_window">
                <img style="width:4.074vh" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E7%BB%84%202.png">
                <span class="text3">我是个人用户</span>
            </div>
        </div>
    </div>
    <div class="bg_mask2" style="maskStyle"></div>
    
    <footer>
        <div class="footer_nav">
            <a class="footer_a">律师法律咨询</a>
            <span class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">律师法律咨询</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">诚聘英才</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">联系我们</a>
            <span  class="footer_text">|</span>
            <a class="footer_a">International Business</a>
        </div>
        <span class="footer_text2">经营许可证编号：合字B2-20190046网站备案：沪ICP备15027489号</span>

    </footer>
    <div v-if="show" class="bg_mask">
        <div class="small_w">
            <div style="width:100%"><div class="pic_box1" @click="close_window"><img style="width:100%;height:100%" src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%88%A0%E9%99%A4.png"></div></div>
            <span class="s_text1"> 扫码登录</span>
            <div class="s_pic"></div>
            <span class="s_text2">请使用手机麦律扫码</span>
            <span class="s_text3">使用帮助&nbsp;&nbsp;|&nbsp;&nbsp;启动麦律小程序</span>
        </div>
    </div>
</div>
 
</template>  

<script>
// import {getMessage,lawyerLogin} from '../../api/api'
  export default {
    name: "Index",
    data(){
        return{
            bacImage:'',
            maskStyle:'',
            urlList:['https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/shutterstock_326909132.jpg',
            'https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/shutterstock_368205530.jpg',
            'https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/shutterstock_741647638.jpg'],
            i:0,
            timestamp:'',
            show:false
        }
    },
    methods: {
        changeImg(){
            // consol.log(this.i)
            this.i+=1
            if(this.i>2){
                this.i=0
            }
            this.bacImage={backgroundImage: 'url("'+this.urlList[this.i]+'")'}
        },
        show_window(){
            this.show=!this.show
            this.maskStyle = {backgroundColor:'black'}
        },
        close_window(){
            this.show=!this.show
            this.maskStyle = {backgroundColor:'none'}
        }

    },
    mounted(){
        this.timestamp=setInterval(this.changeImg,5000)

    }
  }

</script>

<style >
.index{
    height: 100%;
}
header{
    height: 7.41vh;
    width: 100vw;
    background:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}
.head_left{
    /* height: 3.5rem;
    width: 9.4rem; */
    /* margin-left: 36rem; */
    margin-left: 18.7%;
}
.head_right{
    /* margin-right: 36rem; */
    margin-right: 18.7%;
}
.text1{
    font-size:2.2vh;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(136,136,136,1);
    line-height:1.8rem;
    margin-right:1.7rem;
}
.head_a{
    font-size:2.2vh;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(32,104,86,1);
    line-height:1.8rem;
    text-decoration: none;
}
.main{ 
    width:100%;
    height: 81.48vh;
    /* height:80%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: url(https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/wetchatapplet_mailv/images/banner/banner.png)  ;
    background-size:100% 100%;
    /* animation-name: fadeInOut;
    animation-duration: 5s;
    animation-iteration-count: infinite; */
    /* : alternate; */
    /* animation-timing-function: ease-in-out; */  
}
.bg_mask2 {
    /* display: none; */
	position: fixed;
	top: 8rem;
	left: 0%;
	width: 100%;
	height: calc(100vh - 20rem);
	/* background-color: black; */
	z-index: 997;
    animation-name: fadeInOut;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    
     /* opacity: 80%; */
	
    
}
.box1{
    height: 39.91vh;
    z-index: 991;
}
.text2{
    font-size:2.6vh;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(37,144,117,1);   
    opacity:0.7;
    /* margin-top: 3.8rem; */
    z-index: 998;
}
.box2{
    display: flex;
    justify-content: space-around;
    margin-top: 9.537vh;
}
.buttom{
    width: 15.625vw;
    height: 8.33vh;
    background:rgba(37,144,117,1);
    border-radius:1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
    margin-right: 2.083vw;
}
.text3{
    font-size:2vh;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-left: 8%;
   
}


footer{
    width: 100%;
    height:11.11vh;
    /* height: 16.7%; */
    background:rgba(255,255,255,1);  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    box-sizing: border-box;
}
.footer_nav{
    display: flex;
}
.footer_a{
    font-size:1.8vh;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);  
}
.footer_a:hover{
    font-size:1.8vh;
    font-family:PingFang SC;
    font-weight:400;
    color:blue;  
}
.footer_text{
    font-size:1.8vh;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1); 
    margin: 0 1rem 0 1rem;
}
.footer_text2{
    font-size:1.4vh;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    
}
.bg_mask {
    /* display: none; */
	position: fixed;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	background-color:rgba(0,0,0,.65);
	z-index: 999;
    filter: alpha(opacity = 65);
    display: flex;
    align-items: center;
    justify-content: center;
}
.small_w{
    position:fixed;
    width:28.6rem;
    height:29.6rem;
    background-color:rgba(0,0,0,.65);
    border-radius:10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    
    
}
.s_text1{
    font-size:1.8rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:1.8rem;
}
.s_text2{
    font-size:1.6rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:1.6rem;
}
.s_text3{ 
    font-size:1.2rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:1.8rem;
}
.s_pic{
    width:13.6rem;
    height:13.6rem;
    background:rgba(255,255,255,1);
}
.pic_box1{
    
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
   
   
    background-color: black;

}
  @keyframes fadeInOut {
         0%{
       opacity: 1;
   }
   5%{
       opacity: 0;
   }

   95%{
       opacity: 0;
   }
   100%{
       opacity: 1;
   }
}
</style>
