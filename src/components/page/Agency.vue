<template>
    <div class="agencyStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
      <el-card class="agencyListCard">
        <div class="liquidationBtBox">
          <el-form :inline="true">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加</el-button>
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
            <el-table-column
                label="单位名称"
                prop="agencyName"
                width="280">
            </el-table-column>

            <el-table-column
                prop="agencyCode"
                label="单位代码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="agencyId"
                label="单位ID"
                width="180">
            </el-table-column>

            <el-table-column
                prop="agencyAbbreviation"
                label="单位简称"
                width="180">
            </el-table-column>
            <el-table-column
                    prop="mofDivCode"
                    label="财政区划代码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="agencyLeaderPerName"
                    label="单位负责人"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="agencyAdd"
                    label="单位地址"
                    width="180">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
              <template slot-scope="scope"><!---->
                <el-button type="primary" @click="show(scope.row)">编辑项目</el-button>
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
        <!--添加单位-->
        <el-dialog
                title="添加单位"
                :visible.sync="addDialogVisible"
                width="700px"
                :before-close="handleClose">
          <el-form :model="addAgency" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
            <el-container>
              <el-form-item label="单位ID" prop="agencyId">
                <el-input v-model="addAgency.agencyId" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位地址" prop="agencyAdd">
                <el-input v-model="addAgency.agencyAdd" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-container>
              <el-form-item label="单位负责人" prop="agencyLeaderPerName">
                <el-input v-model="addAgency.agencyLeaderPerName" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位简称" prop="agencyAbbreviation">
                <el-input v-model="addAgency.agencyAbbreviation" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-container>
              <el-form-item label="单位名称" prop="agencyName">
                <el-input v-model="addAgency.agencyName" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位代码" prop="agencyCode">
                <el-input v-model="addAgency.agencyCode" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-form-item align="center">
              <el-button type="primary" @click="handleAddBtnClick('')">立即添加</el-button>
              <el-button @click="cancelForm('addForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--修改单位-->
        <el-dialog
                title="修改单位信息"
                :visible.sync="changeDialogVisible"
                width="700px"
                :before-close="handleClose">
          <el-form :model="changeAgency" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
            <el-container>
              <el-form-item label="单位ID" prop="agencyId">
                <el-input v-model="changeAgency.agencyId" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位地址" prop="agencyAdd">
                <el-input v-model="changeAgency.agencyAdd" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-container>
              <el-form-item label="单位负责人" prop="agencyLeaderPerName">
                <el-input v-model="changeAgency.agencyLeaderPerName" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位简称" prop="agencyAbbreviation">
                <el-input v-model="changeAgency.agencyAbbreviation" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-container>
              <el-form-item label="单位名称" prop="agencyName">
                <el-input v-model="changeAgency.agencyName" clearable></el-input>
              </el-form-item>
              <el-form-item label="单位代码" prop="agencyCode">
                <el-input v-model="changeAgency.agencyCode" clearable></el-input>
              </el-form-item>
            </el-container>
            <el-form-item align="center">
              <el-button type="primary" @click="handleChangeBtnClick('changeForm')">立即修改</el-button>
              <el-button @click="cancelForm('changeForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <AgencyOp :addOrUpdateVisible="addOrUpdateVisible" :title="agenTitle" @changeShow="showAddOrUpdate" :opIndex="operaIndex" :agency="transferAgen"
                  @addAgen="addAgenList" @editAgen="editAgenList"
                  ref="addOrUpdateRef"> </AgencyOp>
      </el-card>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {get,post,del,put} from "../../utils/request";
const AgencyOp = ()=>import('../common/AgencyOp');
export default {
  name: "Agency",
  components:{AgencyOp},
  data(){
    return{
      addAgency:{
        agencyId: '',
        agencyCode: '',
        parentId: '',
        agencyName: "",
        agencyAbbreviation: "",
        mofDivCode: '',
        unifsocCredCode: '',
        agencyAdmLevelCode: '',
        agencyLeaderPerName: '',
        agencyAdd: '',
        isLeaf: '',
        isEnabled: '',
        idCode: ''
      },
      addDialogVisible:false,
      changeDialogVisible:false,
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
      changeAgency:{},//修改的单位
      totalNum:5,
      current:1,
      size:5,
      myTableData:[],
      agencyURL:"http://192.168.110.85:8001/bm-bas-agency-info",
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
      this.transferAgen = formData
      let time = new Date()
      this.transferAgen.UPDATE_AT = time.toLocaleString()
      let theURL = this.agencyURL+"/"+formData.id
      console.log(this.transferAgen)
      put(theURL,this.transferAgen)
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    handleChangeBtnClick(formName){
      let changeForm=this.changeAgency;
      changeForm.mofDivCode=this.$refs[formName].model.mofDivCode
      changeForm.agencyName=this.$refs[formName].model.agencyName
      changeForm.agencyCode=this.$refs[formName].model.agencyCode
      changeForm.agencyId=this.$refs[formName].model.agencyId
      changeForm.agencyLeaderPerName=this.$refs[formName].model.agencyLeaderPerName
      changeForm.agencyAdd=this.$refs[formName].model.agencyAdd
      changeForm.agencyLeaderPerName=this.$refs[formName].model.agencyLeaderPerName
      console.log(changeForm)
      fetch(this.agencyURL+'/update',{
        method:'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(changeForm),
        mode:'cors'
      })
              .then(res=>res.json())
              .then(res=>{
                console.log(res);
                this.changeDialogVisible=false;
              })
              .catch(err=>{
                console.log(err)
              })


    },
    /*添加*/
    handleAddBtnClick(){
      fetch(this.agencyURL+'/add',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(this.addAgency),
        mode:'cors'
      })
              .then(res=>res.json())
              .then(res=>{
                console.log(res);
                this.changeDialogVisible=false;
              })
              .catch(err=>{
                console.log(err)
              })


    },
    show(data){
      console.log(data)
      this.changeAgency=data;
      this.changeDialogVisible = true
    },
    /*查询单位*/
    selectAgency(){
      fetch(this.agencyURL+'/name/'+this.formInline.agencyName,{
        method:'GET',
        mode:'cors'
      })
              .then(res=>res.json())
              .then(res=>{
                let agency=[];
                agency.push(res.data);
                this.myTableData=agency;
                this.totalNum = agency.length
              })
              .catch(err=>{
                console.log(err)
              })
    },
    /*删除单位*/
    delAgency(){
      let delRequest=[];
      for(let i of this.multipleSelection){
        delRequest.push(
                fetch(this.agencyURL+'/delete/'+i.agencyId,{
                  method:'DELETE',
                  headers:{
                    "Content-Type":"application/json"
                  },
                  mode:'cors'
                })
                        .catch(err=>{
                          console.log(err)
                        })
        )
      }
      Promise.allSettled(delRequest).then(res=>{
        console.log(res);
        this.getAgencyList()
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
    },
    getAgencyList(){
      fetch(this.agencyURL+'/list',{
        method:'GET',
        mode:'cors'
      })
              .then(res=>res.json())
              .then(res=>{
                this.myTableData=res.data
                this.totalNum = res.data.length
              })
              .catch(err=>{
                console.log(err)
              })
    },
    //取消按钮
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.changeDialogVisible=false;
      this.addDialogVisible=false;
    },
    //关闭对话框提示
    handleClose(done) {
      this.$confirm('确认关闭？')
              .then(()=> {
                done();
              })
              .catch(()=> {});
    }
      /*let filterList = [],lastList = []
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
      }*/
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
