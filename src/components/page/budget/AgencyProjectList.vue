<template>
    <el-container style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px" direction="vertical">
        <el-divider content-position="left"><span style="color: red;font-size: large">单位项目列表</span></el-divider>
        <el-card style="width: 100%">
            <el-table
                    ref="multipleTable"
                    :data="myTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    tooltip-effect="dark"
                    max-height="375"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="项目ID">
                                <span>{{ props.row.proId }}</span>
                            </el-form-item>
                            <el-form-item label="项目名">
                                <span>{{ props.row.proName }}</span>
                            </el-form-item>
                            <el-form-item label="单位代码">
                                <span>{{ props.row.agencyCode }}</span>
                            </el-form-item>
                            <el-form-item label="项目期限">
                                <span>{{ props.row.proTerm }}</span>
                            </el-form-item>
                            <el-form-item label="设立年份">
                                <span>{{ props.row.setupYear }}</span>
                            </el-form-item>
                            <el-form-item label="申报环节">
                                <span>{{ props.row.applyLink }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <span>{{ props.row.createAt }}</span>
                            </el-form-item>
                            <el-form-item label="更新时间">
                                <span>{{ props.row.updateAt }}</span>
                            </el-form-item>
                            <el-form-item label="是否终止">
                                <span>{{ props.row.isTerminated }}</span>
                            </el-form-item>
                            <el-form-item label="欢乐锁">
                                <span>{{ props.row.version }}</span>
                            </el-form-item>
                            <el-form-item label="是否删除">
                                <span>{{ props.row.isDelete }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="proId"
                        label="项目ID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="proName"
                        label="项目名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="proCode"
                        label="项目代码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="agencyCode"
                        label="单位代码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="applyLink"
                        label="申报环节"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="proTerm"
                        label="项目期限"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="setupYear"
                        label="设立年份"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createAt"
                        label="创建时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="Note(scope)">新建申报</el-button>
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
    /*import {get} from "../../../utils/request";*/

    export default {
        name: "AgencyProjectList",
        data(){
            return {
                myTableData:[],
                bgtURL:"http://192.168.110.85:8001/budgetmaking/projectispublic/010102",
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 4, // 每页的数据条数,
            }
        },
        created() {
            this.getBgtList()
        },
        methods:{
            getBgtList(){
                fetch(this.bgtURL,{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json"
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
            Note(scope){
                const project=scope.row;
                this.$store.dispatch('agency_budget_apply/getBudgetApplyProject',{project});
                this.$router.push('/agency_budget_apply')
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

