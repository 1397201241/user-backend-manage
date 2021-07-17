<template>
  <div class="paeBoxStyle">
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 10px;font-size: 13px">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pro_apply' }">项目申报</el-breadcrumb-item>
      <el-breadcrumb-item >项目审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="pro_apex_card">
      <el-table
          ref="multipleTable"
          :data="myTableData.slice((current-1)*size,current*size)"

          tooltip-effect="dark"
          max-height="520px"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目名称">
                <span>{{ props.row.PRO_NAME }}</span>
              </el-form-item>
              <el-form-item label="项目ID">
                <span>{{ props.row.PRO_ID }}</span>
              </el-form-item>
              <el-form-item label="项目代码">
                <span>{{ props.row.PRO_CODE }}</span>
              </el-form-item>
              <el-form-item label="设立年份">
                <span>{{ props.row.SETUP_YEAR }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.AGENCY_CODE }}</span>
              </el-form-item>
              <el-form-item label="项目期限">
                <span>{{ props.row.PRO_TERM }}</span>
              </el-form-item>
              <el-form-item label="项目类型">
                <span>{{ props.row.PRO_CAT_CODE }}</span>
              </el-form-item>
              <el-form-item label="项目预算">
                <span>{{ props.row.PRO_TOTAL_AMT }}</span>
              </el-form-item>
              <el-form-item label="单位建议">
                <span>{{ props.row.PRO_AGENCY_VIEW }}</span>
              </el-form-item>
              <el-form-item label="部门建议">
                <span>{{ props.row.PRO_DEPREVIEW }}</span>
              </el-form-item>
              <el-form-item label="财政部建议">
                <span>{{ props.row.PRO_BGTREVIEW }}</span>
              </el-form-item>
              <el-form-item label="部门建议代码">
                <span>{{ props.row.DEP_AUD_OPNION_CODE }}</span>
              </el-form-item>
              <el-form-item label="财政建议代码">
                <span>{{ props.row.MOF_AUD_OPNION_CODE }}</span>
              </el-form-item>
              <el-form-item label="项目类别">
                <span>{{ props.row.PRO_KIND }}</span>
              </el-form-item>
              <el-form-item label="项目类别代码">
                <span>{{ props.row.PRO_KIND_CODE }}</span>
              </el-form-item>
              <el-form-item label="去向单位代码">
                <span>{{ props.row.APPLY_LINK }}</span>
              </el-form-item>
              <el-form-item label="项目介绍">
                <span>{{ props.row.PRO_DESC }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.UPDATE_AT }}</span>
              </el-form-item>
              <el-form-item label="结束代码">
                <span>{{ props.row.IS_END }}</span>
              </el-form-item>
              <el-form-item label="删除代码">
                <span>{{ props.row.IS_DELETED }}</span>
              </el-form-item>
              <el-form-item label="表单创建时间">
                <span>{{ props.row.CREATE_AT }}</span>
              </el-form-item>
              <el-form-item label="申报环节">
                <span>{{ props.row.APPLY_LINK }}</span>
              </el-form-item>
              <el-form-item label="版本号">
                <span>{{ props.row.VERSION }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="设立年份"
            width="160">
          <template slot-scope="scope">{{ scope.row.SETUP_YEAR }}</template>
        </el-table-column>
        <el-table-column
            prop="PRO_NAME"
            label="项目名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="PRO_TOTAL_AMT"
            label="预算"
            width="180">
        </el-table-column>
        <el-table-column
            prop="PRO_APPLY_LINK"
            label="当前流程"
            width="180">
          <template slot-scope="scope">
            <el-tag effect="dark" :color="scope.row.PRO_APPLY_LINK_COLOR" type="info">{{scope.row.PRO_APPLY_LINK}}</el-tag>
          </template>

        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="240">
          <template>
            <el-button type="primary">建议并通过</el-button>
            <el-button type="danger">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="padding-top: 15px;margin-left: 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="current"
          :page-sizes="[6, 10, 20, 30]"
          :page-size="size"
          layout="total,sizes,prev,pager,next,jumper"
          :total="totalNum">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {get} from "../../../utils/request";

export default {
  name: "ProApply_exam",
  created() {
    this.getProjectList()
  },
  data(){
    return{
      myTableData:[

      ],
      current:1,
      size:6,
      totalNum:5,
      projectURL:'http://localhost:3000/project',
    }
  },
  mounted() {
    this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
  },
  methods:{
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
    setApplyLink(){
      for(let i of this.myTableData){
        console.log(i.APPLY_LINK)
        i.PRO_APPLY_LINK_COLOR = '#53615a'
        switch (i.APPLY_LINK){
          case 2:
            i.PRO_APPLY_LINK = "部门审核中"
            console.log(i.PRO_APPLY_LINK)
            break
          case 1:
            i.PRO_APPLY_LINK = "部门未审核"
            break
          case 3:
            i.PRO_APPLY_LINK = "部门申请中"
            break
          case 4:
            i.PRO_APPLY_LINK = "财政部在审"
            break
          case 5:
            i.PRO_APPLY_LINK = "项目公示中"
            break
          case 6:
            i.PRO_APPLY_LINK = "公示已结束"
            break
          case 0:
            i.PRO_APPLY_LINK = "新建未提交"
            break
        }
      }
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
    getProjectList(){
      get(this.projectURL).then(myJson=>{
        this.myTableData = myJson
        console.log("获取数据中，表格数据是",this.myTableData)
        this.totalNum = this.myTableData.length

        this.setApplyLink()
      })
    },
  }
}
</script>

<style lang="less" scoped>
.paeBoxStyle{
  width: 1600px;
  height: 100%;
}
.pro_apex_card{
  opacity: 0.8;
  top:3%;
  left: 5%;
  width: 1100px;
  height: 520px;
  position: relative;
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
