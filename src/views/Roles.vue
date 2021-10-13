<template>
  <el-container id="roleList" direction="vertical" style="height: 100%;width: 100%" >
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
        <a @click="assignPermissionsOpen(row)">角色分配</a>
        <a-divider type="vertical" />
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
          <el-form-item label="角色名" prop="name">
            <el-input v-model="addUserForm.name" clearable placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="addUserForm.code" clearable placeholder="请输入角色代码"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="角色描述" prop="remark">
            <el-input v-model="addUserForm.remark" clearable placeholder="888888"></el-input>
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
          <el-form-item label="角色名" prop="name">
            <el-input v-model="changeUserForm.name" clearable placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="changeUserForm.code" clearable placeholder="请输入角色代码"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="角色描述" prop="remark">
            <el-input v-model="changeUserForm.remark" clearable placeholder="请输入角色描述"></el-input>
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
          checkable="true"
          checkStrictly
          :tree-data="treeData"
          :checked-keys="checkedKeys"
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
    dataIndex: 'name',
    key: 'name',
    width:'15%',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '角色代码',
    dataIndex: 'code',
    key: 'code',
    width:'10%',
  },
  {
    title: '说明',
    dataIndex: 'remark',
    key: 'remark',
    width:'20%',
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
  name: "Roles",
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
      roleId:'',
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
        name:'',
        code:'',
        remark: '',
        avatar: '',
        city: '',
        idCode:'',
        upagencyId: '',
      },
      /*修改的用户*/
      changeUserForm:{
        id:'',
        name:'',
        code:'',
        remark: '',
        avatar: '',
        city: '',
        idCode:'',
        upagencyId: '',
      },
      // 表单校验
      rules: {
        name:[
          { required: true, message: '角色名不能为空', trigger: 'blur' },
        ],
        code:[
          { required: true, message: '角色代码不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  created(){
    this.getRoles()
    this.getMenus()
  },
  mounted() {

  },
  methods: {
    /*获取用户列表*/
    getRoles(current, size){
      this.loading=true
      request({
        url: '/sys/role/list?'+querystring.stringify({current,size}),
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
        console.log(records)
        this.data =records
        this.loading=false
      })
    },
    /*获取角色列表*/
    getMenus(){
      request({
        url: '/sys/menu/list',
        method: 'get'
      }).then(res=>{
        let records = res.data
        this.addProperty(records)
        this.treeData=records
      })
    },
    addProperty(records) {
      records.map(r=>{
        r.title= r.name
        r.key= r.id
        if (r.children.length>0){
          this.addProperty(r.children)
        }
      })
    },
    // 搜索用户
    searchUser(username){
      if (username === ''){
        this.getRoles()
      }else {
        request({
          url: '/sys/role/info/'+username,
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
              url: '/sys/role/save',
              method: 'post',
              data:this.$refs[formName].model
            }).then(res=>{
              this.$message.success(res.msg)
              this.getRoles();
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
    // 分页
    handleTableChange(pagination) {
      this.pagination=pagination
      this.getRoles(pagination.current)
    },
    //修改客户信息
    handleChangeBtnClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs[formName].model) {
            let updateUser = this.$refs[formName].model;
            request({
              url: '/sys/role/update',
              method: 'post',
              data:updateUser
            }).then(res=>{
              this.$message.success(res.msg)
              this.getRoles(this.pagination.current);
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
        url: '/sys/role/delete',
        method: 'post',
        data: ids
      }).then(res=>{
        this.$message.success(res.msg)
        this.getRoles(this.pagination.current);
      })
    },
    /*批量删除用户信息*/
    handleDeleteBtnClick(){
      const {selectedRows}=this;
      let ids=[];
      selectedRows.forEach(r=>{
        ids.push(r.id)
      })
      request({
        url: '/sys/role/delete',
        method: 'post',
        data: ids
      }).then(res=>{
        this.$message.success(res.msg)
        this.getRoles(this.pagination.current);
      })
    },
    // 树形选取
    onCheck(checkedKeys) {
      this.checkedKeys=checkedKeys
    },
    // 分配角色
    assignPermissionsOpen(row){
      console.log(row)
      this.roleId=row.id
      request({
        url: '/sys/role/info/'+row.id,
        method: 'get',
      }).then(res=>{
        let {menuIds} = res.data
        this.checkedKeys=menuIds
      })
      this.assignPermissionsVisible=true
    },
    // 分配权限确认
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        request({
          url: '/sys/role/perm/'+this.roleId,
          method: 'post',
          data: this.checkedKeys.checked
        }).then(res=>{
          console.log(res)
          this.$message.success(res.msg)
          this.assignPermissionsVisible = false;
          this.confirmLoading = false;
          this.getRoles();
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
#roleList{
  .user-table{
    padding: 10px;
    .ant-table{
      height: 331px;
    }
  }
}

</style>
