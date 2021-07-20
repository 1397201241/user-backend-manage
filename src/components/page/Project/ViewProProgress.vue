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
          <span>{{ this.showData.proName }}</span>
        </el-form-item>
        <el-form-item label="项目ID">
          <span>{{ this.showData.proId }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目代码">
          <span>{{ this.showData.proCode}}</span>
        </el-form-item>
        <el-form-item label="设立年份">
          <span>{{ this.showData.setupYear }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="单位代码">
          <span>{{ this.showData.agencyCode }}</span>
        </el-form-item>
        <el-form-item label="项目期限">
          <span>{{ this.showData.proTerm }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目预算">
          <span>{{ this.showData.proTotalAmt }}</span>
        </el-form-item>
        <el-form-item label="部门建议">
          <span>{{ this.showData.proDepreview }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="财政部建议">
          <span>{{ this.showData.proBgtreview }}</span>
        </el-form-item>
        <el-form-item label="部门建议代码">
          <span>{{ this.showData.depAudOpnionCode }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="财政建议代码">
          <span>{{ this.showData.mofAudOpinionCode }}</span>
        </el-form-item>
        <el-form-item label="项目类别">
          <span>{{ this.showData.proKind }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="项目介绍">
          <span>{{ this.showData.proDesc }}</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{ this.showData.updateAt}}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="结束代码">
          <span>{{ this.showData.isTerminated }}</span>
        </el-form-item>
        <el-form-item label="删除代码">
          <span>{{ this.showData.isDelete }}</span>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="表单创建时间">
          <span>{{ this.showData.createAt }}</span>
        </el-form-item>
        <el-form-item label="版本号">
          <span>{{ this.showData.version }}</span>
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
      this.active = Number(this.showData.applyLink)
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
