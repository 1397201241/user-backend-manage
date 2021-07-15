<template>
  <div class="agencyStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-card class="agencyListCard">
      <div class="liquidationBtBox">
        <el-form :inline="true">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="show(1)">添加</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delBgt_pm">删除</el-button>
          <el-button size="small" icon="el-icon-share">导出</el-button>
          <el-form-item style="margin-left: 40px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.fiscalYear" placeholder="输入预算年度"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 10px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.agencyCode" placeholder="输入单位代码"></el-input>
          </el-form-item>
          <el-button type="primary"  icon="el-icon-refresh" style="margin-left: 10px" @click="getBgtList">刷新</el-button>
          <el-button  type="primary" icon="el-icon-search" style="margin-left: 5px" @click="selectBgt_pm">查看</el-button>
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
            <template slot-scope="scope"><!---->
              <el-button type="primary" @click="show(2,scope.row.BGT_PMAN_ID)">编辑项目</el-button>
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
      <BgtTableOpera :addOrUpdateVisible="addOrUpdateVisible" :title="bgtTitle" @changeShow="showAddOrUpdate" :opIndex="operaIndex" :bgt_pm="transferBgt"
                @addBgt="addBgtList" @editBgt="editBgtList"
                ref="addOrUpdateRef"> </BgtTableOpera>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {get,post,del,put} from "../../utils/request";
const BgtTableOpera = ()=>import("../common/BgtTableOpera")
export default {
  name: "Bgt_pm",
  components:{BgtTableOpera},
  data(){
    return{
      operaIndex:1,
      bgtTitle:'',
      addOrUpdateVisible:false,
      transferBgt:{
      },
      multipleSelection:[],
      formInline:{
        fiscalYear:'',
        agencyCode:''
      },
      totalNum:5,
      current:1,
      size:5,
      myTableData:[],
      bgtURL:"http://localhost:3000/bgt_pm",
    }
  },
  created(){
    this.getBgtList()
  },
  methods:{
    addBgtList(formData){
      let time = new Date()
      this.transferBgt = formData
      this.transferBgt.CREATE_AT = time.toLocaleString()
      this.transferBgt.UPDATE_AT = time.toLocaleString()
      this.transferBgt.id = this.myTableData[this.myTableData.length-1].id+1
      console.log(this.myTableData[this.myTableData.length-1])
      post(this.bgtURL,this.transferBgt)
      this.getBgtList()
    },
    editBgtList(formData){
      console.log("收到id"+formData)
      this.transferBgt = formData
      let time = new Date()
      this.transferBgt.UPDATE_AT = time.toLocaleString()
      let theURL = this.bgtURL+"/"+formData.id
      console.log(this.transferBgt)
      put(theURL,this.transferBgt)
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    show(operaIndex,id){
      console.log(id)
      if(operaIndex ===  1) {
        this.operaIndex = 1
        this.bgtTitle = "添加"
      }
      else{
        this.operaIndex = 2
        this.bgtTitle = "编辑"
        for(let i of this.myTableData){
          console.log(i.BGT_PMAN_ID)
          if(i.BGT_PMAN_ID === id){
            this.transferBgt = i
            break
          }
        }
      }
      this.addOrUpdateVisible = true
    },
    selectBgt_pm(){
      let filterList = [],lastList = []
      if(this.formInline.fiscalYear && !this.formInline.agencyCode) {
        for (let i of this.myTableData) {
          if (i.FISCAL_YEAR.includes(this.formInline.fiscalYear)) {
            console.log(i.FISCAL_YEAR+"包含了"+this.formInline.fiscalYear)
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(!this.formInline.fiscalYear && this.formInline.agencyCode){
        for(let i of this.myTableData){
          if(i.AGENCY_CODE.includes(this.formInline.agencyCode)){
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(this.formInline.fiscalYear && this.formInline.agencyCode){
        for(let i of this.myTableData){
          if (i.FISCAL_YEAR.includes(this.formInline.fiscalYear)) {
            filterList.push(i)
          }
        }
        console.log(filterList)
        for(let i of filterList){
          if(i.AGENCY_CODE.includes(this.formInline.agencyCode)){
            lastList.push(i)
          }
        }
        console.log(lastList)
        this.myTableData = lastList
      }else{
        this.getBgtList()
        console.log("获取列表")
      }
    },
    delBgt_pm(){

      for(let i in this.multipleSelection){
        for(let j in this.myTableData){
          if(this.multipleSelection[i].BGT_PMAN_ID === this.myTableData[j].BGT_PMAN_ID){
            del(this.bgtURL+"/"+this.myTableData[j].id)
            this.getBgtList()
          }
        }
      }
      this.getBgtList()
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
    getBgtList(){
      console.log("获取中")
      get(this.bgtURL).then(myJson=>{
        this.myTableData = myJson
        this.totalNum = this.myTableData.length
      })
      console.log(this.myTableData)
    },

  }
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
