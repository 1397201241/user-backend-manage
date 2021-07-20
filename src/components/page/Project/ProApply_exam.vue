<template>
  <div class="paeBoxStyle">
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 10px;font-size: 13px">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pro_apply' }">项目申报</el-breadcrumb-item>
      <el-breadcrumb-item >项目审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="pro_apex_card">
      <div class="projectBtBox">
        <el-form :inline="true">
            <el-cascader
                placeholder="选择部门"
                v-model="valueDep"
                :options="depOptions">
            </el-cascader>
          <el-cascader
              placeholder="选择单位"
              v-model="valueAgency"
              :options="agencyOptions">
          </el-cascader>
          <el-button @click="iRefresh"  icon="el-icon-refresh" style="width: 120px;margin-left: 10px">刷新</el-button>
          <el-button  type="primary" icon="el-icon-search" style="width: 120px;margin-left: 5px">查看</el-button>
        </el-form>
      </div>
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
                <span>{{ props.row.proName }}</span>
              </el-form-item>
              <el-form-item label="项目ID">
                <span>{{ props.row.proId }}</span>
              </el-form-item>
              <el-form-item label="项目代码">
                <span>{{ props.row.proCode }}</span>
              </el-form-item>
              <el-form-item label="设立年份">
                <span>{{ props.row.setupYear }}</span>
              </el-form-item>
              <el-form-item label="单位代码">
                <span>{{ props.row.agencyCode }}</span>
              </el-form-item>
              <el-form-item label="项目期限">
                <span>{{ props.row.proTerm }}</span>
              </el-form-item>
              <el-form-item label="项目预算">
                <span>{{ props.row.proTotalAmt }}</span>
              </el-form-item>
              <el-form-item label="部门建议">
                <span>{{ props.row.proDepreview }}</span>
              </el-form-item>
              <el-form-item label="财政部建议">
                <span>{{ props.row.proBgtreview }}</span>
              </el-form-item>
              <el-form-item label="部门建议代码">
                <span>{{ props.row.depAudOpnionCode }}</span>
              </el-form-item>
              <el-form-item label="财政建议代码">
                <span>{{ props.row.mofAudOpinionCode }}</span>
              </el-form-item>
              <el-form-item label="项目类别">
                <span>{{ props.row.proKind }}</span>
              </el-form-item>
              <el-form-item label="项目类别代码">
                <span>{{ props.row.proKindCode }}</span>
              </el-form-item>
              <el-form-item label="项目介绍">
                <span>{{ props.row.proDesc }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateAt }}</span>
              </el-form-item>
              <el-form-item label="结束代码">
                <span>{{ props.row.isTerminated }}</span>
              </el-form-item>
              <el-form-item label="删除代码">
                <span>{{ props.row.isDelete }}</span>
              </el-form-item>
              <el-form-item label="表单创建时间">
                <span>{{ props.row.createAt }}</span>
              </el-form-item>
              <el-form-item label="申报环节">
                <span>{{ props.row.applyLink }}</span>
              </el-form-item>
              <el-form-item label="版本号">
                <span>{{ props.row.version }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="设立年份"
            width="160">
          <template slot-scope="scope">{{ scope.row.setupYear }}</template>
        </el-table-column>
        <el-table-column
            prop="proName"
            label="项目名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="proTotalAmt"
            label="预算"
            width="180">
        </el-table-column>
        <el-table-column
            prop="applyLink"
            label="当前流程"
            width="180">
          <template slot-scope="scope">
            <el-tag effect="dark" :color="scope.row.PRO_APPLY_LINK_COLOR" type="info">{{scope.row.applyLink}}</el-tag>
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
          :page-sizes="[5, 10, 20, 30]"
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
    this.setAgencyAndDepartOptions()
  },
  data(){
    return{
      depOptions:[],
      agencyOptions:[],
      valueDep:'',
      valueAgency:'',
      options: [
        {
          value: '2014',
          label: '2014',},
        {
          value: '2015',
          label: '2015',},
        {
          value: '2016',
          label: '2016',},
        {
          value: '2017',
          label: '2017',},
        {
          value: '2018',
          label: '2018',},
        {
          value: '2019',
          label: '2019',},
      ],
      myTableData:[
      ],
      current:1,
      size:5,
      totalNum:5,
      projectURL:'http://localhost:3000/project',
      agencyURL:'http://localhost:3000/agency',

    }
  },
  mounted() {
    this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
  },
  methods:{
    iRefresh() {
      this.valueAgency = ''
      this.valueDep = ''
    },
    setAgencyAndDepartOptions(){
      get(this.agencyURL).then(myJson=>{
        let agencyData = myJson
        for(let i of agencyData){
          this.agencyOptions.push({label:i.AGENCY_NAME,value:i.AGENCY_ID})
        }
      })

      this.depOptions = [
        {label:"1号部门",value:"10001"},{label:"2号部门",value:"10002"},{label:"3号部门",value:"10003"},
        {label:"4号部门",value:"10004"},{label:"5号部门",value:"10005"},{label:"6号部门",value:"10006"},
      ]
      /*get(this.agencyURL).then(myJson=>{
        let agencyData = myJson
        for(let i of agencyData){
          this.agencyOptions.push({label:agencyData.AGENCY_NAME,value:agencyData.AGENCY_ID})
        }
      })*/
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
    setApplyLink(){
      for(let i of this.myTableData){
        console.log(i.applyLink+"???")
        i.PRO_APPLY_LINK_COLOR = '#53615a'
        switch (Number(i.applyLink)){
          case 2:
            i.applyLink = "部门审核中"
            break
          case 1:
            i.applyLink = "部门未审核"
            break
          case 3:
            i.applyLink = "部门申请中"
            break
          case 4:
            i.applyLink = "财政部在审"
            break
          case 5:
            i.applyLink = "项目公示中"
            break
          case 6:
            i.applyLink = "公示已结束"
            break
          case 0:
            i.applyLink = "新建未提交"
            break
          default:
            i.applyLink = "新建未提交"
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
      get("http://192.168.110.146:8003/project/list/agency?agencyCode=100000").then(myJson=>{
        console.log(myJson.data)
        this.myTableData = myJson.data
        this.totalNum = this.myTableData.length
        this.setApplyLink()
      })
      }}}







</script>

<style lang="less" scoped>
.projectBtBox{
  .el-button{
    height: 40px;
  }
  padding: 5px;
  .el-form{
    display: flex;
    justify-content: left;
    .el-cascader{
      margin-left: 10px;
    }
  }
}
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
