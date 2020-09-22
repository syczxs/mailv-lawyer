<template>
  <div class="index-card">
    <div class="header-box-card">
      <div class="lawyer-inform">
        <div class="inform-top">
          <div style="width:75%;">
            <div style="height:60%;display:flex">
              <div class="head-box">
                <div class="head-pic">
                  <img class="img" :src="lawyerInform.lawyerImageUrl" />
                </div>
              </div>
              <div style="width:35%;height:100%;display:flex;flex-direction: column">
                <div class="lawyer-name">{{lawyerInform.lawyerName}}  当前状态：<div v-if="onlineState.hasOnline">在线</div><div v-else>下线</div></div>
                <div class="lawyer-name">下午好</div>
                
              </div>
            </div>

            <div class="time-tips">
              <div class="time-tips-item">上班时间 :08：00</div>
              <div class="time-tips-item">下班时间 ：18：00</div>
              <div
                class="time-tips-item"
                style="font-weight:600"
              >今日首次上线时间 {{onlineState.onlineTime}}</div>
              <div class="time-tips-item" style="font-weight:600">今日末次下线时间</div>
            </div>
          </div>
          <div style="width:25%;">
            <div style="height:40%;display:flex; align-items: center;justify-content: center">
              <div v-if="!onlineState.hasOnline" class="login-button" @click="online">上线</div>
              <div v-if="onlineState.hasOnline" class="off-button" @click="offline">下线</div>
            </div>
            <div style="height:60%;display:flex; align-items: center;justify-content: center">
              <!-- <div class="login-button" @click="cantOnline">拒绝上线</div> -->
              <!-- <div class="login-clock">
                <div
                  style="width:100%;height:60%;display:flex; align-items: center;justify-content: center;color:white;font-weight:600;font-size:30px"
                >{{onlineState.hasOlineTime}}</div>
                <div
                  style="width:100%;height:40%;display:flex; align-items: center;justify-content: center;color:white;"
                >今日在线时间</div>
              </div> -->
            </div>
          </div>
        </div>

        <div class="inform-body">
          <!-- <div
            :class="[operation==='video'? 'inform-body-item-active':'inform-body-item' ]"
            @click="ontap('video')"
          >
            <div
              style="width:100%;height:60%;font-size:2.5rem;padding-left:20px;box-sizing:border-box;"
            >{{video.queryInfo.Total}}</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:1rem;"
            >待处理视频预约</div>
          </div>
          <div
            :class="[operation==='text'? 'inform-body-item-active':'inform-body-item' ]"
            @click="ontap('text')"
          >
            <div
              style="width:100%;height:60%;font-size:2.5rem;padding-left:20px;box-sizing:border-box;"
            >{{text.queryInfo.Total}}</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:1rem;"
            >待处理文本预约</div>
          </div> -->
          <!-- <div
            :class="[operation==='analyse'? 'inform-body-item-active':'inform-body-item' ]"
            @click="ontap('analyse')"
          >
            <div
              style="width:100%;height:60%;font-size:30px;padding-left:20px;box-sizing:border-box;"
            >0</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:15px;"
            >待处理专项分析意见书</div>
          </div> -->
          <!-- <div
            :class="[operation==='consultation'? 'inform-body-item-active':'inform-body-item' ]"
            @click="ontap('consultation')"
          >
            <div
              style="width:100%;height:60%;font-size:30px;padding-left:20px;box-sizing:border-box;"
            >0</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:15px;"
            >待处理当面咨询</div>
          </div> -->
          <div class="inform-body-item">
            <div
              style="width:100%;height:60%;font-size:2.5rem;padding-left:20px;box-sizing:border-box;"
            >{{video.finishedVideoCount}}</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:1rem;"
            >今日完成视频预约</div>
          </div>
          <div class="inform-body-item">
            <div
              style="width:100%;height:60%;font-size:2.5rem;padding-left:20px;box-sizing:border-box;"
            >0</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:1rem;"
            >今日完成文本处理</div>
          </div>
          <!-- <div class="inform-body-item">
            <div
              style="width:100%;height:60%;font-size:30px;padding-left:20px;box-sizing:border-box;"
            >0</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:15px;"
            >今日完成转型意见分析书</div>
          </div> -->
          <!-- <div class="inform-body-item">
            <div
              style="width:100%;height:60%;font-size:30px;padding-left:20px;box-sizing:border-box;"
            >0</div>
            <div
              style="width:100%;height:40%;padding-left:20px;box-sizing:border-box;font-size:15px;"
            >今日完成当面咨询</div>
          </div> -->
        </div>
      </div>
      <div class="date-inform">
        <div style="height:85%">
          <div style="width:100%;height:100%;display:flex; justify-content: center;">
            <Calendar
              ref="Calendar"
              :markDateMore="arr"
              :markDate="arr2"
              v-on:isToday="clickToday"
              agoDayHide="1530115221"
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"
            ></Calendar>
          </div>
          <div style="width:100%;height:15%;display:flex;justify-content: center;">
            <div
              style="width:50%;height:100%;border-radius: 5px;background-color:rgb(45,202,147);color:white;display:flex;justify-content:center;align-items: center"
              @click="toScheduling"
            >报名|取消排班</div>
          </div>
        </div>
      </div>
    </div>

    <div class="body-box-card" v-if="operation==='video'">
      <div style="height:10%;display:flex;align-items: center;padding-left:20px;font-weight:600">
        <div style="margin-right:20px">待处理视频预约</div>
      </div>
      <div style="width:100%;height:80%;display:flex; justify-content:center">
        <div style="width:96%">
          <el-table
            :data="video.videoPending"
            key="video.videoPending"
            :cell-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            v-if="operation==='video'"
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
                  style="background-color: #2DCA93;color: white"
                  @click="toVideoInformation(scope.row.orderId)"
                >查看资料</el-button>
                <el-button
                  v-if="!scope.row.status"
                  size="mini"
                  style="background-color: white"
                  @click="zhuandan(scope.row.orderId)"
                >转单</el-button>
                <el-button
                  v-if="scope.row.status"
                  size="mini"
                  style="background-color: rgb(228,228,228)"
                  @click="cancel_zhuandan(scope.row.orderId)"
                >转单待接收</el-button>
                <el-button
                  size="mini"
                  style="background-color: #2DCA93;color: white"
                  @click="toVideo(scope.row.orderId)"
                >进入视频</el-button>
                <el-button
                  size="mini"
                  style="background-color: #2DCA93;color: white"
                  @click="cantOnline(scope.row.orderId,scope.row.time)"
                  
                >视频退单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
        <el-pagination
          class="el-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="video.queryInfo.PageNum"
          :page-sizes="[1, 2, 5]"
          :page-size="video.queryInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="video.queryInfo.Total"
        ></el-pagination>
      </div>
    </div>
    <div class="body-box-card" v-if="operation==='text'">
      <div style="height:10%;display:flex;align-items: center;padding-left:20px;font-weight:600">
        <div style="margin-right:20px" @click="toFix">待处理文本预约</div>
        <!-- <div @click="toFix"> 待定审合同池</div> -->
      </div>
      <div class="textTodo" style="width:100%;height:80%" v-if="fixed==true">
        <div style="width:100%;height:100%;display:flex; justify-content:center">
          <div style="width:96%">
            <el-table
              :data="text.textPending"
              key="text.textPending"
              :cell-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
              v-if="operation==='text'"
            >
              <el-table-column prop="orderId" width="200" label="服务编号" />
              <el-table-column prop="createTime" label="提交时间" />
              <el-table-column prop="clientName" label="预约委托人" />
              <el-table-column prop="schedulingType" label="服务类别" />
              <el-table-column prop="orderStatus" label="状态" />
              <el-table-column prop="timeOutTime" label="截止时间" />
              <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    style="background-color: #2DCA93;color: white"
                    @click="toText(scope.row.orderId)"
                  >查看资料</el-button>

                  <el-button
                  v-if="scope.row.orderStatus=='首次提交'"
                    size="mini"
                    style="background-color: white"
                    @click="zhuandan(scope.row.orderId)"
                  >转单</el-button>
                  <el-button
                  
                    v-if="scope.row.orderStatus=='待转单'"
                    size="mini"
                    style="background-color: rgb(228,228,228)"
                    @click="cancel_zhuandan(scope.row.orderId)"
                  >转单待接收</el-button>
                  <el-button
                  v-if="scope.row.orderStatus=='首次提交'"
                    size="mini"
                    style="background-color: white"
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
                    v-if="(lawyerInform.lawyerRole==='全功能律师' )& (scope.row.orderStatus==='首次提交' |scope.row.orderStatus==='二次修改中')"
                    style="background-color: rgb(0,153,255);color: white"
                    @click="submit(scope.row.orderId,lawyerInform.lawyerId,'forUser',)"
                  >提交用户</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
          <el-pagination
            class="el-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="text.queryInfo.PageNum"
            :page-sizes="[1, 2, 5]"
            :page-size="text.queryInfo.PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="text.queryInfo.Total"
          ></el-pagination>
        </div>
      </div>
      <!-- <div class="fixTodo" style="width:100%;height:80%" v-if="fixed==false">
                <div style="width:100%;height:100%;display:flex; justify-content:center">
                    <div style="width:96%">
                        <el-table
                            :data="fix.fixPending"
                            key="fix.fixPending"
                            :cell-style="tableRowStyle"
                            :header-cell-style="tableHeaderColor"
                           
                        >
                            <el-table-column prop="orderId" width="200" label="服务编1号"/>
                            <el-table-column prop="createTime" label="提交时间"/>
                            <el-table-column prop="clientName" label="预约委托人"/>
                            <el-table-column prop="schedulingType" label="服务类别"/>
                            <el-table-column prop="orderStatus"  label="状态"/>
                            <el-table-column prop="timeOutTime" label="截止时间"/>
                            <el-table-column label="操作" width="400">
                                <template slot-scope="scope">
                                <el-button size="mini" style="background-color: #2DCA93;color: white" >查看资料</el-button>
                                <el-button size="mini" style="background-color: rgb(0,153,255);color: white" @click="lawyerFix(scope.row.orderId)" >接单</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </div>
                </div>
                <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
                    <el-pagination class="el-pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="fix.queryInfo.PageNum"
                        :page-sizes="[1, 2, 5]"
                        :page-size="fix.queryInfo.PageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="fix.queryInfo.Total">
                    </el-pagination>
                </div>
      </div>-->
    </div>
    <div class="body-box-card" v-if="operation==='analyse'">
      <div
        style="height:10%;display:flex;align-items: center;padding-left:20px;font-weight:600"
      >待处理意见书</div>
      <div style="width:100%;height:80%;display:flex; justify-content:center">
        <div style="width:96%"></div>
      </div>
      <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
        <el-pagination
          class="el-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="video.queryInfo.PageNum"
          :page-sizes="[1, 2, 5]"
          :page-size="video.queryInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="video.queryInfo.Total"
        ></el-pagination>
      </div>
    </div>
    <div class="body-box-card" v-if="operation==='consultation'">
      <div
        style="height:10%;display:flex;align-items: center;padding-left:20px;font-weight:600"
      >待处理当面预约</div>
      <div style="width:100%;height:80%;display:flex; justify-content:center">
        <div style="width:96%"></div>
      </div>
      <div style="width:100%;display:flex;justify-content:flex-end;magin-buttom:0 ">
        <el-pagination
          class="el-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="video.queryInfo.PageNum"
          :page-sizes="[1, 2, 5]"
          :page-size="video.queryInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="video.queryInfo.Total"
        ></el-pagination>
      </div>
    </div>

    <!--弹出转单框-->
    <el-dialog title="选择律师" :visible.sync="addDialog" width="50%" :showClose="showClo">
      <span>转单律师 {{this.lawyerInform.lawyerName}}</span>
      <div class="dialogbody">
        <!--律师框表格-->
        <div style="width:100%;height:15%;display:flex;align-items: center;">
          <span style="margin-right:5%">编号</span>
          <el-input
            style="width:20%;margin-right:5%"
            v-model=" lawyerSearch.lawyerId"
            size="medium"
            placeholder="请输入编号"
          />
          <span style="margin-right:5%">律师姓名</span>
          <el-input
            style="width:20%;margin-right:5%"
            size="medium"
            v-model="lawyerSearch.lawyerName"
            placeholder="请输入律师名称"
          />
          <el-button
            size="medium"
            class="el-button-search"
            @click="zhuandan"
            style="background-color:rgb(45,202,147);color:white"
          >搜索</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="lawyerList"
          height="420"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <el-table-column label width="30">
            <template slot-scope="scope">
              <el-radio v-model="selectLawyer" :label="scope.row.id" style="color:white"></el-radio>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="background-color:rgb(45,202,147);color:white" @click="send_lawyer">确定</el-button>
        <el-button style="background-color:white;color:black" @click="cancel_lawyer">取消</el-button>
      </span>
    </el-dialog>

    <!-- 转单失败提示框 -->
    <div class="change-false">
      <ChangeConfirm
        :confirmDialog="ChangeConfirm"
        :msg="defaultMsg"
        @getFromChangeConfirm="getFromChangeConfirm"
      />
    </div>

    <!-- 转单提示框 -->
    <div class="change-accept">
      <ChangeConfirmTrue
        :confirmDialog="hasChange"
        :changeInform="ChangeInform"
        @getFromChangeConfirmTrue="getFromChangeConfirmTrue"
      />
    </div>

    <!-- 取消转单弹窗 -->
    <div class="change-cancle">
      <Confirm
        :confirmDialog="cancelChangeDialog"
        :operation="nowOperation"
        @getFromConfirm="getFromConfirm"
      />
    </div>

    <!-- 提交定审弹窗 -->
    <div class="submit">
      <el-dialog
        :title="submitText.title"
        :visible.sync="submitDialog"
        width="40%"
        :showClose="showClo"
        :close-on-click-modal="showClo"
      >
        <div class="dialog-body">
          <span style="margin-right:10%">{{submitText.text}}</span>

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
  </div>
