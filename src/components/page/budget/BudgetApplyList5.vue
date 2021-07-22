<template>
    <el-container style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">预算申报列表</span></el-divider>
        <el-card style="width: 100%">
            <el-table
                    ref="multipleTable"
                    :data="myTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    tooltip-effect="dark"
                    max-height="260"
                    style="width: 100%;min-height: 260px"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="项目年度预算ID">
                                <span>{{ props.row.bgtPmanId }}</span>
                            </el-form-item>
                            <el-form-item label="预算年度">
                                <span>{{ props.row.fiscalYear }}</span>
                            </el-form-item>
                            <el-form-item label="单位代码">
                                <span>{{ props.row.agencyCode }}</span>
                            </el-form-item>
                            <el-form-item label="项目类别码">
                                <span>{{ props.row.proKindeCode }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <span>{{ props.row.createAt }}</span>
                            </el-form-item>
                            <el-form-item label="项目代码">
                                <span>{{ props.row.proCode }}</span>
                            </el-form-item>
                            <el-form-item label="申报环节">
                                <span>{{ props.row.applyLink }}</span>
                            </el-form-item>
                            <el-form-item label="财政审核数">
                                <span>{{ props.row.finAuditMoney }}</span>
                            </el-form-item>
                            <el-form-item label="更新时间">
                                <span>{{ props.row.updateAt }}</span>
                            </el-form-item>
                            <el-form-item label="部门代码">
                                <span>{{ props.row.deptCode }}</span>
                            </el-form-item>
                            <el-form-item label="申报数">
                                <span>{{ props.row.applyUp }}</span>
                            </el-form-item>
                            <el-form-item label="年初批复数">
                                <span>{{ props.row.replyAmt }}</span>
                            </el-form-item>
                            <el-form-item label="调整金额">
                                <span>{{ props.row.adjAmt }}</span>
                            </el-form-item>
                            <el-form-item label="变动后预算数">
                                <span>{{ props.row.curAmt }}</span>
                            </el-form-item>
                            <el-form-item label="欢乐锁">
                                <span>{{ props.row.version }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目代码"
                        prop="proCode"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="agencyCode"
                        label="单位代码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="applyUp"
                        label="申报数"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="fiscalYear"
                        label="预算年度"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="applyLink"
                        label="申报环节"
                        width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="checkDetail(scope)">
                            查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页器-->
            <el-pagination align='center'
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[1,2,3,4]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="myTableData.length"
            >
            </el-pagination>
        </el-card>
    </el-container>
</template>

<script>

    export default {
        name: "BudgetApplyList5",
        data(){
            return {
                myTableData:[],
                bgtURL:"http://192.168.110.146:8004/budgetmaking/list/budget",
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 4, // 每页的数据条数,
            }
        },
        created() {
            this.getBgtList()
        },
        methods:{
            /**
             * @description 获取预算草案申报列表（部门）
             */
            getBgtList(){
                let agencyCode=this.$store.state.base_info.info.agencyCode;
                console.log(agencyCode);
                fetch(this.bgtURL+"?agencyCode=010101",{
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
                        this.myTableData = myJson.data
                    }).catch(err=>{
                    console.log(err)
                })
            },
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             * @description 跳转部门草案编制（部门）
             * @param scope
             */
            checkDetail(scope){
                let data=scope.row;
                console.log(data);
                this.$store.dispatch("agency_budget_apply/getBudgetApply",{data}).then(()=>{
                    this.$router.push('/draft_budget')
                })
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

</style>

