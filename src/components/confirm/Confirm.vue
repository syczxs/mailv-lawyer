<template>
  <el-dialog
    :title="operation"
    :visible.sync="dialogDisplay"
    width="25%"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel" style="margin-right: 100px">取 消</el-button>
    <el-button type="primary" style="background-color:rgb(45, 202, 147);" @click="confirm">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
    export default {
        name: "Confirm",
        props:{
            confirmDialog: {
                type: Boolean,
                default: false
            },
            operation:{
                type:String
            }
        },
        data() {
            return{
                dialogDisplay:false,
                sendAxios:false,
                showClo:false
            }

        },
        methods: {
            cancel(){
                this.dialogDisplay=false
                this.$emit('getFromConfirm', this.dialogDisplay,this.sendAxios)
            },
            confirm() {
                this.dialogDisplay=false
                this.sendAxios=true
                this.$emit('getFromConfirm', this.dialogDisplay,this.sendAxios)
            },
        },
        watch: {
            confirmDialog(){
                this.dialogDisplay=this.confirmDialog
            },

        }
    }
</script>

<style >
  .change-cancle .el-dialog{
    border-radius: 20px;
    height: 30%;
    box-sizing: border-box;
  }
  .change-cancle .el-dialog__header{
    box-sizing: border-box;
    height: 60%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .change-cancle .el-dialog__title{
    font-size: 25px;
     font-weight: 500

  }
  .change-cancle .el-dialog__body{
    height:10%;
    box-sizing: border-box;
    padding: 0;
  }
  .change-cancle .el-dialog__footer{
    height: 30%;
    box-sizing: border-box;
    border-top: 1px rgb(215,215,215) solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }



</style>
