<template>
<div style="width: 1280px;height: 560px;padding:-30px -150px -150px -30px;">
  <div class="background">
    <img src="../../assets/imgs/back.png" width="1411" height="836" alt="" />
  </div>
  <div class="front">
    <el-container class="upBox">
      <el-card class="cardBM">
        <el-button class="text" type="text">预算管理</el-button>
      </el-card>
      <el-card class="cardAgency"></el-card>
    </el-container>
    <el-container class="downBox">
      <el-card class="cardUser"></el-card>
      <el-card class="cardPro"></el-card>
    </el-container>
  </div>
</div>
</template>

<script>
export default {
  name: "Welcome",
  data(){
    return{
  }
  }
}
</script>

<style lang="less" scoped>
.background{
  width: 100%;
  height: 100%;
  position: absolute;
}
.front{
  display: flex;
  justify-items: center;
  flex-direction: column;

  z-index: 1;
  position: absolute;
  .upBox{
    .el-button{
      font-size: 60px;
      color: rgba(85, 201, 178, 0.43);
      font-family: 华文彩云;
      margin-left: -180px;
    }
    margin-top: 25px;
    margin-left: 100px;
    .cardBM{
      background-color: rgba(120, 87, 153, 0.37);
      height: 250px;
      width: 500px;
      font-size: large;
    }
    .cardAgency{
      margin-left: 60px;
      background-color: rgba(175, 150, 199, 0.51);
      height: 250px;
      width: 500px;
    }
  }
  .downBox{
    margin-top: 25px;
    margin-left: 100px;
    .cardUser{
      background-color: rgba(146, 231, 184, 0.45);
      height: 250px;
      width: 500px;
    }
    .cardPro{
      margin-left: 60px;
      background-color: rgba(187, 234, 215, 0.4);
      height: 250px;
      width: 500px;
    }
  }
}
</style>
