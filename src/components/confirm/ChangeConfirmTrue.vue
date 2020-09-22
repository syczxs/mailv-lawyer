<template>
  <el-dialog
    title="接到一份转单是否接受"
    :visible.sync="dialogDisplay"
    width="25%"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
    <div>
      <div class="body-item">转单人：{{changeList.lawyerName}}</div>
      <div class="body-item">服务类别：{{changeList.subjectName}}</div>
      <div v-if="changeList.subjectName==='视频咨询'" class="body-item">预约时间：{{changeList.appointTime}}</div>
      <div v-if="changeList.subjectName==='视频咨询'" class="body-item">咨询类别：{{changeList.consultType}}</div>
      <div v-if="changeList.subjectName!=='视频咨询'" class="body-item">截止时间：{{changeList.timeOutTime}}</div>
      <el-button
        style="width:100%;background-color:rgb(45,202,147);color:white"
        @click="toVideoInformation(changeList.orderId)"
      >查看本单资料 ></el-button>
      <div
        v-if="this.default===true"
        style="width:100%; display: flex;justify-content: center;color:red"
      >订单信息已改变</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        style="background-color:rgb(45, 202, 147);margin-right:50px"
        @click="confirm(true)"
      >确 定</el-button>
      <el-button
        type="primary"
        style="background-color:red;margin-left:50px"
        @click="confirm(false)"
      >拒 绝</el-button>
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
      console.log(val);
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
  border-radius: 20px;
  height: 40%;
  box-sizing: border-box;
}
.change-accept .el-dialog__header {
  box-sizing: border-box;
  height: 20%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-accept .el-dialog__body {
  height: 60%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;
}
.change-accept .body-item {
  margin-bottom: 5%;
}

.change-accept .el-dialog__footer {
  height: 20%;
  box-sizing: border-box;
  border-top: 1px rgb(215, 215, 215) solid;
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 0%;
}
</style>
