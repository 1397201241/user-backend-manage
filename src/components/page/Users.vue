<template>
  <el-container id="userList" direction="vertical" style="height: 100%;width: 100%" >
    <!--操作栏-->
    <div style="width: 100%;background-color: #5fb3ec">
      <ActionBar @addBtnClick="addUserDialogVisible=true"
                 @deleteBtnClick="handleDeleteBtnClick"
                 @enableBtnClick="handleEnableBtnClick"
                 @stopBtnClick="handleEnableBtnClick"
      ></ActionBar>
    </div>
    <!--搜索框-->
    <QueryPanel :queryModel="userQuery" @QueryButtonClick="onQueryBtnClick" style="margin-top: 10px">
      <el-form-item label="姓名" style="margin-right: 10px">
        <el-input v-model="userQuery.name" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="手机" label-width="40px">
        <el-input v-model="userQuery.mobile" style="width: 200px"/>
      </el-form-item>
    </QueryPanel>
    <!--数据展示区-->
    <el-table
            :data="$store.state.base_info.users.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
            stripe
            border
            max-height="276px"
            @selection-change="handleSelectionChange"
            style="min-height: 276px;max-width: 1200px"
    >
      <!--数据扩展区-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户ID">
              <span>{{ props.row.USER_ID }}</span>
            </el-form-item>
            <el-form-item label="密码">
              <span>{{ props.row.USER_PASSWORD }}</span>
            </el-form-item>
            <el-form-item label="账号">
              <span>{{ props.row.USER_ACCOUNT }}</span>
            </el-form-item>
            <el-form-item label="身份证">
              <span>{{ props.row.ID_CARD_NUM }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.NOTE }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.UPDATE_TIME }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.CREATE_TIME }}</span>
            </el-form-item>
            <el-form-item label="版本">
              <span>{{ props.row.VERSION }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
      >
      </el-table-column>
      <el-table-column
              type="selection"
              width="50"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="USER_TYPE"
              label="用户类型"
              width="120"
      >
      </el-table-column>
      <el-table-column
              prop="MOF_CODE"
              label="所属财政"
              width="100">
      </el-table-column>
      <el-table-column
              prop="AGENCY_CODE"
              label="所属机构"
              width="100"
      >
      </el-table-column>
      <el-table-column
              prop="USER_NAME"
              label="用户名"
              width="180"
      >
      </el-table-column>
      <el-table-column
              prop="ID_CARD_NUM"
              label="身份证"
              width="200"
      >
      </el-table-column>
      <el-table-column
              prop="TEL"
              label="电话"
              width="120"
      >
      </el-table-column>
      <el-table-column
              prop="STATUS"
              label="状态"
              width="80px"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="action"
              label="操作"
              width="150px"
              align="center"
      >
        <template slot-scope="scope">
          <el-button
                  @click.native.prevent="handleChangeRow(scope)"
                  type="primary"
                  size="small">
            修改用户信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination align='center'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[1,2,3,4]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="$store.state.base_info.users.length"
    >
    </el-pagination>
    <!--添加用户对话框-->
    <el-dialog
            title="添加用户"
            :visible.sync="addUserDialogVisible"
            width="600px"
            center
            :before-close="handleClose">
      <el-form :model="addUserForm" :rules="rules" ref="addForm" label-width="120px" id="addCustomer" class="demo-ruleForm">
        <el-form-item label="用户ID" prop="user_id">
          <el-input v-model="addUserForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="user_type">
          <el-input v-model="addUserForm.user_type"></el-input>
        </el-form-item>
        <el-form-item label="所属财政" prop="mof_code">
          <el-input v-model="addUserForm.mof_code"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="agency_code">
          <el-input v-model="addUserForm.agency_code"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="addUserForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="user_account">
          <el-input v-model="addUserForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="user_password">
          <el-input v-model="addUserForm.user_password"></el-input>
        </el-form-item>
        <el-form-item label="用户身份证" prop="id_card_num">
          <el-input v-model="addUserForm.id_card_num"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="tel">
          <el-input v-model="addUserForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-input v-model="addUserForm.status"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddBtnClick('addForm')">立即添加</el-button>
          <el-button @click="cancelForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
            title="客户信息修改"
            :visible.sync="changeUserDialogVisible"
            width="600px"
            :before-close="handleClose">
      <el-form :model="changeUserForm" :rules="rules" ref="changeForm" label-width="120px" id="change_user" class="demo-ruleForm">
        <el-form-item label="用户ID" prop="user_id">
          <el-input v-model="changeUserForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="user_type">
          <el-input v-model="changeUserForm.user_type"></el-input>
        </el-form-item>
        <el-form-item label="所属财政" prop="mof_code">
          <el-input v-model="changeUserForm.mof_code"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="agency_code">
          <el-input v-model="changeUserForm.agency_code"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="changeUserForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="user_account">
          <el-input v-model="changeUserForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="user_password">
          <el-input v-model="changeUserForm.user_password"></el-input>
        </el-form-item>
        <el-form-item label="用户身份证" prop="id_card_num">
          <el-input v-model="changeUserForm.id_card_num"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="tel">
          <el-input v-model="changeUserForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-input v-model="changeUserForm.status"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChangeBtnClick('changeForm')">立即修改</el-button>
          <el-button @click="cancelForm('changeForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>

</template>

<script>
  import ActionBar from "../../components/common/ActionBar";
  import QueryPanel from "../../components/common/QueryPanel";
  /*import {FormValidate} from "../../utils/validate"*/
  import {get} from "../../utils/request";
  export default {
    name: "Users",
    components: {ActionBar,QueryPanel},
    data() {
      return {
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 4, // 每页的数据条数,
        //对话框状态
        addUserDialogVisible:false,
        changeUserDialogVisible:false,
        //修改的客户姓名，手机号码
        userQuery:{name:'',mobile:''},
        //客户信息
        customers: [],
        //添加的客户
        addUserForm: {
          user_id:'',
          user_type:'',
          mof_code: '',
          agency_code: '',
          user_name: '',
          user_account: '',
          user_password: '',
          id_card_num: '',
          tel: '',
          note: '',
          status: '',
          create_time: '',
          update_time: '',
          version: '',
        },
        //修改的客户
        changeUserForm:{
          user_id:'',
          user_type:'',
          mof_code: '',
          agency_code: '',
          user_name: '',
          user_account: '',
          user_password: '',
          id_card_num: '',
          tel: '',
          note: '',
          status: '',
          create_time: '',
          update_time: '',
          version: '',
        },
        //修改的客户
        deleteUserForm:{
          user_id:'',
          user_type:'',
          mof_code: '',
          agency_code: '',
          user_name: '',
          user_account: '',
          user_password: '',
          id_card_num: '',
          tel: '',
          note: '',
          status: '',
          create_time: '',
          update_time: '',
          version: '',
        },
        //选中的信息
        multipleSelection:[],
        //表单校验
        rules: {
          user_id: [
            { required: true, message: '请输入ID', trigger: 'blur' }
          ],
          user_type:[
            { required: true, message: '请输入用户类型', trigger: 'blur' },
          ],
          mof_code:[
            { required: true, message: '请输入用户所属财政', trigger: 'blur' },
          ],
          agency_code:[
            { required: true, message: '请输入用户所属机构', trigger: 'blur' },
          ],
          user_name:[
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
          ],
          user_account:[
            { required: true, message: '请输入用户账号', trigger: 'blur' },
          ],
          user_password:[
            { required: true, message: '请输入用户密码', trigger: 'blur' },
          ],
          id_card_num:[
            { required: true, message: '请输入用户身份证', trigger: 'blur' },
          ],
          tel:[
            { required: true, message: '请输入用户电话', trigger: 'blur' },
          ],
          note: [
            { required: true, message: '请输入用户备注', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请输入用户状态', trigger: 'blur' }
          ],
          create_time: [
            { required: true, message: '请输入用户创建时间', trigger: 'blur' }
          ],
          update_time: [
            { required: true, message: '请输入用户更新时间', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入用户更新时间', trigger: 'blur' }
          ]
        }
      }
    },
    created:function(){
      // 初始化状态
      this.getUsers()
    },
    mounted() {

    },
    methods: {
      /*获取用户*/
      getUsers(){
        this.$store.dispatch('base_info/getUsers')
      },
      //查询客户
      onQueryBtnClick(){
        let {name, mobile} = this.userQuery;
        if (name!==''){
          get("http://localhost:3000/USERS?USER_NAME=" + name)
                  .then(myJson => {
                            this.$store.commit('base_info/SET_USERS',myJson);
                          }
                  ).catch(err => console.log(err));
        }else if (mobile!==''){
          get("http://localhost:3000/USERS?USER_TEL="+mobile)
                  .then(myJson=>{
                    this.$store.commit('base_info/SET_USERS',myJson);
                  })
                  .catch(err=> console.log(err));
        }else alert("请输入您要查询的名字或手机号码")
      },
      //添加客户
      handleAddBtnClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newUser = {
              "id": this.$refs[formName].model.user_id,
              "USER_ID": this.$refs[formName].model.user_id,
              "USER_TYPE": this.$refs[formName].model.user_type,
              "MOF_CODE": this.$refs[formName].model.mof_code,
              "AGENCY_CODE": this.$refs[formName].model.agency_code,
              "USER_NAME": this.$refs[formName].model.user_name,
              "USER_ACCOUNT": this.$refs[formName].model.user_account,
              "USER_PASSWORD": this.$refs[formName].model.user_password,
              "ID_CARD_NUM": this.$refs[formName].model.id_card_num,
              "TEL": this.$refs[formName].model.tel,
              "NOTE": this.$refs[formName].model.note,
              "STATUS": this.$refs[formName].model.status,
              "CREATE_TIME": this.$refs[formName].model.create_time,
              "UPDATE_TIME": this.$refs[formName].model.update_time,
              "VERSION": this.$refs[formName].model.version
            };
            if (newUser) {
              this.$store.dispatch('base_info/addUser',{newUser});
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        //触发父组件的对话框状态修改事件
        this.addUserDialogVisible = false
      },
      //修改客户信息
      handleChangeBtnClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newUser={
              "id": this.$refs[formName].model.user_id,
              "USER_ID": this.$refs[formName].model.user_id,
              "USER_TYPE": this.$refs[formName].model.user_type,
              "MOF_CODE": this.$refs[formName].model.mof_code,
              "AGENCY_CODE": this.$refs[formName].model.agency_code,
              "USER_NAME": this.$refs[formName].model.user_name,
              "USER_ACCOUNT": this.$refs[formName].model.user_account,
              "USER_PASSWORD": this.$refs[formName].model.user_password,
              "ID_CARD_NUM": this.$refs[formName].model.id_card_num,
              "TEL": this.$refs[formName].model.tel,
              "NOTE": this.$refs[formName].model.note,
              "STATUS": this.$refs[formName].model.status,
              "CREATE_TIME": this.$refs[formName].model.create_time,
              "UPDATE_TIME": this.$refs[formName].model.update_time,
              "VERSION": this.$refs[formName].model.version
            };
            if (newUser){
              this.$store.dispatch('base_info/changeUser',{newUser})
            }
          } else {
            return false;
          }
        });
        //触发父组件的对话框状态修改事件
        this.changeUserDialogVisible=false
      },
      handleEnableBtnClick(){
        const {multipleSelection}=this;
        this.$store.dispatch('base_info/enableUser',{multipleSelection});
      },

      /*删除用户信息*/
      handleDeleteBtnClick(){
        const {multipleSelection}=this;
        this.$store.dispatch('base_info/deleteUser',{multipleSelection});
      },
      //打开修改客户对话框
      handleChangeRow(scope) {
        /*const index=scope.$index;*/
        const data=scope.row;
        /*注入修改信息*/
        this.changeUserForm.user_id=data.USER_ID
        this.changeUserForm.user_type=data.USER_TYPE
        this.changeUserForm.mof_code=data.MOF_CODE
        this.changeUserForm.agency_code=data.AGENCY_CODE
        this.changeUserForm.user_name=data.USER_NAME
        this.changeUserForm.user_account=data.USER_ACCOUNT
        this.changeUserForm.user_password=data.USER_PASSWORD
        this.changeUserForm.id_card_num=data.ID_CARD_NUM
        this.changeUserForm.tel=data.TEL
        this.changeUserForm.note=data.NOTE
        this.changeUserForm.status=data.STATUS
        this.changeUserForm.create_time=data.CREATE_TIME
        this.changeUserForm.update_time=data.UPDATE_TIME
        this.changeUserForm.version=data.VERSION
        this.changeUserDialogVisible=true;
        //rows.splice(index, 1);
      },
      //选择一页显示多少行
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      //跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      //选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //取消按钮
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.addUserDialogVisible=false;
        this.changeUserDialogVisible=false
      },
      //关闭对话框提示
      handleClose(done) {
        this.$confirm('确认关闭？')
                .then(()=> {
                  done();
                })
                .catch(()=> {});
      }
    },
  }
</script>

<style lang="less" scoped>

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
