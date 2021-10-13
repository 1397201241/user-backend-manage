<template>
  <el-container id="roleList" direction="vertical" style="height: 100%;width: 100%" >
    <!--操作栏-->
    <div style="width: 100%;">
      <ActionBar @addBtnClick="addUserDialogVisible=true"
                 @deleteBtnClick="handleDeleteBtnClick"
                 :delete-button-disabled="true"
                 @searchBtnClick="searchUser"
      >
      </ActionBar>
    </div>
    <!--数据展示区-->
    <a-table :columns="columns"
             :data-source="data"
             :pagination="pagination"
             :loading="loading"
             :scroll="{ y: 300 }"
             @change="handleTableChange"
             class="user-table" bordered :row-selection="rowSelection">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> 角色名</span>
      <span slot="tags" slot-scope="tags">
      <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="handleChangeRow(row)">修改</a>
        <a-divider type="vertical" />
        <a-popconfirm
            title="你确定要删除该菜单吗?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteConfirm(row)"
            @cancel="cancel"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!--添加用户对话框-->
    <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="600px"
        center
    >
      <el-form :model="addUserForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-container>
          <el-form-item label="菜单名" prop="name">
            <el-input v-model="addUserForm.name" clearable placeholder="请输入菜单名"></el-input>
          </el-form-item>
          <el-form-item label="权限代码" prop="perms">
            <el-input v-model="addUserForm.perms" clearable placeholder="请输入权限代码"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="菜单类型" prop="type">
            <el-input v-model.number="addUserForm.type" clearable placeholder="请输入菜单类型"></el-input>
          </el-form-item>
          <el-form-item label="父级ID" prop="parentId">
            <el-input v-model.number="addUserForm.parentId" clearable placeholder="请输入父级菜单Id"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="对应组件" prop="component">
            <el-input v-model="addUserForm.component" clearable placeholder="请输入对应组件（可选）"></el-input>
          </el-form-item>
          <el-form-item label="菜单地址" prop="path">
            <el-input v-model="addUserForm.path" clearable placeholder="请输入菜单对应地址"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model="addUserForm.icon" clearable placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="handleAddBtnClick('addForm')" icon="el-icon-plus">
            立即添加</el-button>
          <el-button @click="cancelForm('addForm')" icon="el-icon-refresh">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
        title="客户信息修改"
        :visible.sync="changeUserDialogVisible"
        width="600px"
    >
      <el-form :model="changeUserForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
        <el-container>
          <el-form-item label="菜单名" prop="name">
            <el-input v-model="changeUserForm.name" clearable placeholder="请输入菜单名"></el-input>
          </el-form-item>
          <el-form-item label="权限代码" prop="perms">
            <el-input v-model="changeUserForm.perms" clearable placeholder="请输入权限代码"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="菜单类型" prop="type">
            <el-input v-model.number="changeUserForm.type" clearable placeholder="请输入菜单类型"></el-input>
          </el-form-item>
          <el-form-item label="父级ID" prop="parentId">
            <el-input v-model.number="changeUserForm.parentId" clearable placeholder="请输入父级菜单Id"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="对应组件" prop="component">
            <el-input v-model="changeUserForm.component" clearable placeholder="请输入对应组件（可选）"></el-input>
          </el-form-item>
          <el-form-item label="菜单地址" prop="path">
            <el-input v-model="changeUserForm.path" clearable placeholder="请输入菜单对应地址"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model="changeUserForm.icon" clearable placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="handleChangeBtnClick('changeForm')">立即修改</el-button>
          <el-button @click="cancelForm('changeForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>

</template>

<script>
import ActionBar from "../components/common/ActionBar";
/*import {FormValidate} from "../../utils/validate"*/
import request from "../utils/request";

