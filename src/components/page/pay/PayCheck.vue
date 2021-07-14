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
                style="min-height: 276px;max-width: 1280px"
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
                        <el-form-item label="操作者ID">
                            <span>{{ props.row.OPERATOR_ID }}</span>
                        </el-form-item>
                        <el-form-item
                                label="逻辑删除"
                        >
                            {{ props.row.IS_DELETE }}
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
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="PAYEE_ACCT_BANK_NAME"
                    label="收款人开户银行"
                    width="90"
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
                    width="200"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="handleAcceptRow(scope)"
                            size="mini"
                            icon="el-icon-check"
                            type="primary"
                            >

                        同意
                    </el-button>
                    <el-popconfirm
                            title="您确定要撤销该条支付申请吗"
                            @confirm="handleRevokeRow(scope)"
                    >
                        <el-button
                                type="warning"
                                slot="reference"
                                size="mini">
                            <i class="iconfont icon-chexiao"></i>
                            撤销
                        </el-button>
                    </el-popconfirm>

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
                revokeDialogVisible:false,
                revokeObject:{},
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
                changeUserForm:{
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
                    user_id: [
                        { required: true, message: '请输入ID', trigger: 'blur' }
                    ],
                    user_type:[
                        { required: true, message: '请输入用户类型', trigger: 'blur' },
                    ],
                    mof_code:[
                        { required: true, message: '请输入用户所属财政', trigger: 'blur' },
                    ],
                    agency_code:[
                        { required: true, message: '请输入用户所属机构', trigger: 'blur' },
                    ],
                    user_name:[
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                    user_account:[
                        { required: true, message: '请输入用户账号', trigger: 'blur' },
                    ],
                    user_password:[
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                    ],
                    id_card_num:[
                        { required: true, message: '请输入用户身份证', trigger: 'blur' },
                    ],
                    tel:[
                        { required: true, message: '请输入用户电话', trigger: 'blur' },
                    ],
                    note: [
                        { required: true, message: '请输入用户备注', trigger: 'blur' },
                    ],
                    status: [
                        { required: true, message: '请输入用户状态', trigger: 'blur' }
                    ],
                    create_time: [
                        { required: true, message: '请输入用户创建时间', trigger: 'blur' }
                    ],
                    update_time: [
                        { required: true, message: '请输入用户更新时间', trigger: 'blur' }
                    ],
                    version: [
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
                        let newUser={
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
                        if (newUser){
                            this.$store.dispatch('base_info/changeUser',{newUser})
                        }
                    } else {
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.revokeDialogVisible=false
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
            /*撤销提示*/
            handleRevokeRow(scope) {

                const data=scope.row;
                /*注入修改信息*/
                data.AUDIT_STATUS=0; //修改审核状态为1
                this.$store.dispatch('pay_apply_info/acceptPayApply',{data})
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
                this.revokeDialogVisible=false
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
    @import "https://at.alicdn.com/t/font_2666070_ehsr33voo59.css?spm=a313x.7781069.1998910419.40&file=font_2666070_ehsr33voo59.css";
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
