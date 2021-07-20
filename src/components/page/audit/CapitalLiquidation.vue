<template>
    <el-container style="padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">划款清算申请</span></el-divider>
        <!--划款清算申请-->
        <el-table
                :show-header='false'
                :data="data"
                border
                style="width: 100%;margin-top: 20px;margin-bottom: 20px">
            <el-table-column prop="key"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
            <el-table-column prop="key3"></el-table-column>
            <el-table-column prop="value3"></el-table-column>
        </el-table>
        <el-divider content-position="left"><span style="color: red;font-size: large">财政支付汇总清算额度通知单</span></el-divider>
        <!--财政支付汇总清算额度通知单-->
        <el-table
                :show-header='false'
                :data="payData"
                border
                style="width: 100%;margin-top: 20px;margin-bottom: 20px">
            <el-table-column prop="key"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
            <el-table-column prop="key3"></el-table-column>
            <el-table-column prop="value3"></el-table-column>
        </el-table>
        <!--划款申请按钮-->
        <div style="margin-top: 40px">
            <el-button type="primary" @click="pay">
                <i class="iconfont icon-yinhangqiazhifuzhangdanfukuanjinqianchucunqia"></i>
                确认支付</el-button>
            <el-button type="primary" @click="send1">
                <i class="iconfont icon-fasong"></i>
                发送代理银行回单</el-button>
            <el-button type="primary" @click="send2">
                <i class="iconfont icon-fasong"></i>
                发送财政部门回单</el-button>
        </div>
    </el-container>
</template>

