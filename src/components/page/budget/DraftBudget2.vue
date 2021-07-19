<template>
    <el-container direction="vertical" style="padding:-30px -150px -150px -30px">
        <div>
            <span style="display:block;font-size: 18px;font-weight: bold;margin-bottom: 15px;text-align: left">基本信息</span>
            <el-container>
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
                    <div class="pie-wrap">
                        <Pie></Pie>
                    </div>
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
        <el-container style="margin: 10px auto 0">
            <el-button type="primary" style="height: 40px;">暂存</el-button>
            <el-button type="primary" style="height: 40px">提交</el-button>
        </el-container>
    </el-container>

</template>

<script>
    import Pie from "../../common/Pie";
    export default {
        components: {Pie},
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

            }
        },
        created() {

        },
        mounted(){

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


        },


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
