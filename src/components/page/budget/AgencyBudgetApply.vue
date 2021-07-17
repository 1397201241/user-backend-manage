<template>
    <el-container direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
        <el-card style="width: 100%">
            <el-divider content-position="left"><span style="color: red;font-size: large">新建项目预算申报</span></el-divider>
            <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px"
                     style="margin-top: 30px;width: 100%;height: 350px">
                <el-container >
                    <el-form-item label="项目代码" prop="PRO_CODE">
                        <el-select placeholder="请选择" v-model="formData.PRO_CODE">
                            <el-option
                                    v-for="item in projectCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="PRO_NAME">
                        <el-input v-model="formData.PRO_NAME" placeholder="请输入项目名称" clearable disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目预算" prop="APPLY_UP">
                        <el-input v-model="formData.APPLY_UP" placeholder="请输入项目预算" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="预算年度" prop="FISCAL_YEAR">
                        <el-input v-model="formData.FISCAL_YEAR" placeholder="请输入预算年度" clearable>
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-container>

                    <el-form-item label="设立年份" prop="SETUP_YEAR">
                        <el-select v-model="formData.SETUP_YEAR" placeholder="请选择" disabled>
                            <el-option
                                    v-for="item in setupYearOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目ID" prop="PRO_ID" >
                        <el-input v-model="formData.PRO_ID" placeholder="请输入项目ID" clearable disabled>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="单位代码" prop="AGENCY_CODE">
                        <el-select placeholder="请选择" v-model="formData.AGENCY_CODE" disabled>
                            <el-option
                                    v-for="item in agencyCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="版本号" prop="VERSION">
                        <el-input v-model="formData.VERSION" placeholder="请输入版本号" clearable disabled>
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-form-item label="单位建议" prop="PRO_AGENCY_VIEW" style="width: 100%">
                    <el-input  v-model="formData.PRO_AGENCY_VIEW" placeholder="请输入单位建议" clearable>
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
    export default {
        name: "AgencyBudgetApply",
        data(){
            return {
                formData:{
                    AGENCY_CODE:'后台自动获取（还是确认选取）',
                    APPLY_LINK:0,
                    CREATE_AT:"2021-07-12",
                    DEP_AUD_OPNION_CODE:1,
                    IS_DELETE:0,
                    IS_TERMINATED:0,
                    MOF_AUD_OPNION_CODE:1,
                    PRO_AGENCY_VIEW:"这项目很牛逼！（在这一步填写还是下一波）",
                    PRO_BGTREVIEW:"这项目真的是非常牛逼啊！",
                    PRO_CAT_CODE:"04",
                    PRO_CODE:"",
                    PRO_DEPREVIEW:"这项目确实很牛逼！",
                    PRO_DESC:"该项目旨在给人们闲暇之余带来无限欢乐~(选取项目代码后自动填充)",
                    PRO_ID:"13225945965(自动获取)",
                    PRO_KIND:"文娱",
                    PRO_KIND_CODE:"03",
                    PRO_NAME:"水上乐园（自动获取）",
                    FISCAL_YEAR:"",
                    APPLY_UP:"",//预算金额
                    SETUP_YEAR:"2015(自动获取)",
                    UPDATE_AT:"2021/7/14下午2:40:18",
                    VERSION:"1.03.5（后台生成）",
                    id:"1",
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

        },
        mounted() {

        },
        methods: {
            handleAddBtnClick(){
                this.$router.push('/budget_apply_list')
            }

        }
    }
</script>

<style>
    @import "https://at.alicdn.com/t/font_2666070_gud9cyspuwb.css?spm=a313x.7781069.1998910419.40&file=font_2666070_gud9cyspuwb.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 24px;
    }
    .my-step .el-step .el-step__head .el-step__icon.is-text{
        border: none;
    }
</style>
