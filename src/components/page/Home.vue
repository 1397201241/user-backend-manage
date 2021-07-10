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
        <span style="color: white;font-size: 30px">Hello,Programmer</span>
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
      <el-aside width="220px">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true">
          <MenuTree :menuList="this.menuList"></MenuTree>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view>
        </router-view>
        <div class="mainMenuCard">
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                :key="item.name"
                v-for="(item) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
              {{item.content}}
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import MenuTree from "../common/MenuTree";
export default {
  name: "Home",
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,

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
              "menuName": "单位管理",
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
              /*"children": [
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
              ]*/
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
  components: {MenuTree},
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

      }},

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    dropOut(){
      console.log("dropout")
      this.$router.push('/login')

    }
  }
}
</script>

<style lang="less" scoped>
  .el-container {
  position: page;
  }
  .el-header {
    background-color: #649DD9FF;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;

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

    .headRight {
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

  }

  .el-aside {
    background-color: #f3f3f8;
    color: #333;
    line-height: 200px;
    height: 646px;

    .el-menu{
      margin-left: -40px;
    }

    .el-menu-vertical-demo {
      background-color: #f4f4fa;
    }
  }

  .el-main {
    background-color: #f1f3f5;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .mainContainer {
    height: 100%;
  }


.mainMenuCard{
  height: 50px;
  width: 100%
}
  .el-tabs{
    height: 40px;
    background-color: red;
    .el-tab-pane{
      height: 40px;
    }
  }

</style>
