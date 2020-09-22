<template>
  <div class="implement-stage">
    <div class="implement-box">
      <div class="box-left">
        <div class="left-head">
          <span class="text2">上传执行资料</span>
          <div class="up-item">
            <span class="up-text">执行申请书：</span>
            <div id="father1" v-if="show">
              <el-button class="button1" id="addButton1">上传</el-button>
              <div
                v-if="!!urlList.execution_application.url && !!urlList.execution_application.url"
                class="up-a"
              >
                <a :href="urlList.execution_application.url">{{urlList.execution_application.name}}</a>
                <img
                  @click="delet1"
                  style="widt:12px;height:12px;margin-left:10px"
                  src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
                />
              </div>
            </div>
          </div>
          <div class="up-item">
            <span class="up-text">案件执行相关材料：</span>
            <div id="father2" v-if="show">
              <el-button class="button1" id="addButton2">上传</el-button>
              <div
                v-if="!!urlList.case_execution_materials.url && !!urlList.case_execution_materials.url"
                class="up-a"
              >
                <a
                  :href="urlList.case_execution_materials.url"
                >{{urlList.case_execution_materials.name}}</a>
                <img
                  @click="delet2"
                  style="widt:12px;height:12px;margin-left:10px"
                  src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
                />
              </div>
            </div>
          </div>
          <div class="up-item">
            <span class="up-text">执行完毕或程序终结的材料：</span>
            <div id="father3" v-if="show">
              <el-button class="button1" id="addButton3">上传</el-button>
              <div v-if="!!urlList.procedure_end.url && !!urlList.procedure_end.url" class="up-a">
                <a :href="urlList.procedure_end.url">{{urlList.procedure_end.name}}</a>
                <img
                  @click="delet3"
                  style="widt:12px;height:12px;margin-left:10px"
                  src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
                />
              </div>
            </div>
          </div>
        </div>
        <span class="text">请在案件结束和收到款项后上传电子发票或邮寄纸质发票</span>
        <div class="up-item">
          <span>电子发票（如有）：</span>
          <div id="father4" v-if="show">
            <el-button class="button1" id="addButton4">上传</el-button>
            <div
              v-if="!!urlList.electronic_invoice.url && !!urlList.electronic_invoice.url"
              class="up-a"
            >
              <a :href="urlList.electronic_invoice.url">{{urlList.electronic_invoice.name}}</a>
              <img
                @click="delet4"
                style="widt:12px;height:12px;margin-left:10px"
                src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
              />
            </div>
          </div>
        </div>
        <div class="body-item">
          <span class="title-text2">快递单号(如有) :</span>
          <el-input v-model="courierNumber"></el-input>
        </div>
      </div>
      <div class="box-right">
        <div class="progress-list" v-if="progressRecord.length>0">
          <div class="progress-item" v-for="(item,index) in progressRecord" v-bind:key="index">
            <span>{{item.progressTime}}</span>
            <br />
            <span style="color:#999999">{{item.progressContext}}</span>
            <br />
            <a v-if="!!item.progressUrl" :href="item.progressUrl" style="color:#1DABCA">{{item.progressName}}</a>
          </div>
          <div style="width:100%;display:flex;justify-content:flex-end;">
            <el-pagination
              class="el-pagination"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.PageNum"
              :page-sizes="[1, 2, 5]"
              :page-size="queryInfo.PageSize"
              layout="total,  prev, pager, next, jumper"
              :total="queryInfo.Total"
            ></el-pagination>
          </div>
        </div>

        <div v-if="show">
          <span class="text2">案件进度反馈记录</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入反馈内容"
            v-model="textarea"
            style="margin-top:10px"
          ></el-input>
          <div class="up-item">
            <span>附件（如有）：</span>
            <div id="father5">
              <el-button class="button1" id="addButton5">上传</el-button>
              <div v-if="!!urlList.enclosure.url && !!urlList.enclosure.url" class="up-a">
                <a :href="urlList.enclosure.url">{{urlList.enclosure.name}}</a>
                <img
                  @click="delet5"
                  style="widt:12px;height:12px;margin-left:10px"
                  src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/%E5%8F%89.png"
                />
              </div>
            </div>
          </div>

          <el-button class="button2" @click="sendRecord">新增记录</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-button1" @click="sendInform">上传资料</div>
      <div class="footer-button2" @click="cancelSend">取消</div>
    </div>
  </div>
