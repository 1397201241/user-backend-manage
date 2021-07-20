<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-breadcrumb separator="/" style="margin-bottom: 40px;padding-left: 10px;padding-top: 10px;font-size: 13px;">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >指标导航</el-breadcrumb-item>
      <el-breadcrumb-item >新建申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="left"><span style="color: red;font-size: large;">新建支付申请表</span></el-divider>
    <el-form :model="formData" :rules="rules" ref="genPayApplyForm">
      <el-container style="margin-top: 50px;">
        <el-form-item   prop="PAYEE_ACCT_NAME" label="收款人名称" label-width="35%" style="width: 25%">
          <el-input v-model="formData.PAYEE_ACCT_NAME"></el-input>
        </el-form-item>
        <el-form-item  prop="PAYEE_ACCT_BANK_NAME" label="收款人开户银行名称" label-width="40%"  style="width: 35%">
          <el-input clearable v-model="formData.PAYEE_ACCT_BANK_NAME"></el-input>
        </el-form-item>
        <el-form-item prop="PAYEE_ACCT_NUM" label="收款人账号" label-width="17%" style="width: 50%;">
          <el-input v-model="formData.PAYEE_ACCT_NUM" style="width: 390px;margin-left: -70px;"></el-input>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item   prop="PAY_ACCT_NAME" label="付款人名称" label-width="35%" style="width: 25%">
          <el-input disabled v-model="formData.PAY_ACCT_NAME"></el-input>
        </el-form-item>
        <el-form-item  prop="PAY_ACCT_BANK_NAME" label="付款人开户银行名称" label-width="40%"  style="width: 35%">
          <el-input disabled clearable v-model="formData.PAY_ACCT_BANK_NAME"></el-input>
        </el-form-item>
        <el-form-item prop="PAY_ACCT_NUM" label="付款人账号" label-width="17%" style="width: 50%;">
          <el-input disabled v-model="formData.PAY_ACCT_NUM" style="width: 390px;margin-left: -70px;"></el-input>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item  label-width="32%" prop="AMOUNT" label="申请金额" style="width: 25%;">
          <el-input v-model="formData.AMOUNT" style="width: 186px;margin-left: -30px;"></el-input>
        </el-form-item>
        <el-form-item label-width="41%" prop="IS_DELETE" label="删除逻辑" style="width: 25%;">
          <el-select disabled v-model="formData.IS_DELETE" style="width: 246px;">
            <el-option v-for="item in [{label:'删除',value:1},{label:'保留',value: 0}]"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-container>
      <el-form-item style="margin-left: -220px;">
        <el-button >暂存</el-button>
        <el-button style="width: 240px;" type="primary" @click="handleAddPayApply">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PayApply2",
  data() {
    return {
      formData: {
        id: 2,
        PAY_APP_ID: 2,
        PAY_APP_NUM: "102",
        CREATE_AT: "2021-07-13",
        UPDATE_AT: "2021-07-07",
        AGENCY_CODE: "福建省教育局",
        FOUNDS_USE: "建立图书馆",
        AMOUNT: "8000000",
        PAYEE_ACCT_NAME: "Qin Li",
        PAYEE_ACCT_NUM: "450923199901022444",
        PAYEE_ACCT_BANK_NAME: "湖南省建设银行",
        PAY_ACCT_NAME: "Qin Li",
        PAY_ACCT_NUM: "450923199901022444",
        PAY_ACCT_BANK_NAME: "湖南省建设银行",
        AUDIT_STATUS: 0,
        IS_DELETE: 0,
        VERSION: "0.0.1",
        AUDIT_STATUS_CN: "通过"
      },
      //表单校验
      rules: {
        BGT_ID: [
          {required: true, message: '请输入ID', trigger: 'blur'}
        ],
        PAY_ACCT_BANK_NAME: [
          {required: true, message: '请输入付款人开户银行', trigger: 'blur'}
        ],
        PAYEE_ACCT_BANK_NAME: [
          {required: true, message: '请输入收款人开户银行', trigger: 'blur'}
        ],
        PAY_ACCT_NUM: [
          {required: true, message: '请输入付款人账号', trigger: 'blur'}
        ],
        PAYEE_ACCT_NUM: [
          {required: true, message: '请输入收款人账号', trigger: 'blur'}
        ],
        PAY_ACCT_NAME: [
          {required: true, message: '请输入付款人名称', trigger: 'blur'}
        ],
        PAYEE_ACCT_NAME: [
          {required: true, message: '请输入收款人名称', trigger: 'blur'}
        ],
        MOF_DIV_CODE: [
          {required: true, message: '请输入用户类型', trigger: 'blur'},
        ],
        FISCAL_YEAR: [
          {required: true, message: '请输入用户所属财政', trigger: 'blur'},
        ],
        COR_BGT_DOC_NO: [
          {required: true, message: '请输入用户所属机构', trigger: 'blur'},
        ],
        BGT_DOC_TITLE: [
          {required: true, message: '请输入用户姓名', trigger: 'blur'},
        ],
        DOC_DATE: [
          {required: true, message: '请输入用户账号', trigger: 'blur'},
        ],
        BGT_DEC: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
        ],
        BUDGET_LEVEL_CODE: [
          {required: true, message: '请输入用户身份证', trigger: 'blur'},
        ],
        SUP_BGT_DOC_NO: [
          {required: true, message: '请输入用户电话', trigger: 'blur'},
        ],
        PRO_CODE: [
          {required: true, message: '请输入用户备注', trigger: 'blur'},
        ],
        BGT_EXE_FLAG: [
          {required: true, message: '请输入用户状态', trigger: 'blur'}
        ],
        IS_TRACK: [
          {required: true, message: '请输入用户创建时间', trigger: 'blur'}
        ],
        TRACK_PRO_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        AGENCY_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        BGT_TYPE_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        AMOUNT: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        BGT_MOF_DEP_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        ORI_BGT_ID: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ]
        ,
        FOUND_TYPE_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ]
        ,
        BGT_PMAN_ID: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        IS_DELETE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        SOURCE_TYPE_CODE: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        CREATE_AT: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        UPDATE_AT: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ],
        VERSION: [
          {required: true, message: '请输入用户更新时间', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    handleAddPayApply() {
      console.log("..")
      this.$confirm('确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!请前往支付凭证页面申请支付！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消。'
        });
      });
    }
  }
}


</script>

<style scoped>

</style>
