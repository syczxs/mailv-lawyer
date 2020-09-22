<template>
  <div class="analyse-box-card">
    <div class="inside-head">
      订单列表
    </div>

    <div class="search">
      <el-select v-model="searchInput.selectOption" style="width: 200px">
        <el-option v-for="item in searchInput.selectOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-input v-model="searchInput.keyWord" style="width: 200px" placeholder="请输入关键字"/>
      <span class="sub_time">下单时间</span>
      <el-date-picker
        style="width:30%;"
        v-model="searchInput.dataTime"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span class="state">状态</span>
      <el-select v-model="searchInput.stateOption" style="width: 200px">
        <el-option v-for="item in searchInput.stateOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-button size="medium" class="button-search"
                 style="background-color:#2DCA93;color: white">搜索
      </el-button>
    </div>

    <!--表格-->
    <div class="el-table" style="width: 96%">
      <el-table
        :data="tableList"
        :cell-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column prop="serveId" width="100" label="服务编号"/>
        <el-table-column width="100" label="用户id"/>
        <el-table-column  label="绑定手机"/>
        <el-table-column  label="服务类型"/>
        <el-table-column  label="提交时间"/>
        
        <el-table-column  label="服务律师"/>
        <el-table-column  label="使用产品"/>
        
        <el-table-column width="50" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus===0">已预约</span>
            <span v-if="scope.row.orderStatus===1" style="color: red">进行中</span>
            <span v-if="scope.row.orderStatus===2" style="color: red">待评价</span>
            <span v-if="scope.row.orderStatus===3" style="color: red">延时待支付</span>
            <span v-if="scope.row.orderStatus===4" style="color: red">已完成</span>
            <span v-if="scope.row.orderStatus===5" style="color: red">已取消</span>
          </template>
        </el-table-column>
        <el-table-column width="300" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" style="background:#199ED8;color: white">
              查看录像
            </el-button>
            <el-button size="mini" style="background:rgb(255,204,0);color: white">
              查看评价
            </el-button>
            <el-button size="mini" style="background:#2DCA93;color: white" @click="openServeInform(scope.row.serveId)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


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
</template>

<script>
  export default {
    name: "AnalyseList",
    data() {
      return {
        tableList:[{serveId:'1111'}],
        queryInfo: {
          PageNum: 1,
          PageSize: 5,
          Total: 0,
          TotalPage: 0
        },
        searchInput: {
          selectOption: '',
          selectOptions: [
            {
              value: 'serveId',
              label: '服务编号'
            }, {
              value: 'userId',
              label: '用户Id'
            }, {
              value: 'serveLawyer',
              label: '服务律师'
            }, {
              value: 'Mobile',
              label: '绑定手机'
            }
          ],
          keyWord: '',
          dataTime: '',
          stateOption: '',
          stateOptions: [
            {
              value: 0,
              label: '已预约'
            }, {
              value: 1,
              label: '进行中'
            }, {
              value: 2,
              label: '待评价'
            }, {
              value: 3,
              label: '延长待支付'
            }, {
              value: 4,
              label: '已完成'
            }, {
              value: 5,
              label: '已取消'
            }
          ]


        }
      }
    },
    methods: {

      /*跳转详情页*/
      openServeInform(serveId){
        this.$router.push({
          path: '/order/serveList/videoInform',
          query: {
            serveId: serveId,
          }
        })
      },
      /*修改表头样式*/
      tableRowStyle({row, rowIndex}) {
        return 'text-align:center'
      },
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: rgb(228,228,228);color: black;font-weight: 700;text-align:center'
        }
      },

      /*分页方法*/
      handleSizeChange(val) {
        this.queryInfo.PageSize = val;
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.queryInfo.PageNum = val;
        this.getTableData()
      },
    }
  }
</script>

<style scoped>
  .analyse-box-card {
    background-color: #fff;
    width:98%;
    height: 96%;
    margin-left: 1%;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .search {
    display: flex;
    align-items: center;
    width: 96%;
    height: 12%;
  }

  .pagination {
    width: 96%;
  }

  .el-pagination {
    float: right;
  }


</style>
