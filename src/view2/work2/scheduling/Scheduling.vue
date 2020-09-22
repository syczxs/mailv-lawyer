<template>
  <div class="scheduling">
    <span class="title-text">首页>预约排班</span>

    <div class="box">
      <div class="header">
        <span class="title">报名排版</span>
      </div>
      <div class="box2">
        <span class="title-text">提醒：预约排班需提前两天</span>
        <div class="calendar-box">
          <Calendar
            ref="Calendar"
            :markDateMore="arr"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
          ></Calendar>
        </div>
        <div class="button" @click="dialogShow">预约排班</div>
        <div class="button" @click="dialog2Show">取消排班</div>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="display:block">选择排班时间</span>
      <el-radio v-model="radio" label="morning">上午9：00-12：00</el-radio>
      <el-radio v-model="radio" label="afternoon">下午13：00-18：00</el-radio>
      <el-radio v-model="radio" label="all">全天</el-radio>
      <div v-if="lawyerInform.lawyerRole==='全功能律师'">
      <span style="display:block">选择报名角色</span>
      <el-radio v-model="radio3" label="video">处理视频预约</el-radio>
      <el-radio v-model="radio3" label="text">处理文本预约</el-radio>
      <el-radio v-model="radio3" label="all">处理所有预约请求</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendCancel">取 消</el-button>
        <el-button type="primary" @click="sendApply">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
      <span>今日报名时间-上午：{{todayWorkInform.morning}}/下午：{{todayWorkInform.afternoon}}</span>
      
      <span style="display:block">选择取消排班时间</span>
      <el-radio v-model="radio2" label="morning">上午</el-radio>
      <el-radio v-model="radio2" label="afternoon">下午</el-radio>
      <el-radio v-model="radio2" label="all">全天</el-radio>
     

      <span slot="footer" class="dialog-footer">
        <el-button @click="sendCancel2">取 消</el-button>
        <el-button type="primary" @click="cancelApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHistoryWork,
  applyWork,
  cancleApplyWork,
  searchToday,
  getLawyerInform
} from "../../../api/api";
import Calendar from "../../../components/calendar/Calendar";
export default {
  name: "Scheduling",
  components: {
    Calendar
  },
  data() {
    return {
      arr: [],
      apply: "",
      dialogVisible: false,
      radio: "morning",
      //取消排班弹窗
      dialogVisible2: false,
      radio2: "morning",
      radio3:"all",
      lawyerInform: {},
      todayWorkInform: {
        morning:"无排班",
        afternoon:"无排班"
      }
    };
  },
  methods: {
    //查询排班
    searchWork() {
      var arr = [];
      getHistoryWork().then(res => {
        for (var i of res) {
          let arr2 = i.split("-").map(x => parseInt(x));
          let str = arr2.join("-");

          arr.push({
            date: str.replace(/\-/g, "/"),
            className: "mark1"
          });
        }

        this.arr = arr;
        console.log(this.arr)
      });
    },
    dialogShow() {
      this.sureSend2(this.apply);
      // let res = this.sureSend(this.apply);
    },
    dialog2Show() {
      this.dialogVisible2 = true;
      let arr2 = this.apply
        .split("/")
        .map(x => (parseInt(x) < 10 ? "0" + x : x));
      let str2 = arr2.join("-");
      searchToday({
        date: str2,
        lawyerId: this.lawyerInform.lawyerId
      }).then(res => {
        console.log(res)
        if(res[0]["上午"].length>0){
           this.todayWorkInform.morning=res[0]["上午"]

        }
        if(res[0]["下午"].length>0){
          this.todayWorkInform.afternoon=res[0]["下午"]

        }
       
        
        
        // this.todayWorkInform.morning=res[0]["上午"].split(",")
        // if(this.todayWorkInform.morning.length==2){
        //   this.todayWorkInform.morning.push("全部")
        // }
        //  this.todayWorkInform.afternoon=res[0]["下午"].split(",")
        //  if(this.todayWorkInform.afternoon.length==2){
        //   this.todayWorkInform.afternoon.morning.push("全部")
        // }

       
      });
    },
    cancelApply() {
      let arr2 = this.apply
        .split("/")
        .map(x => (parseInt(x) < 10 ? "0" + x : x));
      let str2 = arr2.join("-");
      cancleApplyWork({
        date: str2,
        morningOrAfternoon: this.radio2,
        scheduleType:"all"
      }).then(res => {
        this.searchWork();
        if (res) {
          window.alert("取消成功");
          this.dialogVisible2 = false;
          this.searchWork();
        } else {
          window.alert("取消失败,请查看是否已经有预约，再转单后重新取消");
        }
      });
    },
    //日历方法
    clickDay(data) {
      console.log("选中了", data); //选中某天
      //   this.$toast("选中了" + data);

      this.apply = data;
    },
    clickToday(data) {
      console.log("跳到了本月今天", data); //跳到了本月
    },
    changeDate(data) {
      //   this.$toast("切换到的月份为" + data);
      console.log("左右点击切换月份", data); //左右点击切换月份
    },
    mGetDate(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    //限制为每礼拜三到礼拜五报名下周排班的算法排版的
    sureSend(data) {
      let nowDay = new Date();

      let monthNumber = this.mGetDate(
        Number(nowDay.getFullYear()),
        Number(nowDay.getMonth() + 1)
      );
      let nextWeek = [];

      let nextDays = 8 - Number(nowDay.getDay()) + Number(nowDay.getDate());

      for (let i = 0; i < 7; i++) {
        nextWeek.push(
          nextDays + i > monthNumber ? nextDays + i - monthNumber : nextDays + i
        );
      }

      if (nextWeek.includes(Number(data.split("/")[2]))) {
        return true;
      } else {
        window.alert("非可选排班");
        return false;
      }
    },
    //限制为提前两天排班的方法
    sureSend2(data) {
      let nowDay = new Date();
      console.log(this.apply, "1111");
      let monthNumber = this.mGetDate(
        Number(nowDay.getFullYear()),
        Number(nowDay.getMonth() + 1)
      );
      console.log(
        Number(nowDay.getDate()),
        Number(data.split("/")[2]),
        monthNumber,
        "22222"
      );
      let days =
        Number(nowDay.getDate()) + 2 > monthNumber
          ? Number(data.split("/")[2]) -
            (Number(nowDay.getDate()) + 2 - monthNumber)
          : Number(data.split("/")[2]) - Number(nowDay.getDate());
      console.log(days);
      if (days < 2) {
        // window.alert("不可报名");
        this.dialogVisible = true;
        return true;
      } else {
        this.dialogVisible = true;
        return true;
      }
    },

    sendApply() {
      let arr = this.apply
        .split("/")
        .map(x => (parseInt(x) < 10 ? "0" + x : x));
      let str = arr.join("-");
      applyWork({
        date: str,
        morningOrAfternoon: this.radio,
        scheduleType:this.radio3
      }).then(res => {
        console.log(res);
        this.searchWork();
        if (res) {
          window.alert("报名成功");
          this.dialogVisible = false;
          this.searchWork()
        } else {
          window.alert("排班失败");
          this.dialogVisible = false;
        }
      });
    },
    sendCancel() {
      this.dialogVisible = false;
    },
    sendCancel2() {
      this.dialogVisible2 = false;
    }
  },
  mounted() {
    this.searchWork();
    getLawyerInform({
        }).then(res=>{
            this.lawyerInform=res
            // this.$store.commit('addInform',this.lawyerInform)
        }).catch(err=>{
            console.log(err)
        })
  },
  created() {
    function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
  }
};
</script>

<style >
.scheduling .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.scheduling .box {
  width: 100%;
  height: calc(100vh - 126px);
  background-color: white;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.scheduling .header {
  height: 50px;
  border-bottom: 1px rgba(238, 238, 238, 1) solid;
  display: flex;
  align-items: center;
}
.scheduling .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.box2 {
  padding: 20px;
}
.calendar-box {
  width: 304px;
  height: 359px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.1);
  border-radius: 4px;
  margin-left: 20px;
  padding: 10px;
}
.wh_container[data-v-23ae2baf]{
  width:100%
}
.scheduling .button{
  width:84px;
height:30px;
background:rgba(64,126,112,1);
border-radius:4px;
margin-left:260px;
margin-top: 20px;
display:flex;
justify-content: center;
align-items: center;
color:white

}
.wh_container .mark1 {
 background:rgba(64,126,112,1);
  color: white;
   width:2.4rem;
  height:2.4rem;
  border-radius: 50%

}
.wh_content_item .wh_chose_day {
  background: #71c7a5;
  color: white;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
}




</style>