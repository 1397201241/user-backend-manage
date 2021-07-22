<template>
  <div class="projectStyle" style="width: 1220px;height: 530px;padding:-30px -150px -150px -30px">
    <el-steps style="margin-top: 20px;margin-bottom: 50px;" :active="active" align-center>
      <el-step title="人大批复完毕" icon="el-icon-circle-plus"></el-step>
      <el-step title="财政下发完成" icon="el-icon-circle-check"></el-step>
      <el-step title="部门下发完成" icon="el-icon-edit"></el-step>
      <el-step title="等待单位接受" icon="el-icon-circle-plus"></el-step>
    </el-steps>
    <el-divider content-position="left"><span style="color: rgba(45,182,199,0.53);font-size: large">项目预算申报详情</span></el-divider>
    <el-container style="margin: 0 50px">
      <el-container>
        <div class="my-icon"><i class="iconfont icon-xiangmumingcheng iconClass" slot="icon" style="line-height: 40px"></i></div>
        <el-container direction="vertical" class="my-card">
          <span class="my-title">指标标题</span>
          <span class="my-title1">{{ showData.indicatorPaperTitle }}</span>
        </el-container>
      </el-container>
      <el-container>
        <div class="my-icon"><i class="iconfont icon-danweidaima iconClass" slot="icon" style="line-height: 40px"></i></div>
        <el-container direction="vertical" class="my-card">
          <span class="my-title">单位代码</span>
          <span class="my-title1">{{ showData.agencyCode }}</span>
        </el-container>
      </el-container>
      <el-container>
        <div class="my-icon"><i class="iconfont icon-jine iconClass" slot="icon" style="line-height: 40px"></i></div>
        <el-container direction="vertical" class="my-card">
          <span class="my-title">指标金额</span>
          <span class="my-title1">{{ showData.indicatorAmount }}</span>
        </el-container>
      </el-container>
      <el-container>
        <div class="my-icon"><i class="iconfont icon-niandu iconClass" slot="icon" style="line-height: 40px"></i></div>
        <el-container direction="vertical" class="my-card">
          <span class="my-title">预算年度</span>
          <span class="my-title1">{{ showData.fiscalYear }}</span>
        </el-container>
      </el-container>
    </el-container>
    <div style="height: 460px;width: 1250px;margin-top: 60px;">
      <el-form   class="demo-table-expand">
        <el-container>
          <el-form-item label="指标文号">
            <span>{{ showData.indicatorPaperNumber }}</span>
          </el-form-item>
          <el-form-item label="发文日期">
            <span>{{ this.showData.indicatorPagerTime }}</span>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="项目代码">
            <span>{{ this.showData.proCode }}</span>
          </el-form-item>
          <el-form-item label="预算主键">
            <span>{{ this.showData.budgetId }}</span>
          </el-form-item>
        </el-container>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TargetDetail",
  data(){
    return{
      showData:{},
      active:1,
    }
  },
  created() {
    this.getQuery()
    console.log(this.showData)
  },
  methods:{
    getQuery(){
      this.showData =JSON.parse(this.$route.query.data)
      this.active = this.showData.executable
    }
  },
}
</script>

<style lang="less" scoped>
@import "https://at.alicdn.com/t/font_2666070_w01oy5mbpaa.css?spm=a313x.7781069.1998910419.44&file=font_2666070_w01oy5mbpaa.css";
/*通用图标大小*/
.iconfont{
  font-size: 24px;
}
.my-step .el-step .el-step__head .el-step__icon.is-text{
  border: none;
}
.iconClass{
  color: #22ccdd;
}
.my-icon{
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  background: #c6e2ff;
  border-radius: 40%;
}
.my-card{
  padding-left: 20px;
  .my-title{
    font-size: 13px;
    padding-bottom: 5px;
    text-align: left;
  }
  .my-title1{
    text-align: left;
    color: #22ccdd;
  }
}
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
