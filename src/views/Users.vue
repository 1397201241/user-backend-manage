<template>
  <el-container id="userList" direction="vertical" style="height: 100%;width: 100%" >
    <!--操作栏-->
    <div style="width: 100%;">
      <ActionBar @addBtnClick="addUserDialogVisible=true"
                 @deleteBtnClick="handleDeleteBtnClick"
                 @enableBtnClick="handleEnableBtnClick"
                 @stopBtnClick="handleEnableBtnClick"
                 @searchBtnClick="searchUser"
      >
      </ActionBar>
    </div>
    <!--数据展示区-->
    <a-table :columns="columns"
             :data-source="data"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             class="user-table" bordered :row-selection="rowSelection">
      <a slot="username" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> 用户名</span>
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
        <a @click="assignPermissionsOpen(row)">分配角色</a>
        <a-divider type="vertical" />
        <a @click="handleChangeRow(row)">修改</a>
        <a-divider type="vertical" />
        <a-popconfirm
            title="你确定要删除该用户吗?"
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email" clearable placeholder="请输入用户邮箱"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" clearable placeholder="888888"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-input v-model="addUserForm.avatar" clearable placeholder="头像地址（可选）"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="地址" prop="city">
            <el-input v-model="addUserForm.city" clearable placeholder="请输入地址（可选）"></el-input>
          </el-form-item>
          <el-form-item label="上级机构ID" prop="upagencyId">
            <el-input v-model="addUserForm.upagencyId" clearable placeholder="请输入上级机构ID"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item label="用户身份证" prop="idCode">
          <el-input v-model="addUserForm.idCode" clearable placeholder="请输入身份证号"></el-input>
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="changeUserForm.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="changeUserForm.email" clearable placeholder="请输入用户邮箱"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="密码" prop="password">
            <el-input v-model="changeUserForm.password" clearable placeholder="888888"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-input v-model="changeUserForm.avatar" clearable placeholder="头像地址（可选）"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="地址" prop="city">
            <el-input v-model="changeUserForm.city" clearable placeholder="请输入地址（可选）"></el-input>
          </el-form-item>
          <el-form-item label="上级机构ID" prop="upagencyId">
            <el-input v-model="changeUserForm.upagencyId" clearable placeholder="请输入上级机构ID"></el-input>
          </el-form-item>
        </el-container>
        <el-form-item label="用户身份证" prop="idCode">
          <el-input v-model="changeUserForm.idCode" clearable placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="handleChangeBtnClick('changeForm')">立即修改</el-button>
          <el-button @click="cancelForm('changeForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <a-modal
        title="Title"
        :visible="assignPermissionsVisible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-tree
          checkable
          :tree-data="treeData"
          :checked-keys="checkedKeys"
          @select="onSelect"
          @check="onCheck"
      >
        <span slot="title0010" style="color: #1890ff">sss</span>
      </a-tree>
    </a-modal>
  </el-container>

</template>

<script>
import ActionBar from "../components/common/ActionBar";
/*import {FormValidate} from "../../utils/validate"*/
import request from "../utils/request";
import querystring from "querystring";

