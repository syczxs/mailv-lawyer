
<template>
  <div class="my-litigation">
    <span class="title-text">首页>我的代理</span>
    <div class="header">
      <div class="header-header">我的代理</div>
      <div class="header-body">
        <el-select v-model="search.select" placeholder="请选择">
          <el-option
            v-for="item in selectType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          placeholder="输入关键字"
          v-model="search.keyword"
          style="width:200px;margin-left:10px;margin-right:30px"
        ></el-input>

        <el-button style="background:rgba(237,241,242,1);" @click="getTableList">搜索</el-button>
      </div>
    </div>

    <div class="body">
      <div class="table-card" style="margin-top:16px">
        <el-table
          :data="tableData"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          :key="itemKey"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" label="案件序号"></el-table-column>
          <el-table-column prop="caseId" label="案件编号"></el-table-column>
          <el-table-column prop="competentCourt" label="管辖法院"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" />
          <el-table-column prop="quantities" label="标的额" />
          <el-table-column prop="createTime" label="发布时间" />
          <el-table-column prop="statues" label="案件状态"></el-table-column>
          <el-table-column prop="useTime">
            <template slot-scope="scope">
              <span style=" color:#FF9600">{{scope.row.useTime}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                v-if="scope.row.statues=='已代理'"
                class="button"
                @click="showInform(scope.row.id)"
              >查看详情</el-button> -->
              <el-button
                v-if="scope.row.statues=='待确认'"
                class="button"
                style="width:90px;background:rgba(255,150,0,1);border-radius:4px;"
                @click=" selectLitigation(scope.row.id)"
              >确认承接意向</el-button>
              <el-button
                class="button"
                v-if="scope.row.statues!='待确认'"
                style="background-color:#0068B7;color:white"
                @click="showUpdialog(scope.row.id,scope.row.caseId,scope.row.statues)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination">
          <el-pagination
            class="el-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.PageNum"
            :page-sizes="[1, 2, 5]"
            :page-size="queryInfo.PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.Total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="ligitation-inform">
      <LitigationInform
        :litigationDialog="dialog.confirmDialog.dialogShow"
        :litigationInform="dialog.confirmDialog.dialogInform"
        :lawyerId="lawyerInform.lawyerId"
        accept="confirm"
        @getFromInform="getFromConfirm"
      ></LitigationInform>
    </div>

    <MyLitigationInform
      :litigationDialog="dialog.informDialog.dialogShow"
      :litigationInform="dialog.informDialog.dialogInform"
      @getFromInform="getFromInform"
    ></MyLitigationInform>
    <UpLitigation
      :upLitigationDialog="dialog.upDialog.dialogShow"
      :upLitigationID="dialog.upDialog.litigationID"
      :upLitigationCaseID="dialog.upDialog.caseId"
      :lawyerId="lawyerInform.lawyerId"
      :upLitigationState="dialog.upDialog.caseState"
      @fromUpDialog="getFromUpDialog"
    ></UpLitigation>
  </div>
</template>

<script>
import {
  myLitigation,
  getLawyerInform,
  myLitigationInform,
  selectLitigationById,
} from "../../../api/api";
import MyLitigationInform from "./MyLitigationInform";
import UpLitigation from "./UpLitigation";
import LitigationInform from "../../../components/LitigationInform";

export default {
  name: "MyLitigation",
  components: {
    MyLitigationInform,
    UpLitigation,
    LitigationInform,
  },
  data() {
    return {
      timeStamp: {},
      lawyerInform: {},
      tableData: [],
      itemKey: 0,
      queryInfo: {
        PageNum: 1,
        PageSize: 5,
        Total: 0,
        TotalPage: 0,
      },
      prop: {
        id: "",
        time: "",
      },
      selectType: [
        {
          value: "caseId",
          label: "案件编号",
        },
        {
          value: "competentCourt",
          label: "管辖法院",
        },
        {
          value: "caseType",
          label: "案件类型",
        },
      ],
      search: {
        select: "",
        keyword: "",
      },
      dialog: {
        informDialog: {
          dialogShow: false,
          dialogInform: {},
        },
        upDialog: {
          dialogShow: false,
          litigationID:0,
          caseId:"",
          caseState:""
        },
        confirmDialog: {
          dialogShow: false,
          dialogInform: {},
        },
      },
    };
  },
  methods: {
    getTableList() {
      let obj = {
        currentPage: this.queryInfo.PageNum,
        rows: this.queryInfo.PageSize,
        lawyerId: this.lawyerInform.lawyerId,
      };
      if (!!this.search.select) {
        obj[this.search.select] = this.search.keyword;
      }
      // console.log(obj)
      myLitigation(obj).then((res) => {
        console.log(res, "qqqq");
        this.tableData = res.list;
        this.queryInfo.Total = res.total;
        this.queryInfo.TotalPage = res.pages;
        this.timeStamp = setInterval(this.checkTime, 1000);
      });
    },
    checkTime() {
      let nowTime = parseInt(new Date().getTime()) / 1000;
      this.tableData.forEach((item) => {
        if (item.statues == "待确认") {
          let deadline =
            parseInt(new Date(item.pickTime).getTime()) / 1000 + 6 * 60 * 60;
          if (deadline - nowTime > 0) {
            let runTime = deadline - nowTime;
            let year = Math.floor(runTime / 86400 / 365);
            runTime = runTime % (86400 * 365);
            let month = Math.floor(runTime / 86400 / 30);
            runTime = runTime % (86400 * 30);
            let day = Math.floor(runTime / 86400);
            runTime = runTime % 86400;
            let hour = Math.floor(runTime / 3600);
            runTime = runTime % 3600;
            let minute = Math.floor(runTime / 60);
            runTime = runTime % 60;
            let second = Math.floor(runTime);
            item.useTime =
              "倒计时" + hour + "小时" + minute + "分钟" + second + "秒";
          }
        }
        this.itemKey = this.itemKey + 1;
      });
    },
    selectLitigation(id) {
      selectLitigationById({
        id: id,
        lawyerId: this.lawyerInform.lawyerId,
      }).then((res) => {
        this.dialog.confirmDialog.dialogShow = true;
        this.dialog.confirmDialog.dialogInform = res;
      });
    },
    showInform(id) {
      myLitigationInform({
        id: id,
        upload: false,
      }).then((res) => {
        this.dialog.informDialog.dialogShow = true;
        this.dialog.informDialog.dialogInform = res;
      });
    },
    getFromInform(res) {
      this.dialog.informDialog.dialogShow = res;
      this.getTableList();
    },
    getFromConfirm(res){
      this.dialog.confirmDialog.dialogShow = res;
      this.getTableList();

    },
    showUpdialog(id,id2,statues) {
      this.dialog.upDialog.dialogShow = true;
      this.dialog.upDialog.litigationID=id;
      this.dialog.upDialog.caseId=id2;
      this.dialog.upDialog.caseState=statues
    },
    getFromUpDialog(res) {
      this.dialog.upDialog.dialogShow = res;
      this.dialog.upDialog.litigationID=0,
      this.dialog.upDialog.caseId="",
      this.dialog.upDialog.caseState=""
    },
    /*修改表头样式*/
    tableRowStyle({ row, rowIndex }) {
      return "text-align:center";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: rgba(247,246,246,1);color: black;font-weight: 700;text-align:center";
      }
    },

    /*分页方法*/
    handleSizeChange(val) {
      this.queryInfo.PageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.queryInfo.PageNum = val;
      this.getTableList();
    },
    
  },
  mounted() {
    //获取用户信息
    getLawyerInform({})
      .then((res) => {
        this.lawyerInform = res;
        this.getTableList();
      })
      .catch((err) => {
        this.$router.push({
          path: "/login",
        });
        window.alert("已断开连接");
      });
  },
  created() {},
};
</script>

<style >
.my-litigation .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.my-litigation .header {
  height: 130px;
  padding: 0 20px 0 20px;
  background-color: #fff;
  margin-bottom: 18px;
}
.my-litigation .header-header {
  height: 55px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.my-litigation .header-body {
  height: 75px;
  display: flex;
  align-items: center;
}
.my-litigation .body {
  width: 100%;
  padding: 0 18px 0 18px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
}
.my-litigation .body-header {
  width: 100%;
  height: 50px;
  display: flex;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}
.my-litigation .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-litigation .button {
  width: 66px;
  height: 23px;
  background: rgba(0, 183, 95, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>