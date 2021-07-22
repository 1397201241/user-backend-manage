<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-card class="projectListCard">
      <div class="projectBtBox">
        <el-form :inline="true">
          <el-button disabled type="primary" size="small" icon="el-icon-plus" @click="show(1)">添加</el-button>
          <el-button :disabled="!isStorageList" type="danger" size="small" icon="el-icon-delete" @click="deleteSome">删除</el-button>
          <el-button size="small" icon="el-icon-share">导出</el-button>
          <el-form-item style="margin-left: 40px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.projectName" placeholder="输入项目名称"></el-input>
          </el-form-item>
          <el-cascader
              disabled
              placeholder="起始年份"
              v-model="value"
              :options="options"
              @change="handleChange">
          </el-cascader>
          <el-button  icon="el-icon-refresh" style="margin-left: 10px" @click="iRefresh">刷新</el-button>
          <el-button :disabled="isStorageList" @click="selectPro" type="primary" icon="el-icon-search" style="margin-left: 5px">查找</el-button>
          <el-button @click="viewStorageList()"  type="primary" icon="el-icon-search" style="margin-left: 5px">{{ viewBtName }}</el-button>
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
                  <span>{{ props.row.depAudOpinionCode }}</span>
                </el-form-item>
                <el-form-item label="财政建议代码">
                  <span>{{ props.row.mofAudOpnionCode }}</span>
                </el-form-item>
                <el-form-item label="项目类别">
                  <span>{{ props.row.proKind }}</span>
                </el-form-item>
                <el-form-item label="项目类别代码">
                  <span>{{ props.row.proKindCode }}</span>
                </el-form-item>
                <el-form-item label="申报环节">
                  <span>{{ props.row.applyLink }}</span>
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
                <el-form-item label="版本号">
                  <span>{{ props.row.version }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
                label="设立年份"
                width="180">
              <template slot-scope="scope">{{ scope.row.setupYear }}</template>
            </el-table-column>
          <el-table-column
                prop="proName"
                label="项目名称"
                width="240">
            </el-table-column>
          <el-table-column
                prop="proTotalAmt"
                label="预算"
                width="120">
            </el-table-column>
          <el-table-column
                prop="proCode"
                label="项目代码"
                width="180">
            </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240">
           <template slot-scope="scope">
             <el-button type="primary"  v-if="!isStorageList" @click="viewProgress(scope.row.proId)">查看进度</el-button>
             <el-button type="primary"  v-if="isStorageList" @click="show(2,scope.row.proId)">编辑项目</el-button>
             <el-button type="danger"  v-if="isStorageList" @click="applyPro(scope.row.proId)">申报项目</el-button>
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
      <ProOpera :addOrUpdateVisible="addOrUpdateVisible" :title="proTitle" @changeShow="showAddOrUpdate" :opIndex="operaIndex" :pro="transferPro"
      @addPro="addProList" @editPro="editProList"
      ref="addOrUpdateRef"> </ProOpera>
    </el-card>
  </div>
</template>

<script>
import {post,get} from "../../../utils/request";
import ProOpera from "../../common/ProOpera";
/*let bigDecimal = require('js-big-decimal')*/
export default {
  name: "Project",
  components:{ProOpera},
  data(){
    return{
      viewBtName:"查看暂存项目列表",
      isStorageList:false,
      proTitle:'',
      operaIndex:0,
      current:1,
      size:5,
      totalNum:7,
      baseURL:"http://localhost:3000",
      projectURL:"http://192.168.110.85:8001/project/",
      addOrUpdateVisible: false,
      formInline:{
        projectName:'',
        projectPart:''
      },
      value: [],
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
      myTableData: [],
      multipleSelection: [],
      transferPro:{},
    }
    },
  created() {
    this.getProjectList()

  },
  methods:{
    getStorageProjectList(){
      let agencyCode = this.$store.state.user_info.info.agencyCode
      get(this.projectURL+"list/unapply/agency?"+"agencyCode="+agencyCode).then(myJson=>{
        console.log("get拿到",myJson.data)
        this.myTableData = myJson.data
        this.totalNum = this.myTableData.length
      })
    },
    applyPro(proId){
      post(this.projectURL+"apply",proId).then(myJson=>{
        console.log(proId,"申请post拿到",myJson)
        this.getStorageProjectList()
      })
    },
    viewStorageList(){
      this.isStorageList = !this.isStorageList
      if(!this.isStorageList){
        this.getProjectList()
        this.viewBtName = '查看暂存项目列表'
      }else{
        this.viewBtName = '查看本部项目列表'
        this.getStorageProjectList()
        console.log("获取暂存列表")
      }
    },
    viewProgress(proId){
      for(let i of this.myTableData){
        if(i.proId === proId){
          console.log("aaa",i)
          this.$router.push(
              {path:'/view_pro_progress',
                query:{name:"data",data:JSON.stringify(i)}})
        }
        }
    },
    iRefresh(){
      this.getProjectList()
      this.value=[]
      this.formInline.projectName=''
    },
    editProList(formData){
      this.transferPro = formData
      /*this.transferPro.proTotalAmt = new bigDecimal(""+this.transferPro.proTotalAmt).value*/
      console.log("我要发送", this.transferPro)
      post(this.projectURL+"update", this.transferPro).then(
          res=>{
            console.log(res)
          }
      )
      /*this.$axios.post(
          "http://192.168.110.146:8003/project/update",
          this.transferPro
      ).then(
          resp => {
            console.log(resp)
          }
      )*/
    },
    selectPro(){

      if(this.formInline.projectName && !this.value[0]){
        /*for(let i of this.myTableData){
          if(i.PRO_NAME.includes(this.formInline.projectName)){
            filterList.push(i)
          }
        }
        this.myTableData = filterList*/
        post(this.projectURL+"search",this.formInline.projectName).then(
            myJson=>{
              console.log(myJson)
              this.myTableData = myJson.data
            }

        )
      } else if(!this.formInline.projectName && !this.value[0]){
        console.log(this.formInline.projectName,this.value,1)
        this.getProjectList()
        console.log("获取列表")
      }
    },
    addProList(formData){
      console.log(this.myTableData[this.myTableData.length-1],formData)
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    show(operaIndex,proId){
      if(operaIndex ===  1) {
        this.operaIndex = 1
        this.proTitle = "添加项目噢！"
      }
      else{
        this.operaIndex = 2
        this.proTitle = "编辑项目呀！"
        for(let i of this.myTableData){
          if(i.proId === proId){
            this.transferPro = i
          }
        }
      }
      this.addOrUpdateVisible = true
    },
    getProjectList(){
      /*let theURL = this.baseURL+this.projectURL
      get(theURL).then(myJson=>{
        this.myTableData = myJson
        this.totalNum = this.myTableData.length
      })*/
      console.log("getProjectList")
      let agencyCode = this.$store.state.user_info.info.agencyCode
      get(this.projectURL+"list/agency?"+"agencyCode="+agencyCode).then(myJson=>{
        console.log("get拿到",myJson.data)
        this.myTableData = myJson.data
        this.totalNum = this.myTableData.length
      })

    },
    handleChange(value){
      console.log(this.value,value)
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
    deleteSome(){
      let toDelete = this.multipleSelection
      let toDeleteProId = []
      for(let i of toDelete){
        toDeleteProId.push(i.proId)
      }
      post(this.projectURL+"batchDelete",toDeleteProId)
      this.getStorageProjectList()
      //post("http://192.168.110.146:8003/project/delete",toDeleteProId[0])
    }

  }
  }
</script>

<style lang="less" scoped>
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
</style>
