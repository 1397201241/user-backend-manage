<template>
    <el-container id="userList" direction="vertical" style="height: 100%;width: 100%" >
        <!--操作栏-->
        <div style="width: 100%;background-color: #5fb3ec">
            <ActionBar @addBtnClick="addUserDialogVisible=true"
                       @deleteBtnClick="handleDeleteBtnClick"
                       @enableBtnClick="handleEnableBtnClick"
                       @stopBtnClick="handleEnableBtnClick"
            >支付申请信息明细列表</ActionBar>
        </div>
        <!--搜索框-->
        <QueryPanel :queryModel="userQuery" @QueryButtonClick="onQueryBtnClick" style="margin-top: 10px">
            <el-form-item label="姓名" style="margin-right: 10px">
                <el-input v-model="userQuery.name" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="手机" label-width="40px">
                <el-input v-model="userQuery.mobile" style="width: 200px"/>
            </el-form-item>
        </QueryPanel>
        <!--数据展示区-->
        <el-table
                :data="$store.state.pay_apply_info.pay_apply.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                stripe
                border
                max-height="276px"
                @selection-change="handleSelectionChange"
                style="min-height: 276px;max-width: 1200px"
        >
            <!--数据扩展区-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="支付申请主键">
                            <span>{{ props.row.PAY_APP_ID }}</span>
                        </el-form-item>
                        <el-form-item label="更新日期">
                            <span>{{ props.row.UPDATE_AT }}</span>
                        </el-form-item>
                        <el-form-item label="逻辑删除">
                            <span>{{ props.row.IS_DELETE }}</span>
                        </el-form-item>
                        <el-form-item label="版本">
                            <span>{{ props.row.VERSION }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    width="50"
                    align="center"
            >
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
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="CREATE_AT"
                    label="申请日期"
                    width="100">
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
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="AMOUNT"
                    label="金额"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="PAYEE_ACCT_NAME"
                    label="收款人全称"
                    width="80px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="PAYEE_ACCT_NUM"
                    label="收款人账号"
                    width="80px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="PAYEE_ACCT_BANK_NAME"
                    label="收款人开户银行"
                    width="80px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="AUDIT_STATUS_CN"
                    label="审核状态"
                    width="80px"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
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
                       :total="$store.state.base_info.users.length"
        >
        </el-pagination>
        <!--添加用户对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addUserDialogVisible"
                width="600px"
                center
                :before-close="handleClose">
            <el-form :model="addUserForm" :rules="rules" ref="addForm" label-width="120px" id="addCustomer" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="user_id">
                    <el-input v-model="addUserForm.user_id"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="user_type">
                    <el-input v-model="addUserForm.user_type"></el-input>
                </el-form-item>
                <el-form-item label="所属财政" prop="mof_code">
                    <el-input v-model="addUserForm.mof_code"></el-input>
                </el-form-item>
                <el-form-item label="所属机构" prop="agency_code">
                    <el-input v-model="addUserForm.agency_code"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="addUserForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="用户账号" prop="user_account">
                    <el-input v-model="addUserForm.user_account"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="user_password">
                    <el-input v-model="addUserForm.user_password"></el-input>
                </el-form-item>
                <el-form-item label="用户身份证" prop="id_card_num">
                    <el-input v-model="addUserForm.id_card_num"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="tel">
                    <el-input v-model="addUserForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="用户状态" prop="status">
                    <el-input v-model="addUserForm.status"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddBtnClick('addForm')">立即添加</el-button>
                    <el-button @click="cancelForm('addForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--修改用户对话框-->
        <el-dialog
                title="客户信息修改"
                :visible.sync="changeDialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="changePayApplyForm" :rules="rules" ref="changeForm" label-width="120px" id="change_user" class="demo-ruleForm">
                <el-form-item label="支付申请ID" prop="PAY_APP_ID">
                    <el-input v-model="changePayApplyForm.PAY_APP_ID"></el-input>
                </el-form-item>
                <el-form-item label="支付申请编号" prop="PAY_APP_NUM">
                    <el-input v-model="changePayApplyForm.PAY_APP_NUM"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="CREATE_AT">
                    <el-input v-model="changePayApplyForm.CREATE_AT"></el-input>
                </el-form-item>
                <el-form-item label="更新时间" prop="UPDATE_AT">
                    <el-input v-model="changePayApplyForm.UPDATE_AT"></el-input>
                </el-form-item>
                <el-form-item label="单位代码" prop="AGENCY_CODE">
                    <el-input v-model="changePayApplyForm.AGENCY_CODE"></el-input>
                </el-form-item>
                <el-form-item label="用途" prop="USE">
                    <el-input v-model="changePayApplyForm.user_acUSEcount"></el-input>
                </el-form-item>
                <el-form-item label="金额" prop="AMOUNT">
                    <el-input v-model="changePayApplyForm.AMOUNT"></el-input>
                </el-form-item>
                <el-form-item label="收款人全称" prop="PAYEE_ACCT_NAME">
                    <el-input v-model="changePayApplyForm.PAYEE_ACCT_NAME"></el-input>
                </el-form-item>
                <el-form-item label="收款人账号" prop="PAYEE_ACCT_NUM">
                    <el-input v-model="changePayApplyForm.PAYEE_ACCT_NUM"></el-input>
                </el-form-item>
                <el-form-item label="收款人开户银行" prop="PAYEE_ACCT_BANK_NAME">
                    <el-input v-model="changePayApplyForm.PAYEE_ACCT_BANK_NAME"></el-input>
                </el-form-item>
                <el-form-item label="审核状态" prop="AUDIT_STATUS">
                    <el-input v-model="changePayApplyForm.AUDIT_STATUS"></el-input>
                </el-form-item>
                <el-form-item label="逻辑删除" prop="IS_DELETE">
                    <el-input v-model="changePayApplyForm.IS_DELETE"></el-input>
                </el-form-item>
                <el-form-item label="版本号" prop="VERSION">
                    <el-input v-model="changePayApplyForm.VERSION"></el-input>
                </el-form-item>
                <el-form-item>
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
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 4, // 每页的数据条数,
                //对话框状态
                addUserDialogVisible:false,
                changeDialogVisible:false,
                //修改的客户姓名，手机号码
                userQuery:{name:'',mobile:''},
                //客户信息
                customers: [],
                //添加的客户
                addUserForm: {
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
                    get("http://localhost:3000/USERS?USER_NAME=" + name)
                        .then(myJson => {
                                this.$store.commit('base_info/SET_USERS',myJson);
                            }
                        ).catch(err => console.log(err));
                }else if (mobile!==''){
                    get("http://localhost:3000/USERS?USER_TEL="+mobile)
                        .then(myJson=>{
                            this.$store.commit('base_info/SET_USERS',myJson);
                        })
                        .catch(err=> console.log(err));
                }else alert("请输入您要查询的名字或手机号码")
            },
            //添加客户
            handleAddBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newUser = {
                            "id": this.$refs[formName].model.user_id,
                            "USER_ID": this.$refs[formName].model.user_id,
                            "USER_TYPE": this.$refs[formName].model.user_type,
                            "MOF_CODE": this.$refs[formName].model.mof_code,
                            "AGENCY_CODE": this.$refs[formName].model.agency_code,
                            "USER_NAME": this.$refs[formName].model.user_name,
                            "USER_ACCOUNT": this.$refs[formName].model.user_account,
                            "USER_PASSWORD": this.$refs[formName].model.user_password,
                            "ID_CARD_NUM": this.$refs[formName].model.id_card_num,
                            "TEL": this.$refs[formName].model.tel,
                            "NOTE": this.$refs[formName].model.note,
                            "STATUS": this.$refs[formName].model.status,
                            "CREATE_TIME": this.$refs[formName].model.create_time,
                            "UPDATE_TIME": this.$refs[formName].model.update_time,
                            "VERSION": this.$refs[formName].model.version
                        };
                        if (newUser) {
                            this.$store.dispatch('base_info/addUser',{newUser});
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.addUserDialogVisible = false
            },
            //修改客户信息
            handleChangeBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newPayApply={
                            id: this.$refs[formName].model.PAY_APP_ID,
                            PAY_APP_ID: this.$refs[formName].model.PAY_APP_ID,
                            PAY_APP_NUM: this.$refs[formName].model.PAY_APP_NUM,
                            CREATE_AT: this.$refs[formName].model.CREATE_AT,
                            UPDATE_AT: this.$refs[formName].model.UPDATE_AT,
                            AGENCY_CODE: this.$refs[formName].model.AGENCY_CODE,
                            USE: this.$refs[formName].model.USE,
                            AMOUNT: this.$refs[formName].model.AMOUNT,
                            PAYEE_ACCT_NAME: this.$refs[formName].model.PAYEE_ACCT_NAME,
                            PAYEE_ACCT_NUM: this.$refs[formName].model.PAYEE_ACCT_NUM,
                            PAYEE_ACCT_BANK_NAME: this.$refs[formName].model.PAYEE_ACCT_BANK_NAME,
                            AUDIT_STATUS: this.$refs[formName].model.AUDIT_STATUS,
                            IS_DELETE: this.$refs[formName].model.IS_DELETE,
                            VERSION: this.$refs[formName].model.VERSION
                        };
                        if (newPayApply){
                            this.$store.dispatch('base_info/changeUser',{newPayApply})
                        }
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
            /*删除用户信息*/
            handleDeleteBtnClick(){
                const {multipleSelection}=this;
                this.$store.dispatch('base_info/deleteUser',{multipleSelection});
            },
            //打开修改客户对话框
            handleChangeRow(scope) {
                /*const index=scope.$index;*/
                const data=scope.row;
                /*注入修改信息*/
                this.changePayApplyForm=data;
                this.changePayApplyForm.id=data.PAY_APP_ID;
                this.changeDialogVisible=true;
                //rows.splice(index, 1);
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
                this.addUserDialogVisible=false;
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
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
