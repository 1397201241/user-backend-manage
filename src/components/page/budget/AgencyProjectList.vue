<template>
    <el-container style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">单位项目列表</span></el-divider>
        <el-card style="width: 100%">
            <el-table
                    ref="multipleTable"
                    :data="myTableData.slice((current-1)*size,current*size)"
                    tooltip-effect="dark"
                    max-height="375"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="项目年度预算ID">
                                <span>{{ props.row.BGT_PMAN_ID }}</span>
                            </el-form-item>
                            <el-form-item label="预算年度">
                                <span>{{ props.row.FISCAL_YEAR }}</span>
                            </el-form-item>
                            <el-form-item label="单位代码">
                                <span>{{ props.row.AGENCY_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="项目类别码">
                                <span>{{ props.row.PRO_KIND_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="项目代码">
                                <span>{{ props.row.PRO_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="申报环节">
                                <span>{{ props.row.APPLY_LINK }}</span>
                            </el-form-item>
                            <el-form-item label="财政审核数">
                                <span>{{ props.row.FIN_AUDIT_MONEY }}</span>
                            </el-form-item>
                            <el-form-item label="部门代码">
                                <span>{{ props.row.DEPT_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="申报数">
                                <span>{{ props.row.APPLY_UP }}</span>
                            </el-form-item>
                            <el-form-item label="年初批复数">
                                <span>{{ props.row.REPLY_AMT }}</span>
                            </el-form-item>
                            <el-form-item label="调整金额">
                                <span>{{ props.row.ADJ_AMT }}</span>
                            </el-form-item>
                            <el-form-item label="变动后预算数">
                                <span>{{ props.row.CUR_AMT }}</span>
                            </el-form-item>
                            <el-form-item label="预算级次代码">
                                <span>{{ props.row.BUDGET_LEVEL_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="资金来源代码">
                                <span>{{ props.row.FOUND_TYPE_CIDE }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <span>{{ props.row.CREATE_AT }}</span>
                            </el-form-item>
                            <el-form-item label="更新时间">
                                <span>{{ props.row.UPDATE_AT }}</span>
                            </el-form-item>
                            <el-form-item label="财政区划代码">
                                <span>{{ props.row.MOF_DIV_CODE }}</span>
                            </el-form-item>
                            <el-form-item label="欢乐锁">
                                <span>{{ props.row.VERSION }}</span>
                            </el-form-item>
                            <el-form-item label="是否删除">
                                <span>{{ props.row.IS_DELETE }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目代码"
                        width="240">
                    <template slot-scope="scope">{{ scope.row.PRO_CODE }}</template>
                </el-table-column>
                <el-table-column
                        prop="AGENCY_CODE"
                        label="单位代码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="FISCAL_YEAR"
                        label="预算年度"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="APPLY_LINK"
                        label="申报环节"
                        width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template>
                        <el-button type="primary" size="mini" @click="Note">新建申报</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script>
    import {get} from "../../../utils/request";

    export default {
        name: "AgencyProjectList",
        data(){
            return {
                myTableData:[],
                bgtURL:"http://localhost:3000/bgt_pm?AGENCY_CODE=",
                current:1,
                size:5,
            }
        },
        created() {
            this.getBgtList()
        },
        methods:{
            getBgtList(){
                get(this.bgtURL+'4623').then(myJson=>{
                    this.myTableData = myJson

                })
            },
            Note(){
                this.$router.push('/agency_budget_apply')
            }
        }
    }
</script>

<style scoped>

</style>