export default {
  name: "Menus",
  components: {ActionBar},
  data() {
    return {
      data: [],
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          slots: {title: 'customTitle'},
          scopedSlots: {customRender: 'name'},
        },
        {
          title: '权限代码',
          dataIndex: 'perms',
          key: 'perms',
          width: '20%',
        },
        {
          title: '权限级别',
          dataIndex: 'type',
          key: 'type',
          width: '10%',
        },
        {
          title: '标签',
          key: 'tags',
          dataIndex: 'tags',
          width: '15%',
          scopedSlots: {customRender: 'tags'},
        },
        {
          title: '编辑',
          key: 'action',
          scopedSlots: {customRender: 'action'},
        },
      ],
      selectedRows:[],
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectedRows=selectedRows
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
          this.selectedRows=selectedRows
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
          this.selectedRows=selectedRows
        },
      },
      treeData: [],
      ModalText: 'Content of the modal',
      confirmLoading: false,
      checkedKeys:[],
      selectedKeys:[],
      roleId:'',
      pagination: {
        current: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 20, // 每页的数据条数,
      },
      loading: false,
      //对话框状态
      addUserDialogVisible:false,
      changeUserDialogVisible:false,
      /*添加的用户*/
      addUserForm: {
        parentId:'',
        name:'',
        path:'',
        perms: '',
        component: '',
        type: '',
        icon:'',
        upagencyId: '',
        statu: 1
      },
      /*修改的用户*/
      changeUserForm:{
        parentId:'',
        name:'',
        path:'',
        perms: '',
        component: '',
        type: '',
        icon:'',
        upagencyId: '',
        statu: 1
      },
      // 表单校验
      rules: {
        name:[
          { required: true, message: '菜单名不能为空', trigger: 'blur' },
        ],
        parentId:[
          { required: true, message: '父级菜单ID不能为空', trigger: 'blur' },
          { type: 'number', message: '父级菜单ID必须为数字值',trigger: 'blur'}
        ],
        perms:[
          { required: true, message: '菜单权限不能为空', trigger: 'blur' },
        ],
        type:[
          { required: true, message: '菜单类型不能为空', trigger: 'blur' },
          { type: 'number', message: '菜单类型必须为数字值',trigger: 'blur'}
        ],
      }
    }
  },
  created(){
    this.getMenus()
  },
  mounted() {

  },
  methods: {
    /*获取菜单列表*/
    getMenus(){
      this.loading=true
      request({
        url: '/sys/menu/list?',
        method: 'get'
      }).then(res=>{
        console.log(res)
        let {data} = res
        this.addProperty(data)
        this.data =data
        this.loading=false
      })
    },

    addProperty(records) {
      records.map(r=>{
        r.title= r.name
        r.key= r.id
        r.tags=['LOSER']
        if (r.children.length>0){
          this.addProperty(r.children)
        }
      })
    },
    // 搜索用户
    searchUser(username){
      if (username === ''){
        this.getMenus()
      }else {
        request({
          url: '/sys/menu/info/'+username,
          method: 'get'
        }).then(res=>{
          let {data} = res
          data.key=data.id
          let tags=['LOSER']
          data.tags=tags
          this.data =[data]
        })
      }

    },
    //添加客户
    handleAddBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs[formName].model) {
            request({
              url: '/sys/menu/save',
              method: 'post',
              data:this.$refs[formName].model
            }).then(res=>{
              this.$message.success(res.msg)
              this.getMenus();
              this.addUserDialogVisible=false;
            })
          }
        } else {
          return false;
        }
      });
      //触发父组件的对话框状态修改事件
      this.addUserDialogVisible = false
    },
    // 打开修改用户对话框
    handleChangeRow(row){
      this.changeUserForm=row
      this.changeUserDialogVisible=true
    },
    // no分页
    handleTableChange(pagination) {
      this.pagination=pagination
      this.getMenus()
    },
    //修改客户信息
    handleChangeBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs[formName].model) {
            let updateUser = this.$refs[formName].model;
            request({
              url: '/sys/menu/update',
              method: 'post',
              data:updateUser
            }).then(res=>{
              this.$message.success(res.msg)
              this.getMenus();
              this.changeUserDialogVisible=false;
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      //触发父组件的对话框状态修改事件
      this.changeUserDialogVisible=false
    },
    // 删除确认
    deleteConfirm(row){
      request({
        url: '/sys/menu/delete/'+row.id,
        method: 'post',
      }).then(res=>{
        this.$message.success(res.msg)
        this.getMenus();
      })
    },
    /*批量删除用户信息*/
    handleDeleteBtnClick(){
      this.$message.error("暂不支持批量删除")
    },
    //取消按钮
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.addUserDialogVisible=false;
      this.changeUserDialogVisible=false
    },
    confirm(e) {
      console.log(e);
      this.$message.success('Click on Yes');
    },
    cancel(e) {
      console.log(e);
      this.$message.error('Click on No');
    },
  },
}
</script>

<style lang="less">
@import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
/*通用图标大小*/
/*.iconfont{
  font-size: 12px;
}*/
#roleList{
  .user-table{
    padding: 10px;
    .ant-table{
      height: 100%;
    }
  }
}

</style>
