<template>
    <el-container id="userList" direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" >
        <!--操作栏-->
        <div style="width: 100%;background-color: #5fb3ec">
            <ActionBar
                       @deleteBtnClick="handleDeleteBtnClick"
            >支付申请信息明细列表</ActionBar>
        </div>
        <!--数据展示区-->
        <el-table
                :data="this.myTableDate.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                stripe
                border
                max-height="360px"
                @selection-change="handleSelectionChange"
                style="min-height: 360px;margin-top: 50px;"
        >
            <!--数据扩展区-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline label-width="140" class="demo-table-expand">
                        <el-form-item label="支付申请编号">
                            <span>{{ props.row.payAppNum }}</span>
                        </el-form-item>
                        <el-form-item label="单位代码">
                            <span>{{ props.row.agencyCode }}</span>
                        </el-form-item>
                        <el-form-item label="项目代码">
                            <span>{{ props.row.proCode }}</span>
                        </el-form-item>
                        <el-form-item label="用途">
                            <span>{{ props.row.fundsUse }}</span>
                        </el-form-item>
                        <el-form-item label="金额">
                            <span>{{ props.row.applyAmount }}</span>
                        </el-form-item>
                        <el-form-item label="收款人全称">
                            <span>{{ props.row.payeeAcctName }}</span>
                        </el-form-item>
                        <el-form-item label="收款人账号">
                            <span>{{ props.row.payeeAcctNum }}</span>
                        </el-form-item>
                        <el-form-item label="收款人开户银行">
                            <span>{{ props.row.payeeAcctBankName }}</span>
                        </el-form-item>
                        <el-form-item label="付款人全称">
                            <span>{{ props.row.payAcctName }}</span>
                        </el-form-item>
                        <el-form-item label="付款人账号">
                            <span>{{ props.row.payAcctNum }}</span>
                        </el-form-item>
                        <el-form-item label="付款人开户银行">
                            <span>{{ props.row.payAcctBankName }}</span>
                        </el-form-item>
                        <el-form-item label="指标文号">
                            <span>{{ props.row.indicatorPaperNumber }}</span>
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
                    prop="payAppNum"
                    label="支付申请编号"
                    width="240"
            >
            </el-table-column>
            <el-table-column
                    prop="agencyCode"
                    label="单位代码"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="fundsUse"
                    label="用途"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="applyAmount"
                    label="申请金额"
                    width="200"
            >
              <template slot-scope="scope">${{ scope.row.applyAmount }}</template>
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                  <el-button
                      @click.native.prevent="commitPayApply(scope.row)"
                      type="primary">
                    <i class="iconfont icon-xiugai"></i>
                    申请
                  </el-button>
                    <el-button
                            @click.native.prevent="handleChangeRow(scope.row)"
                            type="primary">
                        <i class="iconfont icon-xiugai"></i>
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页器-->
        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,2,3,4]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
        >
        </el-pagination>
        <!--修改用户对话框-->
        <el-dialog
                title="支付申请表信息修改"
                :visible.sync="changeDialogVisible"
                width="700px"
                :before-close="handleClose">
            <el-form :model="changePayApplyForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
              <el-container>
                  <el-form-item style="width: 50%;margin-left: -20px;"  label="金额" prop="applyAmount">
                    <el-input v-model="changePayApplyForm.applyAmount" clearable></el-input>
                  </el-form-item>
                    <el-form-item  style="width: 50%;" label="用途" prop="fundsUse">
                        <el-input v-model="changePayApplyForm.fundsUse" clearable></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label-width="35%" label="收款人开户银行" prop="payeeAcctBankName" style="width: 50%;">
                    <el-input v-model="changePayApplyForm.payeeAcctBankName" clearable style="width: 170px"></el-input>
                  </el-form-item>
                    <el-form-item label="收款人全称" prop="payeeAcctName" style="width: 50%;">
                        <el-input v-model="changePayApplyForm.payeeAcctName" clearable></el-input>
                    </el-form-item>
                </el-container>
                    <el-form-item label="收款人账号" prop="payeeAcctNum" style="width: 100%;">
                        <el-input v-model="changePayApplyForm.payeeAcctNum" clearable></el-input>
                    </el-form-item>

                <el-form-item align="center">
                    <el-button type="primary" @click="handleChangeBtnClick">立即修改</el-button>
                    <el-button @click="cancelForm('changeForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>

</template>

