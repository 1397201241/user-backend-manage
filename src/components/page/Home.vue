<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <!--      logo及项目名-->
      <div class="headLeft">
        <img src="../../assets/img/sys_logo.png">
        <span>预算管理一体化系统</span>
      </div>

      <!--      用户头像及下拉框-->
      <div class="headRight">
        <span style="color: white;font-size: 30px">Hello,{{this.$store.state.user_info.info.username}}</span>
        <el-dropdown>
          <img src="../../assets/img/head.png">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-ship">关于我们</el-dropdown-item>
            <el-dropdown-item  icon="el-icon-switch-button"  ><span v-on:click="dropOut">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>



    <el-container>
      <el-aside width="200px">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="rgba(95,179,236)"
            :router="true">
          <MenuTree :menuList="this.menuList"></MenuTree>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 内容区 -->
        <div class="app-wrap">
          <!-- 此处放置el-tabs代码 -->
          <el-tabs
              v-model="$store.state.tab_info.activeIndex"
              type="border-card"
              closable
              v-if="$store.state.tab_info.openTab.length"
              @tab-click='tabClick'
              @tab-remove='tabRemove'
          >
            <!-- 获取vuex中的openTab数组数据，循环展示 -->
            <el-tab-pane
                :key="index"
                v-for="(item, index) in $store.state.tab_info.openTab"
                :label="item.name"
                :name="item.route"
            >
              <div class="content-wrap" style="height: 100%;">
                <!-- 展示路由内容 -->
                <router-view></router-view>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import MenuTree from "../common/MenuTree";
import User from "./Users";
import Role from "./Roles";
import Welcome from "./Welcome";

