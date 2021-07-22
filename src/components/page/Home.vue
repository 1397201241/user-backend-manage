<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <!--      logo及项目名-->
      <div class="headLeft">
        <img src="../../assets/imgs/sys_logo.png">
        <span>预算管理一体化系统</span>
      </div>

      <!--      用户头像及下拉框-->
      <div class="headRight">
        <span style="color: white;font-size: 30px">Hello,{{this.$store.state.user_info.info.name}}</span>
        <el-dropdown>
          <img src="../../assets/imgs/head.png">
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
                <router-view>
                  <!--<Pie v-if="$route.path==='/draft_budget2'"></Pie>-->
                </router-view>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

const MenuTree = ()=>import('../common/MenuTree');
const User = ()=>import('./Users');
const Role = ()=>import('./Roles');
const Welcome = ()=>import('./Welcome');
const Agency = ()=>import('./Agency');
const Project = ()=>import('./Project/Project');
import {menuList} from "../../assets/js/menuData";
import {removeToken} from "../../utils/auth";

export default {
  name: "Home",
  data () {
    return {
      activePath: '',
      menuList: menuList
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { MenuTree,User,Role,Welcome,Project,Agency},
  methods:{
    //tab标签点击时，切换相应的路由
    tabClick(tab){
      let time = new Date();
      console.log(time.toLocaleString(),tab);
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
    /*注销*/
    dropOut(){
      //清除cookie
      removeToken();
      //清除用户信息
      this.$store.commit('base_info/SET_INFO',[]);
      //清除权限
      this.$store.commit('base_info/SET_PERMISSIONS',[]);
      //清除token
      this.$store.commit('base_info/SET_TOKEN','');
      //跳转
      this.$router.push({
        path:'/login'
      });
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
      //项目申请界面按钮显示与关闭
      if(to.path === '/pro_apply'){
        this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_TRUE')
        console.log("改变了按钮显示")
      }
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
        let path_name_list = {
          "/users":"用户列表",
          "/roles":"角色列表",
          "/role_list":"权限管理",
          "/payApply":"支付申请",
          "/payCheck":"支付审核",
          "/welcome":"欢迎界面",
          "/project":"项目列表",
          "/agency":"单位管理",
          "/pay_voucher":"支付凭证",
          "/capital_liquidation":"资金清算",
          "/liquidation":"清算凭证",
          "/bgt_pm":"预算申请管理",
          "/pro_apply":"项目申报",
          "/pro_apply/add":"新建项目申报",
          "/pro_apply/exam":"审核项目申报",
          "/view_pro_progress":"项目进度查看",
          "/budget":"指标管理",
          "/reply":"预算批复",
          "/draft_app":"草案批准",
          "/reply_navi":"预算批复导航",
          "/target_down":"指标下达",
          "/budget_index":"预算指标",
          "/agency_budget_apply":"单位预算申报",
          "/budget_apply_list":"预算申报列表",
          "/budget_apply_details":"预算申报详情",
          "/budget_apply_details2":"预算申报详情",
          "/budget_apply_details3":"预算申报详情",
          "/agency_project_list":"单位项目列表",
          "/budget_apply_list2":"预算申请列表",
          "/budget_apply_list3":"预算申请列表",
          "/budget_apply_list4":"预算申请列表",
          "/draft_budget":"单位预算草案",
          "/draft_budget2":"部门预算草案",
          "/draft_budget_list":"预算草案列表",
          "/ac_target":"单位查看指标",
          "/target_detail":"指标详情",
          "/add_pay":"新建支付申请",
          "/add_pay_2":"新建申请",
          "/pay_voucher_list":"支付凭证",
          "/pay_voucher_detail":"支付凭证详情"
        };
        if(path_name_list[to.path]){
          if (to.path==='/draft_budget2'){
            this.$store.commit('tab_info/ADD_TABS2', {route: this.$route.path , name: path_name_list[to.path]});
          }else {
            this.$store.commit('tab_info/ADD_TABS', {route: this.$route.path , name: path_name_list[to.path]});
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
    box-shadow:  3px 0 20px 3px #7fc0d0;
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
    margin: -12px -15px -15px -12px;
    .el-tabs{
      height: 630px;
      width: 1305px;
    }
  }


</style>

