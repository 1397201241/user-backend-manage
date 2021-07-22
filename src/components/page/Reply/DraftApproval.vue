<template>
  <div class="projectStyle" style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px">
    <div style="position:absolute;width: 100%;height: 100%;">
      <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 1;" alt="">
    </div>
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 10px;font-size: 13px;position: absolute;z-index: 1;">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/reply_navi' }">指标导航</el-breadcrumb-item>
      <el-breadcrumb-item >草案批复</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--数据展示区-->
      <el-card style="margin:30px 0 0 30px; height: 490px;width: 1200px;background-color: white;z-index: 1;position:absolute;opacity: 0.9;">
        <span style="width:100%;border-radius:5pt;background-color:rgba(224,221,221,0.53);position: absolute;z-index: 1;font-size: 40px;font-family: 幼圆;margin-left: -580px;
              margin-top: 10px;color:rgba(61,128,179,0.6);">待审核草案列表</span>
        <el-table
            ref="multipleTable"
            :data="myTableData.slice((current-1)*size,current*size)"
            tooltip-effect="dark"
            max-height="375"
            style="max-width: 1100px;min-height: 370px;opacity: 0.8;margin-top: 80px;margin-left: 20px;"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="预算年度">
                  <span>{{ props.row.fiscalYear }}</span>
                </el-form-item>
                <el-form-item label="单位代码">
                  <span>{{ props.row.agencyCode }}</span>
                </el-form-item>
                <el-form-item label="项目类别码">
                  <span>{{ props.row.proKindCode }}</span>
                </el-form-item>
                <el-form-item label="项目代码">
                  <span>{{ props.row.proCode }}</span>
                </el-form-item>
                <el-form-item label="财政审核数">
                  <span>{{ props.row.finAuditMoney }}</span>
                </el-form-item>
                <el-form-item label="部门代码">
                  <span>{{ props.row.deptCode }}</span>
                </el-form-item>
                <el-form-item label="申报数">
                  <span>{{ props.row.applyUp }}</span>
                </el-form-item>
                <el-form-item label="年初批复数">
                  <span>{{ props.row.replyAmt }}</span>
                </el-form-item>
                <el-form-item label="调整金额">
                  <span>{{ props.row.adjAmt }}</span>
                </el-form-item>
                <el-form-item label="变动后预算数">
                  <span>{{ props.row.curAmt }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.createAt }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ props.row.updateAt }}</span>
                </el-form-item>
                <el-form-item label="版本号">
                  <span>{{ props.row.version }}</span>
                </el-form-item>
                <el-form-item label="是否删除">
                  <span>{{ props.row.isDelete }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              label="项目代码"
              width="200">
            <template slot-scope="scope">{{ scope.row.proCode }}</template>
          </el-table-column>
          <el-table-column
              prop="agencyCode"
              label="单位代码"
              width="200">
          </el-table-column>
          <el-table-column
              prop="fiscalYear"
              label="预算年度"
              width="180">
          </el-table-column>
          <el-table-column
              prop="replyAmt"
              label="年初批复数"
              width="180">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="200">
            <template slot-scope="scope"><!---->
              <el-button
                  type="primary"
                  @click.native.prevent="gentleTarget(scope.row)"
              >
                <i class="iconfont icon-xiugai"></i>
                生成指标
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="current"
                     :page-sizes="[4,10]"
                     :page-size="size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalNum"
                     style="margin-top: 460px;margin-left: 390px;z-index: 1;position:absolute;"
      >
      </el-pagination>
      <el-dialog
          class="daDialog"
          :visible.sync="dialogVisible"
          width="500px"
          ref="genTargetDialog">
        <div class="daDialogTitle">生成指标</div>
        <el-form :model="formData" :rules="rules" ref="genTargetForm">
          <el-container>
            <el-form-item  prop="fiscalYear" label="预算年度" style="width: 50%;">
              <el-select v-model="formData.fiscalYear" style="width: 98%;">
                <el-option v-for="item in fiscalYearOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">

                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="indicatorPaperNumber" label="本级指标文号" style="width: 50%;">
              <el-input v-model="formData.indicatorPaperNumber" style="width: 98%;left: 0;"></el-input>
            </el-form-item>
          </el-container>
          <el-form-item prop="indicatorPaperTitle" label="指标文标题" style="width: 100%;">
            <el-input v-model="formData.indicatorPaperTitle" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
            <el-form-item prop="indicatorAmount" label="指标金额" style="width: 100%;">
              <el-input v-model="formData.indicatorAmount" style="width: 98%;left: 0;"></el-input>
            </el-form-item>

          <el-form-item prop="indicatorDescribe" label="指标说明" style="width:100%;">
            <el-input v-model="formData.indicatorDescribe" type="textarea" style="width: 98%;left: 0;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" style="margin-top: -50px">
          <el-button @click="close('genTargetForm')">取消</el-button>
          <el-button type="primary" @click="handleConfirm('genTargetForm')">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {get,put} from "../../../utils/request";

export default {
  name: "DraftApproval",
  data(){
    return{
      theDraftUrl : "http://192.168.110.85:8001/reply",
      formData:{
        fiscalYear: '',
        indicatorPaperNumber: '',//本级指标文号
        indicatorDescribe:'',
        indicatorAmount:'',
        indicatorPaperTitle:'',
        budgetId:'',
        projectCode:'',
        agencyCode:''
      },
      dialogVisible:false,
      current:1,
      size:4,
      totalNum: 20,
      changeDialogVisible:false,
      //表单校验
      rules: {
        fiscalYear: [
          { required: true, message: '预算年度', trigger: 'blur' },
        ],
        indicatorPaperNumber: [
          { required: true, message: '指标文号', trigger: 'blur' },
        ],
        indicatorDescribe: [
          { required: true, message: '指标描述', trigger: 'blur' },
        ],
        indicatorAmount: [
          { required: true, message: '指标金额', trigger: 'blur' },
        ],
        indicatorPaperTitle: [
          { required: true, message: '指标文标题', trigger: 'blur' },
        ],
      },
      myTableData:[],
      fiscalYearOptions: [
        {value:2010,label:"2010年"},{value:2011,label:"2011年"},{value:2012,label:"2012年"},
        {value:2013,label:"2013年"},{value:2014,label:"2014年"},{value:2015,label:"2015年"},
        {value:2016,label:"2016年"},{value:2017,label:"2017年"},{value:2018,label:"2018年"},
        {value:2019,label:"2019年"},{value:2020,label:"2020年"},{value:2021,label:"2021年"},
      ],
      genTargetInfo:{
        bgtId:'',
        agencyCode:'',
        proCode:''
      }

    }
  },
  created() {
    console.log("created中")
    this.getBgtList()
    },

  methods:{
    gentleTarget(data){
      this.dialogVisible = true
      this.genTargetInfo.bgtId = data.bgtPmanId
      this.genTargetInfo.proCode = data.proCode
      this.genTargetInfo.agencyCode = data.agencyCode



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
    getBgtList(){


      get(this.theDraftUrl+"/budgetmaking/listdraft?"+"deptCode="+"&agencyCode="+"&fiscalYear=").then(
          res=>{
            console.log(res)
            this.myTableData = res.data
            console.log("mytable",this.myTableData)
            this.totalNum = this.myTableData.length
          }
      )

    },
    //关闭对话框提示
    close(formName) {
      /*this.$refs[formName].resetFields();*/
      console.log(formName)
      this.dialogVisible=false;
      let BigDecimal = require('js-big-decimal')
      console.log(new BigDecimal("0.09"))
    },
    handleConfirm(formName) {
      console.log(formName)
      this.$confirm('确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let BigDecimal = require('js-big-decimal')
        this.formData.indicatorAmount = new BigDecimal(""+this.formData.indicatorAmount).value
        console.log(new BigDecimal(""+this.formData.indicatorAmount))
        this.formData.agencyCode = this.genTargetInfo.agencyCode
        this.formData.projectCode = this.genTargetInfo.proCode
        this.formData.budgetId = this.genTargetInfo.bgtId

        //http://192.168.110.5:8005/reply
        put(this.theDraftUrl+"/npc/add",this.formData).then(
            res => {
              console.log(res)
              if(res.code === 200){
                this.$message({
                  type: 'success',
                  message: '提交成功!请前往下发界面！'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '提交失败!请检查网络或服务端接口！'
                });
              }
            }
        )

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消。'
        });
      });

      this.dialogVisible=false;

    },
    handleChangeBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newPayApply=this.$refs[formName].model;
          newPayApply.id=this.$refs[formName].model.BGT_ID;
          this.lastChange=newPayApply;
          this.$store.dispatch('budget_info/changeBudget',{newPayApply})
        } else {
          return false;
        }
      });
      //触发父组件的对话框状态修改事件
      this.changeDialogVisible=false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //选择一页显示多少行
    handleSizeChange(val) {
      this.current = 1;
      this.size = val;
    },
    //跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
    },
  }
}
</script>

<style lang="less" >
/*font-class方式导入阿里图标*/
@import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
/*通用图标大小*/
.iconfont{
  font-size: 12px;
}
.daDialog{
  opacity: 1;
  background-color: rgba(246, 246, 246, 0.52);
}
.daDialog .el-form-item__label{
    font-weight: bolder;
    font-family: 幼圆;
    font-size: 18px;
    color: #000;
}
.daDialogTitle{
  width: 100%;
  background-color: #efefef;
  font-family: 幼圆;
  font-size: 26px;
  font-weight: bolder;
  margin-top: -20px;
  color: black;
}
.daTitle{
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
.draftBtCard{
  background-color: rgba(203, 219, 212, 0.56);
  width: 1100px;
  position: absolute;
  z-index: 1;
}
</style>
