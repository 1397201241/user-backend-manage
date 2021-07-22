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
          :data="myTableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
          stripe
          max-height="600px"
          @selection-change="handleSelectionChange"
          style="max-width: 1100px;min-height: 370px;opacity: 0.8;margin-top: 25px;margin-left: 20px;"
      >
        <!--数据扩展区-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="预算年度">
                <span>{{ props.row.fiscalYear }}</span>
              </el-form-item>
              <el-form-item label="指标文号">
                <span>{{ props.row.indicatorPaperNumber }}</span>
              </el-form-item>
              <el-form-item label="指标文标题">
                <span>{{ props.row.indicatorPaperTitle }}</span>
              </el-form-item>
              <el-form-item label="发文时间">
                <span>{{ props.row.indicatorPagerTime }}</span>
              </el-form-item>
              <el-form-item label="项目代码">
                <span>{{ props.row.projectCode }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.agencyCode }}</span>
              </el-form-item>
              <el-form-item label="指标类型代码">
                <span>{{ props.row.BGT_TYPE_CODE }}</span>
              </el-form-item>
              <el-form-item label="指标金额">
                <span>{{ props.row.indicatorAmount }}</span>
              </el-form-item>
              <el-form-item label="指标说明">
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
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorPaperTitle"
            label="指标文标题"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="indicatorPaperNumber"
            label="指标文号"
            width="240px"
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
                @click.native.prevent="sendTarget(scope.row)"
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
                       :page-sizes="[4,10,15,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="$store.state.budget_index_info.budgetIndex.length"
                       style="margin-top: 495px;position:absolute;z-index: 1;margin-left: 400px;"
        >
        </el-pagination>



    </div>
</template>

<script>
import {get,post} from '../../../utils/request'
const mof = /^\d+0{4}$/
//const dep = /^\d+0{2}$/
const npc = /^\d*0{6}$/
export default {
  name: "TargetDown",
  data(){
    return{
      myTableData:[],
      currentPage:1,
      pageSize:4,
      total:5,
      sendUrl:"http://192.168.110.85:8001/reply",
    }
  },
  created() {
    this.getBudget()
  },
  methods:{
    sendTarget(data){
      ///npc/{indicatorPaperNo
      let no = data.indicatorPaperNumber
      let agencyCode = this.$store.state.user_info.info.agencyCode
      console.log("指标文号是",no,data,agencyCode)
      if(npc.test(agencyCode)){
        console.log("调接口")
        post(this.sendUrl+"/npc/"+no).then(
            res=>{
              console.log(res)
              if(res.code !== 200){

                this.$message({
                  type: 'info',
                  message: "还没轮到你"
                });
              }else{
                this.$message({
                  type: 'info',
                  message: "成功！"
                });
              }
            }
        )
        this.getBudget()
      }
      else if(mof.test(agencyCode)){
        ///financeDept/{indicatorPaperNo}
        post(this.sendUrl+"/financeDept/"+no).then(
            res=>{
              console.log(res)
              if(res.code !== 200){
                this.$message({
                  type: 'info',
                  message: "还没轮到你~"
                });
              }else{
                this.$message({
                  type: 'success',
                  message: "下发成功！"
                });
              }
            }
        )
        this.getBudget()
        console.log("mof")
      }else{
        post(this.sendUrl+"/dept/"+no).then(
            res=>{
              console.log(res)
              if(res.code !== 200){
                this.$message({
                  type: 'info',
                  message: "还没轮到你~"
                });
              }else{
                this.$message({
                  type: 'info',
                  message: "成功！"
                });
              }
            }
        )
        this.getBudget()
        console.log("dep")
      }


    },
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

      let id = this.$store.state.user_info.info.agencyId
      console.log(id)
      get('http://192.168.110.5:8005/info/unfinished/'+id).then(
          res => {
            this.myTableData = res.data
            console.log(res)
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
