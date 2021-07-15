<template>
<!--  LIQU_CERT_ID: 410,
  CREATE_AT: "2021/7/14下午2:40:18",
  UPDATE_AT: "2021/7/14下午2:40:18",
  OPERATOR_ID: "操作者ID4",
  LIQU_CERT_NUM: 1004445,
  IS_DELETE: 0,
  AMOUNT: "$63330.95",
  AGENT_BANK: "中国工商银行",
  CLEAR_BANK: "中国人民银行",
  VERSION: "1.0.5"-->
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-form-item label-width="18%" label="清算凭证ID" prop="LIQU_CERT_ID">
        <el-input v-model="formData.LIQU_CERT_ID" placeholder="请输入清算凭证ID" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="清算凭证单号" prop="LIQU_CERT_NUM">
        <el-input v-model="formData.LIQU_CERT_NUM" placeholder="请输入清算凭证单号" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="操作者ID" prop="OPERATOR_ID">
        <el-input v-model="formData.OPERATOR_ID" placeholder="请输入操作者ID" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-container>
        <el-form-item label="总金额" prop="AMOUNT">
          <el-input v-model="formData.AMOUNT" placeholder="请输入总金额" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="是否删除" prop="IS_DELETE">
          <el-select v-model="formData.IS_DELETE" placeholder="请选择" :style="{width: '80%'}">
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
        <el-form-item  label="代理银行" prop="AGENT_BANK">
          <el-input v-model="formData.AGENT_BANK" placeholder="请输入代理银行" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
<!--        style="margin-left: 50px;"-->
        <el-form-item   label="清算银行" prop="CLEAR_BANK">
          <el-input v-model="formData.CLEAR_BANK" placeholder="请输入清算银行" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-form-item label-width="18%" label="乐观锁" prop="IS_DELETE">
        <el-input v-model="formData.VERSION" placeholder="请输入乐观锁" clearable :style="{width: '100%'}"></el-input>
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
  name: "LiquiOpera",
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
    liquidation:{
      type:Object,
    }
  },
  data(){
    return{
      showDialog:false,
      formData: {
        id: 1,
        LIQU_CERT_ID: 410,
        CREATE_AT: "2021/7/14下午2:40:18",
        UPDATE_AT: "2021/7/14下午2:40:18",
        OPERATOR_ID: "操作者ID4",
        LIQU_CERT_NUM: 1004445,
        IS_DELETE: 0,
        AMOUNT: "$63330.95",
        AGENT_BANK: "中国工商银行",
        CLEAR_BANK: "中国人民银行",
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
        console.log(this.liquidation)
        this.formData = this.liquidation
        console.log("传过来的id是"+this.formData.id)}else{
        this.formData = {}
      }
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
          this.$emit('addLiqui',this.formData)
          this.$emit('changeShow', 'false')}
        else if(this.opIndex === 2){
          console.log("执行编辑函数！")
          this.$emit('editLiqui',this.formData)
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