</template>

<script>
import { upFile, delet } from "../../../../api/plupload4";
import { imSelect, upFileBack, imSend, recordSend } from "../../../../api/api";
export default {
  name: "ImplementStage",
  props: {
    lawyerID: {
      type: String,
      default: "",
    },
    ImplementID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show:true,
      progressRecord: [],
      courierNumber: "",
      queryInfo: {
        PageNum: 1,
        PageSize: 2,
        Total: 0,
        TotalPage: 0,
      },
      urlList: {
        execution_application: {
          url: "",
          name: "",
        },
        case_execution_materials: {
          url: "",
          name: "",
        },
        procedure_end: {
          url: "",
          name: "",
        },
        electronic_invoice: {
          url: "",
          name: "",
        },
        enclosure: {
          url: "",
          name: "",
        },
      },
      textarea: "",
    };
  },
  methods: {
    sendRecord() {
      recordSend({
        caseId: this.ImplementID,
        progressContext: this.textarea,
        progressFileUrl: this.urlList.enclosure.url,
      }).then((res) => {
        if (res) {
          window.alert("提交成功");
          this.getTableList()
          this.textarea=""
          this.urlList.enclosure.url=""
          this.urlList.enclosure.name=""
        }
      });
    },
    sendInform() {
      imSend({
        caseId: this.ImplementID,
        courierNumber: this.courierNumber,
      }).then((res) => {
         if(res){
           window.alert("上传成功")
          this.$emit("fromIm", false);
        }else{
          window.alert("提交失败")
        }
      });
    },
     cancelSend(){
      this.$emit("fromIm", false);

    },
    handleCurrentChange(val) {
      this.queryInfo.PageNum = val;
      this.getTableList();
    },
    getTableList() {
      imSelect({
        lawyerId: this.lawyerID,
        caseId: this.ImplementID,
        rows: this.queryInfo.PageSize,
        currentPage: this.queryInfo.PageNum,
      }).then((res) => {
        console.log(res)
        if (!!res.caseProgressPageInfo) {
          this.progressRecord = res.caseProgressPageInfo.list;
          console.log(this.progressRecord)
          this.progressRecord.forEach(item=>{
            if(!!item.progressUrl){
              item.progressName=item.progressUrl.split("/")[res.caseExecutionUrl.split("/").length - 1].slice(13)
            }
            
          })
          this.queryInfo.Total = res.caseProgressPageInfo.total;
        this.queryInfo.TotalPage = res.caseProgressPageInfo.pages;
        }
        
        this.courierNumber = res.courierNumber;
        if (!!res.performApplicationUrl) {
          this.urlList.execution_application.url = res.performApplicationUrl;
          this.urlList.execution_application.name = res.performApplicationUrl
            .split("/")
            [res.performApplicationUrl.split("/").length - 1].slice(13);
        }
        if (!!res.caseExecutionUrl) {
          this.urlList.case_execution_materials.url = res.caseExecutionUrl;
          this.urlList.case_execution_materials.name = res.caseExecutionUrl
            .split("/")
            [res.caseExecutionUrl.split("/").length - 1].slice(13);
        }
        if (!!res.completedUrl) {
          this.urlList.procedure_end.url = res.completedUrl;
          this.urlList.procedure_end.name = res.completedUrl
            .split("/")
            [res.completedUrl.split("/").length - 1].slice(13);
        }
        if (!!res.invoiceUrl) {
          this.urlList.electronic_invoice.url = res.invoiceUrl;
          this.urlList.electronic_invoice.name = res.invoiceUrl
            .split("/")
            [res.invoiceUrl.split("/").length - 1].slice(13);
        }
      });
    },
    up1() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/execution_application/";
        upFile("addButton1", "father1", dir, false, true).then((res) => {
          this.urlList.execution_application.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.execution_application.name = res[0].lastName;
          upFileBack({
            fileName: "执行申请书",
            fileUrl: this.urlList.execution_application.url,
            caseId: this.ImplementID,
            casePhase: 4,
          }).then((res) => {
            this.up1();
          });
        });
      });
    },
    delet1() {
      this.urlList.execution_application.url = "";
      this.urlList.execution_application.name = "";
    },
    up2() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/case_execution_materials/";
        upFile("addButton2", "father2", dir, false, true).then((res) => {
          this.urlList.case_execution_materials.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.case_execution_materials.name = res[0].lastName;
          upFileBack({
            fileName: "案件执行相关材料",
            fileUrl: this.urlList.case_execution_materials.url,
            caseId: this.ImplementID,
            casePhase: 4,
          }).then((res) => {
            this.up2();
          });
        });
      });
    },
    delet2() {
      this.urlList.case_execution_materials.url = "";
      this.urlList.case_execution_materials.name = "";
    },
    up3() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/procedure_end/";
        upFile("addButton3", "father3", dir, false, true).then((res) => {
          this.urlList.procedure_end.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.procedure_end.name = res[0].lastName;
          upFileBack({
            fileName: "执行完毕或程序终结的材料",
            fileUrl: this.urlList.procedure_end.url,
            caseId: this.ImplementID,
            casePhase: 4,
          }).then((res) => {
            this.up3();
          });
        });
      });
    },
    delet3() {
      this.urlList.procedure_end.url = "";
      this.urlList.procedure_end.name = "";
    },
    up4() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/electronic_invoice/";
        upFile("addButton4", "father4", dir, false, true).then((res) => {
          this.urlList.electronic_invoice.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.electronic_invoice.name = res[0].lastName;
          upFileBack({
            fileName: "电子发票",
            fileUrl: this.urlList.electronic_invoice.url,
            caseId: this.ImplementID,
            casePhase: 4,
          }).then((res) => {
            this.up4();
          });
        });
      });
    },
    delet4() {
      this.urlList.electronic_invoice.url = "";
      this.urlList.electronic_invoice.name = "";
    },
    up5() {
      this.$nextTick(() => {
        var dir = "litigation_lawyer_upload/enclosure/";
        upFile("addButton5", "father5", dir, false, true).then((res) => {
          this.urlList.enclosure.url =
            "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
            res[0].nowName;
          this.urlList.enclosure.name = res[0].lastName;
          this.up5()
        });
      });
    },
    delet5() {
      this.urlList.enclosure.url = "";
      this.urlList.enclosure.name = "";
    },
  },
  mounted() {
    this.getTableList();
    this.up1();
    this.up2();
    this.up3();
    this.up4();
    this.up5();
    if(this.$parent.$parent.state<4){
          this.show=false
          
        }
  },
  created() {},
  watch:{
    ImplementID(){
      if(this.ImplementID!=0){
        this.getTableList()
        if(this.$parent.$parent.state<4){
          this.show=false
          
        }
      }
    }
  }
};
</script>

