<template>
  <el-container id="userList" direction="vertical" style="height: 100%;width: 100%" >
    <!--操作栏-->
    <div style="width: 100%;background-color: #5fb3ec">
      <ActionBar @addBtnClick="addUserDialogVisible=true"
                 @deleteBtnClick="handleDeleteBtnClick"
                 @enableBtnClick="handleEnableBtnClick"
                 @stopBtnClick="handleEnableBtnClick"
      >用户信息明细列表</ActionBar>
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
      <el-table-column
              type="selection"
              width="50"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="name"
              label="用户名"
              width="120"
      >
      </el-table-column>
      <el-table-column
              prop="idCode"
              label="身份证号码"
              width="180">
      </el-table-column>
      <el-table-column
              prop="agencyName"
              label="所在单位"
              width="240"
      >
      </el-table-column>
      <el-table-column
              prop="agencyCode"
              label="单位代码"
              width="120"
      >
      </el-table-column>
      <el-table-column
              prop="agencyId"
              label="单位ID"
              width="120"
      >
      </el-table-column>
      <el-table-column
              label="密码"
              width="120"
      >
        <template>**************</template>
      </el-table-column>
      <el-table-column
              prop="action"
              label="操作"
              align="center"
      >
        <template slot-scope="scope">
          <el-button
                  @click.native.prevent="handleChangeRow(scope)"
                  type="primary"
                  size="small">
            <i class="iconfont icon-xiugai"></i>
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
      <el-form :model="addUserForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-container>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addUserForm.name" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" clearable placeholder="请输入用户密码"></el-input>
          </el-form-item>

        </el-container>

        <el-container>
          <el-form-item label="单位名称" prop="agencyName">
            <el-input v-model="addUserForm.agencyName" clearable placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="单位代码" prop="agencyCode">
            <el-input v-model="addUserForm.agencyCode" clearable placeholder="请输入单位代码"></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="单位ID" prop="agencyId">
            <el-input v-model="addUserForm.agencyId" clearable placeholder="请输入单位ID"></el-input>
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
            :before-close="handleClose">
      <el-form :model="changeUserForm" :rules="rules" ref="changeForm" label-width="100px" class="demo-ruleForm">
        <el-container>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="changeUserForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="changeUserForm.password" clearable></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="单位名称" prop="agencyName">
            <el-input v-model="changeUserForm.agencyName" clearable></el-input>
          </el-form-item>
          <el-form-item label="单位代码" prop="agencyCode">
            <el-input v-model="changeUserForm.agencyCode" clearable></el-input>
          </el-form-item>
        </el-container>
        <el-container>
          <el-form-item label="单位ID" prop="agencyId">
            <el-input v-model="changeUserForm.agencyId" clearable></el-input>
          </el-form-item>
          <el-form-item label="上级机构ID" prop="upagencyId">
            <el-input v-model="changeUserForm.upagencyId" clearable></el-input>
          </el-form-item>
        </el-container>
        <el-form-item label="用户身份证" prop="idCode">
          <el-input v-model="changeUserForm.idCode" clearable></el-input>
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
  import ActionBar from "../../components/common/ActionBar";
  import QueryPanel from "../../components/common/QueryPanel";
  /*import {FormValidate} from "../../utils/validate"*/
  import {get} from "../../utils/request";
  import {getToken, getUsernameToken} from "../../utils/auth";
  export default {
    name: "Users",
    components: {ActionBar,QueryPanel},
    data() {
      return {
        options: [{
          value: '单位人员',
          label: '单位人员'
        }, {
          value: '单位管理员',
          label: '单位管理员'
        }, {
          value: '部门人员',
          label: '部门人员'
        }, {
          value: '部门管理员',
          label: '部门管理员'
        }, {
          value: '财政人员',
          label: '财政人员'
        }],
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
        /*添加的用户*/
        addUserForm: {
          guid:'',
          name:'',
          password:'',
          agencyName: '',
          agencyCode: '',
          agencyId: '',
          idCode:'',
          upagencyId: '',
        },
        /*修改的用户*/
        changeUserForm:{
          guid:'',
          name:'',
          password:'',
          agencyName: '',
          agencyCode: '',
          agencyId: '',
          idCode:'',
          upagencyId: '',
        },
        /*删除的客户*/
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
        multipleSelection:[],//选中的信息
        /*表单校验
        * todo:根据业务场景完善字段校验
        *  */
        rules: {
          /*guid: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],*/
          name:[
            { required: true, message: '用户类型不能为空', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '用户密码不能为空', trigger: 'blur' },
          ],
          agencyName:[
            { required: true, message: '单位名称不能为空', trigger: 'blur' },
          ],
          agencyCode:[
            { required: true, message: '单位代码不能为空', trigger: 'blur' },
          ],
          agencyId:[
            { required: true, message: '单位ID不能为空', trigger: 'blur' },
          ],
          idCode:[
            { required: true, message: '身份证号不能为空', trigger: 'blur' },
          ],
          upagencyId:[
            { required: true, message: '上级机构ID不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    created:function(){
      this.getUsers()
      let token=getToken()
      let username=getUsernameToken()
      console.log(token)
      console.log(username)
      /*fetch('http://192.168.110.79:8001/bm-fasp-tcauser/username/'+username,{
        method:'GET',
        headers:{
          "Authorization":token
        },
        mode:'cors'
      })
              .then(res=>res.json())
              .then(res=>{
                console.log(res)
              });*/
      // 初始化状态
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
          fetch('http://192.168.110.85:8001/bm-fasp-tcauser/username/'+name,{
            method:'GET',
            headers:{
              "Content-Type": 'application/json',
            },
            mode:'cors'
          })
                  .then(res=>res.json())
                  .then(res=>{
                    console.log(res.data)
                    let user=[]
                    user.push(res.data)
                    this.$store.commit('base_info/SET_USERS',user);
                  })
                  .catch(err=>{
                    console.log(err)
                  })

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
            let newUser = {};
            //newUser.guid=this.$refs[formName].model.guid
            newUser.name=this.$refs[formName].model.name
            newUser.password=this.$refs[formName].model.password
            newUser.agencyName=this.$refs[formName].model.agencyName
            newUser.agencyCode=this.$refs[formName].model.agencyCode
            newUser.agencyId=this.$refs[formName].model.agencyId
            newUser.idCode=this.$refs[formName].model.idCode
            newUser.upagencyId=this.$refs[formName].model.upagencyId
            console.log(newUser)
            if (newUser) {
              fetch('http://192.168.110.85:8001/bm-fasp-tcauser/add',{
                method:'POST',
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(newUser),
                mode:'cors'
              })
                      .then(res=>res.json())
                      .then(res=>{
                        console.log(res);
                        this.getUsers();
                        this.addUserDialogVisible=false;
                      })
                      .catch(err=>{
                        console.log(err)
                      });
            }
          } else {
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
            let newUser = {};
            newUser.guid=this.$refs[formName].model.guid
            newUser.name=this.$refs[formName].model.name
            newUser.password=this.$refs[formName].model.password
            newUser.agencyName=this.$refs[formName].model.agencyName
            newUser.agencyCode=this.$refs[formName].model.agencyCode
            newUser.agencyId=this.$refs[formName].model.agencyId
            newUser.idCode=this.$refs[formName].model.idCode
            newUser.guid=this.$refs[formName].model.upagencyId
            console.log(newUser)
            if (newUser) {
              this.$store.dispatch('base_info/changeUser',{newUser});
            }
          } else {
            console.log('error submit!!');
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
        let delRequest=[];
        for(let i of multipleSelection){
          delRequest.push(
                  fetch('http://192.168.110.85:8001/bm-fasp-tcauser/delete/'+i.guid,{
                    method:'DELETE',
                    headers:{
                      "Content-Type":"application/json"
                    },
                    mode:'cors'
                  })
                          .catch(err=>{
                            console.log(err)
                          })
          )
        }
        Promise.allSettled(delRequest).then(res=>{
          console.log(res);
          this.getUsers()
        })
      },
      //打开修改客户对话框
      handleChangeRow(scope) {
        /*const index=scope.$index;*/
        const data=scope.row;
        /*注入修改信息*/
        this.changeUserForm.guid=data.guid
        this.changeUserForm.name=data.name
        this.changeUserForm.password=data.password
        this.changeUserForm.agencyName=data.agencyName
        this.changeUserForm.agencyCode=data.agencyCode
        this.changeUserForm.agencyId=data.agencyId
        this.changeUserForm.idCode=data.idCode
        this.changeUserForm.upagencyId=data.upagencyId
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
  @import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
  /*通用图标大小*/
  .iconfont{
    font-size: 12px;
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
