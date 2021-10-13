<template>
  <div class="header">
    <div class="logo" @click="$router.push('/')"></div>
    <div class="header-right">
      <a-dropdown placement="bottomCenter" class="dropdown-root" trigger="click">
        <a-button icon="menu">功能板块<a-icon type="down"></a-icon></a-button>
        <a-menu slot="overlay" mode="horizontal">
          <a-menu-item>
            <span @click="$router.push('/users')"> 用户管理</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="$router.push('/roles')"> 角色管理</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="$router.push('/menus')"> 权限管理</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="$router.push('/drumKit')">miniMusic</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="$router.push('/users')"> 用户管理</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="$router.push('/users')"> 用户管理</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-button v-if="loginButtonText === '退出'" icon="user" shape="round" class="avatar" @click="getUserInfo">我的信息</a-button>
      <a-button class="login-button" :icon="loginButtonIcon" shape="round" @click="login">{{ loginButtonText }}</a-button>
    </div>
  </div>
</template>

<script>

import {removeToken} from "../utils/auth";

export default {
  name: "Nav",
  props: {
    loginButtonText: {
      type: String,
      default: ""
    },
    loginButtonIcon: {
      type: String,
      default: ""
    }
  },
  data(){
    return {

    }
  },
  created() {

  },
  methods:{
    // 登录跳转
    login() {
      if (this.loginButtonText === '登录'){
        this.$router.push('/login')
      }else {
        removeToken()
        this.$router.go(0)
      }

    },
    // 登录跳转
    getUserInfo() {
      this.$store.dispatch('userInfo/getUserInfo').then(()=>{
        this.$router.push('/userInfo')
      })
    },
  },
}
</script>

<style scoped lang="less">
.header {
  //width: 928px;
  width: 100%;
  padding: 0 15%;
  height: 64px;
  position: fixed;
  display: flex;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 120px;
    height: 32px;
    text-align: left;
    font-size: 1.5em;
    background: url("../assets/imgs/logo.png");
    background-size: cover;
    cursor: pointer;
    /*设置大了也没关系，弹性布局会自适应*/
    //margin-right: 772px;
    line-height: 32px;
  }
  .header-right{
    display: flex;
    justify-content: space-between;
    .dropdown-root {
      height: 32px;
      line-height: 32px;
      background-color: inherit;
      border: inherit;
      color: #fff;
      transition: background-color 0.3s ease-in-out;
      .anticon-down {
        transition: transform 0.3s ease-in-out;
      }
      &:focus {
        background-color: rgba(203, 208, 208, 0.15);
        //animation: sk-scaleout 1s ease-in-out;
        .anticon-down {
          transform: translateY(-1px) rotate(180deg);
        }
      }
    }
    .avatar{
      border: inherit;
      color: #fff;
      background: rgba(203, 208, 208, 0.15);
      margin-right: 10px
    }
  }
}
.header-highlight {
  //width: 928px;
  width: 100%;
  height: 64px;
  padding: 0 15%;
  position: fixed;
  display: flex;
  background-color: #00acc1;
  border-bottom: 0;
  box-shadow: 0px 3px 6px 3px rgba(0, 0, 0, 0.51);
  border-radius: 5px;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
}
</style>