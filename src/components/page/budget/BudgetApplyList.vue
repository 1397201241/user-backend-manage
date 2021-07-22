<template>
    <el-container style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">项目预算申报列表（单位）</span></el-divider>
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
                            <el-form-item label="创建时间">
                                <span>{{ props.row.CREATE_AT }}</span>
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
                            <el-form-item label="更新时间">
                                <span>{{ props.row.UPDATE_AT }}</span>
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
                            <el-form-item label="欢乐锁">
                                <span>{{ props.row.VERSION }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目代码"
                        prop="PRO_CODE"
                        width="160">
                </el-table-column>

                <el-table-column
                        prop="AGENCY_CODE"
                        label="单位代码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="APPLY_UP"
                        label="申报数"
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
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="apply(scope)">提交申报</el-button>
                        <el-button type="primary" size="mini" @click="$router.push('/budget_apply_details')">
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

    import {post, put} from "../../../utils/request";

    export default {
        name: "BudgetApplyList",
        data(){
            return {
                myTableData:[],
                bgtURL:"http://localhost:3000",
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
             * @description 获取单位未提交的预算申请
             */
            getBgtList(){
                /*let agencyCode=this.$store.state.base_info.info.agencyCode;
                console.log(agencyCode);*/
                fetch(this.bgtURL+"/bgt_pm?APPLY_LINK=0",{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(myJson=>{
                        console.log(myJson)
                        this.myTableData = myJson
                    }).catch(err=>{
                    console.log(err)
                })
            },
            /**
             * @description 提交申报
             * @param scope
             */
            apply(scope){
                let data=scope.row;
                data.APPLY_LINK=1
                console.log(data)
                fetch(this.bgtURL+"/bgt_pm/"+data.id,{
                    method:'PUT',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data),
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(myJson=>{
                        this.getBgtList()
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