const columns = [
    {
      dataIndex: 'username',
      key: 'username',
      width:'15%',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'username' },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width:'15%',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width:'15%',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      width:'15%',
      scopedSlots: { customRender: 'tags' },
    },
    {
      title: '编辑',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
export default {
  name: "Users",
  components: {ActionBar},
  data() {
    return {
      data: [],
      columns,
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
      assignPermissionsVisible:false,
      ModalText: 'Content of the modal',
      confirmLoading: false,
      checkedKeys:[],
      selectedKeys:[],
      userId:'',
      pagination: {
        current: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5, // 每页的数据条数,
      },
      loading: false,
      //对话框状态
      addUserDialogVisible:false,
      changeUserDialogVisible:false,
      /*添加的用户*/
      addUserForm: {
        email:'',
        username:'',
        password: '',
        avatar: '',
        city: '',
        idCode:'',
        upagencyId: '',
      },
      /*修改的用户*/
      changeUserForm:{
        id:'',
        email:'',
        username:'',
        password: '',
        avatar: '',
        city: '',
        idCode:'',
        upagencyId: '',
      },
      // 表单校验
      rules: {
        username:[
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        email:[
          { required: true, message: '用户邮箱不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  created(){
    this.getUsers()
    this.getRoles()
  },
  mounted() {

  },
  methods: {
    /*获取用户列表*/
    getUsers(current,size){
      this.loading=true
      request({
        url: '/sys/user/list?'+querystring.stringify({current,size}),
        method: 'get'
      }).then(res=>{
        let {records} = res.data
        this.pagination.total=res.data.total
        this.pagination.current=res.data.current
        this.pagination.pageSize=res.data.size
        this.pagination.pages=res.data.pages
        records.map( r =>{
          r.tags=['LOSER']
          r.key=r.id
          return r
        })
        this.data =records
        this.loading=false
      })
    },
    /*获取角色列表*/
    getRoles(){
      request({
        url: '/sys/role/list',
        method: 'get'
      }).then(res=>{
        let {records} = res.data
        let roles=[]
        records.map( r =>{
          r.title= r.name
          r.key= r.code
          roles.push(r.code)
        })
        this.treeData=records
      })
    },
    // 搜索用户
    searchUser(username){
      if (username === ''){
        this.getUsers()
      }else {
        request({
          url: '/sys/user/info/'+username,
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
              url: '/sys/user/save',
              method: 'post',
              data:this.$refs[formName].model
            }).then(res=>{
              this.$message.success(res.msg)
              this.getUsers();
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
    // 分配角色
    assignPermissionsOpen(row){
      this.userId=row.id
      let {sysRoles} = row
      let roleKeys=[]
      // 相比于Roles和Menus两个组件
      // 虽然需要遍历一遍将code作为key，但是更好
      sysRoles.map( r =>{
        r.title= r.name
        r.key= r.code
        roleKeys.push(r.code)
      })
      this.checkedKeys=roleKeys
      this.assignPermissionsVisible=true
    },
    // 分页
    handleTableChange(pagination) {
      this.pagination=pagination
      this.getUsers(pagination.current)
    },
    //修改客户信息
    handleChangeBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs[formName].model) {
            let updateUser = this.$refs[formName].model;
            request({
              url: '/sys/user/update',
              method: 'post',
              data:updateUser
            }).then(res=>{
              this.$message.success(res.msg)
              this.getUsers(this.pagination.current);
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
      let ids= [row.id]
      request({
        url: '/sys/user/delete',
        method: 'post',
        data: ids
      }).then(res=>{
        this.$message.success(res.msg)
        this.getUsers(this.pagination.current);
      })
    },
    handleEnableBtnClick(){
      const {multipleSelection}=this;
      this.$store.dispatch('base_info/enableUser',{multipleSelection});
    },
    /*批量删除用户信息*/
    handleDeleteBtnClick(){
      const {selectedRows}=this;
      let ids=[];
      selectedRows.forEach(r=>{
        ids.push(r.id)
      })
      request({
        url: '/sys/user/delete',
        method: 'post',
        data: ids
      }).then(res=>{
        this.$message.success(res.msg)
        this.getUsers(this.pagination.current);
      })
    },
    // 树形点中
    onSelect(selectedKeys) {
      this.selectedKeys=selectedKeys
    },
    // 树形选取
    onCheck(checkedKeys) {
      this.checkedKeys=checkedKeys
    },
    // 分配权限确认
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        let roleIds = []
        // 从根据roleCode已有角色列表中获取roleId
        this.treeData.forEach(r=>{
          for (const i of this.checkedKeys) {
            if (r.code===i) {
              roleIds.push(r.id)
            }
          }
        })
        request({
          url: '/sys/user/role/'+this.userId,
          method: 'post',
          data:roleIds
        }).then(res=>{
          this.$message.success(res.msg)
          this.assignPermissionsVisible = false;
          this.confirmLoading = false;
          this.getUsers();
        })

      }, 1000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.assignPermissionsVisible = false;
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
  #userList{
    .user-table{
      padding: 10px;
      .ant-table{
        height: 331px;
      }
    }
  }
  /*.demo-vxeTable-expand {
    font-size: 0;
    .el-form-item{
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
      span{
        color: #5908b1;
      }
    }
  }*/
</style>
