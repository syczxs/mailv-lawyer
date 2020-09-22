<template>
  <div class="index">
    <span class="title-text">首页>工作台</span>
    <div class="header">
      <div class="header-left">
        <div class="lawyer-inform">
          <div class="lawyer-left">
            <div class="lawyer-left-header">
              <div class="black-line"></div>
              <span class="title">基本信息</span>
            </div>
            <div class="lawyer-left-body">
              <div class="lawyer-pic">
                <img style="width:100%;height:100%" :src="lawyerInform.inform.lawyerImageUrl" />
              </div>
              <div class="lawyer-inform-card">
                <div class="card-head">
                  <span class="text1">昵称：{{lawyerInform.inform.lawyerName}}</span>
                  <div class="buttom1">上线</div>
                </div>
                <div class="card-body">
                    <div class="card-body-item">
                    <span class="title2">上班时间:8：00</span>
                  </div>
                  <div class="card-body-item">
                    <span class="title2"></span>
                  </div>
                  <div class="card-body-item">
                    <span class="title2">下班时间:18：00</span>
                  </div>
                  <div class="card-body-item">
                    <span class="title2"></span>
                  </div>
                
                  
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="lawyer-right">
            <div class="lawyer-left-header">
              <div class="black-line"></div>
              <span class="title">今日在线时间</span>
            </div>
          </div>-->
        </div>
        <div class="work-inform">
          <div class="lawyer-left-header">
            <div class="black-line"></div>
            <span class="title">工作详情</span>
          </div>
          <div class="work-inform-body">
            <div class="work-inform-item">
              <span class="text2">{{listInform.video.queryInfo.Total}}</span>
              <span class="text3">待处理视频预约</span>
            </div>
            <div style="width:1px;height:51px;background:rgba(203,203,203,1);"></div>
            <div class="work-inform-item">
              <span class="text2">{{listInform.video.finishedVideoCount}}</span>
              <span class="text3">今日完成视频预约</span>
            </div>

            <div style="width:1px;height:51px;background:rgba(203,203,203,1);"></div>
            <div class="work-inform-item">
              <span class="text2">{{listInform.text.queryInfo.Total}}</span>
              <span class="text3">待处理文本预约</span>
            </div>
            <div style="width:1px;height:51px;background:rgba(203,203,203,1);"></div>
            <div class="work-inform-item">
              <span class="text2">{{listInform.text.finishedTextCount}}</span>
              <span class="text3">今日完成文本</span>
            </div>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div style="height:85%;background-color:yellow">
          <Calendar ref="Calendar" :markDateMore="arr" agoDayHide="1530115221"></Calendar>
        </div>
        <div style="height:20%;display:flex;justify-content:center;align-items:center">
          <div class="buttom100" @click="toOtherPage(1,'/work/scheduling')">报名排班</div>
        </div>
      </div>
    </div>
    <div class="video-card">
      <div class="lawyer-left-header">
        <div class="black-line"></div>
        <span class="title">待处理视频预约</span>
      </div>
      <div class="tabel-card">
        <el-table
          :data="listInform.video.videoPending"
          key="listInform.video.videoPending"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column prop="orderId" label="服务编号" />
          <el-table-column prop="time" label="预约时间" />
          <el-table-column prop="clientName" label="预约委托人" />
          <el-table-column prop="consultType" label="咨询类别"></el-table-column>
          <el-table-column prop="productName" label="使用产品" />
          <el-table-column label="操作" width="500">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="background-color: #0068B7;color: white"
                @click="toOtherPage(scope.row.orderId,'/work/videoInformation')"
              >查看资料</el-button>
              <el-button
                v-if="!scope.row.status"
                size="mini"
                style="background-color: #00B75F;color:white"
                @click="changeOrder(scope.row.orderId)"
              >转单</el-button>
              <el-button
                v-if="scope.row.status"
                size="mini"
                style="background-color: rgb(228,228,228)"
                @click="cancelChange(scope.row.orderId)"
              >转单待接收</el-button>
              <el-button
                size="mini"
                style="background-color:white"
                @click="toOtherPage(scope.row.orderId,'/work/video')"
              >进入视频</el-button>
              <el-button
                size="mini"
                style="background-color: #2DCA93;color: white"
                @click="deletVideoOrder(scope.row.orderId,scope.row.time)"
              >视频退单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
        <el-pagination
          class="el-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listInform.video.queryInfo.PageNum"
          :page-sizes="[1, 2, 5]"
          :page-size="listInform.video.queryInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listInform.video.queryInfo.Total"
        ></el-pagination>
      </div>
    </div>
    <div class="video-card">
      <div class="lawyer-left-header">
        <div class="black-line"></div>
        <span class="title">待处理文本预约</span>
      </div>
      <div class="tabel-card">
        <el-table
          :data="listInform.text.textPending"
          key="listInform.text.textPending"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column prop="orderId" width="200" label="服务编号" />
          <el-table-column prop="createTime" label="提交时间" />
          <el-table-column prop="clientName" label="预约委托人" />
          <el-table-column prop="schedulingType" label="服务类别" />
          <el-table-column prop="productName" label="使用产品" />
          <el-table-column prop="orderStatus" label="状态">
            <template slot-scope="scope">
              <span style="color:#FB0020">{{scope.row.orderStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timeOutTime" label="截止时间" />
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="background-color: #0068B7;color: white"
                @click="toOtherPage(scope.row.orderId,'/work/text')"
              >查看资料</el-button>

              <el-button
                v-if="scope.row.orderStatus=='首次提交'"
                size="mini"
                style="background-color: #00B75F;color:white"
                @click="changeOrder(scope.row.orderId)"
              >转单</el-button>
              <el-button
                v-if="scope.row.orderStatus=='待转单'"
                size="mini"
                style="background-color: rgb(228,228,228)"
                @click="cancelChange(scope.row.orderId)"
              >转单待接收</el-button>
              <el-button
                v-if="scope.row.orderStatus=='首次提交'"
                size="mini"
                style="background-color: #FB0020;color:white"
                @click="deleteOrder(scope.row.orderId)"
              >退单</el-button>
              <!-- <el-button size="mini" v-if=" scope.row.orderStatus==='首次提交'" style="background-color: rgb(0,153,255);color: white" @click="submit(scope.row.orderId,'forLawyer')">提交定审</el-button> -->
              <el-button
                size="mini"
                v-if=" scope.row.orderStatus==='定审中'"
                style="background-color: orange;color: white"
              >定审中</el-button>
              <el-button
                size="mini"
                v-if=" scope.row.orderStatus==='待确认'"
                style="background-color: orange;color: white"
              >待确认</el-button>
              <el-button
                size="mini"
                v-if="(lawyerInform.inform.lawyerRole==='全功能律师' )& (scope.row.orderStatus==='首次提交' |scope.row.orderStatus==='二次修改中')"
                style="background-color: #00B75F;color:white"
                @click="submit(scope.row.orderId,lawyerInform.lawyerId,'forUser',)"
              >提交用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
        <el-pagination
          class="el-pagination"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="listInform.text.queryInfo.PageNum"
          :page-sizes="[1, 2, 5]"
          :page-size="listInform.text.queryInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listInform.text.queryInfo.Total"
        ></el-pagination>
      </div>
    </div>

    <!-- 有转单的提示弹窗 -->
    <div class="change-accept">
      <ChangeConfirmTrue
        :confirmDialog="dialog.acceptOrder.hasOrder"
        :changeInform="dialog.acceptOrder.orderInform"
        @getFromChangeConfirmTrue="getFromChangeConfirmTrue"
      />
    </div>

    <!-- 确认弹窗 -->
    <div class="confirm">
      <Confirm
        :confirmDialog="dialog.confirm.confirmDialog"
        :operation="dialog.confirm.inform"
        :title="dialog.confirm.title"
        @getFromConfirm="getFromConfirm"
      />
    </div>

    <!-- 提交定审弹窗 -->
    <div class="submit">
      <el-dialog
        :title="dialog.submitDialog.title"
        :visible.sync="dialog.submitDialog.dialog"
        width="40%"
        :showClose="dialog.submitDialog.showClo"
        :close-on-click-modal="dialog.submitDialog.showClo"
      >
        <div class="dialog-body">
          <span style="margin-right:10%">提交用户</span>

          <div id="container">
            <a
              id="selectfiles"
              href="javascript:void(0);"
              class="btn"
              style="margin-right:20px"
            >选择文件</a>
            <a id="postfiles" href="javascript:void(0);" class="btn">开始上传</a>
          </div>
          <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            style="background-color:rgb(45, 202, 147)"
            @click="closeSubmit"
          >确 定</el-button>
          <el-button type="primary" style="background-color:red" @click="closeSubmit">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!--转单框-->
    <div class="changeOrder">
      <el-dialog
        title="选择律师"
        :visible.sync="dialog.changeOrder.dialog"
        width="1220px"
        :showClose="dialog.changeOrder.showClo"
        :close-on-click-modal="dialog.changeOrder.showClo"
      >
        <span
          style="font-size: 16px;font-family: Microsoft YaHei;font-weight: bold;color: rgba(51, 51, 51, 1);"
        >转单律师 {{this.lawyerInform.inform.lawyerName}}</span>
        <div style="width:100%;height:60px;display:flex;align-items:center">
          <span style="margin-right:5%">编号</span>
          <el-input
            style="width:20%;margin-right:5%"
            v-model=" changeLawyers.searchId"
            size="medium"
            placeholder="请输入编号"
          />
          <span style="margin-right:5%">律师姓名</span>
          <el-input
            style="width:20%;margin-right:5%"
            size="medium"
            v-model="changeLawyers.searchName"
            placeholder="请输入律师名称"
          />
          <el-button
            size="medium"
            class="el-button-search"
            @click="selectChangeLawyer"
            style="background:rgba(237,241,242,1)"
          >搜索</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="changeLawyers.lawyerList"
          height="420"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column label width="30">
            <template slot-scope="scope">
              <el-radio v-model="changeLawyers.selectLawyer" :label="scope.row" style="color:white"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="lawyerName" label="律师姓名" />
          <el-table-column label="律师头像">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.lawyerImageUrl"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="lawyerFirm" label="律所"></el-table-column>
          <el-table-column prop="lawyerCertNo" label="执业证号" />
          <el-table-column prop="lawyerProfession" label="擅长类别" />
          <el-table-column prop="lawyerRole" label="角色" />
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button class="buttom3" @click="clearChange">取消</el-button>
          <el-button class="buttom4" @click="sendLawyer">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  video_pending,
  getLawyerInform,
  otherLawyer,
  getHistoryWork,
  delete_oreder,
  select_delete,
  cantOline,
  send_change,
  monitor_change,
  cancel_change
} from "../../../api/api";
import Calendar from "../../../components/calendar/Calendar.vue";
import ChangeConfirmTrue from "../../../components/confirm2/ChangeConfirmTrue";
import Confirm from "../../../components/confirm2/Confirm";
import {
  upFile,
  g_object_name,
  originalName,
  delet
} from "../../../api/plupload";
export default {
  name: "Index2",
  components: {
    Calendar,
    ChangeConfirmTrue,
    Confirm
  },
  data() {
    return {
      //取消订单订单记录
      cancelChangeOrderId: "",
      //日历传递数组
      arr: [],
      // arr2: [],
      value: new Date(),
      listInform: {
        video: {
          queryInfo: { PageNum: 1, PageSize: 5, Total: 0, TotalPage: 0 },
          finishedVideoCount: 0,
          videoPending: []
        },
        text: {
          queryInfo: { PageNum: 1, PageSize: 5, Total: 0, TotalPage: 0 },
          finishedTextCount: 0,
          textPending: []
        }
      },

      //所有弹窗信息
      dialog: {
        acceptOrder: {
          hasOrder: false,
          orderInform: {}
        },
        confirm: {
          confirmDialog: false,
          title: "",
          inform: ""
        },
        changeOrder: {
          dialog: false,
          showClo: false
        },
        submitDialog: {
          dialog: false,
          title: "提交用户",
          showClo: false
        }
      },
      //页面律师数据
      lawyerInform: {
        inform: {}
      },
      //定时器数据
      timeStamp: {
        listRefresh: {},
        monitorChange: {}
      },
      //可转单律师
      changeLawyers: {
        searchName: "",
        searchId: "",
        lawyerList: [],
        orderId: "",
        selectLawyer: {}
      },
      //上一次定时器保存数据
      lastDate: {
        video: [],
        text: []
      }
    };
  },

  methods: {
    // 获取首页数据
    getPage() {
      video_pending({
        videoStartPage: this.listInform.video.queryInfo.PageNum,
        videoRows: this.listInform.video.queryInfo.PageSize,
        textStartPage: this.listInform.text.queryInfo.PageNum,
        textRows: this.listInform.text.queryInfo.PageSize
        // poolStartPage: this.fix.queryInfo.PageNum,
        // poolRows: this.fix.queryInfo.PageSize
      })
        .then(res => {
          console.log(res)
          if (res == "lawyer is not login!") {
            let r = window.confirm("登录信息已过期");
            if (r == true) {
              this.$router.push({
                path: "/login"
              });
            } else {
            }
          }

        
        //    this.lastDate.video = res.todoVideoOrderModelList.list;
        // this.lastDate.text = res.todoTextOrderModelList.list;
          if (!!res.todoVideoOrderModelList) {
            (this.listInform.video.videoPending =
              res.todoVideoOrderModelList.list),
              (this.listInform.video.queryInfo.Total =
                res.todoVideoOrderModelList.totalCount),
              (this.listInform.video.queryInfo.TotalPage =
                res.todoVideoOrderModelList.totalPage),
              (this.listInform.video.finishedVideoCount =
                res.finishedVideoCount);
          } else {
            (this.listInform.video.videoPending = []),
              (this.listInform.video.queryInfo.Total = 0),
              (this.listInform.video.queryInfo.TotalPage = 0),
              (this.listInform.video.finishedVideoCount =
                res.finishedVideoCount);
          }
          if (!!res.todoTextOrderModelList) {
            this.listInform.text.textPending = res.todoTextOrderModelList.list;
            (this.listInform.text.queryInfo.Total =
              res.todoTextOrderModelList.totalCount),
              (this.listInform.text.queryInfo.TotalPage =
                res.todoTextOrderModelList.totalPage);
            this.listInform.text.finishedTextCount = res.finishedTextCount;
          } else {
            this.listInform.text.textPending = [];
            (this.listInform.text.queryInfo.Total = 0),
              (this.listInform.text.queryInfo.TotalPage = 0);
            this.listInform.text.finishedTextCount = res.finishedTextCount;
          }
              this.RefreshLastDate()
        })
        .catch(err => {
          console.log(err,"111111");
          // this.$router.push({
          //   path: "/login"
          // });
        });
    },
    //跳转(新建页面并打开)
    toOtherPage(Id, target) {
      const routeData = this.$router.resolve({
        // path: "/work/video",
        // path: "/work/videoInformation",
        path: target,
        query: {
          orderId: Id
        }
      });
      window.open(routeData.href, "_blank");
    },
    /*修改表头样式*/
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center;height:30px";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:rgba(247,246,246,1);color: black;font-weight: 700;text-align:center;height:30px";
      }
    },
    //   翻页方法
    handleSizeChange(val) {
      this.listInform.video.queryInfo.PageSize = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.listInform.video.queryInfo.PageNum = val;
      this.getPage();
    },
    handleSizeChange2(val) {
      this.listInform.text.queryInfo.PageSize = val;
      this.getPage();
    },
    handleCurrentChange2(val) {
      this.listInform.video.queryInfo.PageNum = val;
      this.getPage();
    },
    // 接受转单弹窗回调
    getFromChangeConfirmTrue(data,data2) {
      if(data){
        (this.dialog.acceptOrder.hasOrder = false),
        (this.dialog.acceptOrder.orderInform = {}),
        this.getPage()
      }else{
        cancel_change({
          orderId: data2
        })
          .then(res => {
            if (res == true) {
              this.getPage();
               this.dialog.acceptOrder.hasOrder = false
        this.dialog.acceptOrder.orderInform = true

            } else {
              console.log("取消转单失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      
        
    },


    //按下取消转单
    cancelChange(val) {
      this.cancelChangeOrderId = val;
      this.dialog.confirm.confirmDialog = true;
      this.dialog.confirm.inform = "是否取消转单";
      this.dialog.confirm.title = "提示";
    },
    //清空弹窗信息
    clearConfirmWindow() {
      this.dialog.confirm.confirmDialog = false;
      this.dialog.confirm.title = "";
      this.dialog.confirm.inform = "";
    },
    //提示弹窗的回调函数
    getFromConfirm(date1, date2, date3) {
      console.log(date2);
      if (
        (date2 == "有新的订单") |
        (date2 == "已经超过可退单时间") |
        (date2 == "转单仅限在本单截至时间前2小时才可进行")|
         (date2 == "有订单状态发生改变")
      ) {
        this.clearConfirmWindow();
        this.getPage();
      }
      if (date2 === "是否取消转单" && date3 == true) {
        cancel_change({
          orderId: this.cancelChangeOrderId
        })
          .then(res => {
            if (res == true) {
              this.getPage();
              this.cancelChangeOrderId = "";
            } else {
              console.log("取消转单失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 查询转单接口
    changeOrderRefresh() {
      monitor_change({})
        .then(res => {
          if (res.status == 1) {
            this.dialog.acceptOrder.orderInform = res.transferInfoList[0];
            this.dialog.acceptOrder.hasOrder = true;
          } else {
           
            this.dialog.acceptOrder.hasOrder = false;
            this.dialog.acceptOrder.orderInform = {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户信息
    getInform() {
      getLawyerInform({})
        .then(res => {
          this.lawyerInform.inform = res;
        })
        .catch(err => {
          this.$router.push({
            path: "/login"
          });
        });
    },
    //定时器刷新列表
    listRefresh() {
      video_pending({
        videoStartPage: 1,
        videoRows: 1000,
        textStartPage: 1,
        textRows: 1000,
      }).then(res => {
        let videoLast = [];
        let textLast = [];
        let videoNow = [];
        let textNow = [];
        this.lastDate.video.forEach(item => {
          videoLast.push(item.status);
        });
        this.lastDate.text.forEach(item => {
          textLast.push(item.orderStatus);
        });
        if(!!res.todoVideoOrderModelList){
           res.todoVideoOrderModelList.list.forEach(item => {
          videoNow.push(item.status);
        });
        }
        if(!!res.todoTextOrderModelList){
          res.todoTextOrderModelList.list.forEach(item => {
          textNow.push(item.orderStatus);
        });

        }
        // console.log(videoLast,videoNow,textLast,textNow)
       
        if (
          textLast.join() != textNow.join() ||
          videoLast.join() != videoNow.join()
        ) {
          this.dialog.confirm.confirmDialog = true;
          this.dialog.confirm.title = "提示";
          this.dialog.confirm.inform = "有订单状态发生改变";
      
        }

        if (
          (res.todoTextCount > this.listInform.text.queryInfo.Total) |
          (res.todoVideoCount > this.listInform.video.queryInfo.Total)
        ) {
          this.dialog.confirm.confirmDialog = true;
          this.dialog.confirm.title = "提示";
          this.dialog.confirm.inform = "有新的订单";
        }
      });
    },
    //加载转单弹窗
    changeOrder(Id) {
      (this.changeLawyers.orderId = Id),
        (this.dialog.changeOrder.dialog = true),
        this.selectChangeLawyer();
    },
    //搜索可转单律师
    selectChangeLawyer() {
      otherLawyer({
        id: !!this.changeLawyers.searchId ? this.changeLawyers.searchId : null,
        lawyerName: this.changeLawyers.search
      })
        .then(res => {
          this.changeLawyers.lawyerList = res.list;
          this.changeLawyers.lawyerList.sort(function(a, b) {
            if (a.id < b.id) {
              return -1;
            } else if (a.id == b.id) {
              return 0;
            } else {
              return 1;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发送转单信息
    sendLawyer() {
      send_change({
        orderId: this.changeLawyers.orderId,
        toLawyerId: this.changeLawyers.selectLawyer.lawyerId,
        isLawyerTransfer: true
      })
        .then(res => {
          if (!res.status) {
            this.clearChange();
            this.dialog.confirm.confirmDialog = true;
            this.dialog.confirm.title = "提示";
            this.dialog.confirm.inform = res.msg;
          } else {
            this.clearChange();
            this.getPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //清空转单弹窗
    clearChange() {
      (this.dialog.changeOrder.dialog = false),
        (this.changeLawyers.searchId = ""),
        (this.changeLawyers.searchName = ""),
        (this.changeLawyers.selectLawyer = {});
        
    },
    //查询排班
    searchWork() {
      let arr = [];
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
    //
    //文本退单逻辑
    deleteOrder(orderId) {
      let that = this;
      delete_oreder({
        orderId: orderId
      }).then(res => {
        console.log(res);
        if (res.status == false) {
          this.dialog.confirm.confirmDialog = !res.status;
          this.dialog.confirm.inform = res.msg;
          this.dialog.confirm.title = "提示";
        } else {
          console.log("1122");
          that.getPage();
        }
      });
    },
    //视频退单
    deletVideoOrder(Id, time) {
      console.log("1");
      let date = new Date();
      let timeStr =
        date.getFullYear() +
        "/" +
        Number(date.getMonth() + 1).toString() +
        "/" +
        date.getDate() +
        " " +
        time;
      let maxCancelTime =
        parseInt(Number(new Date(timeStr).getTime()) / 1000) - 900;
      console.log(maxCancelTime);
      if (parseInt(Number(date.getTime()) / 1000) < maxCancelTime) {
        cantOline({
          lawyerId: this.lawyerInform.lawyerId,
          orderId: Id
        })
          .then(res => {
            console.log("已拒绝上线");
            this.getPage();
          })
          .catch(err => {
            console.log("拒绝上线出错");
          });
      } else {
        this.dialog.confirm.confirmDialog = true;
        this.dialog.confirm.inform = "已经超过可退单时间";
        this.dialog.confirm.title = "提示";
      }
    },

    //提交审核
    submit(orderId, lawyerId, type) {
      this.dialog.submitDialog.dialog = true;
      this.$nextTick(() => {
        var dir = "text_lawyer_upload/";
        upFile(dir, orderId, lawyerId, type).then(res => {});
      });
    },
    //关闭审核弹窗
    closeSubmit() {
      delet();
      this.dialog.submitDialog.dialog = false;
      this.setTimeout(this.getPage, 1000);
    },
    //总列表刷新
    RefreshLastDate(){
       video_pending({
       videoStartPage: 1,
        videoRows: 1000,
        textStartPage: 1,
        textRows: 1000,
       }).then(res => {
        //  console.log(res,"123")
      if (res != "lawyer is not login!") {
        if(!!res.todoVideoOrderModelList){
          this.lastDate.video = res.todoVideoOrderModelList.list;
        }
        if(!!res.todoTextOrderModelList){
          this.lastDate.text = res.todoTextOrderModelList.list;
        }       
      }
    });

    }

  },
  mounted() {
    // this.RefreshLastDate();
    this.getPage();
    this.getInform();
    this.searchWork();
    this.timeStamp.listRefresh = setInterval(this.listRefresh, 10000);
    this.timeStamp.monitorChange = setInterval(this.changeOrderRefresh, 10000);
  }
};
</script>

<style scope>
.index {
  width: 100%;
  min-width: 1200px;
  /* height:50rem; */
  background: rgba(240, 242, 245, 1);
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
}
.index .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.index .text1 {
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  /* line-height: 59px; */
}
.index .title2 {
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.index .text2 {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  margin-bottom: 22px;
}
.index .text3 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(101, 101, 101, 1);
  line-height: 18px;
}
.index .buttom1 {
  width: 5.8rem;
  height: 2.6rem;
  background: rgba(87, 182, 75, 0.1);
  border: 1px solid rgba(87, 182, 75, 0.3);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 126, 112, 1);
  margin-left: 3rem;
}
.index .buttom100 {
  width: 267px;
  height: 39px;
  background: rgba(36, 169, 139, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
}
.index .header {
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-between;
}
.index .header-left {
  width: 74%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 3rem 3rem 3rem 3rem;
  box-sizing: border-box;
}
.index .lawyer-inform {
  height: 40%;
  width: 100%;
  display: flex;
}
.index .lawyer-left,
.lawyer-right {
  width: 60%;
  height: 100%;

  display: flex;
  flex-direction: column;
}
.index .lawyer-right {
  width: 40%;
}
.index .lawyer-left-header {
  height: 5rem;
  display: flex;
  align-items: center;
}
.index .black-line {
  width: 5px;
  height: 20px;
  background: rgba(51, 51, 51, 1);
  border-radius: 3px;
  margin-left: 7px;
}
.index .title {
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 5rem;
  margin-left: 8px;
}
.index .lawyer-left-body {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
}
.index .lawyer-pic {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: blue;
  margin-left: 5rem;
  margin-right: 3.6rem;
  overflow: hidden;
}
.index .lawyer-inform-card {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.index .card-head {
  height: 7rem;
  display: flex;
  align-items: center;
}
.index .card-body {
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 7rem);
}
.index .card-body-item {
  width: 50%;
  height: 50%;
}

.index .header-right {
  width: 25%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 2rem;
  box-sizing: border-box;
}
.index .work-inform {
  width: 100%;
  height: 60%;
}
.index .work-inform-body {
  height: calc(100% - 7rem);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  align-items: center;
  justify-content: space-around;
}
.index .work-inform-item {
  width: 15%;
  height: 35%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.index .video-card {
  width: 100%;
  box-sizing: border-box;
  padding: 22px;
  background-color: white;
  margin-top: 17px;
}
.tabel-card {
  width: 100%;
}
.index .wh_container {
  width: 100%;
}
.btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.submit .el-dialog {
  border-radius: 20px;
  height: 40%;
  box-sizing: border-box;
}
.submit .el-dialog__header {
  box-sizing: border-box;
  height: 20%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit .el-dialog__body {
  height: 60%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;
}

.submit .el-dialog__footer {
  height: 20%;
  box-sizing: border-box;
  border-top: 1px rgb(215, 215, 215) solid;
}

.changeOrder /deep/ .el-dialog {
  height: 700px;
}
.changeOrder /deep/ .el-dialog__header {
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
.changeOrder /deep/ .el-dialog__body {
  height: calc(100% - 150px);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.changeOrder /deep/ .el-dialog__footer {
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

.changeOrder /deep/ .buttom3,
.buttom4 {
  width: 56px;
  height: 32px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: black;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.changeOrder /deep/ .buttom4 {
  width: 56px;
  height: 32px;
  background: rgba(66, 127, 115, 1);
  border-radius: 4px;
  color: aliceblue;
  margin-right: 30px;
}
.wh_container .mark1 {
  background: rgba(64, 126, 112, 1);
  color: white;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
}
</style>