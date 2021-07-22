export const menuList = [
  {
    "id": 253,
    "parentId": 0,
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

      "id": 1,
      "parentId": 0,
      "menuName": "用户管理",
      "url": "",
      "icon": "el-icon-setting",
      "orderNum": 1,
      "open": 1,
      "disabled": true,
      "perms": null,
      "type": 0,
      "children": [

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
          "menuName": "单位管理",
          "url": "/agency",
          "icon": "el-icon-s-home",
          "orderNum": 3,
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
              "menuName": "新建申报列表",
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
              "id": 1694,
              "parentId": 229,
              "menuName": "审核列表（待编制草案）",
              "url": "/budget_apply_list4",
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
          "id": 2219,
          "parentId": 312,
          "menuName": "部门审核",
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
              "parentId": 2219,
              "menuName": "申报列表（一审）",
              "url": "/budget_apply_list2",
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
              "parentId": 2219,
              "menuName": "申报列表（二审）",
              "url": "/budget_apply_list5",
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
          "id": 2719,
          "parentId": 312,
          "menuName": "财政审核",
          "url": "",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children": [
            {
              "id": 1656,
              "parentId": 2719,
              "menuName": "申报列表（一审）",
              "url": "/budget_apply_list3",
              "icon": "el-icon-star-off",
              "orderNum": 2,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
            },
            {
              "id": 1466,
              "parentId": 2719,
              "menuName": "申报列表（二审）",
              "url": "/budget_apply_list6",
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
          "id": 21442,
          "parentId": 312,
          "menuName": "申报列表",
          "url": "/budget_apply_list2",
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
          "id": 2112,
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
          "id": 21124,
          "parentId": 312,
          "menuName": "预算草案列表",
          "url": "/draft_budget_list",
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
          "disabled": true,
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
          "disabled": true,
          "perms": "el-icon-date",
          "type": 0,
          "children": []
        }
      ]
    },
    {
      "id": 295,
      "parentId": 0,
      "menuName": "支付申请",
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
          "menuName": "支付申请管理",
          "url": "/payApply",
          "icon": "el-icon-view",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        },
        /*{
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
        },*/

        {
          "id": 244,
          "parentId": 295,
          "menuName": "新建支付申请",
          "url": "/add_pay",
          "icon": "el-icon-warning",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": [
              {
            "id": 297,
            "parentId": 295,
            "menuName": "可选指标列表",
            "url": "/add_pay",
            "icon": "el-icon-warning",
            "orderNum": 1,
            "open": 0,
            "disabled": false,
            "perms": "",
            "type": 0,
            "children": []
          },
            {
              "id": 298,
              "parentId": 295,
              "menuName": "新建申请",
              "url": "/add_pay_2",
              "icon": "el-icon-warning",
              "orderNum": 1,
              "open": 0,
              "disabled": false,
              "perms": "",
              "type": 0,
              "children": []
          },
          ]
        },
        {
          "id": 341,
          "parentId": 295,
          "menuName": "单位凭证列表",
          "url": "/pay_voucher_list",
          "icon": "el-icon-edit",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": []
        },

        {
          "id": 349,
          "parentId": 295,
          "menuName": "支付凭证",
          "url": "/pay_voucher",
          "icon": "el-icon-edit",
          "orderNum": 1,
          "open": 0,
          "disabled": true,
          "perms": null,
          "type": 0,
          "children": []
        },
        {
          "id": 3841,
          "parentId": 295,
          "menuName": "支付凭证回单列表",
          "url": "/pay_voucher_list1",
          "icon": "el-icon-edit",
          "orderNum": 1,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": []
        },
        {
          "id": 2988,
          "parentId": 296,
          "menuName": "资金清算",
          "url": "/capital_liquidation",
          "icon": "el-icon-document",
          "orderNum": 3,
          "open": 0,
          "disabled": false,
          "perms": null,
          "type": 0,
          "children": []
        },
        {
          "id": 2997,
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
        /*{
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
        },*/
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
        },
        {
          "id": 308,
          "parentId": 5,
          "menuName": "新建项目申报",
          "url": "/pro_apply/add",
          "icon": "el-icon-edit",
          "orderNum": 3,
          "open": 1,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        },
        {
          "id": 309,
          "parentId": 5,
          "menuName": "审查项目申报",
          "url": "/pro_apply/exam",
          "icon": "el-icon-edit",
          "orderNum": 4,
          "open": 1,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        },
        {
          "id": 310,
          "parentId": 5,
          "menuName": "查看本部项目",
          "url": "/project",
          "icon": "el-icon-edit",
          "orderNum": 5,
          "open": 1,
          "disabled": false,
          "perms": "",
          "type": 0,
          "children": []
        }
      ]
    },
    {
      "id": 7,
      "parentId": 0,
      "menuName": "预算批复",
      "url": "/reply",
      "icon": "el-icon-edit",
      "orderNum": 1,
      "open": 1,
      "disabled": false,
      "perms": null,
      "type": 0,
      "children": [
        {
          "id": 70,
          "parentId": 7,
          "menuName": "预算批复导航",
          "url": "/reply_navi",
          "icon": "el-icon-edit",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": null,
          "type": 0,
          children: []
        },
        {
          "id": 71,
          "parentId": 7,
          "menuName": "草案批准",
          "url": "/draft_app",
          "icon": "el-icon-edit",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": null,
          "type": 0,
          children: []
        },
        {
          "id": 72,
          "parentId": 7,
          "menuName": "未下发指标管理",
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
          "id": 733,
          "parentId": 7,
          "menuName": "预算指标下达",
          "url": "/target_down",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        },
        {
          "id": 73,
          "parentId": 7,
          "menuName": "单位查看指标",
          "url": "/ac_target",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        },
        /*{
          "id": 74,
          "parentId": 7,
          "menuName": "查看指标详情",
          "url": "/target_detail",
          "icon": "el-icon-date",
          "orderNum": 1,
          "open": 1,
          "disabled": false,
          "perms": "el-icon-date",
          "type": 0,
          "children":[]
        }*/
      ]
    },
  ]
