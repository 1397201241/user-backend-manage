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
          <el-form-item label-width="39%" label="项目名称" prop="proName">
            <el-input v-model="formData.proName" placeholder="请输入项目名称" clearable :style="{width: '110%'}">
            </el-input>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="设立年度" prop="setupYear">
            <el-select v-model="formData.setupYear" placeholder="请选择" :style="{width: '110%'}">
              <el-option
                  v-for="item in proSetupOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="项目类别" prop="proKindCode">
            <el-cascader v-model="formData.proKindCode" :options="proKindOption" :show-all-levels="false" placeholder="请选择" :style="{width: '110%'}">
            </el-cascader>
          </el-form-item>
          <el-form-item style="margin-left: 20px;" label-width="40%" label="项目期限" prop="proTerm">
            <el-select v-model="formData.proTerm" placeholder="请选择" :style="{width: '186%'}">
              <el-option
                  v-for="item in proTermOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-container>

        <el-form-item label-width="8%" label="项目总额" prop="proTotalAmt">
          <el-input v-model="formData.proTotalAmt" placeholder="请输入项目总额（单位：万元）" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label-width="8%" label="项目简介" prop="proDesc">
          <el-input type="textarea" v-model="formData.proDesc" placeholder="请输入项目简介" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div  style="margin: 50px 0 0 -530px">
        <el-button @click="resetBt">重置</el-button>
        <el-button style="width: 140px;" type="primary" @click="handleStorage">暂存</el-button>
        <el-button style="width: 140px;"  @click="handleReturn">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {post} from '../../../utils/request'
let bigDecimal = require('js-big-decimal');
export default {
  name: "ProApply_add",
  data(){
    return{
      formData: {
        setupYear: "",
        proCode: "",
        proName: "",
        agencyCode: "010100",
        proTerm: "",
        proTotalAmt: "",
        proDepreview: "",
        proBgtreview: "",
        proDesc: "",
        isDelete: 0,
        depAudOpnionCode: 1,
        mofAudOpinionCode: 1,
        proKind:"文娱",
        proKindCode: "03",
        applyLink:0
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
      ],
    }
  },
  methods:{
    setProKind(){
      //03->3
      if(this.formData.proKindCode){
        this.formData.proKindCode = this.formData.proKindCode[this.formData.proKindCode.length-1]
      }
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
    setRroCode(){
      //生成项目代码 = 类型码+年月日+时分秒
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
      this.formData.proCode = this.formData.proKindCode + year + month + day + hour + minute + second
    },
    handleReturn(){
      this.$router.push('/pro_apply')
    },
    handleStorage(){
      //生成项目类别名、项目代码
      this.setProKind()
      this.setRroCode()
      //当撤销项目申请时中止逻辑为1
      this.formData.IS_END = 0
      //转换金币格式为bigdecimal
      this.formData.proTotalAmt = new bigDecimal(""+this.formData.proTotalAmt).value
      this.formData.agencyCode = this.$store.state.user_info.info.agencyCode
      console.log(this.formData.agencyCode)
      post("http://192.168.110.85:8001/project/add",this.formData)
      this.putMessageOut()
    },
    putMessageOut(){
      this.$confirm('确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!等待审核！请前往本地库查看！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消。'
        });
      });
      this.$confirm('确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!请前往本地项目库查看！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消。'
        });
      });
    },
    resetBt(){
      this.$refs.pro_apply_add_form.resetFields()
    }
  },
  mounted() {
    this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
    console.log(this.$store.state.user_info.info)
  }
}
</script>

<style scoped>
.paaBoxStyle{
  width: 1600px;
  height: 100%;
}
.pro_apad_card{
  opacity: 0.9;
  top:10%;
  left: 5%;
  width: 1100px;
  height: 360px;
  position: relative;
}
</style>
