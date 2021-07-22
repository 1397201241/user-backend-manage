<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <div style="position:absolute;width: 100%;height: 100%;">
      <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 1;" alt="">
    </div>

    <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 10px;font-size: 13px;position: absolute;z-index: 1;">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/reply_navi' }">指标导航</el-breadcrumb-item>
      <el-breadcrumb-item >下发指标</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin:40px 0 0 30px; height: 525px;width: 1200px;background-color: white;z-index: 1;position:absolute;opacity: 0.9;">
      <span style="width:100%;border-radius:5pt;background-color:rgba(224,221,221,0.6);position: absolute;z-index: 1;font-size: 40px;font-family: 幼圆;margin-left: -580px;
              margin-top: 10px;color:rgba(61,128,179,0.6);">单位待接受指标</span>
      <el-table
          :data="this.myTableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
          stripe
          max-height="600px"
          @selection-change="handleSelectionChange"
          style="max-width: 1100px;min-height: 370px;opacity: 0.85;margin-top: 70px;margin-left: 20px;"
      >
        <!--数据扩展区-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目代码">
                <span>{{ props.row.projectCode }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.agencyCode }}</span>
              </el-form-item>
              <el-form-item label="指标金额">
                <span>{{ props.row.indicatorAmount }}</span>
              </el-form-item>
              <el-form-item label="发文时间">
                <span>{{ props.row.indicatorPaperTime }}</span>
              </el-form-item>
              <el-form-item label="预算年度">
                <span>{{ props.row.fiscalYear }}</span>
              </el-form-item>
              <el-form-item label="指标文号题">
                <span>{{ props.row.indicatorPaperTitle }}</span>
              </el-form-item>
              <el-form-item style="width: 100%;" label="指标说明">
                <span>{{ props.row.indicatorDescribe }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            type="selection"
            width="50"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="fiscalYear"
            label="预算年度"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorPaperTitle"
            label="指标文标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorAmount"
            label="指标金额"
            width="240px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="action"
            label="操作"
            width="260px"
            align="center"
        >
          <template slot-scope="scope">
            <!--            slot-scope="scope"-->
            <!--            @click.native.prevent="handleChangeRow(scope)"-->
            <el-button
                type="primary"
                @click.native.prevent="accept(scope.row.indicatorPaperNumber)"
            >
              <i class="iconfont icon-xiugai"></i>
              确认接受
            </el-button>
            <el-button
                @click.native.prevent="viewTargetDetail(scope.row)"
            >
              <i class="iconfont icon-xiugai"></i>
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination align='center'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[4,10,15,20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   style="margin-top: 520px;position:absolute;z-index: 1;margin-left: 370px;"
    >
    </el-pagination>



  </div>
</template>

<script>
import {get,post} from '../../../utils/request'
export default {
  name: "AcTarget",
  data(){
    return{
      myTableData:[],
      currentPage:1,
      pageSize:4,
      total:5,
      sendUrl:"http://192.168.110.85:8001/info/",
      acUrl:"http://192.168.110.85:8001/reply/"
    }
  },
  created() {
    this.getBudget()
  },
  methods:{
    accept(number){
      post(this.acUrl+"agency/"+number).then(
          res => {
            console.log(res)
          }
      )
      this.getBudget()
    },
    viewTargetDetail(data){
      this.$router.push(
          {path:'/target_detail',
            query:{name:"data",data:JSON.stringify(
                data
              )}})
    },
    /*获取支付申请*/
    getBudget(){
      //this.$store.dispatch('budget_index_info/getBudgetIndex')
      let id = this.$store.state.user_info.info.agencyId
      get(this.sendUrl+"unfinished/" + id).then(
          res => {
            this.myTableData = res.data
            let trans = []
            for(let i of this.myTableData){
              if(i.executable === 3){
                trans.push(i)
              }
            }
            this.myTableData = trans
            console.log(this.myTableData.length)
            this.total = this.myTableData.length
            console.log(this.myTableData,"表格数据")
          }
      )


    },
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

<style lang="less" scoped>
/*font-class方式导入阿里图标*/
@import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
/*通用图标大小*/
.iconfont{
  font-size: 12px;
}

.demo-table-expand {
  font-size: 0;
  .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    span{
      color: #5908b1;
    }
  }
}
</style>