<script>
    import ActionBar from "../../../components/common/ActionBar";
    /*import {FormValidate} from "../../utils/validate"*/
    import {get,post} from "../../../utils/request";
    export default {
        name: "index",
        components: {ActionBar},
        data() {
            return {
              myTableDate:[],
              pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                }, //时间选择框快捷参数
              addPayUrl:"http://192.168.110.85:8001/",
              currentPage: 1, // 当前页码
              total: 20, // 总条数
              pageSize: 4, // 每页的数据条数,
              //对话框状态
              addDialogVisible:false,
              changeDialogVisible:false,
              //修改的客户姓名，手机号码
              userQuery:{name:'',mobile:''},
              //客户信息
              customers: [],
              lastChange:{},
                //修改的客户
              changePayApplyForm:{},
                //修改的客户
              deleteUserForm:{
                    user_id:'',
                    user_type:'',
                    mof_code: '',
                    agency_code: '',
                    user_name: '',
                    user_account: '',
                    user_password: '',
                    id_card_num: '',
                    tel: '',
                    note: '',
                    status: '',
                    create_time: '',
                    update_time: '',
                    version: '',
                },
                //选中的信息
              multipleSelection:[],
                //表单校验
              rules: {
                    PAY_APP_ID: [
                        { required: true, message: '请输入ID', trigger: 'blur' }
                    ],
                    PAY_APP_NUM:[
                        { required: true, message: '请输入用户类型', trigger: 'blur' },
                    ],
                    CREATE_AT:[
                        { required: true, message: '请输入用户所属财政', trigger: 'blur' },
                    ],
                    UPDATE_AT:[
                        { required: true, message: '请输入用户所属机构', trigger: 'blur' },
                    ],
                    AGENCY_CODE:[
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                    USE:[
                        { required: true, message: '请输入用户账号', trigger: 'blur' },
                    ],
                    AMOUNT:[
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                    ],
                    PAYEE_ACCT_NAME:[
                        { required: true, message: '请输入用户身份证', trigger: 'blur' },
                    ],
                    PAYEE_ACCT_NUM:[
                        { required: true, message: '请输入用户电话', trigger: 'blur' },
                    ],
                    PAYEE_ACCT_BANK_NAME: [
                        { required: true, message: '请输入用户备注', trigger: 'blur' },
                    ],
                    AUDIT_STATUS: [
                        { required: true, message: '请输入用户状态', trigger: 'blur' }
                    ],
                    IS_DELETE: [
                        { required: true, message: '请输入用户创建时间', trigger: 'blur' }
                    ],
                    VERSION: [
                        { required: true, message: '请输入用户更新时间', trigger: 'blur' }
                    ]
                }
            }
        },
        created:function(){
            // 初始化状态
            this.getPayApply()
        },
        mounted() {

        },
        methods: {
          commitPayApply(data){
            get(this.addPayUrl+"payApplication/submit/"+data.payAppNum).then(
                res => {
                  console.log(res)
                  if(res.code === 200){
                    this.$message({
                      type: 'success',
                      message: "提交成功！"
                    })
                  }else if(res.status === 500){
                    this.$message({
                      type: 'error',
                      message: "重复提交！"
                    })
                  }
                }
            )
            this.getPayApply()
          },
          //修改暂存申请表
          handleChangeBtnClick(){
            console.log("?")
            let sendVO = {}
            sendVO.payAppNum = this.changePayApplyForm.payAppNum
            sendVO.agencyCode = this.changePayApplyForm.agencyCode
            sendVO.applyAmount = this.changePayApplyForm.applyAmount
            sendVO.fundsUse = this.changePayApplyForm.fundsUse
            sendVO.payeeAcctBankName = this.changePayApplyForm.payeeAcctBankName
            sendVO.payeeAcctName = this.changePayApplyForm.payeeAcctName
            sendVO.payeeAcctNum = this.changePayApplyForm.payeeAcctNum
            sendVO.payAcctBankName = this.changePayApplyForm.payAcctBankName
            sendVO.payAcctName = this.changePayApplyForm.payAcctName
            sendVO.payAcctNum = this.changePayApplyForm.payAcctNum
            post(this.addPayUrl+"payApplication/update",sendVO).then(
                res => {
                  console.log(res)
                  if(res.code === 200){
                    this.$message({
                      type: 'success',
                      message: "提交成功！"
                    })
                    this.changeDialogVisible = false
                  }else{
                    this.$message({
                      type: 'error',
                      message: "提交失败！"
                    })
                    this.changeDialogVisible = false
                  }
                }
            )
          },
          /*获取支付申请*/
          getPayApply(){
              this.$store.dispatch('pay_apply_info/getPayApply')

              let agencyCode = this.$store.state.user_info.info.agencyCode
              get(this.addPayUrl+"payApplication/listByAgencyCode/"+ agencyCode).then(
                  res => {
                    console.log(res)
                    this.myTableDate = res.data
                  }
              )
            },
          //删除用户信息
          handleDeleteBtnClick(){
            for(let i of this.multipleSelection){
              get(this.addPayUrl+"payApplication/delete/"+i.payAppNum).then(
                  res => {
                    console.log(res)
                    this.getPayApply()
                    if(res.code !== 200){
                      this.$message({
                        type: 'error',
                        message: "删除出错！"
                      })
                    }
                  }
              )
            }
            },
          //打开修改客户对话框
          handleChangeRow(data) {
                console.log(this.changePayApplyForm);
                this.changePayApplyForm = data
                this.changeDialogVisible=true;
            },
            /**
             * @description 同意支付申请
             * @param scope
             */
            /*handleAcceptRow(scope){
                let data=scope.row;
                data.AUDIT_STATUS=1; //修改审核状态为1
                this.$store.dispatch('pay_apply_info/acceptPayApply',{data})
            },*/
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
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
              console.log("已选中",this.multipleSelection)
            },
            //取消按钮
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this.addDialogVisible=false;
                this.changeDialogVisible=false
            },
            //关闭对话框提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done();
                    })
                    .catch(()=> {});
            }
        },
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
            width: 25%;
            span{
                color: #5908b1;
            }
        }
    }
</style>
