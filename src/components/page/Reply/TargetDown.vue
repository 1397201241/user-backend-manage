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
    <el-card style="margin:40px 0 0 30px; height: 500px;width: 1200px;background-color: white;z-index: 1;position:absolute;opacity: 0.9;">
<!--      <span style="border-radius:5pt;background-color:rgba(224,221,221,0.6);position: absolute;z-index: 1;font-size: 40px;font-family: 幼圆;margin-left: -580px;
              margin-top: 10px;color:rgb(24,62,196);">待下发指标列表</span>-->
      <el-table
          :data="$store.state.budget_index_info.budgetIndex.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
          stripe
          max-height="600px"
          @selection-change="handleSelectionChange"
          style="max-width: 1100px;min-height: 370px;opacity: 0.8;margin-top: 25px;margin-left: 20px;"
      >
        <!--数据扩展区-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目代码">
                <span>{{ props.row.PRO_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标说明">
                <span>{{ props.row.BGT_DEC }}</span>
              </el-form-item>
              <el-form-item label="指标可执行标志">
                <span>{{ props.row.BGT_EXE_FLAG }}</span>
              </el-form-item>
              <el-form-item label="是否追踪">
                <span>{{ props.row.IS_TRACK }}</span>
              </el-form-item>
              <el-form-item label="预算次级代码">
                <span>{{ props.row.BUDGET_LEVEL_CODE }}</span>
              </el-form-item>
              <el-form-item label="上级指标文号">
                <span>{{ props.row.SUP_BGT_DOC_NO }}</span>
              </el-form-item>
              <el-form-item label="需要追踪项目代码">
                <span>{{ props.row.TRACK_PRO_CODE }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.AGENCY_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标类型代码">
                <span>{{ props.row.BGT_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标金额">
                <span>{{ props.row.AMOUNT }}</span>
              </el-form-item>
              <el-form-item label="指标管理处室代码">
                <span>{{ props.row.BGT_MOF_DEP_CODE }}</span>
              </el-form-item>
              <el-form-item label="发文时间">
                <span>{{ props.row.DOC_DATE }}</span>
              </el-form-item>
              <el-form-item label="源指标主键">
                <span>{{ props.row.ORI_BGT_ID }}</span>
              </el-form-item>
              <el-form-item label="资金来源代码">
                <span>{{ props.row.FOUND_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="项目年度预算主键">
                <span>{{ props.row.BGT_PMAN_ID }}</span>
              </el-form-item>
              <el-form-item label="是否删除">
                <span>{{ props.row.IS_DELETED }}</span>
              </el-form-item>
              <el-form-item label="指标来源代码">
                <span>{{ props.row.SOURCE_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="财政区划代码">
                <span>{{ props.row.MOF_DIV_CODE }}</span>
              </el-form-item>
              <el-form-item label="预算年度">
                <span>{{ props.row.FISCAL_YEAR }}</span>
              </el-form-item>
              <el-form-item label="本机指标文号">
                <span>{{ props.row.COR_BGT_DOC_NO }}</span>
              </el-form-item>
              <el-form-item label="指标文号题">
                <span>{{ props.row.BGT_DOC_TITLE }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.CREATE_AT }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.UPDATE_AT }}</span>
              </el-form-item>
              <el-form-item label="版本">
                <span>{{ props.row.VERSION }}</span>
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
            prop="FISCAL_YEAR"
            label="预算年度"
            width="160"
        >
        </el-table-column>
        <el-table-column
            prop="BGT_DOC_TITLE"
            label="指标文标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="DOC_DATE"
            label="发文时间"
            width="180px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="BUDGET_LEVEL_CODE"
            label="预算级次代码"
            width="180px"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="action"
            label="操作"
            width="300px"
            align="center"
        >
          <template slot-scope="scope">
            <!--            slot-scope="scope"-->
            <!--            @click.native.prevent="handleChangeRow(scope)"-->
            <el-button
                type="primary"
                @click.native.prevent="handleChangeRow(scope)"
            >
              <i class="iconfont icon-xiugai"></i>
              下发指标
            </el-button>
            <el-button
                @click.native.prevent="viewDetails(scope.row)"
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
                       :page-sizes="[6,10,15,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="$store.state.budget_index_info.budgetIndex.length"
                       style="margin-top: 495px;position:absolute;z-index: 1;margin-left: 400px;"
        >
        </el-pagination>



    </div>
</template>

<script>
export default {
  name: "TargetDown",
  data(){
    return{
      currentPage:1,
      pageSize:6,
      total:5,
    }
  },
  created() {
    this.getBudget()
  },
  methods:{
    viewDetails(data){
      this.$router.push(
      {path:'/target_detail',
          query:{name:'data',data:JSON.stringify(
          data
      )}})
    },
    /*获取支付申请*/
    getBudget(){
      this.$store.dispatch('budget_index_info/getBudgetIndex')
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
.tdTitle{
  opacity: 1;
  font-size: 40px;
  font-family: 华文彩云;
  color: #181717;
  margin-left: -160px;
  position:absolute;
  z-index: 1;
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
