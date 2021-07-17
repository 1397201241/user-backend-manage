<template>
    <el-container direction="vertical" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
        <el-card>
            <span style="display:block;font-size: 18px;font-weight: bold;margin-bottom: 15px">某项目预算草案</span>
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
        </el-card>
        <el-container style="margin: 10px auto 0">
            <span>
                <el-button type="primary">暂存</el-button>
                <el-button type="primary">提交</el-button>
            </span>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "DraftBudget",
        data(){
            return {
                data:[
                    {
                        key : "项目代码",
                        value : 9,
                        key2 : "项目名称",
                        value2 : 9,
                    },
                    {
                        key : "财政区划代码",
                        value : 9,
                        key2 : "申报数",
                        value2 : 9
                    },
                    {
                        key : "预算年度",
                        value : 9,
                        key2 : "财政审核数",
                        value2 : 9
                    },
                    {
                        key : "单位代码",
                        value : 9,
                        key2 : "部门代码",
                        value2 : 9
                    },
                    {
                        key : "项目类别代码",
                        value : 9,
                        key2 : "年初批复数",
                        value2 : 9
                    },

                    {
                        key : "项目概述",
                        value : 9,
                        key2 : "预算级次代码",
                        value2 : 9
                    },
                    {

                        key: "调整金额",
                        value : 9,
                        key2 : "项目总额",
                        value2 : 9
                    },
                    {
                        key2 : "项目期限",
                        value2 : 9,
                        key : "设立年度",
                        value : 9,
                    },
                    {
                        key : "部门意见",
                        value : 9,
                        key2 : "财政意见",
                        value2 : 9
                    },

                ]
            }
        }
    }

</script>

<style scoped>

</style>
