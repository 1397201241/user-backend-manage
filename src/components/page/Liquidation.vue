<template>
  <div class="agencyStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-card class="liquidationCardStyle">
      <div class="liquidationBtBox">
        <el-form :inline="true">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="show(1)">添加</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delLiqui">删除</el-button>
          <el-button size="small" icon="el-icon-share">导出</el-button>
          <el-form-item style="margin-left: 40px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.certNum" placeholder="输入清算凭证单号"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 10px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.certNum" placeholder="输入清算银行名"></el-input>
          </el-form-item>
          <el-button type="primary"  icon="el-icon-refresh" style="margin-left: 10px" @click="getLiquiList">刷新</el-button>
          <el-button  type="primary" icon="el-icon-search" style="margin-left: 5px" @click="selectLiqui">查看</el-button>
        </el-form>
      </div>
      <el-card style="margin:0 0 0 5px; height: 410px;">
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
<!--          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="单位名称">
                  <span>{{ props.row.AGENCY_NAME }}</span>
                </el-form-item>
                <el-form-item label="单位ID">
                  <span>{{ props.row.AGENCY_ID }}</span>
                </el-form-item>
                <el-form-item label="单位代码">
                  <span>{{ props.row.AGENCY_CODE }}</span>
                </el-form-item>
                <el-form-item label="单位负责人">
                  <span>{{ props.row.AGENCY_LEADER_PER_NAME }}</span>
                </el-form-item>
                <el-form-item label="统一社会信用代码">
                  <span>{{ props.row.UNIFSOC_CRED_CODE }}</span>
                </el-form-item>
                <el-form-item label="行政级别代码">
                  <span>{{ props.row.AGENCY_ADM_LEVEL_CODE }}</span>
                </el-form-item>
                <el-form-item label="单位地址">
                  <span>{{ props.row.AGENCY_ADD }}</span>
                </el-form-item>
                <el-form-item label="父节点ID">
                  <span>{{ props.row.PARENT_ID }}</span>
                </el-form-item>
                <el-form-item label="单位简称">
                  <span>{{ props.row.AGENCY_ABBREVIATION }}</span>
                </el-form-item>
                <el-form-item label="是否叶结点">
                  <span>{{ props.row.IS_LEAF }}</span>
                </el-form-item>
                <el-form-item label="启用日期">
                  <span>{{ props.row.START_AT }}</span>
                </el-form-item>
                <el-form-item label="停用日期">
                  <span>{{ props.row.END_AT }}</span>
                </el-form-item>
                <el-form-item label="启用码">
                  <span>{{ props.row.IS_ENABLED }}</span>
                </el-form-item>
                <el-form-item label="删除码">
                  <span>{{ props.row.IS_DELETE }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.CREATE_TIME }}</span>
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
              </el-form>
            </template>
          </el-table-column>-->
          <el-table-column
              label="操作者ID"
              width="220">
            <template slot-scope="scope">{{ scope.row.OPERATOR_ID }}</template>
          </el-table-column>
          <el-table-column
              prop="LIQU_CERT_NUM"
              label="清算凭证单号"
              width="220">
          </el-table-column>
          <el-table-column
              prop="CLEAR_BANK"
              label="清算银行"
              width="250">
          </el-table-column>
          <el-table-column
              prop="AMOUNT"
              label="金额"
              width="180">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="200">
            <template slot-scope="scope"><!---->
              <el-button type="primary" @click="show(2,scope.row.AGENCY_ID)">编辑项目</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination
          style="padding-top: 15px;margin-left: 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="current"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="size"
          layout="total,sizes,prev,pager,next,jumper"
          :total="totalNum">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {get} from "../../utils/request";

export default {
  name: "Liquidation",
  data(){
    return{
      formInline:{
        certNum:'',
        clearBank:'',
      },
      myTableData:[],
      multipleSelection:[],
      size:5,
      current:1,
      totalNum:5,
      liquidationURL:"http://localhost:3000/liquidation",

    }
  },
  created() {
    this.getLiquiList()
  },
  methods:{
    show(index,id){
      console.log(index,id,"显示弹框环节")
    },
    delLiqui(){
      console.log("删除环节")
    },
    selectLiqui(){},
    getLiquiList(){
      console.log("获取中")
      get(this.liquidationURL).then(myJson=>{
        this.myTableData = myJson
        this.totalNum = this.myTableData.length
      })
    },
    handleSizeChange(val){
      //赋值，然后重新查询
      this.size=val;
      /*this.getUserList()*/
    },
    handleCurrentChange(val){
      console.log(this.current)
      this.current=val;
      /*this.getUserList()*/
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
  },
}
</script>

<style lang="less" scoped>
.liquidationBtBox{
  .el-button{
    height: 40px;
  }
  padding: 5px;
  .el-form{
    display: flex;
    justify-content: left;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
span{
  color: #5908b1;
}
}
</style>