</template>

<script>
import {
  lowyer_online,
  lowyer_offline,
  cantOline,
  video_pending,
  getLawyerInform,
  otherLawyer,
  send_change,
  monitor_change,
  noConfirmChange,
  cancel_change,
  fixTextOrder,
  select_textInform
} from "../../api/api";
import { getHistoryWork, delete_oreder, select_delete,selectOnlineState} from "../../api/api";
import { upFile, g_object_name, originalName,delet } from "../../api/plupload";
import ChangeConfirm from "../../components/confirm/ChangeConfirm";
import ChangeConfirmTrue from "../../components/confirm/ChangeConfirmTrue";
import Confirm from "../../components/confirm/Confirm";
import Calendar from "../../components/calendar/Calendar.vue";

export default {
  name: "Index",
  components: {
    ChangeConfirm,
    ChangeConfirmTrue,
    Confirm,
    Calendar
  },
  data() {
    return {
      arr: [
        {
          date: "2020/3/1",
          className: "mark1"
        },
        {
          date: "2020/3/2",
          className: "mark2"
        }
      ],
      arr2: [],
      value: new Date(),
      lawyerInform: {},
      onlineState: {
        hasOnline: false,
        onlineTime: "",
        offlineTime: "",
        hasOlineTime: "00:00:00"
      },
      video: {
        queryInfo: { PageNum: 1, PageSize: 5, Total: 0, TotalPage: 0 },
        finishedVideoCount: 0,
        videoPending: []
      },
      text: {
        queryInfo: { PageNum: 1, PageSize: 5, Total: 0, TotalPage: 0 },
        finishedTextCount: 0,
        textPending: []
      },
      fix: {
        queryInfo: { PageNum: 1, PageSize: 5, Total: 0, TotalPage: 0 },
        fixPending: []
      },
      operation: "video",
      fixed: true,
      timestamp: {},
      // 转单弹窗
      zhuandan_id: "",
      addDialog: false,
      showClo: false,
      lawyerList: [],
      lawyerSearch: {
        lawyerId: null,
        lawyerName: null
      },
      selectLawyer: {},
      selectLawyer_inform: {
        lawyerName: ""
      },
      // 转单失败弹窗提示
      ChangeConfirm: false,
      defaultMsg: "",

      // 定时查询
      monitor_stamp: {},
      //定时查询未接受转单接口
      no_video_stamp: {},
      // 转单信息
      ChangeInform: {},
      // 转单信息
      hasChange: false,
      // 是否有未确认转单
      videoNoConfirm: 0,
      //当前操作--转单，退单
      nowOperation: "",
      //取消转单的弹窗
      cancelChangeDialog: false,
      //取小转单id
      cancelChangeOrderId: "",
      // 文件上传弹窗
      submitDialog: false,
      showClo: false,
      submitText: {
        title: "",
        text: ""
      },
      //退单定时器
      delete_stamp: {},
      //页面刷新定时器
      list_stamp: {},
      //关闭记录时间1
      _beforeUnload_time: "",
      //关闭记录时间2
      _gap_time: "",
      
    };
  },
  methods: {
    // 视频接口
    selectVideo() {
      video_pending({
        videoStartPage: this.video.queryInfo.PageNum,
        videoRows: this.video.queryInfo.PageSize,
        textStartPage: this.text.queryInfo.PageNum,
        textRows: this.text.queryInfo.PageSize,
        poolStartPage: this.fix.queryInfo.PageNum,
        poolRows: this.fix.queryInfo.PageSize
      })
        .then(res => {
          console.log(res);
          if (res == "lawyer is not login!") {
            let r = window.confirm("登录信息已过期");
            if (r == true) {
              this.$router.push({
                path: "/login"
              });
            } else {
            }
          }
          if (res.todoVideoOrderModelList) {
            this.video.videoPending = res.todoVideoOrderModelList.list;
            (this.video.queryInfo.Total =
              res.todoVideoOrderModelList.totalCount),
              (this.video.queryInfo.TotalPage =
                res.todoVideoOrderModelList.totalPage);
            this.video.finishedVideoCount = res.finishedVideoCount;
          } else {
            this.video.videoPending = [];
            (this.video.queryInfo.Total = 0),
              (this.video.queryInfo.TotalPage = 0);
            this.video.finishedVideoCount = res.finishedVideoCount;
          }
          if (res.todoTextOrderModelList) {
            this.text.textPending = res.todoTextOrderModelList.list;
            (this.text.queryInfo.Total = res.todoTextOrderModelList.totalCount),
              (this.text.queryInfo.TotalPage =
                res.todoTextOrderModelList.totalPage);
            this.text.finishedTextCount = res.finishedTextCount;
          } else {
            this.text.textPending = [];
            (this.text.queryInfo.Total = 0),
              (this.text.queryInfo.TotalPage = 0);
            this.text.finishedTextCoun = res.finishedTextCount;
          }
          if (res.todoContractPoolModelPageBean) {
            this.fix.fixPending = res.todoContractPoolModelPageBean.list;
            (this.fix.queryInfo.Total =
              res.todoContractPoolModelPageBean.totalCount),
              (this.fix.queryInfo.TotalPage =
                res.todoContractPoolModelPageBean.totalPage);
          } else {
            this.fix.fixPending = [];
            (this.fix.queryInfo.Total = 0), (this.fix.queryInfo.TotalPage = 0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上线
    online() {
      lowyer_online({})
        .then(res => {
          console.log(res);
          this.onlineState.hasOnline = true;
          this.onlineState.onlineTime = res.onlineTime;
          this.olineTime_web = new Date();
          this.timestamp = setInterval(this.timeCounter, 1000);

          if (localStorage.getItem("lastDay")) {
            var lastDay = localStorage.getItem("lastDay");
            if (this.olineTime_web.getDate() > lastDay) {
              localStorage.setItem("lastDay", this.olineTime_web.getDate());
              localStorage.setItem("lastRunTime", "0");
              this.lastRunTime = 0;
            } else {
              this.lastRunTime = parseInt(localStorage.getItem("lastRunTime"));
            }
          } else {
            localStorage.setItem("lastDay", this.olineTime_web.getDate());
            localStorage.setItem("lastRunTime", "0");
            this.lastRunTime = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    offline() {
      lowyer_offline({})
        .then(res => {
          console.log(res);
          this.onlineState.hasOnline = false;
          clearInterval(this.timestamp);
          this.storageTime();
        })
        .catch(err => {
          console.log(err);
        });
      // $.ajax({
      //   url: "/api/lawyerIndex/offline",
      //   type: "post",
      //   async: false, //或false,是否异步
      //   data: {},

      //   success: function(data) {
      //     console.log(data);
      //     debugger;
      //   },
      //   error: function(data) {}
      // });
    },

    /*修改表头样式*/
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: rgb(228,228,228);color: black;font-weight: 700;text-align:center";
      }
    },
    //   翻页方法
    handleSizeChange(val) {
      if (this.operation === "video") {
        this.video.queryInfo.PageSize = val;
      }
      if (this.operation === "text") {
        this.text.queryInfo.PageSize = val;
      }
      this.selectVideo();
    },
    handleCurrentChange(val) {
      if (this.operation === "video") {
        this.video.queryInfo.PageNum = val;
      }
      if (this.operation === "text") {
        console.log("q");
        this.text.queryInfo.PageNum = val;
      }

      this.selectVideo();
    },
    toScheduling() {
      //   this.$router.push({
      //   path: "/work/scheduling",
      //   query: {}
      // });

      const routeData = this.$router.resolve({
        path: "/work/scheduling",
        query: {}
      });
      window.open(routeData.href, "_blank");
    },
    timeCounter() {
      let newTime = new Date().getTime();
      var runTime =
        parseInt((newTime - this.olineTime_web.getTime()) / 1000) +
        parseInt(this.lastRunTime);
      runTime = runTime % (86400 * 365);
      runTime = runTime % (86400 * 30);
      runTime = runTime % 86400;
      var hour =
        Math.floor(runTime / 3600) < 10
          ? "0" + Math.floor(runTime / 3600).toString()
          : Math.floor(runTime / 3600).toString();
      runTime = runTime % 3600;
      var minute =
        Math.floor(runTime / 60) < 10
          ? "0" + Math.floor(runTime / 60).toString()
          : Math.floor(runTime / 60).toString();
      runTime = runTime % 60;
      var second = runTime < 10 ? "0" + runTime.toString() : runTime.toString();
      this.onlineState.hasOlineTime = hour + ":" + minute + ":" + second;
    },
    //   存上线时间
    storageTime() {
      var offline = new Date();
      if (offline.getDate() > localStorage.getItem("lastDay")) {
        var zero = new Date(new Date().toLocaleDateString()).getTime();
        var lastRunTime = parseInt((offline.getTime() - zero) / 1000);
        localStorage.setItem("lastRunTime", lastRunTime.toString());
      } else {
        console.log("1112");
        var allTime =
          parseInt(localStorage.getItem("lastRunTime")) +
          parseInt((offline.getTime() - this.olineTime_web.getTime()) / 1000);
        console.log(allTime.toString());
        localStorage.setItem("lastRunTime", allTime.toString());
      }

      this.olineTime_web;
    },
    ontap(v) {
      this.operation = v;
    },
    toVideo(Id) {
      const routeData = this.$router.resolve({
        path: "/work/video",
        query: {
          orderId: Id
        }
      });
      window.open(routeData.href, "_blank");
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
    toText(Id) {
      const routeData = this.$router.resolve({
        path: "/work/text",
        query: {
          orderId: Id
        }
      });
      window.open(routeData.href, "_blank");
    },
    zhuandan(Id) {
      this.addDialog = true;
      if (Id) {
        this.zhuandan_id = Id;
      }
      if (this.lawyerSearch.lawyerId == "") {
        this.lawyerSearch.lawyerId = null;
      }
      otherLawyer({
        id: this.lawyerSearch.lawyerId,
        lawyerName: this.lawyerSearch.lawyerName
      })
        .then(res => {
          this.lawyerList = res.list;
          this.lawyerList.sort(function(a, b) {
            if (a.id < b.id) {
              return -1;
            } else if (a.id == b.id) {
              return 0;
            } else {
              return 1;
            }
          });
          for (var i = 0; i < this.lawyerList.length; i++) {
            this.lawyerList[i].web_id = i + 1;
          }
          console.log(this.lawyerList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    send_lawyer() {
      this.addDialog = false;

      send_change({
        orderId: this.zhuandan_id,
        toLawyerId: this.selectLawyer_inform.lawyerId,
        isLawyerTransfer:true
      })
        .then(res => {
          if (!res.status) {
            this.ChangeConfirm = !res.status;
            this.defaultMsg = res.msg;
          }
          if (res.status === true) {
            this.selectVideo();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 转单失败弹窗回调
    getFromChangeConfirm(data) {
      this.ChangeConfirm = data;
      this.defaultMsg = "";
      this.selectVideo();
    },
    cancel_lawyer() {
      this.addDialog = false;
    },
    // 转单确认弹窗回调
    getFromChangeConfirmTrue(data) {
      this.hasChange = data;
      this.selectVideo();
    },
    //按下取消转单
    cancel_zhuandan(val) {
      this.cancelChangeOrderId = val;
      this.cancelChangeDialog = true;
      this.nowOperation = "是否取消转单";
    },
    //确认弹窗的回调函数
    getFromConfirm(dat1, date2) {
      this.cancelChangeDialog = false;
      if (this.nowOperation === "是否取消转单" && date2 == true) {
        cancel_change({
          orderId: this.cancelChangeOrderId
        })
          .then(res => {
            if (res == true) {
              this.selectVideo();
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
    monitor() {
      monitor_change({})
        .then(res => {  
          if (res.status == 1) {
            this.ChangeInform = res.transferInfoList[0];
            this.hasChange = true;
          } else {
            this.hasChange = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询未确认转单信息
    monitor_no_video() {
      noConfirmChange({})
        .then(res => {
          if (res.status) {
            if (this.videoNoConfirm === res.orderIdList.length) {
              return;
            } else {
              this.videoNoConfirm = res.orderIdList.length;
              this.selectVideo();
            }
          } else {
            if (this.videoNoConfirm === 0) {
              return;
            } else {
              this.selectVideo();
              this.videoNoConfirm = 0;
            }
          }
        })
        .catch(err => {
          console.log("111");
        });
    },
    //提交审核
    submit(orderId, lawyerId, type) {
      this.submitDialog = true;
      if (type === "forUser") {
        (this.submitText.title = "提交用户"),
          (this.submitText.text = "上传定稿");
      } else if (type === "forLawyer") {
        (this.submitText.title = "上传定审"),
          (this.submitText.text = "上传初稿");
      }
      this.$nextTick(() => {
        var dir = "text_lawyer_upload/";
        upFile(dir, orderId, lawyerId, type).then(res => {});
      });
    },

    //关闭审核弹窗
    closeSubmit() {
      delet()
      this.submitDialog = false;
      this.selectVideo();
    },
    //审核池
    toFix() {
      this.fixed = !this.fixed;
    },
    lawyerFix(orderId) {
      fixTextOrder({
        orderId: orderId
      }).then(res => {
        console.log(res);
        this.selectVideo();
      });
    },
    //日历方法
    clickDay(data) {
      console.log("选中了", data); //选中某天
      //   this.$toast("选中了" + data);
    },
    clickToday(data) {
      console.log("跳到了本月今天", data); //跳到了本月
    },
    changeDate(data) {
      //   this.$toast("切换到的月份为" + data);
      console.log("左右点击切换月份", data); //左右点击切换月份
    },
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
    //退单逻辑
    deleteOrder(orderId) {
      delete_oreder({
        orderId: orderId
      }).then(res => {
        console.log(res);
        if (!res.status) {
          this.ChangeConfirm = !res.status;
          this.defaultMsg = res.msg;
        }
        if (res.status === true) {
          this.selectVideo();
        }
      });
    },

    //查询是否有退单
    searchDelete() {
      select_delete({}).then(res => {
        if (res) {
          this.ChangeConfirm = res;
          this.defaultMsg = "有新的订单";
        }
      });
    },
    //刷新列表
    selectRefresh() {
      video_pending({}).then(res => {
        
        if(!!res.todoTextOrderModelList){
          var last=JSON.stringify(this.text.textPending)
          var now=JSON.stringify(res.todoTextOrderModelList.list)

        }
        
       
        if (
          (res.todoTextCount > this.text.queryInfo.Total) |
          (res.todoVideoCount > this.video.queryInfo.Total)
        ) {
          this.ChangeConfirm = true;
          this.defaultMsg = "有新的订单";
          
        }else if (
          (res.todoTextCount < this.text.queryInfo.Total) |
          (res.todoVideoCount < this.video.queryInfo.Total)|
          (last!=now)
        ) {
          this.ChangeConfirm = true;
          this.defaultMsg = "订单状态已改变";
         
        }
      });
       
    },
    // //视频开始前的提醒
    // refreshRemind(){
    //   let nowTimeR=new Date()
    //   let yerR=new Date().getFullYear()
    //   let monthR=new Date().getMonth()
    //   this.video.videoPending.map

    // }
    //关闭前判断
    // beforeunloadHandler() {
    //   this._beforeUnload_time = new Date().getTime();
    // },
    // unloadHandler(e) {
    //   this._gap_time = new Date().getTime() - this._beforeUnload_time;

    //   console.log(this._gap_time, "aaaaaas");
    //   debugger;

    //   //判断是窗口关闭还是刷新
    //   // if (this._gap_time <= 5) {
    //   //   console.log("222222");
    //   //   debugger;
    //   //   setTimeout(function() {
    //   //     console.log("1");
    //   //   }, 1000);

    //   //   $.ajax({
    //   //     url: "/api/lawyerIndex/offline",
    //   //     type: "post",
    //   //     async: false, //或false,是否异步
    //   //     data: {},

    //   //     success: function(data) {
    //   //       console.log(data);
    //   //       debugger;
    //   //     },
    //   //     error: function(data) {}
    //   //   });
    //   // }
    //   // debugger;

    //   if (this._gap_time <= 5) {
    //     var oAjax = new XMLHttpRequest();
    //     console.log("3")
    //     debugger

    //     oAjax.open("GET",  + "/api/lawyerIndex/offline", true); //false表示同步请求

    //     oAjax.setRequestHeader(
    //       "Content-type",
    //       "application/x-www-form-urlencoded"
    //     );

    //     oAjax.onreadystatechange = function() {
    //       if (oAjax.readyState == 4 && oAjax.status == 200) {
    //         var data = JSON.parse(oAjax.responseText);
    //         console.log(data)
    //         debugger
    //       } else {
    //         console.log(oAjax);
    //       }
    //     };

    //     oAjax.send("a=1&b=2");
    //     debugger
    //   }
    // }
    // logData() {
    //   console.log("1");
    //   debugger;

    //   window.navigator.sendBeacon(
    //     "http://www.mailvjt.com:8090/lawyerIndex/offline",
    //     analyticsData
    //   );
    //   console.log("2");
    //   debugger;
    // },
    cantOnline(Id,time){
      console.log(time)
      let date=new Date()
      let timeStr=date.getFullYear()+'/'+(Number(date.getMonth()+1)).toString()+"/"+date.getDate()+" "+time;
      let maxCancelTime=parseInt(Number(new Date(timeStr).getTime())/1000)-900
      if(parseInt(Number(date.getTime()) / 1000)<maxCancelTime){
             cantOline({
         lawyerId:this.lawyerInform.lawyerId,
         orderId:Id

       }).then(res=>{
         console.log("已拒绝上线")
         this.selectVideo()
       }).catch(err=>{
         console.log("拒绝e上线出错")
       })

      }else{
         this.ChangeConfirm = true;
          this.defaultMsg = "订单开始前15分钟内无法取消";

      }
    
  

    }
  },

  mounted() {
    this.selectVideo();
    this.searchWork();

    getLawyerInform({})
      .then(res => {
        console.log(res);
        this.lawyerInform = res;
      })
      .catch(err => {
        console.log(err);
      });

    this.monitor_stamp = setInterval(this.monitor, 3000);
    this.no_video_stamp = setInterval(this.monitor_no_video, 3000);
    this.delete_stamp = setInterval(this.searchDelete, 3000);
    this.list_stamp = setInterval(this.selectRefresh, 3000);
    // 监听浏览器关闭事件
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // window.addEventListener("unload", e => this.unloadHandler(e));
    // window.addEventListener("unload", this.logData, false);
    selectOnlineState({

    }).then(res=>{
      console.log(res)
      if(res.onlineStatus==1){
        this.onlineState.hasOnline=true,
        this.onlineState.onlineTime=res.onlineTime

      }
      
    })
  },
  destroyed() {
    // clearInterval(this.monitor_stamp)
    // clearInterval(this.no_video_stam)
    // clearInterval(this.delete_stamp)
    // clearInterval(this.list_stamp)
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
    // window.removeEventListener("unload", e => this.unloadHandler(e));
  },

  created() {
    function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
  },

  watch: {
    selectLawyer(val) {
      this.lawyerList.forEach(i => {
        if (i.id === val) {
          this.selectLawyer_inform = i;
        }
      });
    }
  }
};
</script>

<style >
.index-card {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 242, 242);
}
.index-card .header-box-card {
  height: 40%;
  background-color: rgb(242, 242, 242);
  display: flex;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  
}
.index-card .lawyer-inform {
  width: 64%;
  height: 100%;
  background-color: white;
  margin-right: 1%;
  min-width:800px
}
.index-card .inform-top {
  width: 100%;
  height: 45%;
  display: flex;
}
.index-card .head-box {
  background-color: white;
  width: 12%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-card .head-pic {
  width: 60%;
  height: 65%;
  background-color: rgb(102, 102, 102);
  border-radius: 50%;
}

.index-card .head-pic img {
  width: 100%;
  height: 100%;

  border-radius: 50%;
}
.index-card .lawyer-name {
  width: 100%;
  height: 40%;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5%;
}
.index-card .time-tips {
  height: 40%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
}
.index-card .time-tips-item {
  width: 50%;
  padding-left: 10px;
  box-sizing: border-box;
}
.index-card .login-button,
.off-button {
  width: 40%;
  height: 60%;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 153, 0);
}
.index-card .off-button {
  background-color: white;
}
.index-card .login-clock {
  width: 60%;
  height: 90%;
  background-color: rgb(45, 202, 147);
}
.index-card .inform-body {
  width: 100%;
  height: 55%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}
.index-card .inform-body-item {
  width: 23%;
  height: 43%;
  background-color: rgb(215, 215, 215);
}
.index-card .inform-body-item-active {
  width: 23%;
  height: 43%;
  background-color: rgb(45, 202, 147);
}

.index-card .date-inform {
  width: 35%;
  height: 100%;
  background-color: white;
  min-width:400px
}
.index-card .el-calendar__header {
  height: 10%;
}
.index-card .el-calendar__body {
  height: 60%;
  padding: 0;
}
.index-card .el-calendar-table thead th {
  padding: 0;
}
.index-card .el-calendar-table {
  width: 100%;
  height: 100%;
}
.index-card .el-calendar-table tr td:first-child {
  border: none;
}
.index-card .el-calendar-table .el-calendar-day {
  height: 10%;
  padding: 0;
  padding-left: 10px;
  font-size: 15px;
}
.index-card .el-calendar-table td {
  border: none;
}

.index-card .body-box-card {
  height: 56%;
  background-color: white;
  margin: 20px;
  box-sizing: border-box;
}
.dialogbody {
  width: 100%;
  height: 500px;
  border: 1px black solid;
}

/* elementui样式修改 */
.index-card .el-dialog__header {
  font-weight: 600;
  padding-left: 20px;
}
.el-dialog {
  border-radius: 20px;
}
.el-dialog__footer {
  border-top: 1px rgb(174, 174, 174) solid;
}
.el-table::before {
  height: 0%;
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

.wh_container .mark1 {
  background:rgba(64,126,112,1);
  color: white;
   width:2rem;
  height:2rem;
  border-radius: 50%
}

.wh_container .mark2 {
  background-color: blue;
  height: 100%;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.wh_container .wh_content_all {
  /* background-color: red; */
}
/* .wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
     width:2rem;
  height:2rem;
  border-radius: 50%
} */

/* .wh_content_item .wh_isToday {
  background: yellow;
  
  width:2rem;
  height:2rem;
  border-radius: 50%
}
.wh_content_item .wh_chose_day {
  background: green;
 
   width:2rem;
  height:2rem;
  border-radius: 50%
} */
</style>