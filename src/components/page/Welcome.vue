<template>
<div class="welcomeStyle" style="border: 10px skyblue solid;width: 1200px;height: 520px;">
  <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
           style="height: 150px;width: 250px;position: relative"
  >
    <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
    <div class="card-title"><span>用户管理</span></div>
  </el-card>

</div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style lang="less" scoped>
  .welcomeStyle{
    .el-card{
      cursor: pointer;
      opacity: 0.5;
      &:hover{
        opacity: 0.9;
        .card-title{
          border: #fff solid 3px;
        }
      }
      .card-title{
        color: #fff;
        position: absolute;
        width: 120px;
        height: 32px;
        padding: 10px 0;
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

  }


</style>
