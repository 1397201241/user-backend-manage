export const menuList = [
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
          "url": "/role_list",
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
          "orderNum": 4,
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
          "orderNum": 5,
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
              "id": 1666,
              "parentId": 229,
              "menuName": "新建申报",
              "url": "/agency_budget_apply",
              "icon": "el-icon-star-off",
              "orderNum": 2,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 1766,
              "parentId": 229,
              "menuName": "申报列表",
              "url": "/budget_apply_list",
              "icon": "el-icon-star-off",
              "orderNum": 2,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 1564,
              "parentId": 229,
              "menuName": "项目列表",
              "url": "/agency_project_list",
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
          "id": 313,
          "parentId": 312,
          "menuName": "预算指标管理",
          "url": "/budget_index",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        },
        {
          "id": 21312,
          "parentId": 312,
          "menuName": "单位预算草案",
          "url": "/draft_budget",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        },
        {
          "id": 2312,
          "parentId": 312,
          "menuName": "部门预算草案",
          "url": "/draft_budget2",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        },
        {
          "id": 311,
          "parentId": 312,
          "menuName": "预算审核",
          "url": "/budget_apply_list2",
          "icon": "el-icon-edit",
          "orderNum": 3,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": []
        },
        {
          "id": 444,
          "parentId": 312,
          "menuName": "预算申报管理",
          "url": "/bgt_pm",
          "icon": "el-icon-date",
          "orderNum": 4,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children": []
        }
      ]
    },
    {
      "id": 295,
      "parentId": 0,
      "menuName": "转移支付管理",
      "url": "",
      "icon": "el-icon-s-marketing",
      "orderNum": 3,
      "open": 0,
      "disabled": false,
      "perms": "",
      "type": 0,
      "children": [
        {
          "id": 342,
          "parentId": 295,
          "menuName": "支付申请",
          "url": "/payApply",
          "icon": "el-icon-view",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        },
        {
          "id": 343,
          "parentId": 295,
          "menuName": "支付审核",
          "url": "/payCheck",
          "icon": "el-icon-view",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        },
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
        {
          "id": 297,
          "parentId": 296,
          "menuName": "清算凭证",
          "url": "/liquidation",
          "icon": "el-icon-document",
          "orderNum": 3,
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
      "menuName": "项目管理",
      "url": "/project",
      "icon": "el-icon-document",
      "orderNum": 4,
      "open": 0,
      "disabled": false,
      "perms": null,
      "type": 0,
      "children": [
        {
          "id": 271,
          "parentId": 5,
          "menuName": "项目列表",
          "url": "/project",
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
          "menuName": "项目申报",
          "url": "/pro_apply",
          "icon": "el-icon-edit",
          "orderNum": 2,
          "open": 1,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        }
      ]
    }
  ]
