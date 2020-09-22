
<template>
  <div class="settlement">
    <span class="title-text">首页>订单结算</span>

    <div class="box">
      <div class="header">
        <span class="title">订单结算</span>
      </div>
    </div>

    <div class="body">
      <div class="people-card">
        <div class="lawyer-pic">
          <img style="width:100%;height:100%" :src="lawyerInform.lawyerImageUrl" />
        </div>

        <div class="inform-card">
          <div style="width:40%;text-align:center">
            <span class="text">姓名：{{lawyerInform.lawyerName}}</span>
          </div>
          <div style="width:1px;height:20px;background:rgba(203,203,203,1);"></div>
          <div style="width:40%;text-align:center">
            <span class="text">{{lawyerInform.lawyerRole}}</span>
          </div>
          <!-- <div style="width:100%;text-align:center">
            <span class="text">律所：{{lawyerInform.lawyerFirm}}</span>
          </div> -->

          <!-- <div style="width:40%;text-align:center">
            <span class="text">本月完成订单量{{allOrder}}</span>
          </div> -->
          <!-- <div style="width:1px;height:20px;background:rgba(203,203,203,1);"></div> -->
          <div style="width:40%;text-align:center">
            <span class="text">本月收入{{allMoney}}元</span>
          </div>
        </div>
      </div>

      <div style="flex: 1;">
        <div class="table-card">
          <div class="card-head">
            <span>订单列表</span>
          </div>
          <span
            style="font-size: 16px;font-family: Microsoft YaHei;color: rgba(51, 51, 51, 1);margin-bottom: 20px;margin-right:20px"
          >选择月份</span>
          <el-date-picker
            @change="getList"
            v-model="selectMonth"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          ></el-date-picker>
          <span
            style="font-size: 16px;font-family: Microsoft YaHei;color: rgba(51, 51, 51, 1);margin-bottom: 20px;margin-right:20px;float:right"
          >本月预计收入:{{allMoney}}元</span>
          <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="serviceContent" label="服务类别"></el-table-column>
            <el-table-column prop="durationOrNumber" label="本月时长/份数"></el-table-column>
            <el-table-column prop="unitCost" label="单价" />
            <el-table-column prop="totalPrice" label="总金额" />
           <el-table-column label="查看详情">
              <template slot-scope="scope">
                <el-button @click="selectOrder(scope.row.serviceContent)">查看详情</el-button>
              </template>
              
            </el-table-column>
          </el-table>

          <!--分页-->
          <!-- <div class="pagination">
      <el-pagination class="el-pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.PageNum"
                     :page-sizes="[1, 2, 5]"
                     :page-size="queryInfo.PageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="queryInfo.Total">
      </el-pagination>
          </div>-->
        </div>

        <div class="table-card" style="margin-top:16px">
          <div class="card-head">
            <span>订单详情</span>
          </div>
          
          <el-table :data="tableData2" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="serviceContent" label="服务类别"></el-table-column>
            <el-table-column prop="durationOrNumber" label="本月时长/份数"></el-table-column>
            <el-table-column prop="startTime" label="时间"></el-table-column>
            <el-table-column prop="unitCost" label="单价" />
            <el-table-column prop="totalPrice" label="总金额" />
            
          </el-table>

          <!--分页-->
          <div class="pagination">
      <el-pagination class="el-pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.PageNum"
                     :page-sizes="[1, 2, 5]"
                     :page-size="queryInfo.PageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="queryInfo.Total">
      </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  settlementByLawyerId,
  getLawyerInform,
  settlementLawyerId,
  settlementByType
} from "../../../api/api";
import Calendar from "../../../components/calendar/Calendar";
export default {
  name: "Settlement",
  components: {
    Calendar
  },
  data() {
    return {
      selectMonth: "",
      lawyerInform: {},
      tableData: [],
      tableData2:[],
      allMoney: 0,
      allOrder:0,
      queryInfo: {
        PageNum: 1,
        PageSize: 5,
        Total: 0,
        TotalPage: 0
      }
    };
  },
  methods: {
    getList() {
      settlementLawyerId({
        lawyerId: this.lawyerInform.lawyerId,
        yearMonth: this.selectMonth
      }).then(res => {
        console.log(res);
        this.tableData = res;
        res.map(item => {
          this.allMoney = this.allMoney + Number(item.totalPrice);
        });
      });
    },
    //   翻页方法
    handleSizeChange(val) {
      this.listInform.video.queryInfo.PageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listInform.video.queryInfo.PageNum = val;
      this.getList();
    },

    getMonth() {
      let nowMonth = new Date().getMonth() + 1;
      let nowYear = new Date().getFullYear();
      if (Number(nowMonth) < 10) {
        nowMonth = "0" + nowMonth;
      }
      this.selectMonth = nowYear + "-" + nowMonth;

      console.log(this.selectMonth);
    },
    selectOrder(type){
      console.log("1")
      console.log(type)
      settlementByType({
        lawyerId: this.lawyerInform.lawyerId,
        yearMonth: this.selectMonth,
        type:type,
        currentPage:this.queryInfo.PageNum,
        row:this.queryInfo.PageSize
      }).then(res=>{
        console.log(res)
        this.tableData2=res.list,
        this.queryInfo.Total=res.total
        ths.queryInfo.TotalPage=res.pages
      })

    }
  },
  mounted() {
    this.getMonth();
    getLawyerInform({})
      .then(res => {
        this.lawyerInform = res;
        this.getList();
        // this.$store.commit('addInform',this.lawyerInform)
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {}
};
</script>

<style >
.settlement .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.settlement .box {
  width: 100%;
  height: 50px;
  background-color: white;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.settlement .header {
  height: 50px;
  /* border-bottom: 1px rgba(238, 238, 238, 1) solid; */
  display: flex;
  align-items: center;
}
.settlement .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.text {
  font-size: 16px;
  font-family: Microsoft YaHei;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 20px;
}
.settlement .body {
  width: 100%;
  margin-top: 16px;
  display: flex;
}
.settlement .people-card {
  width: 400px;
  height: 500px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 19px;
  justify-content: space-around;
}
.settlement .lawyer-left-header {
  height: 5rem;
  display: flex;
  align-items: center;
}
.settlement .lawyer-pic {
  width: 10rem;
  height: 10rem;
  background-color: red;
  border-radius: 50%;
  overflow: hidden;
}
.settlement .inform-card {
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.table-card {
  width: 100;
  background-color: #fff;
  padding: 0 20px 30px 20px;
  box-sizing: border-box;
}
.card-head {
  width: 100%;
  height: 50px;
  border-bottom: 1px rgba(237, 237, 237, 1) solid;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 20px;
}
.pagination {
  width: 96%;
}

.el-pagination {
  float: right;
}
</style>