<template>
  <div class="projectStyle" style="width: 1220px;height: 530px;padding:-30px -150px -150px -30px">

    <el-steps style="margin-top: 20px;margin-bottom: 20px;" :active="active" align-center>
      <el-step title="新建完成" icon="el-icon-circle-plus"></el-step>
      <el-step title="提交部门" icon="el-icon-circle-check"></el-step>
      <el-step title="部门在审" icon="el-icon-edit"></el-step>
      <el-step title="部门提交" icon="el-icon-circle-plus"></el-step>
      <el-step title="财政在审" icon="el-icon-edit"></el-step>
      <el-step title="项目公示" icon="el-icon-view"></el-step>
      <el-step title="公示完成" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-card style="height: 460px;width: 1250px">
      <el-form   class="demo-table-expand">
      <el-container>
        <el-form-item label="项目名称">
          <span>{{ this.showData.PRO_NAME }}</span>
        </el-form-item>
        <el-form-item label="项目ID">
          <span>{{ this.showData.PRO_ID }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目代码">
          <span>{{ this.showData.PRO_CODE }}</span>
        </el-form-item>
        <el-form-item label="设立年份">
          <span>{{ this.showData.SETUP_YEAR }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="单位代码">
          <span>{{ this.showData.AGENCY_CODE }}</span>
        </el-form-item>
        <el-form-item label="项目期限">
          <span>{{ this.showData.PRO_TERM }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目类型">
          <span>{{ this.showData.PRO_CAT_CODE }}</span>
        </el-form-item>
        <el-form-item label="项目预算">
          <span>{{ this.showData.PRO_TOTAL_AMT }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="单位建议">
          <span>{{ this.showData.PRO_AGENCY_VIEW }}</span>
        </el-form-item>
        <el-form-item label="部门建议">
          <span>{{ this.showData.PRO_DEPREVIEW }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="财政部建议">
          <span>{{ this.showData.PRO_BGTREVIEW }}</span>
        </el-form-item>
        <el-form-item label="部门建议代码">
          <span>{{ this.showData.DEP_AUD_OPNION_CODE }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="财政建议代码">
          <span>{{ this.showData.MOF_AUD_OPNION_CODE }}</span>
        </el-form-item>
        <el-form-item label="项目类别">
          <span>{{ this.showData.PRO_KIND }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目类别代码">
          <span>{{ this.showData.PRO_KIND_CODE }}</span>
        </el-form-item>
        <el-form-item label="去向单位代码">
          <span>{{ this.showData.APPLY_LINK }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目介绍">
          <span>{{ this.showData.PRO_DESC }}</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{ this.showData.UPDATE_AT }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="结束代码">
          <span>{{ this.showData.IS_END }}</span>
        </el-form-item>
        <el-form-item label="删除代码">
          <span>{{ this.showData.IS_DELETED }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="表单创建时间">
          <span>{{ this.showData.CREATE_AT }}</span>
        </el-form-item>
        <el-form-item label="版本号">
          <span>{{ this.showData.VERSION }}</span>
        </el-form-item>
      </el-container>
    </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ViewProProgress",
  created() {
    this.getParams()
  },
  data(){
    return{
      showData:'',
      active:'',
    }
  },
  methods:{
    getParams(){
      this.showData =JSON.parse(this.$route.query.data)
      this.active = this.showData.APPLY_LINK
      console.log(this.showData)
    }
  }
}
</script>

<style lang="less" scoped>


.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  font-size: small;
span{
  color: #5908b1;
}
}
</style>
