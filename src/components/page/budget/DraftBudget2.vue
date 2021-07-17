<template>
    <el-container direction="vertical" style="width: 1280px;height: 760px;padding:-30px -150px -150px -30px">
        <div style="width: 800px">
            <span style="display:block;font-size: 18px;font-weight: bold;margin-bottom: 15px;text-align: left">基本信息</span>
            <el-container style="width: 800px">
                <el-container style="padding:20px 10px;height: 300px;width: 200px" direction="vertical">
                    <el-container>
                        <div class="my-icon"><i class="iconfont icon-xiangmumingcheng iconClass" slot="icon" style="line-height: 40px"></i></div>
                        <el-container direction="vertical" class="my-card">
                            <span class="my-title">项目数</span>
                            <span class="my-title1">05 个</span>
                        </el-container>
                    </el-container>
                    <el-container>
                        <div class="my-icon"><i class="iconfont icon-danweidaima iconClass" slot="icon" style="line-height: 40px"></i></div>
                        <el-container direction="vertical" class="my-card">
                            <span class="my-title">单位数</span>
                            <span class="my-title1">05 个</span>
                        </el-container>
                    </el-container>
                    <el-container>
                        <div class="my-icon"><i class="iconfont icon-jine iconClass" slot="icon" style="line-height: 40px"></i></div>
                        <el-container direction="vertical" class="my-card">
                            <!--根据项目的调整金额统计-->
                            <span class="my-title">总预算</span>
                            <span class="my-title1">￥10,212</span>
                        </el-container>
                    </el-container>
                </el-container>
                <el-container>
                    <div id="pie" style="width: 450px;height: 300px"></div>
                </el-container>
            </el-container>
            <el-table
                    :show-header='false'
                    :data="data"
                    border
                    style="width: 100%">
                <el-table-column prop="key"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
            </el-table>
        </div>
        <el-container style="margin: 10px 360px 0;width: 100%;height: 100%">
            <el-button type="primary" style="height: 40px">暂存</el-button>
            <el-button type="primary" style="height: 40px">提交</el-button>
        </el-container>
    </el-container>

</template>

<script>
    export default {

        name: "DraftBudget2",
        data(){
            return {
                data:[
                    {
                        key : "部门代码",
                        value : '109',
                        key2 : "部门名称",
                        value2 : "福建省教育局"
                    },
                    {
                        key : "项目数",
                        value : 5,
                        key2 : "单位数",
                        value2 : 5,
                    },
                    {
                        key : "总预算",
                        value : '10,212',
                        key2 : "总预算",
                        value2 : '10,212'
                    },
                ],
                charts: '',
                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                opinionData:[
                    {value: 2048, name: '爱心小学'},
                    {value: 7352, name: '希望小学'},
                    {value: 5802, name: '公益小学'},
                    {value: 4842, name: '公办小学'},
                    {value: 3002, name: '单位小学'}
                ]
            }
        },
        created() {
            this.$nextTick(function() {
                this.drawPie('pie')
            })
        },
        methods:{
            /**
             * @description 获取申报状态为7的项目
             * @param apply_link
             */
            getProject(apply_link){
                console.log(apply_link)
            },
            countAgency(){
                console.log("统计单位数")
            },
            drawPie(id){
                const myDom=document.getElementById(id)
                this.charts = this.$echarts.init(myDom);
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        position:['-80%','13%']
                    },
                    legend: {
                        top: '25%',
                        left: 'right',
                        orient:'vertical'

                    },
                    series: [
                        {
                            name: '项目名称',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.opinionData
                        }
                    ]
                })

            }
        },

        mounted(){

        }
    }

</script>

<style scoped lang="less">
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
