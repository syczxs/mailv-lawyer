<template>
  <div class="scheduling-card">
    <div style="width:100%;height:8%; display: flex;justify-content: center;">
      <div class="header">报名排班</div>
    </div>
    <div class="tips">
      <div>
        <!-- <div>报名时间：本周三到本周五</div>
        <div>可排班时间：下周一到下周五</div>-->
      </div>
    </div>
    <div class="data-tip">
      <div class="data-border">
        <Calendar
          ref="Calendar"
          :markDateMore="arr"
          v-on:isToday="clickToday"
          agoDayHide="1530115221"
          v-on:choseDay="clickDay"
          v-on:changeMonth="changeDate"
        ></Calendar>
      </div>
    </div>
    <div style="width:100%;display:flex; justify-content: space-around;margin-top:20px">
      <div class="button" @click="dialogShow">预约排班</div>
      <div class="button" @click="dialog2Show">取消排班</div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="display:block">选择排班时间</span>
      <el-radio v-model="radio" label="morning">上午9：00-12：00</el-radio>
      <el-radio v-model="radio" label="afternoon">下午13：00-18：00</el-radio>
      <el-radio v-model="radio" label="all">全天</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendCancel">取 消</el-button>
        <el-button type="primary" @click="sendApply">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
      <span style="margin-bottom:10px;dispaly:block">当日报名排班时间:{{this.todayWork}}</span>
      <span style="display:block">选择取消排班时间</span>
      <el-radio v-model="radio2" label="morning">上午9：00-12：00</el-radio>
      <el-radio v-model="radio2" label="afternoon">下午13：00-18：00</el-radio>
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
} from "../../api/api";
import Calendar from "../../components/calendar/Calendar";
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
      lawyerInform:{

      },
      todayWork:"",


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
        date:str2,
        lawyerId:this.lawyerInform.lawyerId
      }).then(res=>{
        if(!!res){
          this.todayWork=res
        }else{
          this.todayWork="今日无排班"
        }
      })
    },
    cancelApply() {
      let arr2 = this.apply
        .split("/")
        .map(x => (parseInt(x) < 10 ? "0" + x : x));
      let str2 = arr2.join("-");
      cancleApplyWork({
        date: str2,
        morningOrAfternoon: this.radio2
      }).then(res => {
        console.log(res);
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
        morningOrAfternoon: this.radio
      }).then(res => {
        console.log(res);
        this.searchWork();
        if (res) {
          window.alert("报名成功");
          this.dialogVisible = false;
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
            this.$store.commit('addInform',this.lawyerInform)
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
.scheduling-card {
  width: 98%;
  height: 96%;
  margin-left: 1%;
  margin-top: 1%;
  background-color: white;
}
.scheduling-card .header {
  width: 96%;
  height: 100%;
  border-bottom: 1px black solid;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
}
.scheduling-card .tips {
  width: 100%;
  height: 10%;
  font-weight: 700;
  font-size: 30px;
  padding-left: 5%;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
}
.scheduling-card .button {
  height: 50px;
  width: 300px;
  background-color: rgb(45, 202, 147);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.scheduling-card .data-tip {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 400px;
}
.scheduling-card .data-border {
  width: 40%;
  border: 2px black solid;
}
.wh_container .mark1 {
  background: rgba(64, 126, 112, 1);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.wh_content_item .wh_isToday {
  background: yellow;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.wh_content_item .wh_chose_day {
  background: #71c7a5;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.wh_container .mark2 {
  background-color: blue;
  height: 100%;
}
.wh_content_item .wh_isMark {
  background: orange;
}
.wh_container .wh_content_all {
  /* background-color: red; */
}
.scheduling-card .wh_content_item {
  height: 50px;
  border-bottom: 1px white solid;
}
</style>