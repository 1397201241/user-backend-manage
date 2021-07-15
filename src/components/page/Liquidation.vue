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
            <el-input suffix-icon="el-icon-search" v-model="formInline.clearBank" placeholder="输入清算银行名"></el-input>
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
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="清算凭证ID">
                  <span>{{ props.row.LIQU_CERT_ID }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.CREATE_AT }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ props.row.UPDATE_AT }}</span>
                </el-form-item>
                <el-form-item label="操作者ID">
                  <span>{{ props.row.OPERATOR_ID }}</span>
                </el-form-item>
                <el-form-item label="是否删除">
                  <span>{{ props.row.IS_DELETE }}</span>
                </el-form-item>
                <el-form-item label="清算凭证单号">
                  <span>{{ props.row.LIQU_CERT_NUM }}</span>
                </el-form-item>
                <el-form-item label="总金额">
                  <span>{{ props.row.AMOUNT }}</span>
                </el-form-item>
                <el-form-item label="版本号">
                  <span>{{ props.row.VERSION }}</span>
                </el-form-item>
                <el-form-item label="代理银行">
                  <span>{{ props.row.AGENT_BANK }}</span>
                </el-form-item>
                <el-form-item label="清算银行">
                  <span>{{ props.row.CLEAR_BANK }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
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
              <el-button type="primary" @click="show(2,scope.row.LIQU_CERT_ID)">编辑项目</el-button>
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
      <LiquiOpera :addOrUpdateVisible="addOrUpdateVisible" :title="liquiTitle" @changeShow="showAddOrUpdate"
                  :opIndex="operaIndex" :liquidation="transferLiqui"
                  @addLiqui="addLiquiList" @editLiqui="editLiquiList"
                  ref="addOrUpdateRef"> </LiquiOpera>
    </el-card>
  </div>
</template>

<script>
import {del, get, post, put} from "../../utils/request";
const LiquiOpera = ()=>import('../common/LiquiOpera')

export default {
  name: "Liquidation",
  components:{LiquiOpera},
  data(){
    return{
      addOrUpdateVisible:false,
      liquiTitle:'',
      operaIndex:1,
      transferLiqui:{},
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
    addLiquiList(formData){
      let time = new Date()
      this.transferLiqui = formData
      this.transferLiqui.CREATE_AT = time.toLocaleString()
      this.transferLiqui.UPDATE_AT = time.toLocaleString()
      this.transferLiqui.id = this.myTableData[this.myTableData.length-1].id+1
      console.log(this.myTableData[this.myTableData.length-1])
      post(this.liquidationURL,this.transferLiqui)
      this.getLiquiList()
    },
    editLiquiList(formData){
      console.log("收到id"+formData)
      this.transferPro = formData
      let time = new Date()
      this.transferLiqui.UPDATE_AT = time.toLocaleString()
      let theURL = this.liquidationURL+"/"+formData.id
      console.log(this.transferLiqui)
      put(theURL,this.transferLiqui)
    },
    show(index,id){
      if(index ===  1) {
        this.operaIndex = 1
        this.proTitle = "添加"
        console.log("添加")
      }
      else{
        this.operaIndex = 2
        this.proTitle = "编辑"
        for(let i of this.myTableData){
          console.log(i)
          if(i.LIQU_CERT_ID === id){
            this.transferLiqui = i
            break
          }
        }
      }
      this.addOrUpdateVisible = true
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    delLiqui(){
      console.log("删除环节")
      for(let i in this.multipleSelection){
        for(let j in this.myTableData){
          if(this.multipleSelection[i].LIQU_CERT_ID === this.myTableData[j].LIQU_CERT_ID){
            del(this.liquidationURL+"/"+this.myTableData[j].id)
            break
          }
        }
      }
      this.getLiquiList()
    },
    selectLiqui(){
      let filterList = [],lastList = []
      if(this.formInline.clearBank && !this.formInline.certNum) {
        for (let i of this.myTableData) {
          console.log(i.CLEAR_BANK)
          if (i.CLEAR_BANK.includes(this.formInline.clearBank)) {
            console.log(i.CLEAR_BANK+"包含了"+this.formInline.clearBank)
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(!this.formInline.clearBank && this.formInline.certNum){
        for(let i of this.myTableData){
          if(i.LIQU_CERT_NUM.toString().includes(this.formInline.certNum)){
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(this.formInline.clearBank && this.formInline.certNum){
        for(let i of this.myTableData){
          if (i.CLEAR_BANK.includes(this.formInline.clearBank)) {
            filterList.push(i)
          }
        }
        for(let i of filterList){
          if(i.LIQU_CERT_NUM.toString().includes(this.formInline.certNum)){
            lastList.push(i)
          }
        }
        console.log(lastList)
        this.myTableData = lastList
      }else{
        console.log(this.formInline.projectName,this.value,1)
        this.getLiquiList()
        console.log("获取列表")
      }
    },
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
