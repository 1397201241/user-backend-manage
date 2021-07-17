<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <div style="position:absolute;width: 100%;height: 100%;">
      <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 0.5;" alt="">
    </div>
    <el-card>
      <el-form :inline="true" class="draftBtCard">
        <span style="margin-left: 0;">预算草案批复</span>
        <el-button style="margin-left: 820px;" type="text" icon="el-icon-plus" >同意</el-button>
        <el-button type="text"  icon="el-icon-delete" @click="console.log('?')">刷新</el-button>
      </el-form>
      <!--数据展示区-->
      <el-table
          :data="$store.state.budget_info.budget.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
          stripe
          max-height="420px"
          @selection-change="handleSelectionChange"
          style="max-width: 1100px;min-height: 420px;margin-top: 70px;opacity:1"
      >
        <!--数据扩展区-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目代码">
                <span>{{ props.row.PRO_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标说明">
                <span>{{ props.row.BGT_DEC }}</span>
              </el-form-item>
              <el-form-item label="指标可执行标志">
                <span>{{ props.row.BGT_EXE_FLAG }}</span>
              </el-form-item>
              <el-form-item label="是否追踪">
                <span>{{ props.row.IS_TRACK }}</span>
              </el-form-item>
              <el-form-item label="预算次级代码">
                <span>{{ props.row.BUDGET_LEVEL_CODE }}</span>
              </el-form-item>
              <el-form-item label="上级指标文号">
                <span>{{ props.row.SUP_BGT_DOC_NO }}</span>
              </el-form-item>
              <el-form-item label="需要追踪项目代码">
                <span>{{ props.row.TRACK_PRO_CODE }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.AGENCY_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标类型代码">
                <span>{{ props.row.BGT_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标金额">
                <span>{{ props.row.AMOUNT }}</span>
              </el-form-item>
              <el-form-item label="指标管理处室代码">
                <span>{{ props.row.BGT_MOF_DEP_CODE }}</span>
              </el-form-item>
              <el-form-item label="发文时间">
                <span>{{ props.row.DOC_DATE }}</span>
              </el-form-item>
              <el-form-item label="源指标主键">
                <span>{{ props.row.ORI_BGT_ID }}</span>
              </el-form-item>
              <el-form-item label="资金来源代码">
                <span>{{ props.row.FOUND_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="项目年度预算主键">
                <span>{{ props.row.BGT_PMAN_ID }}</span>
              </el-form-item>
              <el-form-item label="是否删除">
                <span>{{ props.row.IS_DELETED }}</span>
              </el-form-item>
              <el-form-item label="指标来源代码">
                <span>{{ props.row.SOURCE_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="财政区划代码">
                <span>{{ props.row.MOF_DIV_CODE }}</span>
              </el-form-item>
              <el-form-item label="预算年度">
                <span>{{ props.row.FISCAL_YEAR }}</span>
              </el-form-item>
              <el-form-item label="本机指标文号">
                <span>{{ props.row.COR_BGT_DOC_NO }}</span>
              </el-form-item>
              <el-form-item label="指标文号题">
                <span>{{ props.row.BGT_DOC_TITLE }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.CREATE_AT }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.UPDATE_AT }}</span>
              </el-form-item>
              <el-form-item label="版本">
                <span>{{ props.row.VERSION }}</span>
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
            prop="FISCAL_YEAR"
            label="预算年度"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="BGT_DOC_TITLE"
            label="指标文标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="DOC_DATE"
            label="发文时间"
            width="180px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="BUDGET_LEVEL_CODE"
            label="预算级次代码"
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
                type="text">
              <i class="iconfont icon-xiugai"></i>
              同意
            </el-button>
            <el-button
                type="text"
                @click.native.prevent="handleChangeRow(scope)"
            >
              <i class="iconfont icon-xiugai"></i>
              生成指标
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[6,10,15,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="$store.state.budget_info.budget.length"
                     style="margin-top: 20px;margin-left: -100px;"
      >
      </el-pagination>
      <!--修改用户对话框-->
      <el-dialog
          title="客户信息修改"
          :visible.sync="changeDialogVisible"
          width="700px"
          :before-close="handleClose">
        <el-form :model="changePayApplyForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
          <el-container>
            <el-form-item label="指标ID" prop="BGT_ID" >
              <el-input v-model="changePayApplyForm.BGT_ID" clearable></el-input>
            </el-form-item>
            <el-form-item label="财政区划" prop="MOF_DIV_CODE" label-width="120px">
              <el-input v-model="changePayApplyForm.MOF_DIV_CODE" clearable style="width: 200px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="预算年度" prop="FISCAL_YEAR">
              <el-input v-model="changePayApplyForm.FISCAL_YEAR" clearable></el-input>
            </el-form-item>
            <el-form-item label="本级指标文号" prop="COR_BGT_DOC_NO">
              <el-input v-model="changePayApplyForm.COR_BGT_DOC_NO" clearable></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="指标文标题" prop="BGT_DOC_TITLE">
              <el-input v-model="changePayApplyForm.BGT_DOC_TITLE" clearable></el-input>
            </el-form-item>
            <el-form-item label="发文时间" prop="DOC_DATE">
              <el-input v-model="changePayApplyForm.DOC_DATE" clearable></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="指标说明" prop="BGT_DEC">
              <el-input v-model="changePayApplyForm.BGT_DEC" clearable></el-input>
            </el-form-item>
            <el-form-item label="预算级次代码" prop="BUDGET_LEVEL_CODE" label-width="150px">
              <el-input v-model="changePayApplyForm.BUDGET_LEVEL_CODE" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="上级指标文号" prop="SUP_BGT_DOC_NO">
              <el-input v-model="changePayApplyForm.SUP_BGT_DOC_NO" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目代码" prop="PRO_CODE" label-width="150px">
              <el-input v-model="changePayApplyForm.PRO_CODE" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="指标可执行标志" prop="BGT_EXE_FLAG">
              <el-input v-model="changePayApplyForm.BGT_EXE_FLAG" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否追踪" prop="IS_TRACK" label-width="150px">
              <el-input v-model="changePayApplyForm.IS_TRACK" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="需要追踪项目代码" prop="TRACK_PRO_CODE">
              <el-input v-model="changePayApplyForm.TRACK_PRO_CODE" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位代码" prop="AGENCY_CODE" label-width="150px">
              <el-input v-model="changePayApplyForm.AGENCY_CODE" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="指标类型代码" prop="BGT_TYPE_CODE">
              <el-input v-model="changePayApplyForm.BGT_TYPE_CODE" clearable></el-input>
            </el-form-item>
            <el-form-item label="指标金额" prop="AMOUNT" label-width="150px">
              <el-input v-model="changePayApplyForm.AMOUNT" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="指标管理处室代码" prop="BGT_MOF_DEP_CODE">
              <el-input v-model="changePayApplyForm.BGT_MOF_DEP_CODE" clearable></el-input>
            </el-form-item>
            <el-form-item label="源指标主键" prop="ORI_BGT_ID" label-width="150px">
              <el-input v-model="changePayApplyForm.ORI_BGT_ID" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="资金来源代码" prop="FOUND_TYPE_CODE">
              <el-input v-model="changePayApplyForm.FOUND_TYPE_CODE" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目年度预算主键" prop="BGT_PMAN_ID" label-width="150px">
              <el-input v-model="changePayApplyForm.BGT_PMAN_ID" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="是否删除" prop="IS_DELETED">
              <el-input v-model="changePayApplyForm.IS_DELETED" clearable></el-input>
            </el-form-item>
            <el-form-item label="指标来源代码" prop="SOURCE_TYPE_CODE" label-width="150px">
              <el-input v-model="changePayApplyForm.SOURCE_TYPE_CODE" clearable style="width: 170px"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
          </el-container>
          <el-container >
            <el-form-item label="版本号" prop="VERSION" label-width="120px">
              <el-input v-model="changePayApplyForm.VERSION" clearable style="width: 80px"></el-input>
            </el-form-item>
          </el-container>
          <el-form-item align="center">
            <el-button type="primary" @click="handleChangeBtnClick('changeForm')">立即修改</el-button>
            <el-button @click="cancelForm('changeForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DraftApproval",
  data(){
    return{
      currentPage:1,
      pageSize:6,
      //修改的客户
      changePayApplyForm:{
        id: '',
        BGT_ID: '',
        MOF_DIV_CODE: '',
        FISCAL_YEAR:'',
        COR_BGT_DOC_NO:'',
        BGT_DOC_TITLE: '',
        DOC_DATE: '',
        BGT_DEC: '',
        BUDGET_LEVEL_CODE: '',
        SUP_BGT_DOC_NO: '',
        PRO_CODE: '',
        BGT_EXE_FLAG: '',
        IS_TRACK: '',
        TRACK_PRO_CODE: '',
        AGENCY_CODE: '',
        BGT_TYPE_CODE: '',
        AMOUNT: '',
        BGT_MOF_DEP_CODE: '',
        ORI_BGT_ID: '',
        FOUND_TYPE_CODE: '',
        BGT_PMAN_ID: '',
        IS_DELETED: '',
        SOURCE_TYPE_CODE: '',
        CREATE_AT: '',
        UPDATE_AT: '',
        VERSION: ''
      },
      total: 20,
      changeDialogVisible:false,
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
        IS_DELETED: [
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
      }
    }
  },
  created() {
    this.getBudget()
    },
  methods:{
    //打开修改客户对话框
    handleChangeRow(scope) {
      console.log(this.changePayApplyForm);
      const data=scope.row;
      /*注入修改信息*/
      this.changePayApplyForm=data;
      this.changePayApplyForm.id=data.PAY_APP_ID;
      this.changeDialogVisible=true;
    },
    //关闭对话框提示
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.addDialogVisible=false;
      this.changeDialogVisible=false
    },
    handleChangeBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newPayApply=this.$refs[formName].model;
          newPayApply.id=this.$refs[formName].model.BGT_ID;
          this.lastChange=newPayApply;
          this.$store.dispatch('budget_info/changeBudget',{newPayApply})
        } else {
          return false;
        }
      });
      //触发父组件的对话框状态修改事件
      this.changeDialogVisible=false
    },
    /*获取支付申请*/
    getBudget(){
      this.$store.dispatch('budget_info/getBudget')
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
  background-color: rgba(186, 214, 241, 0.56);
  width: 1100px;
  position: absolute;
  z-index: 1;
}
</style>
