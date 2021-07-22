<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-container >
        <el-form-item label="设立年份" prop="setupYear">
<!--        <el-input v-model="formData.SETUP_YEAR" placeholder="请输入设立年份" clearable :style="{width: '80%'}">
        </el-input>-->
        <el-select v-model="formData.setupYear" placeholder="请选择" :style="{width: '80%'}">
            <el-option
                v-for="item in setupYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
        <el-form-item label="项目名称" prop="proName">
        <el-input v-model="formData.proName" placeholder="请输入项目名称" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      </el-container>
      <el-container>
      <el-form-item label="项目预算" prop="proTotalAmt">
        <el-input v-model="formData.proTotalAmt" placeholder="请输入项目预算" clearable :style="{width: '80%'}">
        </el-input>
      </el-form-item>
        <el-form-item label="项目期限" prop="proTearm">
          <el-select v-model="formData.proTerm" placeholder="请选择" :style="{width: '100%'}">
            <el-option
                v-for="item in proTermOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-container>
        <el-form-item label="项目类型" prop="proKind">
          <el-cascader v-model="formData.proKindCode" :options="proKindOption" :show-all-levels="false" placeholder="请选择" :style="{width: '100%'}">
          </el-cascader>
        </el-form-item>
      <el-form-item label="项目简介" prop="proDesc">
        <el-input type="textarea" v-model="formData.proDesc" placeholder="请输入项目简介" clearable :style="{width: '100%'}">
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
      proKindOption:[
        {label:"人员类项目",value:"01",},
        {
          label:"运转类",
          value:"04",
          children:[
            {
              label: "其他运转类项目",
              value:"02"
            },
            {
              label: "公用经费项目",
              value:"03"
            }
          ]},
      ],
      proTermOptions:[
        {value:1,label:"1年"},{value:2,label:"2年"},{value:3,label:"3年"},{value:4,label:"4年"},{value:5,label:"5年"},
        {value:6,label:"6年"},{value:7,label:"7年"},{value:8,label:"8年"},{value:9,label:"9年"},{value:10,label:"10年"},
      ],
      proSetupOptions:[
        {value:2010,label:"2010年"},{value:2011,label:"2011年"},{value:2012,label:"2012年"},{value:2013,label:"2013年"},
        {value:2014,label:"2014年"},{value:2015,label:"2015年"},{value:2016,label:"2016年"},{value:2017,label:"2017年"},
        {value:2018,label:"2018年"},{value:2019,label:"2019年"},{value:2020,label:"2020年"},{value:2021,label:"2021年"},
      ],
      // 控制弹出框显示隐藏
      showDialog:false,
      formData: {},
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
    //生成项目类别名、项目代码
    setProKind(){
      //去0，03->3
      if(this.formData.proKindCode)
      {this.formData.proKindCode = this.formData.proKindCode[this.formData.proKindCode.length-1]}
      //通过项目类别代码获取项目类别名
      for(let i of this.proKindOption){
        if(i.value === this.formData.proKindCode){
          this.formData.proKind = i.label
          break
        }
        if(i.children){
          for(let j of i.children){
            if(j.value === this.formData.proKindCode){
              this.formData.proKind = j.label
              break
            }
          }
        }
      }
    },
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
      this.setProKind()
      console.log(this.opIndex)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if(this.opIndex ===  1){
          this.$emit('addPro',this.formData)
          this.$emit('changeShow', 'false')}
        else if(this.opIndex === 2){
          console.log("执行编辑函数！")
          console.log(this.formData.agencyCode)
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
