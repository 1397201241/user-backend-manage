<template>
    <div class="agencyStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
      <el-card class="agencyListCard">
        <div class="liquidationBtBox">
          <el-form :inline="true">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="show(1)">添加</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="delAgency">删除</el-button>
            <el-button size="small" icon="el-icon-share">导出</el-button>
            <el-form-item style="margin-left: 40px; margin-right: -5px">
              <el-input suffix-icon="el-icon-search" v-model="formInline.agencyName" placeholder="输入单位名称"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 10px; margin-right: -5px">
              <el-input suffix-icon="el-icon-search" v-model="formInline.agencyChargePerson" placeholder="输入单位负责人"></el-input>
            </el-form-item>
            <el-button type="primary"  icon="el-icon-refresh" style="margin-left: 10px" @click="getAgencyList">刷新</el-button>
            <el-button  type="primary" icon="el-icon-search" style="margin-left: 5px" @click="selectAgency">查看</el-button>
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
            </el-table-column>
            <el-table-column
                label="单位名称"
                width="280">
              <template slot-scope="scope">{{ scope.row.AGENCY_NAME }}</template>
            </el-table-column>
            <el-table-column
                prop="MOF_DIV_CODE"
                label="财政区划代码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="AGENCY_LEADER_PER_NAME"
                label="单位负责人"
                width="180">
            </el-table-column>
            <el-table-column
                prop="UNIFSOC_CRED_CODE"
                label="统一社会信用代码"
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
        <AgencyOp :addOrUpdateVisible="addOrUpdateVisible" :title="agenTitle" @changeShow="showAddOrUpdate" :opIndex="operaIndex" :agency="transferAgen"
                  @addAgen="addAgenList" @editAgen="editAgenList"
                  ref="addOrUpdateRef"> </AgencyOp>
      </el-card>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {get,post,del,put} from "../../utils/request";
const AgencyOp = ()=>import('./AgencyOp')
export default {
  name: "Agency",
  components:{AgencyOp},
  data(){
    return{
      operaIndex:1,
      agenTitle:'',
      addOrUpdateVisible:false,
      transferAgen:{
      },
      multipleSelection:[],
      formInline:{
        agencyName:'',
        agencyChargePerson:''
      },
      totalNum:5,
      current:1,
      size:5,
      myTableData:[],
      agencyURL:"http://localhost:3000/agency",
    }
  },
  created(){
    this.getAgencyList()
  },
  methods:{
    addAgenList(formData){
      let time = new Date()
      this.transferAgen = formData
      this.transferAgen.CREATE_AT = time.toLocaleString()
      this.transferAgen.UPDATE_AT = time.toLocaleString()
      this.transferAgen.id = this.myTableData[this.myTableData.length-1].id+1
      console.log(this.myTableData[this.myTableData.length-1])
      post(this.agencyURL,this.transferAgen)
      this.getAgencyList()
    },
    editAgenList(formData){
      console.log("收到id"+formData)
      this.transferPro = formData
      let time = new Date()
      this.transferAgen.UPDATE_AT = time.toLocaleString()
      let theURL = this.agencyURL+"/"+formData.id
      console.log(this.transferAgen)
      put(theURL,this.transferAgen)
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    show(operaIndex,id){
      console.log(id)
      if(operaIndex ===  1) {
        this.operaIndex = 1
        this.proTitle = "添加单位信息噢！"
      }
      else{
        this.operaIndex = 2
        this.proTitle = "编辑单位信息呀！"
        for(let i of this.myTableData){
          console.log(i.AGENCY_ID)
          if(i.AGENCY_ID === id){
            this.transferAgen = i
            break
          }
        }
      }
      this.addOrUpdateVisible = true
    },
    selectAgency(){
      let filterList = [],lastList = []
      if(this.formInline.agencyName && !this.formInline.agencyChargePerson) {
        for (let i of this.myTableData) {
          console.log(i.AGENCY_NAME)
          if (i.AGENCY_NAME.includes(this.formInline.agencyName)) {
            console.log(i.AGENCY_NAME+"包含了"+this.formInline.agencyName)
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(!this.formInline.agencyName && this.formInline.agencyChargePerson){
        for(let i of this.myTableData){
          if(i.AGENCY_LEADER_PER_NAME.includes(this.formInline.agencyChargePerson)){
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(this.formInline.agencyName && this.formInline.agencyChargePerson){
        for(let i of this.myTableData){
          if (i.AGENCY_LEADER_PER_NAME.includes(this.formInline.agencyChargePerson)) {
            filterList.push(i)
          }
        }
        console.log(filterList)
        for(let i of filterList){
          if(i.AGENCY_NAME.includes(this.formInline.agencyName)){
            lastList.push(i)
          }
        }
        console.log(lastList)
        this.myTableData = lastList
      }else{
        console.log(this.formInline.projectName,this.value,1)
        this.getAgencyList()
        console.log("获取列表")
      }
    },
    delAgency(){
      for(let i in this.multipleSelection){
        for(let j in this.myTableData){
          if(this.multipleSelection[i].AGENCY_ID === this.myTableData[j].AGENCY_ID){
            del(this.agencyURL+"/"+this.myTableData[j].id)
            break
          }
        }
      }
      this.getAgencyList()
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
    getAgencyList(){
      console.log("获取中")
          get(this.agencyURL).then(myJson=>{
            this.myTableData = myJson
            this.totalNum = this.myTableData.length
          })
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