<script>
    import {get} from "../../../utils/request";

    export default {
        name: "PayVoucher",
        data(){
            return {
                data:[
                    {
                        key : "清算凭证主键",
                        value : 7911,
                        key2 : "操作者主键",
                        value2 : 6669,
                        key3 : "清算凭证号",
                        value3 : 7919,
                    },
                    {
                        key : "创建时间",
                        value : '2021/7/19',
                        key2 : "更新时间",
                        value2 : '2021/7/19',
                        key3 : "版本号",
                        value3 : '0.0.1'
                    },
                    {
                        key : "金额",
                        value : '5,000',
                        key2 : "代理银行",
                        value2 : '中国建设银行',
                        key3 : "清算银行",
                        value3 : '中国招商银行'
                    },
                ],
                payData:[
                    {
                        key : "支付凭证号",
                        value : '6669',
                        key2 : "总金额",
                        value2 : '5,000',
                        key3 : "已付金额",
                        value3 : '5,000',
                    },
                    {
                        key : "收款人全称",
                        value : '吴签',
                        key2 : "收款人账号",
                        value2 : '211124521',
                        key3 : "收款人开户银行",
                        value3 : '中国建设银行',
                    },

                    {
                        key : "创建时间",
                        value : '2021/7/19',
                        key2 : "更新时间",
                        value2 : '2021/7/19',
                        key3 : "版本号",
                        value3 : '0.0.1'
                    }
                ],
                myTableData:[
                    {
                        id:1,
                        PAY_CERT_ID:1,
                        PAY_CERT_NUM:'1171',
                        TOTAL_AMOUNT:1000,
                        PAID_AMOUNT:1000,
                        PAYEE_ACCT_NAME:'王大山',
                        PAYEE_ACCT_NUM:'1515616',
                        PAYEE_ACCT_BANK_NAME:'中国招商银行',
                        PAY_ACCT_NAME:'罗倩',
                        PAY_ACCT_NUM:'1231235',
                        PAY_ACCT_BANK_NAME:'中国招商银行',
                        CREATE_AT:'2021/7/19',
                        UPDATE_AT:'2021/7/19',
                        IS_DELETE:0,
                        VERSION:'0.0.1',
                    },
                    {
                        id:2,
                        PAY_CERT_ID:2,
                        PAY_CERT_NUM:'1171',
                        TOTAL_AMOUNT:1000,
                        PAID_AMOUNT:1000,
                        PAYEE_ACCT_NAME:'王大山',
                        PAYEE_ACCT_NUM:'1515616',
                        PAYEE_ACCT_BANK_NAME:'中国招商银行',
                        PAY_ACCT_NAME:'罗倩',
                        PAY_ACCT_NUM:'1231235',
                        PAY_ACCT_BANK_NAME:'中国招商银行',
                        CREATE_AT:'2021/7/19',
                        UPDATE_AT:'2021/7/19',
                        IS_DELETE:0,
                        VERSION:'0.0.1',
                    },
                    {
                        id:3,
                        PAY_CERT_ID:3,
                        PAY_CERT_NUM:'1171',
                        TOTAL_AMOUNT:1000,
                        PAID_AMOUNT:1000,
                        PAYEE_ACCT_NAME:'王大山',
                        PAYEE_ACCT_NUM:'1515616',
                        PAYEE_ACCT_BANK_NAME:'中国招商银行',
                        PAY_ACCT_NAME:'罗倩',
                        PAY_ACCT_NUM:'1231235',
                        PAY_ACCT_BANK_NAME:'中国招商银行',
                        CREATE_AT:'2021/7/19',
                        UPDATE_AT:'2021/7/19',
                        IS_DELETE:0,
                        VERSION:'0.0.1',
                    },
                    {
                        id:3,
                        PAY_CERT_ID:3,
                        PAY_CERT_NUM:'1171',
                        TOTAL_AMOUNT:1000,
                        PAID_AMOUNT:1000,
                        PAYEE_ACCT_NAME:'王大山',
                        PAYEE_ACCT_NUM:'1515616',
                        PAYEE_ACCT_BANK_NAME:'中国招商银行',
                        PAY_ACCT_NAME:'罗倩',
                        PAY_ACCT_NUM:'1231235',
                        PAY_ACCT_BANK_NAME:'中国招商银行',
                        CREATE_AT:'2021/7/19',
                        UPDATE_AT:'2021/7/19',
                        IS_DELETE:0,
                        VERSION:'0.0.1',
                    },
                    {
                        id:4,
                        PAY_CERT_ID:4,
                        PAY_CERT_NUM:'1171',
                        TOTAL_AMOUNT:1000,
                        PAID_AMOUNT:1000,
                        PAYEE_ACCT_NAME:'王大山',
                        PAYEE_ACCT_NUM:'1515616',
                        PAYEE_ACCT_BANK_NAME:'中国招商银行',
                        PAY_ACCT_NAME:'罗倩',
                        PAY_ACCT_NUM:'1231235',
                        PAY_ACCT_BANK_NAME:'中国招商银行',
                        CREATE_AT:'2021/7/19',
                        UPDATE_AT:'2021/7/19',
                        IS_DELETE:0,
                        VERSION:'0.0.1',
                    }
                ],
                addDialogVisible:false,
                generateDialogVisible:false,
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
                },
                bgtURL:"http://localhost:3000/bgt_pm?AGENCY_CODE=4623",
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 4, // 每页的数据条数,

            }
        },
        created() {

        },
        methods:{
            getBgtList(){
                get(this.bgtURL).then(myJson=>{
                    this.myTableData = myJson
                })
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
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this.addDialogVisible=false;
            },
            //关闭对话框提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done();
                    })
                    .catch(()=> {});
            },

            pay(){
                alert('向代理银行支付')
            },
            send1(){
                alert('发送代理银行《划款清算凭证回单》')
            },
            send2(){
                alert('发送财政部门《财政支付汇总清算额度通知单回单》和《划款清算凭证回单》')
            },
            //选择框
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

<style scoped lang="less">
    @import "https://at.alicdn.com/t/font_2666070_bfedcpyjqf6.css?spm=a313x.7781069.1998910419.46&file=font_2666070_bfedcpyjqf6.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 16px;
    }
    .demo-table-expand {
        font-size: 0;
        .el-form-item{
            margin-right: 0;
            margin-bottom: 0;
            width: 23%;
            span{
                color: #5908b1;
            }
        }
    }
    .iconClass{
        color: #22ccdd;
    }
    .my-icon{
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        background: #c6e2ff;
        border-radius: 40%;
    }
    .my-card{
        padding-left: 20px;
        .my-title{
            font-size: 12px;
            padding-bottom: 5px;
            text-align: left;
        }
        .my-title1{
            font-size: 20px;
            font-weight: bold;
            text-align: left;
            color: #22ccdd;
        }
    }

</style>