export default {
  name: "Home",
  data () {
    return {
      activePath: '',
      menuList: [
        {
          "id": 1,
          "parentId": 0,
          "menuName": "用户管理",
          "url": "",
          "icon": "el-icon-setting",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": [
            {
              "id": 253,
              "parentId": 1,
              "menuName": "欢迎页面",
              "url": "/welcome",
              "icon": "el-icon-star-off",
              "orderNum": 1,
              "open": 0,
              "disabled": false,
              "perms": "welcome:view",
              "type": 0,
              "children": []
            },
            {
              "id": 226,
              "parentId": 1,
              "menuName": "用户列表",
              "url": "/users",
              "icon": "el-icon-user",
              "orderNum": 2,
              "open": 0,
              "disabled": false,
              "perms": "users",
              "type": 0,
              "children": []
            },
            {
              "id": 235,
              "parentId": 1,
              "menuName": "角色权限",
              "url": "/roles",
              "icon": "el-icon-postcard",
              "orderNum": 3,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 261,
              "parentId": 1,
              "menuName": "部门管理",
              "url": "/departments",
              "icon": "el-icon-s-home",
              "orderNum": 3,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 261,
              "parentId": 1,
              "menuName": "单位管理",
              "url": "/agency",
              "icon": "el-icon-s-home",
              "orderNum": 3,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 319,
              "parentId": 1,
              "menuName": "公告管理",
              "url": "/notices",
              "icon": "el-icon-s-flag",
              "orderNum": 4,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            }
          ]
        },
        {
          "id": 312,
          "parentId": 0,
          "menuName": "预算管理",
          "url": null,
          "icon": "el-icon-s-goods",
          "orderNum": 2,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": [
            {
              "id": 229,
              "parentId": 312,
              "menuName": "预算申报",
              "url": "",
              "icon": "el-icon-date",
              "orderNum": 1,
              "open": 1,
              "disabled": false,
              "perms": "el-icon-date",
              "type": 0,
              "children": [
                {
                  "id": 230,
                  "parentId": 229,
                  "menuName": "单位申报",
                  "url": "/inStocks",
                  "icon": "el-icon-date",
                  "orderNum": 1,
                  "open": 1,
                  "disabled": false,
                  "perms": "el-icon-date",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 267,
                  "parentId": 229,
                  "menuName": "部门申报",
                  "url": "/products",
                  "icon": "el-icon-goods",
                  "orderNum": 2,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 268,
                  "parentId": 229,
                  "menuName": "财政部门申报",
                  "url": "/productCategorys",
                  "icon": "el-icon-star-off",
                  "orderNum": 2,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
              ]
            },
            {
              "id": 311,
              "parentId": 312,
              "menuName": "预算审核",
              "url": null,
              "icon": "el-icon-edit",
              "orderNum": 3,
              "open": 0,
              "disabled": false,
              "perms": null,
              "type": 0,
              "children": [
                {
                  "id": 310,
                  "parentId": 311,
                  "menuName": "部门审核",
                  "url": "/consumers",
                  "icon": "el-icon-edit",
                  "orderNum": 1,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 269,
                  "parentId": 311,
                  "menuName": "财政部门审核",
                  "url": "/suppliers",
                  "icon": "el-icon-coordinate",
                  "orderNum": 5,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": 295,
          "parentId": 0,
          "menuName": "转移支付管理",
          "url": "",
          "icon": "el-icon-s-marketing",
          "orderNum": 5,
          "open": 0,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": [
            {
              "id": 297,
              "parentId": 295,
              "menuName": "上级下达",
              "url": "",
              "icon": "el-icon-warning",
              "orderNum": 1,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": [
                {
                  "id": 298,
                  "parentId": 297,
                  "menuName": "SQL监控",
                  "url": "/druid",
                  "icon": "el-icon-view",
                  "orderNum": 1,
                  "open": 0,
                  "disabled": false,
                  "perms": null,
                  "type": 0,
                  "children": []
                }
              ]
            },
            {
              "id": 341,
              "parentId": 295,
              "menuName": "下级转移",
              "url": "/blog",
              "icon": "el-icon-view",
              "orderNum": 1,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 296,
              "parentId": 295,
              "menuName": "其他部门",
              "url": "/swagger",
              "icon": "el-icon-document",
              "orderNum": 2,
              "open": 0,
              "disabled": false,
              "perms": null,
              "type": 0,
              "children": []
            },
          ]
        },
        {
          "id": 5,
          "parentId": 0,
          "menuName": "预算批复",
          "url": "/logs",
          "icon": "el-icon-camera",
          "orderNum": 6,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": [
            {
              "id": 271,
              "parentId": 5,
              "menuName": "登入日志",
              "url": "/loginLog",
              "icon": "el-icon-date",
              "orderNum": 1,
              "open": 0,
              "disabled": false,
              "perms": "login:log",
              "type": 0,
              "children": []
            },
            {
              "id": 307,
              "parentId": 5,
              "menuName": "操作日志",
              "url": "/logs",
              "icon": "el-icon-edit",
              "orderNum": 1,
              "open": 1,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            }
          ]
        }
      ]
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: {MenuTree,User,Role,Welcome},
  methods:{
    //tab标签点击时，切换相应的路由
    tabClick(tab){
      console.log("tab",tab);
      if(this.$route.path === this.$store.state.tab_info.activeIndex){
        return
      }
      this.$router.push({path:this.$store.state.tab_info.activeIndex});
    },
    //移除tab标签
    tabRemove(targetName){
      console.log("tabRemove",targetName);
      //首页不删
      if(targetName === '/'){
        return
      }
      this.$store.commit('tab_info/DELETE_TABS', targetName);
      if (this.$store.state.tab_info.activeIndex === targetName) {
        // 设置删除后，重新激活的路径
        if (this.$store.state.tab_info.openTab && this.$store.state.tab_info.openTab.length >= 1) {
          //设置路由展示，为索引前一个路由
          this.$store.commit('tab_info/SET_ACTIVE_INDEX', this.$store.state.tab_info.openTab[this.$store.state.tab_info.openTab.length-1].route);
          //跳转路由
          this.$router.push({path: this.$store.state.tab_info.activeIndex});
        } else {
          //否则 跳转到首页
          this.$router.push({path: '/home'});
        }
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    dropOut(){
      console.log("dropout")
      this.$router.push('/')
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    console.log(this.$store.state.user_info.info)
    this.$store.dispatch('tab_info/setTab',this.$route.path)
  },
  watch:{
    '$route'(to,from){
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      let flag = false;
      console.log(from)
      for(let item of this.$store.state.tab_info.openTab){

        if(item.route === to.path){
          this.$store.commit('tab_info/SET_ACTIVE_INDEX',to.path)
          flag = true;
          break;
        }
      }
      if(!flag){
        console.log('to.path',to.path);
        //通过路由的判断，来加入标签页的名称
        if(to.path === '/users') {
          this.$store.commit('tab_info/CHECK_EXIST','/users')
          if (!this.$store.state.tab_info.isTabShow) {
            console.log("监听到切换！u")
            this.$store.commit('tab_info/ADD_TABS', {route: this.$route.path, name: "用户列表"});
          }
        }
        if(to.path === "/roles"){
          this.$store.commit('tab_info/CHECK_EXIST','/roles')
          if(!this.$store.state.tab_info.isTabShow){
            console.log("监听到切换！r")
            this.$store.commit('tab_info/ADD_TABS', {route: this.$route.path , name: "角色列表"});
          }
        }
        if(to.path === "/welcome"){
          this.$store.commit('tab_info/CHECK_EXIST','/welcome')
          if(!this.$store.state.tab_info.isTabShow){
            this.$store.commit('tab_info/ADD_TABS', {route: this.$route.path , name: "欢迎页面"});
          }
        }

        this.$store.commit('tab_info/SET_ACTIVE_INDEX', to.path);
      }
    }
  }
}

</script>

<style lang="less" scoped>
  .el-container {
  position: page;
  }

  .el-header {
    background-color: #3785c9;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    box-shadow:  3px 0px 5px 2px #9fc1db;

    .headRight {
      margin-left: 750px;
      span {
        font-size: 30px;
        font-family: 幼圆;
        font-weight: bolder;
        color: white;
      }
      .el-dropdown > img {
        width: 50px;
        height: 50px;
        margin: 5px 15px -20px 20px;
        border-radius: 50%;
        border: #c7e7ea 2px solid;
      }
    }

    .headLeft {
      display: flex;
      align-items: center;
      text-align: center;
      line-height: 80px;

      img {
        width: 60px;
        height: 60px;
        margin-left: 15px;
        border-radius: 50%;
      }

      span {
        margin-left: 15px;
        font-size: 30px;
        font-family: 幼圆;
        font-weight: bolder;
        color: white;
      }
    }



  }

  .el-aside {
    box-shadow:  3px 0px 20px 3px #7fc0d0;
    background-color: #f3f3f8;
    color: #333;
    line-height: 200px;
    height: 646px;

    .el-menu{
      margin-left: -16px;
      text-align: left;
    }


    .el-menu-vertical-demo {
      background-color: #f4f4fa;
    }
  }

  .el-main {
    box-shadow: inset 3px 3px 30px #91c2e3;
    background-color: #f1f3f5;
    color: #333;
    text-align: center;
  }

  .mainContainer {
    height: 100%;
  }
  .app-wrap{
    height: 600px;
    width: 1250px;

    .el-tabs{
      height: 600px;
      width: 1270px;
    }
  }

</style>

