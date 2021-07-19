<template>
    <el-container id="userList" direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" >
        <!--操作栏-->
        <div style="width: 100%;background-color: #5fb3ec">
            <ActionBar @addBtnClick="addDialogVisible=true"
                       @deleteBtnClick="handleDeleteBtnClick"
                       @enableBtnClick="handleEnableBtnClick"
                       @stopBtnClick="handleEnableBtnClick"
            >支付申请信息明细列表</ActionBar>
        </div>
        <!--搜索框-->
        <QueryPanel :queryModel="userQuery" @QueryButtonClick="onQueryBtnClick" style="margin-top: 10px">
            <el-form-item label="单位代码" style="margin-right: 10px" label-width="70px">
                <el-input v-model="userQuery.name" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="收款人全称" label-width="120px">
                <el-input v-model="userQuery.mobile" style="width: 200px"/>
            </el-form-item>
        </QueryPanel>
        <!--数据展示区-->
        <el-table
                :data="$store.state.pay_apply_info.pay_apply.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                stripe
                border
                max-height="360px"
                @selection-change="handleSelectionChange"
                style="min-height: 360px"
        >
            <!--数据扩展区-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline label-width="140" class="demo-table-expand">
                        <el-form-item label="支付申请主键">
                            <span>{{ props.row.PAY_APP_ID }}</span>
                        </el-form-item>
                        <el-form-item label="支付申请编号">
                            <span>{{ props.row.PAY_APP_NUM }}</span>
                        </el-form-item>
                        <el-form-item label="申请日期">
                            <span>{{ props.row.CREATE_AT }}</span>
                        </el-form-item>
                        <el-form-item label="更新日期">
                            <span>{{ props.row.UPDATE_AT }}</span>
                        </el-form-item>
                        <el-form-item label="单位代码">
                            <span>{{ props.row.AGENCY_CODE }}</span>
                        </el-form-item>
                        <el-form-item label="项目代码">
                            <span>{{ props.row.PRO_CODE }}</span>
                        </el-form-item>
                        <el-form-item label="用途">
                            <span>{{ props.row.FUNDS_USE }}</span>
                        </el-form-item>
                        <el-form-item label="金额">
                            <span>{{ props.row.AMOUNT }}</span>
                        </el-form-item>
                        <el-form-item label="收款人全称">
                            <span>{{ props.row.PAYEE_ACCT_NAME }}</span>
                        </el-form-item>
                        <el-form-item label="收款人账号">
                            <span>{{ props.row.PAYEE_ACCT_NUM }}</span>
                        </el-form-item>
                        <el-form-item label="收款人开户银行">
                            <span>{{ props.row.PAYEE_ACCT_BANK_NAME }}</span>
                        </el-form-item>
                        <el-form-item label="付款人全称">
                            <span>{{ props.row.PAY_ACCT_NAME }}</span>
                        </el-form-item>
                        <el-form-item label="付款人账号">
                            <span>{{ props.row.PAY_ACCT_NUM }}</span>
                        </el-form-item>
                        <el-form-item label="付款人开户银行">
                            <span>{{ props.row.PAY_ACCT_BANK_NAME }}</span>
                        </el-form-item>
                        <el-form-item label="审核状态">
                            <span>{{ props.row.AUDIT_STATUS }}</span>
                        </el-form-item>
                        <el-form-item label="逻辑删除">
                            <span>{{ props.row.IS_DELETE }}</span>
                        </el-form-item>
                        <el-form-item label="指标文号">
                            <span>{{ props.row.COR_BGT_DOC_NO }}</span>
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
                    prop="PAY_APP_NUM"
                    label="支付申请编号"
                    width="110"
            >
            </el-table-column>
            <el-table-column
                    prop="PRO_CODE"
                    label="项目代码"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="AGENCY_CODE"
                    label="单位代码"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="USE"
                    label="用途"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="AMOUNT"
                    label="金额"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="CREATE_AT"
                    label="申请日期"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="AUDIT_STATUS_CN"
                    label="审核状态"
                    width="180px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="handleChangeRow(scope)"
                            type="primary"
                            size="small">
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
                       :total="$store.state.pay_apply_info.pay_apply.length"
        >
        </el-pagination>
        <!--添加用户对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="700px"
                :before-close="handleClose">
            <el-form :model="addUserForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-container>
                    <el-form-item label="支付申请ID" prop="PAY_APP_ID" >
                        <el-input v-model="addUserForm.PAY_APP_ID" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="支付申请编号" prop="PAY_APP_NUM" label-width="120px">
                        <el-input v-model="addUserForm.PAY_APP_NUM" clearable style="width: 200px"></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="创建时间" prop="CREATE_AT" >
                        <div class="block">
                            <el-date-picker
                                    clearable
                                    v-model="addUserForm.CREATE_AT"
                                    align="left"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="更新时间" prop="UPDATE_AT" >
                        <div class="block">
                            <el-date-picker
                                    clearable
                                    v-model="addUserForm.UPDATE_AT"
                                    align="left"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="单位代码" prop="AGENCY_CODE">
                        <el-input v-model="addUserForm.AGENCY_CODE" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="用途" prop="USE">
                        <el-input v-model="addUserForm.USE" clearable></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="金额" prop="AMOUNT">
                        <el-input v-model="addUserForm.AMOUNT" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收款人全称" prop="PAYEE_ACCT_NAME">
                        <el-input v-model="addUserForm.PAYEE_ACCT_NAME" clearable></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="收款人账号" prop="PAYEE_ACCT_NUM">
                        <el-input v-model="addUserForm.PAYEE_ACCT_NUM" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收款人开户银行" prop="PAYEE_ACCT_BANK_NAME" label-width="150px">
                        <el-input v-model="addUserForm.PAYEE_ACCT_BANK_NAME" clearable style="width: 170px"></el-input>
                    </el-form-item>
                </el-container>
                <el-container >
                    <el-form-item label="审核状态" prop="AUDIT_STATUS"  >
                        <el-input v-model="addUserForm.AUDIT_STATUS" clearable style="width: 80px">></el-input>
                    </el-form-item>
                    <el-form-item label="逻辑删除" prop="IS_DELETE"  label-width="120px">
                        <el-input v-model="addUserForm.IS_DELETE" clearable style="width: 80px"></el-input>
                    </el-form-item>
                    <el-form-item label="版本号" prop="VERSION" label-width="120px">
                        <el-input v-model="addUserForm.VERSION" clearable style="width: 80px"></el-input>
                    </el-form-item>
                </el-container>
                <el-form-item align="center">
                    <el-button type="primary" @click="handleAddBtnClick('addForm')">立即修改</el-button>
                    <el-button @click="cancelForm('addForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--修改用户对话框-->
        <el-dialog
                title="客户信息修改"
                :visible.sync="changeDialogVisible"
                width="700px"
                :before-close="handleClose">
            <el-form :model="changePayApplyForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
                <el-container>
                    <el-form-item label="支付申请ID" prop="PAY_APP_ID" >
                        <el-input v-model="changePayApplyForm.PAY_APP_ID" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="支付申请编号" prop="PAY_APP_NUM" label-width="120px">
                        <el-input v-model="changePayApplyForm.PAY_APP_NUM" clearable style="width: 200px"></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="创建时间" prop="CREATE_AT">
                        <el-input v-model="changePayApplyForm.CREATE_AT" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间" prop="UPDATE_AT" >
                        <div class="block">
                            <el-date-picker
                                    clearable
                                    v-model="changePayApplyForm.UPDATE_AT"
                                    align="left"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="单位代码" prop="AGENCY_CODE">
                        <el-input v-model="changePayApplyForm.AGENCY_CODE" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="用途" prop="USE">
                        <el-input v-model="changePayApplyForm.USE" clearable></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="金额" prop="AMOUNT">
                        <el-input v-model="changePayApplyForm.AMOUNT" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收款人全称" prop="PAYEE_ACCT_NAME">
                        <el-input v-model="changePayApplyForm.PAYEE_ACCT_NAME" clearable></el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="收款人账号" prop="PAYEE_ACCT_NUM">
                        <el-input v-model="changePayApplyForm.PAYEE_ACCT_NUM" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收款人开户银行" prop="PAYEE_ACCT_BANK_NAME" label-width="150px">
                        <el-input v-model="changePayApplyForm.PAYEE_ACCT_BANK_NAME" clearable style="width: 170px"></el-input>
                    </el-form-item>
                </el-container>
                <el-container >
                    <el-form-item label="审核状态" prop="AUDIT_STATUS"  >
                        <el-input v-model="changePayApplyForm.AUDIT_STATUS" clearable style="width: 80px">></el-input>
                    </el-form-item>
                    <el-form-item label="逻辑删除" prop="IS_DELETE"  label-width="120px">
                        <el-input v-model="changePayApplyForm.IS_DELETE" clearable style="width: 80px"></el-input>
                    </el-form-item>
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
    </el-container>

