<template>

<div class="welcomeStyle" style="padding:-30px -150px -150px -30px;">
  <el-container  direction="vertical">
    <span style="text-align: left;margin-left: 20px">基础信息管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card9.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/welcome')"><span>欢迎界面</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card10.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>用户列表</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card11.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>角色权限</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card12.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/role_list')"><span>单位管理</span></div>
      </el-card>
    </el-container>
    <span style="text-align: left;margin-left: 20px">预算信息管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card13.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/agency_project_list')"><span>新建预算</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card2.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/draft_budget')"><span>草案查看</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card3.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/budget_apply_list2')"><span>预算审核</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card4.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/bgt_pm')"><span>申报管理</span></div>
      </el-card>
    </el-container>
    <span style="text-align: left;margin-left: 20px">转移支付管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card5.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/add_pay')"><span>新建支付申请</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card6.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/pay_voucher_list')"><span>支付凭证列表</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card7.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/capital_liquidation')"><span>资金清算</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card8.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/liquidation')"><span>清算凭证</span></div>
      </el-card>
    </el-container>
    <span style="text-align: left;margin-left: 20px">项目管理</span>
    <el-container style="margin-left: 0">
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card8.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/pro_apply')"><span>项目导航</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card5.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/pro_apply/add')"><span>新建项目</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card6.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/pro_apply/exam')"><span>项目审核</span></div>
      </el-card>
      <el-card :body-style="{padding:'0'}"
               style="height: 120px;width: 250px;position: relative"
      >
        <img src="./../../assets/imgs/card7.jpg" style="width: 100%"/>
        <div class="card-title" @click="$router.push('/project')"><span>查看项目</span></div>
      </el-card>

    </el-container>
  </el-container>
</div>
</template>

<script>
  /*import {getToken, getUsernameToken} from "../../utils/auth";*/

  export default {
  name: "Welcome",
  data(){
    return{
  }
  },
  methods:{
  },
  created() {

  }

}
</script>

<style lang="less" scoped>

  @import "https://at.alicdn.com/t/font_2666070_zpx1dwunyrc.css?spm=a313x.7781069.1998910419.40&file=font_2666070_zpx1dwunyrc.css";
  .iconfont{
    font-size: 16px;
  }
  .welcomeStyle{
    .el-card{
      margin: 20px 20px;
      cursor: pointer;
      opacity: 0.5;
      color: rgba(255,255,255,1);
      .card-title{
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
