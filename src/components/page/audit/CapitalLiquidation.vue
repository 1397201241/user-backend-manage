<template>
    <el-container style="padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">划款清算信息</span></el-divider>
        <!--清算凭证-->
        <el-table
                ref="multipleTable"
                :data="auditData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                tooltip-effect="dark"
                max-height="240"
                style="min-height: 240px"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="liquCertId"
                    label="清算凭证ID"
                    width="200">
            </el-table-column>
            <!--<el-table-column
                    prop="operatorId"
                    label="操作者ID"
                    width="120">
            </el-table-column>-->
            <el-table-column
                    prop="liquCertNum"
                    label="清算凭证号">
            </el-table-column>
            <el-table-column
                    prop="amout"
                    label="金额">
                <template slot-scope="scope">$ {{ scope.row.amout }}</template>
            </el-table-column>
            <!--<el-table-column
                    prop="agentBank"
                    label="代理银行"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="clearBank"
                    label="清算银行">
            </el-table-column>-->
            <!--<el-table-column
                    label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="send(scope.row)">进行申请</el-button>
                <el-button type="primary" size="mini" @click=viewPayVoucherDetail(scope.row)>查看详情</el-button>
              </template>
            </el-table-column>-->
        </el-table>
        <el-pagination
                style="padding-top: 15px;margin-left: 0;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page.sync="current"
                :page-sizes="[2, 3, 4]"
                :page-size="pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="total">
        </el-pagination>
        <div style="margin-top: 20px">
            <el-button type="primary" @click="pay">
                <i class="iconfont icon-yinhangqiazhifuzhangdanfukuanjinqianchucunqia"></i>
                清算支付</el-button>
            <el-button type="primary" @click="send1" disabled>
                <i class="iconfont icon-fasong"></i>
                发送代理银行回单</el-button>
            <el-button type="primary" @click="send2" disabled>
                <i class="iconfont icon-fasong"></i>
                发送财政部门回单</el-button>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: "PayVoucher",
        data(){
            return {
                auditData:[],
                /*data:[
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
                ],*/
                //表单校验
                /*rules: {
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
                },*/
                bgtURL:"http://192.168.110.182:8004/audit",
                currentPage: 1, // 当前页码
                total: 0, // 总条数
                pageSize: 4, // 每页的数据条数,
            }
        },
        created() {
            this.getAuditVoucherList()
        },
        methods:{
            /**
             * @description 获取清算凭证
             */
            getAuditVoucherList(){
                fetch(this.bgtURL+"/all",{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(myJson=>{
                        this.auditData = myJson.data;
                        this.total=myJson.data.length
                    }).catch(err=>{
                    console.log(err)
                })
            },
            /**
             * @description 确认支付
             */
            pay(){
                fetch(this.bgtURL+"/auditAll",{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(myJson=>{
                        console.log(myJson)
                        this.auditData = [];
                        //this.auditData = myJson.data;
                        //this.total=myJson.data.length
                    }).catch(err=>{
                    console.log(err)
                })
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
