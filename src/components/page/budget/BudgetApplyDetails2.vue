<template>
    <el-container direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
        <el-card style="width: 100%">
            <el-divider content-position="left"><span style="color: red;font-size: large">项目预算申报详情</span></el-divider>
            <el-container style="margin:0 10px">
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-xiangmumingcheng iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">项目名称</span>
                        <span class="my-title1">水上乐园</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-danweidaima iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">单位代码</span>
                        <span class="my-title1">101 水上乐园</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-jine iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">申报金额</span>
                        <span class="my-title1">￥10,212</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-niandu iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">预算年度</span>
                        <span class="my-title1">02 年</span>
                    </el-container>
                </el-container>
            </el-container>
            <el-form ref="elForm" :model="formData" :rules="validateRules" label-width="80px"
                     style="margin-top: 30px;width: 100%;height: 350px">
                <el-form-item label="项目简介" prop="PRO_DESC" style="width: 100%">
                    <el-input v-model="formData.PRO_DESC" placeholder="请输入项目简介" disabled>
                    </el-input>
                </el-form-item>
                <el-container>
                    <el-form-item label="财政建议" prop="PRO_BGTREVIEW" style="width: 100%">
                        <el-input  v-model="formData.PRO_BGTREVIEW" placeholder="财政建议（暂无" disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="财政预算" prop="FIN_AUDIT_MONEY" style="width: 100%">
                        <el-input  v-model="formData.FIN_AUDIT_MONEY" placeholder="财政预算" disabled>
                        </el-input>
                    </el-form-item>
                </el-container>

                <el-container>
                    <el-form-item label="调整金额" prop="ADJ_AMT" style="width: 100%">
                        <el-input  v-model="formData.ADJ_AMT" placeholder="调整金额" disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最终批复" prop="CUR_AMT" style="width: 100%">
                        <el-input  v-model="formData.CUR_AMT" placeholder="最终批复数（暂无" disabled>
                        </el-input>
                    </el-form-item>
                </el-container>

                <el-container>
                    <el-form-item label="部门建议" prop="PRO_DEPREVIEW" style="width: 100%">
                        <el-input v-model="formData.PRO_DEPREVIEW" placeholder="请填写部门建议">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="预批复数" prop="REPLY_AMT" style="width: 100%">
                        <el-input  v-model="formData.REPLY_AMT" placeholder="请填写预批复数">
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-form-item>
                    <el-button type="primary">暂存</el-button>
                    <el-button type="primary" @click="addSuggest">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>

</template>

<script>

    export default {
        name: "BudgetApplyDetails2",
        data(){
            return {
                formData:{
                    AGENCY_CODE:'后台自动获取（还是确认选取）',
                    APPLY_LINK:1,
                    CREATE_AT:"2021-07-12",
                    DEP_AUD_OPNION_CODE:1,
                    IS_DELETE:0,
                    IS_TERMINATED:0,
                    MOF_AUD_OPNION_CODE:1,
                    PRO_AGENCY_VIEW:"这项目很牛逼！（在这一步填写还是下一波）",
                    PRO_CAT_CODE:"04",
                    PRO_CODE:"101",
                    PRO_DEPREVIEW:"",
                    PRO_BGTREVIEW:"",
                    PRO_DESC:"该项目旨在给人们闲暇之余带来无限欢乐~(选取项目代码后自动填充)",
                    PRO_ID:"13225945965(自动获取)",
                    PRO_KIND:"文娱",
                    PRO_KIND_CODE:"03",
                    PRO_NAME:"水上乐园（自动获取）",
                    FISCAL_YEAR:"01(后台获取)",
                    APPLY_UP:"￥100，121（自动获取）",//申报金额金额
                    SETUP_YEAR:"2015(自动获取)",
                    UPDATE_AT:"2021/7/14下午2:40:18",
                    VERSION:"1.03.5（后台生成）",
                    FIN_AUDIT_MONEY:'',
                    REPLY_AMT:"",
                    CUR_AMT:"",
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
                projectCodeOptions:[
                    {
                        value: '101',
                        label: '101 建立爱心小学'
                    }, {
                        value: '102',
                        label: '102 建立希望小学'
                    }, {
                        value: '103',
                        label: '103 建立公益小学'
                    }
                ],
                validateRules:{
                    PRO_DEPREVIEW:[
                        {
                            require:'true',
                            message: '请输入部门意见',
                            trigger:'blur'
                        }
                    ],
                    REPLY_AMT:[
                        {
                            require:'true',
                            message: '请输入预批复数',
                            trigger:'blur'
                        }
                    ],
                }
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            addSuggest(){
                this.formData.PRO_DEPREVIEW='建议通过！'
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "https://at.alicdn.com/t/font_2666070_w01oy5mbpaa.css?spm=a313x.7781069.1998910419.44&file=font_2666070_w01oy5mbpaa.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 24px;
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
            font-size: 13px;
            padding-bottom: 5px;
            text-align: left;
        }
        .my-title1{
            text-align: left;
            color: #22ccdd;
        }
    }


</style>

