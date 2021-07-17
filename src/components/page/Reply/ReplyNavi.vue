<template>
  <div class="agencyStyle" style="width: 1280px;height: 560px;padding:0">
    <div class="rnBackImg" >
      <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 0.5;" alt="">
    </div>
  <div>
    <div class="rnUpCards">
      <el-card style="background-color: rgba(255,255,255,0.49)">
        <div><i class="el-icon-edit"></i>预算草案批复</div>
      </el-card>
      <el-card style="background-color: rgba(204,241,246,0.51)">
        <div><i class="el-icon-edit"></i>预算指标下达</div>
      </el-card>
    </div>
    <div class="rnDownCards">
      <el-card style="background-color: rgba(255,255,255,0.49)">
        <div><i class="el-icon-edit"></i>本部指标查看</div>
      </el-card>
      <el-card style="background-color: rgba(180,236,243,0.51)">
        <div><i class="el-icon-edit"></i>预算指标接受</div>
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
  margin-top: 40px;
  .el-card{
    opacity: 0.8;
    width: 360px;
    height: 200px;
    margin-left: 180px;
    div{
      margin-top: 50px;
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
  margin-top: 320px;
  .el-card{
    opacity: 0.8;
    width: 360px;
    height: 200px;
    margin-left: 180px;
    div{
      margin-top: 50px;
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
