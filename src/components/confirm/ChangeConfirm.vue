<template>
  <el-dialog
    title="提醒"
    :visible.sync="dialogDisplay"
    width="25%"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
  <div>{{msg}}</div>
    <span slot="footer" class="dialog-footer">
    
    <el-button type="primary" style="background-color:rgb(45, 202, 147);" @click="confirm">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
    export default {
        name: "ChangeConfirm",
        props:{
            confirmDialog: {
                type: Boolean,
                default: false
            },
            msg:{
              type:String
            }
           
        },
        data() {
            return{
                dialogDisplay:false,
                showClo:false
            }

        },
        methods: {
            confirm() {
                this.dialogDisplay=false
                this.$emit('getFromChangeConfirm', this.dialogDisplay)
               
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
  .change-false .el-dialog{
    border-radius: 20px;
    height: 30%;
    box-sizing: border-box;
  }
  .change-false .el-dialog__header{
    box-sizing: border-box;
    height: 20%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .change-false  .el-dialog__body{
    height:45%;
    box-sizing: border-box;
    padding: 20px;
    font-size: 25px
  }
  .change-false .el-dialog__footer{
    height: 30%;
    box-sizing: border-box;
    border-top: 1px rgb(215,215,215) solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }



</style>
