<template>

<div class="welcomeStyle" style="width: 1200px;height: 520px;">
  <el-container direction="vertical">
    <el-container style="margin: auto">
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/users')"><span>用户管理</span></div>
      </el-card>
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>权限管理</span></div>
      </el-card>
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/agency')"><span>单位管理</span></div>
      </el-card>
    </el-container>

    <el-container style="margin: auto">
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/department')"><span>部门管理</span></div>
      </el-card>
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/test.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>公告管理</span></div>
      </el-card>
      <el-card :body-style="{backgroundColor:'blue',padding:'0'}"
               style="height: 150px;width: 250px;position: relative"
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
