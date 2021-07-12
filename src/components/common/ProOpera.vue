<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-container >
        <el-form-item label="设立年份" prop="SETUP_YEAR">
        <el-input v-model="formData.SETUP_YEAR" placeholder="请输入设立年份" clearable :style="{width: '80%'}">
        </el-input>
      </el-form-item>
        <el-form-item label="项目名称" prop="PRO_NAME">
        <el-input v-model="formData.PRO_NAME" placeholder="请输入项目名称" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      </el-container>

      <el-container>
      <el-form-item label="项目预算" prop="PRO_TOTAL_AMT">
        <el-input v-model="formData.PRO_TOTAL_AMT" placeholder="请输入项目预算" clearable :style="{width: '80%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="项目代码" prop="PRO_CODE">
        <el-input v-model="formData.PRO_CODE" placeholder="请输入项目代码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      </el-container>

      <el-container>
        <el-form-item label="单位代码" prop="AGENCY_CODE">
          <el-input v-model="formData.AGENCY_CODE" placeholder="请输入单位代码" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="项目ID" prop="PRO_ID">
          <el-input v-model="formData.PRO_ID" placeholder="请输入项目ID" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>

      <el-container>
        <el-form-item label="项目期限" prop="PRO_TERM">
          <el-input v-model="formData.PRO_TERM" placeholder="请输入项目期限" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="开工年份" prop="PRO_START_YEAR">
          <el-input v-model="formData.PRO_START_YEAR" placeholder="请输入开工年份" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>

    </el-form>
    <div slot="footer" style="margin-top: -50px">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name:'ProOpera',
  // 接受父组件传递的值
  props:{
    addOrUpdateVisible:{
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: '项目操作'
    },
    opIndex:{
      type:Number,
      default:0
    },
    pro:{
      type:Object,
    }
  },
  data(){
    return{
      // 控制弹出框显示隐藏
      showDialog:false,
      formData: {
        id:"",
        PRO_ID: "",
        SETUP_YEAR: "",
        PRO_CODE: "",
        PRO_NAME: "",
        AGENCY_CODE: "",
        PRO_TERM: "",
        PRO_START_YEAR: "",
        PRO_CAT_CODE: "",
        PRO_TOTAL_AMT: "",
        PRO_AGENCY_VIEW: "",
        PRO_DEPREVIEW: "",
        PRO_BGTREVIEW: "",
        PRO_DESC: "",
        UPDATE_TIME: "",
        IS_END: 0,
        IS_DELETED: 0,
        CREATE_YEAR: "",
        VERSION: "1.03.5"
      },
      // 控制弹出框显示隐藏
      rules: {
        SETUP_YEAR: [{required:true,message:'请输入设立年份',trigger:'blur'},],
        PRO_NAME: [{
          required: true,
          message: '请输入项目名',
          trigger: 'blur'
        }],
        PRO_TOTAL_AMT: [{
          required: true,
          message: '请输入项目预算',
          trigger: 'blur'
        }],
        PRO_CODE:[{required:true,message:'请输入项目代码',trigger:'blur'}],
        PRO_ID:[{required:true,message:'请输入项目id',trigger:'blur'}],
        AGENCY_CODE:[{required:true,message:'请输入单位代码',trigger:'blur'}]
      },
    }
  },
  methods:{
    onOpen() {
      if(this.opIndex === 2){
      this.formData = this.pro}
    },
    onClose() {
      /*this.$refs['elForm'].resetFields()*/
      this.$emit('changeShow', 'false')
    },
    close() {
      console.log(this.pro)
      this.$emit('changeShow', 'false')

    },
    handelConfirm(){
      console.log(this.opIndex)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if(this.opIndex ===  1){
          this.$emit('addPro',this.formData)
          this.$emit('changeShow', 'false')}
        else if(this.opIndex === 2){
          console.log("执行编辑函数！")
          this.$emit('editPro',this.formData)
          this.$emit('changeShow', 'false')
        }
      })
    },
  },
  watch:{
    // 监听 addOrUpdateVisible 改变
    // eslint-disable-next-line no-unused-vars
    addOrUpdateVisible(oldVal,newVal){
      this.showDialog = this.addOrUpdateVisible
    },
  }
}
</script>

<style scoped>

</style>