<style >
.implement-box {
  width: 100%;
  height: 630px;
  display: flex;
}
.implement-box .box-left,
.box-right {
  width: 50%;
  box-sizing: border-box;
  height: 100%;
  padding: 20px 20px 0 20px;
}
.box-left {
  border-right: 1px rgba(238, 238, 238, 1) solid;
}
.left-head {
  height: 400px;
}
.implement-stage .text2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: block;
}
.implement-stage .up-item {
  display: flex;
  padding: 20px 0px 0px 0px;
  box-sizing: border-box;
  align-items: center;
}
.implement-stage .up-text {
  width: 180px;
  text-align: right;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.implement-stage .up-a {
  margin: 10px 0px 0px 10px;
  display: block;
}

.implement-stage .text {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.implement-stage .title-text2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.implement-stage .body-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.implement-stage .box-left .el-input {
  width: 213px;
  margin-left: 16px;
}
.implement-stage .box-left .el-input__inner {
  width: 213px;
  height: 30px;
  border: 1px solid rgba(216, 220, 229, 1);
  border-radius: 4px;
}

.implement-stage .progress-list {
  width: 100%;
}
.implement-stage .progress-item {
  border-bottom: 1px rgba(238, 238, 238, 1) solid;
  width: 100%;
  padding: 10px 0px 20px 0px;
}
.implement-stage .button2 {
  margin-top: 20px;
  width: 96px;
  height: 32px;
  background: #428073;
  border-radius: 4px;
  color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>