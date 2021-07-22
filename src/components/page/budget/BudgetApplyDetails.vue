<template>
    <el-container direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
        <el-card style="width: 100%">
            <el-steps align-center class="my-step" :active="1">
                <el-step title="单位提交">
                    <i class="iconfont icon-tijiao" slot="icon"></i>
                </el-step>
                <el-step title="部门审核" icon="iconfont icon-shenhe"></el-step>
                <el-step title="财政审核" icon="iconfont icon-shenhe"></el-step>
                <el-step title="财政下达" icon="iconfont icon-xiada1"></el-step>
                <el-step title="部门下达"  icon="iconfont icon-xiada1"></el-step>
                <el-step title="提交预算草案" icon="iconfont icon-tijiao"></el-step>
                <el-step title="部门审核" icon="iconfont icon-shenhe"></el-step>
                <el-step title="财政审核" icon="iconfont icon-shenhe"></el-step>
            </el-steps>
            <el-divider content-position="left"><span style="color: red;font-size: large">项目预算申报详情</span></el-divider>
            <el-container style="margin:0 10px">
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-xiangmumingcheng iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">项目代码</span>
                        <span class="my-title1">{{formData.proCode}}</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-danweidaima iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">单位代码</span>
                        <span class="my-title1">{{formData.agencyCode}}</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-jine iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">申报金额</span>
                        <span class="my-title1">{{formData.applyUp}}</span>
                    </el-container>
                </el-container>
                <el-container>
                    <div class="my-icon"><i class="iconfont icon-niandu iconClass" slot="icon" style="line-height: 40px"></i></div>
                    <el-container direction="vertical" class="my-card">
                        <span class="my-title">预算年度</span>
                        <span class="my-title1">{{formData.fiscalYear}}</span>
                    </el-container>
                </el-container>
            </el-container>
            <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px"
                     style="margin-top: 30px;width: 100%;height: 350px">
                <el-form-item label="项目简介" prop="PRO_DESC" style="width: 100%">
                    <el-input v-model="formData.PRO_DESC" placeholder=" 大唐丝绸之路风情小镇是咸阳市委、市政府，乾县县委/县政府重点工程，是乾陵大景区重点配套工程，2014年度中国最佳旅游创意策划项目，大关中旅游龙头项目。" disabled>
                    </el-input>
                </el-form-item>
                <el-container>
                    <el-form-item label="部门建议" prop="proReview" style="width: 100%">
                        <el-input  v-model="formData.proReview" placeholder="部门建议（暂无">
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="财政预算" prop="FIN_AUDIT_MONEY" style="width: 100%">
                        <el-input  v-model="formData.FIN_AUDIT_MONEY" placeholder="财政预算">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="预批复数" prop="REPLY_AMT" style="width: 100%">
                        <el-input  v-model="formData.REPLY_AMT" placeholder="预批复数（暂无">
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-container>
                    <el-form-item label="调整金额" prop="ADJ_AMT" style="width: 100%">
                        <el-input  v-model="formData.ADJ_AMT" placeholder="调整金额">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最终批复" prop="CUR_AMT" style="width: 100%">
                        <el-input  v-model="formData.CUR_AMT" placeholder="最终批复数（暂无">
                        </el-input>
                    </el-form-item>
                </el-container>
                <el-form-item>
                    <el-button type="primary">暂存</el-button>
                    <el-button type="primary" @click="suggest">提交部门建议</el-button>
                    <el-button type="primary" @click="changeApplyStatus">模拟</el-button>
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
                baseURL:'http://192.168.110.85:8001/budgetmaking',
                formData:{
                    adjAmt:'',
                    agencyCode:"",
                    applyLink:"",
                    applyUp:'',
                    bgtPmanId:"''",
                    createAt:"",
                    curAmt:'',
                    deptCode:"",
                    finAuditMoney:'',
                    fiscalYear:"",
                    isDelete:'',
                    proCode:"",
                    proKindCode:"'",
                    replyAmt:'',
                    updateAt:"",
                    version:''
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
                titleList:['单位提交','部门审核',],
                items: [
                    { title: '单位提交',iconClass:'iconfont icon-tijiao' },
                    { title: '部门审核',iconClass:'iconfont icon-tijiao' },
                    { title: '单位提交',iconClass:'iconfont icon-tijiao' },

                ]
            }
        },
        created() {
            this.formData=this.$store.state.agency_budget_apply.budget_apply//要给出建议的预算
        },
        mounted() {

        },
        methods: {
            /**
             * @description 部门给出建议
             */
            suggest(){
                let proReview=this.formData.proReview;
                let proCode=this.formData.proCode;
                let bgtPmanId=this.formData.bgtPmanId;
                console.log(proReview,proCode,bgtPmanId);
                fetch(this.baseURL+"/examine?bgtPmanId=1417735272220712962&proCode=0220210720143246&proReview=预算合理111",{
                    method:'GET',
                    headers:{
                        "Accept": 'application/json',
                        "Origin": '*',
                        "Access-Control-Allow-Origin": '*',
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(myJson=>{
                        console.log(myJson.data);
                    }).catch(err=>{
                    console.log(err)
                })
                console.log(proReview)
            },
            changeApplyStatus(){
                this.formData.APPLY_LINK+=1;
                if (this.formData.APPLY_LINK===2){
                    this.formData.PRO_DEPREVIEW='请根据部门建议做些什么'
                }else if (this.formData.APPLY_LINK===3){
                    this.formData.PRO_BGTREVIEW='请听取财政建议'
                }else if (this.formData.APPLY_LINK===4){
                    let bigDecimal = require('js-big-decimal');
                    const money=new  bigDecimal(10121 );
                    this.formData.FIN_AUDIT_MONEY=money.getPrettyValue(3,',')
                }else if (this.formData.APPLY_LINK===5){
                    let bigDecimal = require('js-big-decimal');
                    const money=new  bigDecimal(10121 );
                    this.formData.REPLY_AMT=money.getPrettyValue(3,',')
                }else if (this.formData.APPLY_LINK===6){
                    this.formData.ADJ_AMT="10,121";
                }else if (this.formData.APPLY_LINK===7){
                    alert("部门审核预算草案")
                    this.formData.PRO_DEPREVIEW='同意'
                }else if (this.formData.APPLY_LINK===8){
                    this.formData.CUR_AMT='10,121'
                }
            }
        }
    }
</script>

<style lang="less">
    @import "https://at.alicdn.com/t/font_2666070_w01oy5mbpaa.css?spm=a313x.7781069.1998910419.44&file=font_2666070_w01oy5mbpaa.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 24px;
    }
    .my-step .el-step .el-step__head .el-step__icon.is-text{
        border: none;
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
