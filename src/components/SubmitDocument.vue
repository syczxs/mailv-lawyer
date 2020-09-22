<template>
  <el-dialog
    title="提交定审"
    :visible.sync="dialogDisplay"
    width="30%"
    :showClose="showClo"
    :close-on-click-modal="showClo"
  >
  <div class="dialog-body">
    <span style="margin-right:10%">上传初稿</span>
    <div id="container">
      <a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
      <a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
    </div>
    
  </div>
    <span slot="footer" class="dialog-footer">
    
    <el-button type="primary" style="background-color:rgb(45, 202, 147)" >确 定</el-button>
    <el-button type="primary" style="background-color:red">取 消</el-button>
  </span>
  </el-dialog>

</template>

<script>

    export default {
        name: "ChangeConfirmTrue",
        props:{
            confirmDialog: {
                type: Boolean,
                default: false
            },
          
           
        },
        data() {
            return{
                dialogDisplay:true,
                showClo:false,
                
                default:false
            }

        },
        methods: {
           
            
        },
        computed:{
          
          getInform:function(){
            return this.changeInform
          }

        },
       
        watch: {
            confirmDialog(){
                this.dialogDisplay=this.confirmDialog
                this.default=false
            },
          

        }
    }
</script>

<style >
  .submit .el-dialog{
    border-radius: 20px;
    height: 40%;
    box-sizing: border-box;
  }
  .submit .el-dialog__header{
    box-sizing: border-box;
    height: 20%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .submit .el-dialog__body{
    height:60%;
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 15%;
    padding-right: 15%;
    display: flex;
    flex-direction: column;
    
  }
 
  
  .submit .el-dialog__footer{
    height: 20%;
    box-sizing: border-box;
    border-top: 1px rgb(215,215,215) solid;
   
  }

  .btn{
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



</style>
