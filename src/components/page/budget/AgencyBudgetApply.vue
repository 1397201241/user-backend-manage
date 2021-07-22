<template>
    <el-container direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
        <el-card style="width: 100%">
            <el-divider content-position="left"><span style="color: red;font-size: large">新建项目预算申报</span></el-divider>
            <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px"
                     style="margin-top: 30px;width: 100%;height: 350px">
                <el-container >
                    <el-form-item label="项目代码" prop="proCode">
                        <el-input placeholder="请选择" v-model="formData.proCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="proName">
                        <el-input v-model="formData.proName" placeholder="请输入项目名称" clearable disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目ID" prop="proCode">
                        <el-input v-model="formData.proCode" placeholder="请输入项目ID" clearable disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目期限" prop="proTerm">
                        <el-input v-model="formData.proTerm" placeholder="请输入项目期限" clearable disabled>
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="设立年份" prop="setupYear">
                        <el-input v-model="formData.setupYear" placeholder="请选择" disabled>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="单位代码" prop="agencyCode">
                        <el-select placeholder="请选择" v-model="formData.agencyCode" disabled>
                            <el-option
                                    v-for="item in agencyCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申报数" prop="applyUp">
                        <el-input v-model="formData.applyUp" placeholder="请输入申报数" clearable>
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-form-item label="单位建议" prop="proReview" style="width: 100%">
                    <el-input  v-model="formData.proReview" placeholder="请输入单位建议" clearable>
                    </el-input>
                </el-form-item>

                <el-form-item label="项目简介" prop="PRO_DESC" style="width: 100%">
                    <el-input v-model="formData.PRO_DESC" placeholder="请输入项目简介" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">暂存</el-button>
                    <el-button type="primary" @click="handleAddBtnClick">生成报表</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>

</template>

<script>
    import {post} from "../../../utils/request";

    export default {
        name: "AgencyBudgetApply",
        data(){
            return {
                formData:{
                    agencyCode:"010101",
                    proId:"1415591700188930049",
                    proCode:"",
                    proName:"会展中心二期建设",
                    proTerm:3,
                    setupYear:2021,
                    proReview:'',
                    applyUp:''

                },
                //表单校验
                rules: {
                    BGT_ID: [
                        { required: true, message: '请输入ID', trigger: 'blur' }
                    ],
                    APPLY_UP: [
                        { required: true, message: '请输入申请预算', trigger: 'blur' }
                    ],
                    PRO_AGENCY_VIEW: [
                        { required: true, message: '请输入单位建议', trigger: 'blur' }
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
                },
                agencyCodeOptions:[
                    {
                        value: '101',
                        label: '101'
                    }, {
                        value: '102',
                        label: '102'
                    }, {
                        value: '103',
                        label: '102'
                    }
                ],
                projectCodeOptions:[{
                    value: '101',
                    label: '101 建立爱心小学'
                }, {
                    value: '102',
                    label: '102 建立希望小学'
                }, {
                    value: '103',
                    label: '103 建立公益小学'
                }],

            }
        },
        created() {
            this.formData=this.$store.state.agency_budget_apply.budget_apply_project
        },
        mounted() {

        },
        methods: {
            handleAddBtnClick(){
                let ramdomId=Math.floor(Math.random()*10000);
                let apply={
                    "id": ramdomId,
                    "BGT_PMAN_ID": ramdomId,
                    "MOF_DIV_CODE": "350000",
                    "FISCAL_YEAR": "1",
                    "AGENCY_CODE": "010100",
                    "PRO_KIND_CODE": "03",
                    "PRO_CODE": "665424332",
                    "APPLY_UP": 12000,
                    "FIN_AUDIT_MONEY": 0,
                    "DEPT_CODE": "6534",
                    "APPLY_LINK": "0",
                    "REPLY_AMT": 0,
                    "ADJ_AMT": 0,
                    "CUR_AMT": 0,
                    "BUDGET_LEVEL_CODE": "3",
                    "FOUND_TYPE_CIDE": "001345",
                    "UPDATE_AT": "2021/7/15上午10:36:22",
                    "CREATE_AT": "2021/7/14下午2:40:18",
                    "IS_DELETE": 0,
                    "VERSION": "1.0.5"
                };//
                apply.AGENCY_CODE=this.formData.agencyCode;
                apply.PRO_CODE=this.formData.proCode;
                apply.APPLY_UP=this.formData.applyUp;
                post('http://localhost:3000/bgt_pm',apply).then(()=>{
                    this.$router.push('/budget_apply_list')
                }).catch(err=>{
                    console.log(err)
                })


            }
        }
    }
</script>

<style scoped>
    @import "https://at.alicdn.com/t/font_2666070_gud9cyspuwb.css?spm=a313x.7781069.1998910419.40&file=font_2666070_gud9cyspuwb.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 24px;
    }
</style>
