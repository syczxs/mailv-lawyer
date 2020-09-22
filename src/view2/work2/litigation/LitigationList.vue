
<template>
  <div class="litigation-list">
    <span class="title-text">首页>案件列表</span>
    <div class="header">
      <div class="header-header">案件信息列表</div>
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

        <span class="text1" style="margin-right:30px">发布时间</span>

        <el-date-picker
          style="width:20%;margin-right:20px"
          v-model="search.dateTime"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd "
        ></el-date-picker>
        <el-button style="background:rgba(237,241,242,1);" @click="getTableList">搜索</el-button>
      </div>
    </div>

    <div class="body">
      <div class="body-header">
        <div  :class="[search.accept=='noaccept'?'item2':'item1']" style="margin-right: 20px" @click="showSwitch">
          <span>未申请</span>
        </div>
        <div :class="[search.accept=='accept'?'item2':'item1']"  @click="showSwitch">
          <span>已申请</span>
        </div>
      </div>

      <div class="table-card" style="margin-top:16px">
        <el-table
          :data="tableData"
          :cell-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" label="案件序号"></el-table-column>
          <el-table-column prop="caseId" label="案件编号"></el-table-column>
          <el-table-column prop="competentCourt" label="管辖法院"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" />
          <el-table-column prop="quantities" label="标的额" />
          <el-table-column prop="caseStatus" label="案件状态" />
          <el-table-column prop="createTime" label="发布时间" />
          <el-table-column  label="操作详情" >
            <template slot-scope="scope">
              <el-button class="botton" @click="selectLitigation(scope.row.id)">查看详情</el-button>
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
    <LigitatonInform :litigationDialog="dialog.informDialog.dialogShow" :litigationInform="dialog.informDialog.dialogInform" :lawyerId="lawyerInform.lawyerId"
    :accept="search.accept" @getFromInform="getFromInform"></LigitatonInform>
    </div>
  </div>
</template>

<script>
import { allLitigation ,getLawyerInform,selectLitigationById} from "../../../api/api";
import LigitatonInform from "../../../components/LitigationInform"

export default {
  name: "LitigationList",
  components: {
    LigitatonInform
  },
  data() {
    return {
      tableData: [],
      lawyerInform:{
      

      },
      queryInfo: {
        PageNum: 1,
        PageSize: 5,
        Total: 0,
        TotalPage: 0
      },
      selectType: [
        {
          value: "caseId",
          label: "案件编号"
        },
        {
          value: "competentCourt",
          label: "管辖法院"
        },
        {
          value: "caseType",
          label: "案件类型"
        }
      ],
      search: {
        select: "",
        keyword: "",
        dateTime: [],
        accept:"noaccept",
      },
      dialog:{
        informDialog:{
          dialogShow:false,
          dialogInform:{},

        }
        
      }
    };
  },
  methods: {
    getTableList() {
      
      let obj = {
        startTime: !!this.search.dateTime ? this.search.dateTime[0] : "",
        endTime: !!this.search.dateTime ? this.search.dateTime[1] : "",
        currentPage:this.queryInfo.PageNum,
        rows:this.queryInfo.PageSize,
        lawyerId:this.lawyerInform.lawyerId,
        apply:this.search.accept=='accept'
      };
      if(!!this.search.select){
        obj[this.search.select] = this.search.keyword;
      }
      console.log(obj)     
      
      allLitigation(obj).then(res=>{
        console.log(res)
        this.tableData=res.list
        this.queryInfo.Total=res.total
        this.queryInfo.TotalPage=res.pages
      })
      
    },
    showSwitch(){
      if(this.search.accept=="noaccept"){
        this.search.accept="accept"
      }else{
        this.search.accept="noaccept"
      }
      this.getTableList()


    },
    selectLitigation(id){
      selectLitigationById({
        id:id,
        lawyerId:this.lawyerInform.lawyerId

      }).then(res=>{
        this.dialog.informDialog.dialogShow=true
        this.dialog.informDialog.dialogInform=res
       
      })

    },
    getFromInform(res){
      
      this.dialog.informDialog.dialogShow=res
      this.getTableList()

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
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.queryInfo.PageNum = val;
      this.getTableList()
    }
  },
  mounted() {
       //获取用户信息
      getLawyerInform({})
        .then(res => {
          this.lawyerInform = res;
          this.getTableList()
        })
        .catch(err => {
          this.$router.push({
            path: "/login"
          });
          window.alert("已断开连接")
        });
  
  },
  created() {}
};
</script>

<style >
.litigation-list .title-text {
  display: block;
  font-size: 1.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 2.6rem;
  margin: 1rem 0 1rem 2rem;
  box-sizing: border-box;
}
.litigation-list .header {
  height: 130px;
  padding: 0 20px 0 20px;
  background-color: #fff;
  margin-bottom: 18px;
}
.litigation-list .header-header {
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
.litigation-list .header-body {
  height: 75px;
  display: flex;
  align-items: center;
}
.litigation-list .body {
  width: 100%;
  padding: 0 18px 0 18px;
  background-color: #fff;
  box-sizing: border-box;
}
.litigation-list .body-header {
  width: 100%;
  height: 50px;
  display: flex;
}
.item1 {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
}
  
.item2 {
  height: 100%;
  border-bottom: 2px solid rgba(64, 126, 112, 1);
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 126, 112, 1);
  line-height: 48px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
.text1 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.litigation-list .cell{
  display: flex;
  justify-content: center;
}
.litigation-list .botton{
  width:66px;
  height:23px;
  background:rgba(0,183,95,1);
  border-radius:4px;
  display: flex;
  justify-content: center;
  align-items: center;
font-size:12px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(255,255,255,1);

}
</style>