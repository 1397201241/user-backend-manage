<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-container >
        <el-form-item label="设立年份" prop="SETUP_YEAR">
<!--        <el-input v-model="formData.SETUP_YEAR" placeholder="请输入设立年份" clearable :style="{width: '80%'}">
        </el-input>-->
        <el-select v-model="formData.SETUP_YEAR" placeholder="请选择" :style="{width: '80%'}">
            <el-option
                v-for="item in setupYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
<!--          <el-input v-model="formData.AGENCY_CODE" placeholder="请输入单位代码" clearable :style="{width: '80%'}">
          </el-input>-->
          <el-select v-model="formData.AGENCY_CODE" placeholder="请选择" :style="{width: '80%'}">
            <el-option
                v-for="item in agencyCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
        <el-form-item label="版本号" prop="VERSION">
          <el-input v-model="formData.VERSION" placeholder="请输入版本号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="结束代码" prop="IS_END">
<!--          <el-input v-model="formData.IS_END" placeholder="请输入结束代码" clearable :style="{width: '80%'}">
          </el-input>-->
          <el-select v-model="formData.IS_END" placeholder="请选择" :style="{width: '80%'}">
            <el-option
                v-for="item in [{label:0,value:0},{label:1,value:1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除代码" prop="IS_DELETE">
<!--          <el-input v-model="formData.IS_DELETED" placeholder="请输入删除代码" clearable :style="{width: '100%'}">
          </el-input>-->
          <el-select v-model="formData.IS_DELETED" placeholder="请选择" :style="{width: '100%'}">
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
        <el-form-item label-width="50%" label="单位建议代码" prop="DEP_AUD_OPNION_CODE">
          <el-select v-model="formData.DEP_AUD_OPNION_CODE" placeholder="请选择" :style="{width: '100%'}">
            <el-option
                v-for="item in [{label:0,value:0},{label:1,value:1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 60px;" label-width="50%" label="财政建议代码" prop="MOF_AUD_OPNION_CODE">
          <el-select v-model="formData.MOF_AUD_OPNION_CODE" placeholder="请选择" :style="{width: '100%'}">
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
        <el-form-item label="项目类型" prop="PRO_KIND">
          <el-input v-model="formData.PRO_KIND" placeholder="请输入项目类型" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="类型码" prop="PRO_KIND_CODE">
          <el-input v-model="formData.PRO_KIND_CODE" placeholder="请输入项目类型码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="申报环节" prop="APPLY_LINK">
          <el-input v-model="formData.APPLY_LINK" placeholder="申报环节代码" clearable :style="{width: '80%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="乐观锁" prop="VERSION">
          <el-input v-model="formData.VERSION" placeholder="乐观锁" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
      <el-form-item label="单位建议" prop="PRO_AGENCY_VIEW">
        <el-input type="textarea" v-model="formData.PRO_AGENCY_VIEW" placeholder="请输入单位建议" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="财政建议" prop="PRO_BGTREVIEW">
        <el-input type="textarea" v-model="formData.PRO_BGTREVIEW" placeholder="请输入财政建议" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="项目简介" prop="PRO_DESC">
        <el-input type="textarea" v-model="formData.PRO_DESC" placeholder="请输入项目简介" clearable :style="{width: '100%'}">
        </el-input>
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
        PRO_CAT_CODE: "",
        PRO_TOTAL_AMT: "",
        PRO_AGENCY_VIEW: "",
        PRO_DEPREVIEW: "",
        PRO_BGTREVIEW: "",
        PRO_DESC: "",
        UPDATE_TIME: "",
        IS_END: 0,
        IS_DELETED: 0,
        CREATE_TIME: "",
        VERSION: "1.03.5",
        DEP_AUD_OPNION_CODE: 1,
        MOF_AUD_OPNION_CODE: 1,
        PRO_KIND:"文娱",
        PRO_KIND_CODE: "03",
        APPLY_LINK: 4,
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
      setupYearOptions:[
        {
          label:2010,
          value:2010
        },
        {
          label:2011,
          value:2011
        },
        {
          label:2012,
          value:2012
        },
        {
          label:2013,
          value:2013
        },
        {
          label:2014,
          value:2014
        }, {
          label:2015,
          value:2015
        }, {
          label:2016,
          value:2016
        }, {
          label:2017,
          value:2017
        }, {
          label:2018,
          value:2018
        }, {
          label:2019,
          value:2019
        },
      ],
      startYearOptions:[
        {
          label:2010,
          value:2010
        },
        {
          label:2011,
          value:2011
        },
        {
          label:2012,
          value:2012
        },
        {
          label:2013,
          value:2013
        },
        {
          label:2014,
          value:2014
        }, {
          label:2015,
          value:2015
        }, {
          label:2016,
          value:2016
        }, {
          label:2017,
          value:2017
        }, {
          label:2018,
          value:2018
        }, {
          label:2019,
          value:2019
        },
      ],
      agencyCodeOptions:[
        {
          label:"省级",
          value:1
        }, {
          label:"市级",
          value:2
        }, {
          label:"县级",
          value:3
        }, {
          label:"乡级",
          value:4
        },
      ],
    }
  },
  methods:{
    onOpen() {
      if(this.opIndex === 2){
      this.formData = this.pro}else{
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
