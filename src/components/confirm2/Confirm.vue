<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogDisplay"
    width="476px"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
    <span>{{operation}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel" class="buttom1">取 消</el-button>
    <el-button  class="buttom2" @click="confirm">确 定</el-button>
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
                type:String,
                
            },
            title:{
              type:String,
              default:"提示"

            }
        },
        data() {
            return{
                dialogDisplay:false,
                // sendAxios:false,
                showClo:false
            }

        },
        methods: {
            cancel(){
                this.dialogDisplay=false
                this.$emit('getFromConfirm', this.dialogDisplay,this.operation,false)
            },
            confirm() {
                this.dialogDisplay=false
                // this.sendAxios=this.operation
                this.$emit('getFromConfirm', this.dialogDisplay,this.operation,true)
            },
        },
        watch: {
            confirmDialog(){
                this.dialogDisplay=this.confirmDialog
            },

        }
    }
</script>

<style scope>
  .confirm .el-dialog{
    height: 312px;
    box-sizing: border-box;
  }
  .confirm .el-dialog__header{
    box-sizing: border-box;
    height: 50px;
    /* padding: 40px; */
    display: flex;
    align-items: center;
    justify-content: flex-start;
  
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(51,51,51,1);
  border-bottom: 1px rgba(237,237,237,1) solid;
    
  }
  
  .confirm .el-dialog__body{
    height:calc(100% - 150px);
    box-sizing: border-box;
    padding: 30px 30px 30px 30px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .confirm .el-dialog__footer{
    height: 100px;
    box-sizing: border-box;
    padding: 0%;

  }
  .confirm .dialog-footer{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:flex-end;
    align-items: center;
  }
  
  .confirm .buttom1,.buttom2{
    width:56px;
    height:32px;
    border:1px solid rgba(221,221,221,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
   .confirm .buttom2{
   width:56px;
  height:32px;
  background:rgba(66,127,115,1);
  border-radius:4px;
  color: aliceblue;
  margin-right: 30px;
  }



</style>
