<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-breadcrumb separator="/" style="margin-bottom: 10px;padding-left: 10px;padding-top: 10px;font-size: 13px;">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >指标导航</el-breadcrumb-item>
      <el-breadcrumb-item >新建申请</el-breadcrumb-item>

      <a class="downloadStyle" :href=downloadUrl>下载凭证回单</a>

    </el-breadcrumb>
    <el-divider content-position="center"><span style="color: #c40a0a;font-size: 20px">已接受指标列表</span></el-divider>
    <el-card>
      <el-table
          :data="this.myTableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
          stripe
          max-height="600px"
          @selection-change="handleSelectionChange"
          style="max-width: 1100px;min-height: 370px;opacity: 0.8;margin-left: 20px;"
      >
        <!--数据扩展区-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目代码">
                <span>{{ props.row.projectCode }}</span>
              </el-form-item>
              <el-form-item label="指标说明">
                <span>{{ props.row.indicatorDescribe }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.agencyCode }}</span>
              </el-form-item>
              <el-form-item label="指标金额">
                <span>{{ props.row.indicatorAmount }}</span>
              </el-form-item>
              <el-form-item label="发文时间">
                <span>{{ props.row.indicatorPaperTime }}</span>
              </el-form-item>
              <el-form-item label="项目年度预算主键">
                <span>{{ props.row.budgetId }}</span>
              </el-form-item>
              <el-form-item label="预算年度">
                <span>{{ props.row.fiscalYear }}</span>
              </el-form-item>
              <el-form-item label="指标文号题">
                <span>{{ props.row.indicatorPaperTitle }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            type="selection"
            width="50"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="fiscalYear"
            label="预算年度"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorPaperTitle"
            label="指标文标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorPaperNumber"
            label="本级指标文号"
            width="180px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorAmount"
            label="指标金额"
            width="180px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="action"
            label="操作"
            width="240px"
            align="center"
        >
          <template slot-scope="scope">
            <!--            slot-scope="scope"-->
            <!--            @click.native.prevent="handleChangeRow(scope)"-->
            <el-button
                type="text"
                @click.native.prevent="$router.push({path:'/add_pay_2',query:{data:scope.row.indicatorPaperNumber}})"
            >
              <i class="iconfont icon-xiugai"></i>
              新建申请
            </el-button>
            <el-button
                type="text"
                @click.native.prevent="viewDetails(scope.row)"
            >
              <i class="iconfont icon-xiugai"></i>
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination align='center'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[4,10,15,20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   style="margin-top: 20px;margin-left: -140px;"
    >
    </el-pagination>
    <el-dialog
        class="apDialog"
        :visible.sync="dialogVisible"
        width="500px"
        ref="genPayApplyDialog">
      <div class="paDialogTitle">新建申请</div>
      <el-form :model="formData" :rules="rules" ref="genPayApplyForm">
        <el-container>
          <el-form-item  prop="PAYEE_ACCT_NAME" label="收款人名称" style="width: 50%;">
            <el-input v-model="formData.PAYEE_ACCT_NAME" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
          <el-form-item prop="PAYEE_ACCT_BANK_NAME" label="收款人开户银行名称" style="width: 50%;">
            <el-input v-model="formData.PAYEE_ACCT_BANK_NAME" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item prop="PAYEE_ACCT_NUM" label="收款人账号" style="width: 100%;">
          <el-input v-model="formData.PAYEE_ACCT_NUM" style="width: 98%;left: 0;"></el-input>
        </el-form-item>
<!--        <el-container>
          <el-form-item  prop="PAY_ACCT_NAME" label="付款人名称" style="width: 50%;">
            <el-input v-model="formData.PAY_ACCT_NAME" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
          <el-form-item prop="PAY_ACCT_BANK_NAME" label="付款银行名称" style="width: 50%;">
            <el-input v-model="formData.PAY_ACCT_BANK_NAME" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item prop="PAY_ACCT_NUM" label="付款人账号" style="width: 100%;">
          <el-input v-model="formData.PAY_ACCT_NUM" style="width: 98%;left: 0;"></el-input>
        </el-form-item>-->
        <el-container>
          <el-form-item  prop="AMOUNT" label="申请金额" style="width: 50%;">
            <el-input v-model="formData.AMOUNT" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
          <el-form-item prop="IS_DELETE" label="删除逻辑" style="width: 50%;">
            <el-select v-model="formData.IS_DELETE" style="width: 98%;">
              <el-option v-for="item in [{label:'删除',value:1},{label:'保留',value: 0}]"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-container>
      </el-form>
      <div slot="footer" style="margin-top: -50px">
        <el-button @click="close('genTargetForm')">取消</el-button>
        <el-button type="primary" @click="handleConfirm('genTargetForm')">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {get} from '../../../utils/request'
export default {
  name: "TargetDown",
  data(){
    return{
      downloadUrl:'http://192.168.110.85:8001/report/download/'+this.$store.state.user_info.info.agencyCode
      +'/'+this.$store.state.user_info.info.agencyId,
      myTableData:[],
      fiscalYearOptions: [
        {value:2010,label:"2010年"},{value:2011,label:"2011年"},{value:2012,label:"2012年"},
        {value:2013,label:"2013年"},{value:2014,label:"2014年"},{value:2015,label:"2015年"},
        {value:2016,label:"2016年"},{value:2017,label:"2017年"},{value:2018,label:"2018年"},
        {value:2019,label:"2019年"},{value:2020,label:"2020年"},{value:2021,label:"2021年"},
      ],
      dialogVisible:false,
      currentPage:1,
      pageSize:4,
      total:5,
      formData:{
        agencyCode:"",
        budgetId: 2,
        executable: 1,
        fiscalYear:2021,
        indicatorAmount:200,
        indicatorPaperNumber:200,
        indicatorPaperTitle:'',
        indicatorPaperTime:'',
        indicatorDescribe:'',
        projectCode: ''
      },
      //表单校验
      rules: {
        BGT_ID: [
          { required: true, message: '请输入ID', trigger: 'blur' }
        ],
        MOF_DIV_CODE:[
          { required: true, message: '请输入用户类型', trigger: 'blur' },
        ],
        FISCAL_YEAR:[
          { required: true, message: '请输入用户所属财政', trigger: 'blur' },
        ],
        COR_BGT_DOC_NO:[
          { required: true, message: '请输入用户所属机构', trigger: 'blur' },
        ],
        BGT_DOC_TITLE:[
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        DOC_DATE:[
          { required: true, message: '请输入用户账号', trigger: 'blur' },
        ],
        BGT_DEC:[
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        BUDGET_LEVEL_CODE:[
          { required: true, message: '请输入用户身份证', trigger: 'blur' },
        ],
        SUP_BGT_DOC_NO:[
          { required: true, message: '请输入用户电话', trigger: 'blur' },
        ],
        PRO_CODE: [
          { required: true, message: '请输入用户备注', trigger: 'blur' },
        ],
        BGT_EXE_FLAG: [
          { required: true, message: '请输入用户状态', trigger: 'blur' }
        ],
        IS_TRACK: [
          { required: true, message: '请输入用户创建时间', trigger: 'blur' }
        ],
        TRACK_PRO_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        AGENCY_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        BGT_TYPE_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        AMOUNT: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        BGT_MOF_DEP_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        ORI_BGT_ID: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ]
        ,
        FOUND_TYPE_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ]
        ,
        BGT_PMAN_ID: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        IS_DELETE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        SOURCE_TYPE_CODE: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        CREATE_AT: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        UPDATE_AT: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ],
        VERSION: [
          { required: true, message: '请输入用户更新时间', trigger: 'blur' }
        ]
      },
      addPayUrl:"http://192.168.110.85:8001"
    }
  },
  created() {
    this.getBudget()
    console.log("用户信息",this.$store.state.user_info.info)
  },
  methods:{
    close(formName) {
      /*this.$refs[formName].resetFields();*/
      console.log(formName)
      this.dialogVisible=false;
      let BigDecimal = require('js-big-decimal')
      console.log(new BigDecimal("0.09"))
    },
    handleConfirm(formName) {
      console.log(formName)
      this.dialogVisible=false;
    },
    viewDetails(data){
      this.$router.push(
          {path:'/target_detail',
            query:{name:'data',data:JSON.stringify(
                  data
              )}})
    },
    /*获取支付申请*/
    getBudget(){
      let id = this.$store.state.user_info.info.agencyId
      get(this.addPayUrl+'/indicator/listAll/'+id).then(
          res => {
            console.log(res)
            this.myTableData = res.data
            this.total = this.myTableData.length
          }
      )
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleGenPayApply(data){
      console.log(data.BGT_ID)
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
/*font-class方式导入阿里图标*/
@import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
/*通用图标大小*/
.iconfont{
  font-size: 12px;
}
.paDialog{
  opacity: 1;
  background-color: rgba(246, 246, 246, 0.52);
}
.paDialog .el-form-item__label{
  font-weight: bolder;
  font-family: 幼圆;
  font-size: 18px;
  color: #000;
}
.paDialogTitle{
  width: 100%;
  background-color: #efefef;
  font-family: 幼圆;
  font-size: 26px;
  font-weight: bolder;
  margin-top: -20px;
  color: black;
}
.demo-table-expand {
  font-size: 0;
  .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    span{
      color: #5908b1;
    }
  }
}
.draftBtCard{
  background-color: rgba(203, 219, 212, 0.56);
  width: 1100px;
  position: absolute;
  z-index: 1;
}
.downloadStyle{
  &:visited{
    color: rgb(152, 122, 234);
  }
  &:link{
    color: rgb(108, 190, 229);
  }
  text-decoration: none;
  margin-left: -1000px;
}
</style>

