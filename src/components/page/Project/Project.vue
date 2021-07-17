<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <el-card class="projectListCard">
      <div class="projectBtBox">
        <el-form :inline="true">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="show(1)">添加</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteSome">删除</el-button>
          <el-button size="small" icon="el-icon-share">导出</el-button>
          <el-form-item style="margin-left: 40px; margin-right: -5px">
            <el-input suffix-icon="el-icon-search" v-model="formInline.projectName" placeholder="输入项目名称"></el-input>
          </el-form-item>
          <el-cascader
              placeholder="起始年份"
              v-model="value"
              :options="options"
              @change="handleChange">
          </el-cascader>
          <el-button type="primary"  icon="el-icon-refresh" style="margin-left: 10px" @click="iRefresh">刷新</el-button>
          <el-button @click="selectPro" type="primary" icon="el-icon-search" style="margin-left: 5px">查看</el-button>
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
                width="180">
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
                prop="PRO_CODE"
                label="项目代码"
                width="180">
            </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240">
           <template slot-scope="scope">
             <el-button type="primary"  @click="viewProgress(scope.row.id)">查看进度</el-button>
             <el-button type="primary"  @click="show(2,scope.row.id)">编辑项目</el-button>
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
import {get,post,del,put} from "../../../utils/request";
import ProOpera from "../../common/ProOpera";
export default {
  name: "Project",
  components:{ProOpera},
  data(){
    return{
      proTitle:'',
      operaIndex:0,
      current:1,
      size:5,
      totalNum:7,
      baseURL:"http://localhost:3000",
      projectURL:"/project",

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
    viewProgress(id){
      for(let i of this.myTableData){
        if(i.id === id){
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
      this.transferPro.UPDATE_AT = new Date().toLocaleString()
      let theURL = this.baseURL+this.projectURL+"/"+this.transferPro.id
      put(theURL,this.transferPro)
    },
    selectPro(){
      let filterList = [],lastList = []
      if(this.value[0] && !this.formInline.projectName) {
        for (let i of this.myTableData) {
          if (i.SETUP_YEAR == this.value[0]) {
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(this.formInline.projectName && !this.value[0]){
        for(let i of this.myTableData){
          if(i.PRO_NAME.includes(this.formInline.projectName)){
            filterList.push(i)
          }
        }
        this.myTableData = filterList
      }
      else if(this.value[0] && this.formInline.projectName){
        console.log(this.value[0])
        for(let i of this.myTableData){
          if (i.SETUP_YEAR == this.value[0]) {
            filterList.push(i)
          }
        }
        console.log(filterList)
        for(let i of filterList){
          if(i.PRO_NAME.includes(this.formInline.projectName)){
            lastList.push(i)
          }
        }
        console.log(lastList)
        this.myTableData = lastList
      }else{
        console.log(this.formInline.projectName,this.value,1)
        this.getProjectList()
        console.log("获取列表")
      }
    },
    addProList(formData){
      console.log(this.myTableData[this.myTableData.length-1])
      this.transferPro = formData
      let time = new Date()
      this.transferPro.UPDATE_AT = time.toLocaleString()
      this.transferPro.CREATE_AT = time.toLocaleString()
      this.transferPro.id = (Number(this.myTableData[this.myTableData.length-1].id)+1).toString()

      let theURL = this.baseURL+this.projectURL
      post(theURL, this.transferPro)
      this.getProjectList()
    },
    showAddOrUpdate(data){
      this.addOrUpdateVisible = data !== 'false';
    },
    show(operaIndex,id){
      if(operaIndex ===  1) {
        this.operaIndex = 1
        this.proTitle = "添加项目噢！"
      }
      else{
        this.operaIndex = 2
        this.proTitle = "编辑项目呀！"
        for(let i of this.myTableData){
          if(i.id === id){
            this.transferPro = i
          }
        }
      }
      this.addOrUpdateVisible = true
    },
    getProjectList(){
      let theURL = this.baseURL+this.projectURL
      get(theURL).then(myJson=>{
        this.myTableData = myJson
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
      let deleteID = ''
      for(let i of toDelete){
        for(let j in this.myTableData){
          if(i === this.myTableData[j]){
            deleteID = this.myTableData[j].id
            del(this.baseURL+this.projectURL+"/"+deleteID)
            this.myTableData.splice(j,1)
          }
        }
      }
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
