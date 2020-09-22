 <template>
  <div class="videoInform-box-card">
    <div class="inside-head">
      服务详情
    </div>
    <!--服务信息-->
    <div class="serveInform">
      <div class="serveInformHead">
        <span class="titleSize">服务信息</span>
        <span style="font-weight: 600;margin-right: 10px;vertical-align:text-bottom">状态</span>
        <span >{{serveInform.orderStatus}}</span>
      </div>
      <div class="serveInformBody">
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">服务编号</span>
          <span>{{serveInform.orderId}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">预约发起时间</span>
          <span>{{serveInform.appointBeginTime}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">预约时段</span>
          <span>{{serveInform.appointTime}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">服务开始时间</span>
          <span>{{serveInform.schedulingStartTime}}</span>
        </div>
        <div class="serveInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">使用产品</span>
          <span>{{serveInform.productName}}</span>
        </div>
        
      </div>
    </div>

    <!--用户信息-->
    <div class="userInform">
      <div class="userInformHead">
        <span class="titleSize">委托人信息</span>
      </div>
      <div class="userInformBody">
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">用户Id</span>
          <span>{{peopleInform.userId}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">用户昵称</span>
          <span>{{peopleInform.userName}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">绑定手机号</span>
          <span>{{peopleInform.userMobile}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人姓名</span>
          <span>{{peopleInform.clientName}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人身份证</span>
          <span>{{peopleInform.clientCertId}}</span>
        </div>
        <div class="userInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">委托人手机号</span>
          <span>{{peopleInform.clientMobile}}</span>
        </div>
      </div>
    </div>

    <div class="lawyerInform">
      <div class="lawyerInformHead">
        <span class="titleSize">服务律师信息</span>
      </div>
      <div class="lawyerInformBody">
        <div class="lawyerInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">律师编号</span>
          <span>{{lawyerInform.lawyerId}}</span>
        </div>
        <div class="lawyerInformBodySon">
          <span style="font-weight: 500;margin-right: 10px">律师姓名</span>
          <span>{{lawyerInform.lawyerName}}</span>
        </div>
      </div>
    </div>


    <div class="serveData">
         <div style="width:100%;height:80%;padding-left:2%">
          <div
            style="width:100%;font-size:20px;padding-left:20px;padding-top:10px;font-weight:600"
          >服务提交资料</div>
          <div
            style="width:100;font-size:18px;padding-left:20px;margin-top:10px"
          >咨询类别: {{videoServiceInfo.consultType}}</div>
          <div style="height:50%;font-weight:600;padding-left:20%;display:flex">
            相关资料
            <div style="height:100%;display:flex">
              <div
                v-if="textUrl!==''"
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

    <footer>
      <!-- <el-button size="medium" style="background:#199ED8;color: white">
        查看录像
      </el-button>
      <el-button size="medium" style="background:rgb(255,204,0);color: white">
        查看评价
      </el-button> -->
    </footer>

  </div>

</template>

<script>

import { selectVideoByOrder} from '../../api/api'
  export default {
    name: "VideoInformation",
    data() {
      return {
        orderId: '',
        serveInform:{
            orderId: "无数据",
            appointBeginTime: "无数据",
            appointTime: "无数据",
            schedulingStartTime: "无数据",
            productName: "无数据",
            orderStatus: "无数据"
        },
        peopleInform:{
            userId: "无数据",
            userName: "无数据",
            userMobile: '无数据',
            clientName: "无数据",
            clientCertId: "无数据",
            clientMobile: "无数据",
        },
        lawyerInform:{
            lawyerId: "无数据",
            lawyerName: "无数据"
        },
        videoServiceInfo:{

        },
        textUrl:"",
        imgList:[]
      }
    },
    created() {
      this.orderId = this.$route.query.orderId
      console.log(this.orderId)
    },
    methods:{
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
     
    },
    },
    mounted(){
        selectVideoByOrder({
      orderId: this.orderId
    }).then(res => {
      console.log(res);
      this.serveInform=res.consumedInfo
      this.peopleInform=res.clientInfo
      this.lawyerInform=res.consumedLawyerInfo
      this.videoServiceInfo=res.videoServiceInfo,
      this.selectImg()
      
     
    });
    
    }
  }
</script>

<style scoped>
  .videoInform-box-card {
    background-color: #fff;
    width:98%;
    height: 96%;
    margin-left: 1%;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .titleSize {
    font-weight: 600;
    font-size: 3vh;
    margin-right: 10px;
  }

  .inside-head {
    width: 96%;
    height: 8%;
    font-size: 3vh;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px black solid;
  }

  .serveInform, .userInform {
    height: 15%;
    width: 96%;

  }

  .serveInformHead, .userInformHead {
    height: 40%;
    display: flex;
    align-items: flex-end;
  }

  .serveInformBody {
    height: 60%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .userInformBody {
    height: 60%;
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .serveInformBodySon {
    width: 25%;
    text-align: center;
  }

  .userInformBodySon {
    width: 33%;
    text-align: center;
  }

  .lawyerInform {
    height: 12%;
    width: 96%;
  }

  .lawyerInformHead {
    height: 60%;
    display: flex;
    align-items: flex-end;
  }

  .lawyerInformBody {
    height: 40%;
    width: 50%;
    display: flex;
    align-items: center;
  }

  .lawyerInformBodySon {
    width: 33%;
    text-align: center;
  }


  .serveData {
    width:100%;
    height: 42%;
  }


  footer {
    width: 96%;
    height: 8%;
    box-sizing: border-box;
    border-top: 1px #cccccc solid;
    display: flex;
    align-items: center;
  }


</style>