</template>

<script>
    import ActionBar from "../../../components/common/ActionBar";
    import QueryPanel from "../../../components/common/QueryPanel";
    /*import {FormValidate} from "../../utils/validate"*/
    import {get} from "../../../utils/request";
    export default {
        name: "index",
        components: {ActionBar,QueryPanel},
        data() {
            return {
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
                //添加的客户
                addUserForm: {
                    id: '',
                    PAY_APP_ID: '',
                    PAY_APP_NUM: '',
                    CREATE_AT: '',
                    UPDATE_AT: '',
                    AGENCY_CODE: '',
                    USE: '',
                    AMOUNT: '',
                    PAYEE_ACCT_NAME: '',
                    PAYEE_ACCT_NUM: '',
                    PAYEE_ACCT_BANK_NAME: '',
                    AUDIT_STATUS: '',
                    IS_DELETE: '',
                    VERSION: ''
                },
                //修改的客户
                changePayApplyForm:{
                    id: '',
                    PAY_APP_ID: '',
                    PAY_APP_NUM: '',
                    CREATE_AT: '',
                    UPDATE_AT: '',
                    AGENCY_CODE: '',
                    USE: '',
                    AMOUNT: '',
                    PAYEE_ACCT_NAME: '',
                    PAYEE_ACCT_NUM: '',
                    PAYEE_ACCT_BANK_NAME: '',
                    AUDIT_STATUS: '',
                    IS_DELETE: '',
                    VERSION: ''
                },
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
            /*获取支付申请*/
            getPayApply(){
                this.$store.dispatch('pay_apply_info/getPayApply')
            },
            //查询客户
            onQueryBtnClick(){
                let {name, mobile} = this.userQuery;
                if (name!==''){
                    get("http://localhost:3000/PAYMENT_APPLY?AGENCY_CODE=" + name)
                        .then(myJson => {
                                this.$store.commit('pay_apply_info/SET_PAY_APPLY',myJson);
                            }
                        ).catch(err => console.log(err));
                }else if (mobile!==''){
                    get("http://localhost:3000/PAYMENT_APPLY?PAYEE_ACCT_NAME="+mobile)
                        .then(myJson=>{
                            this.$store.commit('pay_apply_info/SET_PAY_APPLY',myJson);
                        })
                        .catch(err=> console.log(err));
                }else alert("请输入您要查询的名字或手机号码")
            },
            handleAddBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newPayApply=this.$refs[formName].model;
                        newPayApply.id=this.$refs[formName].model.PAY_APP_ID;
                        if (newPayApply){
                            this.$store.dispatch('pay_apply_info/addPayApply',{newPayApply})
                        }
                    } else {
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.addDialogVisible = false
            },
            handleChangeBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newPayApply=this.$refs[formName].model;
                        newPayApply.id=this.$refs[formName].model.PAY_APP_ID;
                        this.lastChange=newPayApply;
                        this.$store.dispatch('pay_apply_info/acceptPayApply',{newPayApply})
                    } else {
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.changeDialogVisible=false
            },
            handleEnableBtnClick(){
                const {multipleSelection}=this;
                this.$store.dispatch('base_info/enableUser',{multipleSelection});
            },
            //删除用户信息
            handleDeleteBtnClick(){
                const {multipleSelection}=this;
                this.$store.dispatch('pay_apply_info/deletePayApply',{multipleSelection});
            },
            //打开修改客户对话框
            handleChangeRow(scope) {
                console.log(this.changePayApplyForm);
                const data=scope.row;
                /*注入修改信息*/
                this.changePayApplyForm=data;
                this.changePayApplyForm.id=data.PAY_APP_ID;
                this.changeDialogVisible=true;
            },
            /**
             * @description 同意支付申请
             * @param scope
             */
            handleAcceptRow(scope){
                let data=scope.row;
                data.AUDIT_STATUS=1; //修改审核状态为1
                this.$store.dispatch('pay_apply_info/acceptPayApply',{data})
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
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
