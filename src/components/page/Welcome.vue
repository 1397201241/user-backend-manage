<template>

<div class="welcomeStyle" style="width: 1280px;height: 560px">
  <el-container direction="vertical">
    <span style="text-align: left;margin-left: 20px">基础信息管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/a.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/c.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/b.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
    </el-container>
    <span style="text-align: left;margin-left: 20px">预算信息管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/c.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
    </el-container>
    <span style="text-align: left;margin-left: 20px">转移支付管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/pay')"><span>支付管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>建议反馈</span></div>
      </el-card>
    </el-container>
  </el-container>
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
  .welcomeStyle{
    .el-card{
      margin: 20px 20px;
      cursor: pointer;
      opacity: 0.5;
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
      &:hover{
        opacity: 0.9;
        .card-title{
          border: #fff solid 3px;
        }
      }

    }
  }



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
      color: rgba(6, 12, 52, 0.91);
      font-family: 华文彩云;
      margin-left: -180px;
    }
    margin-top: 25px;
    margin-left: 100px;
    .cardBM{
      background-color: rgba(216, 206, 252, 0.27);
      height: 250px;
      width: 500px;
      font-size: large;
    }
    .cardAgency{
      margin-left: 60px;
      background-color: rgba(211, 208, 238, 0.36);
      height: 250px;
      width: 500px;
    }
  }
  .downBox{
    margin-top: 25px;
    margin-left: 100px;
    .cardUser{
      background-color: rgba(194, 175, 246, 0.32);
      height: 250px;
      width: 500px;
    }
    .cardPro{
      margin-left: 60px;
      background-color: rgba(197, 187, 234, 0.33);
      height: 250px;
      width: 500px;
    }
  }
}

</style>
