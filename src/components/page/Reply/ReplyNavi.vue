<template>
  <div class="agencyStyle" style="width: 1280px;height: 560px;padding:0">
    <div class="rnBackImg" >
      <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 0.5;" alt="">
    </div>
  <div>
    <div class="rnUpCards">
      <el-card style="background-color: rgba(255,255,255,0.75)">
        <div><i class="el-icon-edit"></i>预算草案批复</div>
      </el-card>
      <el-card style="background-color: rgba(204,241,246,0.79)">
        <div><i class="el-icon-bottom"></i>预算指标下达</div>
      </el-card>
    </div>
    <div class="rnDownCards">
      <el-card style="background-color: rgba(255,255,255,0.76)">
        <div><i class="el-icon-view"></i>本部指标查看</div>
      </el-card>
      <el-card style="background-color: rgba(180,236,243,0.76)">
        <div><i class="el-icon-setting"></i>未下发指标管理</div>
      </el-card>、
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "ReplyNavi"
}
</script>

<style lang="less" scoped>
.rnUpCards{
  display: flex;
  justify-items: center;
  position: absolute;
  z-index: 1;
  margin-top: 60px;
  .el-card{
    opacity: 0.7;
    width: 360px;
    height: 170px;
    margin-left: 180px;
    div{
      margin-top: 40px;
      font-size: 40px;
      font-family: 幼圆;
    }
  }
}
.rnDownCards{
  display: flex;
  justify-items: center;
  position: absolute;
  z-index: 1;
  margin-top: 340px;
  .el-card{
    opacity: 0.7;
    width: 360px;
    height: 170px;
    margin-left: 180px;
    div{
      margin-top: 40px;
      font-size: 40px;
      font-family: 幼圆;
    }
  }
}
.rnBackImg{
  height: 100%;
  width: 100%;
  z-index: 0;
  position: absolute;
}
</style>
