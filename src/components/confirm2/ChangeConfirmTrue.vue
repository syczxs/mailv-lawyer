<template>
  <el-dialog
    title="接到一份转单是否接受"
    :visible.sync="dialogDisplay"
    width="540px"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
    <div style="width:70%;margin-top:10%">
      <div class="body-item">转单人：{{changeList.lawyerName}}</div>
      <div class="body-item">服务类别：{{changeList.subjectName}}</div>
      <div v-if="changeList.subjectName==='视频咨询'" class="body-item">预约时间：{{changeList.appointTime}}</div>
      <div v-if="changeList.subjectName==='视频咨询'" class="body-item">咨询类别：{{changeList.consultType}}</div>
      <div  class="body-item">截止时间：{{changeList.timeOutTime}}</div>
    </div>
    <div class="buttom3" @click="toVideoInformation(changeList.orderId)">查看本单资料 ></div>
    <div v-if="this.default===true" style="width:100%; display: flex;justify-content: center;color:red" >订单信息已改变(对方可能取消了转单) </div>

    <span slot="footer" class="dialog-footer">
      <el-button class="buttom1" @click="cancel()">拒 绝</el-button>
      <el-button class="buttom2" @click="confirm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { confirm_change, monitor_change } from "../../api/api";
export default {
  name: "ChangeConfirmTrue",
  props: {
    confirmDialog: {
      type: Boolean,
      default: false
    },
    changeInform: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dialogDisplay: false,
      showClo: false,
      changeList: {},
      default: false
    };
  },
  methods: {
    confirm(val) {
      monitor_change({})
        .then(res => {
          if (res.status == 1) {
            if (res.transferInfoList[0].orderId === this.changeList.orderId) {
              confirm_change({
                status: val,
                orderId: this.changeList.orderId
              })
                .then(res => {
                  if (res == true) {
                    this.dialogDisplay = false;
                    console.log("已确认转单")
                    this.$emit("getFromChangeConfirmTrue", this.dialogDisplay);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.default = true;
            }
          } else {
            this.default = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toVideoInformation(Id) {
      const routeData = this.$router.resolve({
        path: "/work/videoInformation",
        query: {
          orderId: Id
        }
      });
      window.open(routeData.href, "_blank");
    },
    cancel(){
      this.dialogDisplay=false;
      this.$emit("getFromChangeConfirmTrue", false,this.changeList.orderId)
    }
  },
  computed: {
    getInform: function() {
      return this.changeInform;
    }
  },

  watch: {
    confirmDialog() {
     
      this.dialogDisplay = this.confirmDialog;
      this.default = false;
    },
    getInform() {
      this.changeList = this.changeInform;
 
    }
  }
};
</script>

<style >
.change-accept .el-dialog {
  height: 440px;
  box-sizing: border-box;
}
.change-accept .el-dialog__header {
  box-sizing: border-box;
  height: 50px;
  /* padding: 40px; */
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px rgba(237, 237, 237, 1) solid;
}
.change-accept .el-dialog__body {
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.change-accept .body-item {
  margin-bottom: 5%;
}

.change-accept .el-dialog__footer {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  /* border-top: 1px rgb(215,215,215) solid; */

  padding: 0%;
}
.dialog-footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.change-accept .buttom1,
.buttom2 {
  width: 56px;
  height: 32px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.change-accept .buttom2 {
  width: 56px;
  height: 32px;
  background: rgba(66, 127, 115, 1);
  border-radius: 4px;
  color: aliceblue;
  margin-right: 30px;
}
.buttom3 {
  width: 371px;
  height: 54px;
  background: rgba(0, 183, 95, 1);
  border-radius: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
}
</style>
