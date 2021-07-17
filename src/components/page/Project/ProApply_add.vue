<template>
  <div class="paaBoxStyle">
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 10px;font-size: 13px">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pro_apply' }">项目申报</el-breadcrumb-item>
      <el-breadcrumb-item >新建申报</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="pro_apad_card">

      <el-form style="margin-top: 20px" :model="formData" ref="pro_apply_add_form">
        <el-container>
          <el-form-item label-width="39%" label="项目名称" prop="PRO_NAME">
            <el-input v-model="formData.PRO_NAME" placeholder="请输入项目名称" clearable :style="{width: '110%'}">
            </el-input>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="设立年度" prop="SETUP_YEAR">
            <el-select v-model="formData.SETUP_YEAR" placeholder="请选择" :style="{width: '110%'}">
              <el-option
                  v-for="item in proSetupOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="项目类别" prop="PRO_KIND">
            <el-cascader v-model="formData.PRO_KIND_CODE" :options="proKindOption" :show-all-levels="false" placeholder="请选择" :style="{width: '110%'}">
            </el-cascader>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="项目期限" prop="PRO_TERM">
            <el-select v-model="formData.PRO_TERM" placeholder="请选择" :style="{width: '186%'}">
              <el-option
                  v-for="item in proTermOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-container>

        <el-form-item label-width="8%" label="项目总额" prop="PRO_TOTAL_AMT">
          <el-input v-model="formData.PRO_TOTAL_AMT" placeholder="请输入项目总额（单位：万元）" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label-width="8%" label="项目简介" prop="PRO_DESC">
          <el-input type="textarea" v-model="formData.PRO_DESC" placeholder="请输入项目简介" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div  style="margin: 50px 0 0 -530px">
        <el-button @click="resetBt">重置</el-button>
        <el-button style="width: 140px;" type="primary" @click="handleConfirm">新建</el-button>
        <el-button style="width: 140px;" type="danger" @click="handleConfirm">提交</el-button>
        <el-button style="width: 140px;"  @click="handleReturn">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProApply_add",
  data(){
    return{
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
      ]
    }
  },
  methods:{
    setProKind(){
      this.formData.PRO_KIND_CODE = this.formData.PRO_KIND_CODE[this.formData.PRO_KIND_CODE.length-1]
      //通过项目类别代码获取项目类别名
      for(let i of this.proKindOption){
        if(i.value === this.formData.PRO_KIND_CODE){
          this.formData.PRO_KIND = i.label
          break
        }
        if(i.children){
          for(let j of i.children){
            if(j.value === this.formData.PRO_KIND_CODE){
              this.formData.PRO_KIND = j.label
              break
            }
          }
        }
      }
    },
    setRroCode(){
      //生成项目代码
      let time = new Date()
      let year = time.getFullYear();
      let month = time.getMonth()+1;
      if(month<10){month = "0"+ month}
      let day = time.getDate();
      if(day<10){day = "0"+ day}
      let hour = time.getHours();
      if(hour<10){hour = "0"+ hour}
      let minute = time.getMinutes();
      if(minute<10){minute = "0"+ minute}
      let second = time.getSeconds();
      if(second<10){second = "0"+ second}
      this.formData.PRO_CODE = this.formData.PRO_KIND_CODE + year + month + day + hour + minute + second
    },
    handleReturn(){
      this.$router.push('/pro_apply')
    },
    handleConfirm(){
      //生成项目类别名、项目代码
      this.setProKind()
      this.setRroCode()
      //当撤销项目申请时中止逻辑为1
      this.formData.IS_END = 0
      //最终表单
      console.log(this.formData)
    },
    resetBt(){
      this.$refs.pro_apply_add_form.resetFields()
    }
  },
  mounted() {
    this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
  }
}
</script>

<style scoped>
.paaBoxStyle{
  width: 1600px;
  height: 100%;
}
.pro_apad_card{
  opacity: 0.8;
  top:10%;
  left: 5%;
  width: 1100px;
  height: 360px;
  position: relative;
}
</style>
