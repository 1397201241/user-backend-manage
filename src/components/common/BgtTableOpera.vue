<template>
<!--  "id": 3,
  "REPLY_AMT": 12,
  "ADJ_AMT": 12,
  "CUR_AMT": 12,
  "BUDGET_LEVEL_CODE": "3",
  "FOUND_TYPE_CIDE": "001345",
  "UPDATE_AT": "2021/7/14下午2:40:18",
  "CREATE_AT": "2021/7/14下午2:40:18",
  "IS_DELETE": 0,
  "VERSION": "1.0.5"-->
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-form-item label-width="18%" label="单位代码" prop="AGENCY_CODE">
        <el-input v-model="formData.AGENCY_CODE" placeholder="请输入单位代码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="项目代码" prop="PRO_CODE">
        <el-input v-model="formData.PRO_CODE" placeholder="请输入项目代码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="财政区划代码" prop="MOF_DIV_CODE">
        <el-input v-model="formData.MOF_DIV_CODE" placeholder="请输入财政区划" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-container>
        <el-form-item label="预算ID" prop="BGT_PMAN_ID">
          <el-input v-model="formData.BGT_PMAN_ID" placeholder="请输入项目年度预算ID" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="预算年度" prop="FISCAL_YEAR">
          <el-input v-model="formData.FISCAL_YEAR" placeholder="请输入预算年度" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item  label="申报数" prop="APPLY_UP">
          <el-input v-model="formData.APPLY_UP" placeholder="请输入申报数" clearable :style="{width: '80%'}"></el-input>
        </el-form-item>
        <el-form-item  label="版本号" prop="IS_DELETE">
          <el-input v-model="formData.VERSION" placeholder="请输入版本号" clearable :style="{width: '100%'}"></el-input></el-form-item>
      </el-container>
      <el-container>
        <el-form-item  label="项目类别" prop="PRO_KIND_CODE">
          <el-input v-model="formData.PRO_KIND_CODE" placeholder="请输入项目类别代码" clearable :style="{width: '80%'}"></el-input>
        </el-form-item>
        <el-form-item label="删除代码" prop="IS_DELETE">
          <!--          <el-input v-model="formData.IS_DELETED" placeholder="请输入删除代码" clearable :style="{width: '100%'}">
                    </el-input>-->
          <el-select v-model="formData.IS_DELETE" placeholder="请选择" :style="{width: '100%'}">
            <el-option
                v-for="item in [{label:0,value:0},{label:1,value:1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="部门代码" prop="DEPT_CODE">
          <el-input v-model="formData.DEPT_CODE" placeholder="请输入部门代码" clearable :style="{width: '80%'}"></el-input>
        </el-form-item>
        <el-form-item label="申报环节" prop="APPLY_LINK">
          <el-input  v-model="formData.APPLY_LINK" placeholder="请输入申报环节" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-form-item label-width="18%" label="财政审核数" prop="FIN_AUDIT_MONEY">
        <el-input v-model="formData.FIN_AUDIT_MONEY" placeholder="请输入财政审核数" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="年初批复数" prop="REPLY_AMT">
        <el-input v-model="formData.REPLY_AMT" placeholder="请输入年初批复数" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-container>
        <el-form-item label="调整金额" prop="ADJ_AMT">
          <el-input v-model="formData.ADJ_AMT" placeholder="请输入调整金额" clearable :style="{width: '80%'}"></el-input>
        </el-form-item>
        <el-form-item label="调后金额" prop="CUR_AMT">
          <el-input  v-model="formData.CUR_AMT" placeholder="请输入变动后金额" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-form-item label-width="18%" label="预算级次代码" prop="BUDGET_LEVEL_CODE">
        <el-input v-model="formData.BUDGET_LEVEL_CODE" placeholder="请输入预算级次代码" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="资金来源代码" prop="FOUND_TYPE_CIDE">
        <el-input v-model="formData.FOUND_TYPE_CIDE" placeholder="请输入资金来源代码" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="margin-top: -50px">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "BgtTableOpera",
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
    bgt_pm:{
      type:Object,
    }
  },
  data(){
    return{
      showDialog:false,
      formData:{
        id:'',
        BGT_PMAN_ID: 5201314,
        MOF_DIV_CODE: "350000",
        FISCAL_YEAR: "2016",
        AGENCY_CODE: "4623",
        PRO_KIND_CODE: "03",
        PRO_CODE: "665544332",
        APPLY_UP: 12,
        FIN_AUDIT_MONEY: 12,
        DEPT_CODE: "6534",
        APPLY_LINK: "5",
        REPLY_AMT: 12,
        ADJ_AMT: 12,
        CUR_AMT: 12,
        BUDGET_LEVEL_CODE: "3",
        FOUND_TYPE_CIDE: "001345",
        UPDATE_AT: "2021/7/14下午2:40:18",
        CREATE_AT: "2021/7/14下午2:40:18",
        IS_DELETE: 0,
        VERSION: "1.0.5"
      },
      rules: {},
      endOptions:[{label:0,value:0},{label:1,value:1}],
      deleteOptions:[{label:0,value:0},{label:1,value:1}],
    }
  },
  methods:{
    onOpen() {
      if(this.opIndex === 2){
        this.formData = this.bgt_pm
        console.log("传过来的id是"+this.formData.id)}else{
        this.formData = {}
      }
    },
    onClose() {
      /*this.$refs['elForm'].resetFields()*/
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('changeShow', 'false')

    },
    handelConfirm(){
      console.log(this.opIndex)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if(this.opIndex ===  1){
          this.$emit('addBgt',this.formData)
          this.$emit('changeShow', 'false')}
        else if(this.opIndex === 2){
          console.log("执行编辑函数！")
          this.$emit('editBgt',this.formData)
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
