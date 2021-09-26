<template>
    <el-container id="userList" direction="vertical" style="height: 100%;width: 100%" >
        <!--操作栏-->
        <!--<div style="width: 100%;background-color: #5fb3ec">
            <ActionBar @addBtnClick="addUserDialogVisible=true"
                       @deleteBtnClick="handleDeleteBtnClick"
                       @enableBtnClick="handleEnableBtnClick"
                       @stopBtnClick="handleEnableBtnClick"
            >用户信息明细列表</ActionBar>
        </div>-->
        <!--数据展示区-->
        <el-table
                :data="roles.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
                stripe
                border
                max-height="280"
                @selection-change="handleSelectionChange"
                style="min-height: 280px;max-width: 1200px"
        >
            <el-table-column
                    prop="name"
                    label="角色名"
            >
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="角色代码">
            </el-table-column>

            <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-select v-model="userId" placeholder="请选择用户" style="width: 120px;margin-right: 20px"
                               size="small">
                        <el-option
                                v-for="item of users"
                                :key="item.name"
                                :label="item.name"
                                :value="item.guid">
                        </el-option>
                    </el-select>
                    <el-button
                            @click.native.prevent="handleBindClick(scope)"
                            type="primary"
                            size="small">
                        <i class="iconfont icon-xiugai"></i>
                        绑定用户
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
                       :total="roles.length"
        >
        </el-pagination>

    </el-container>

</template>

<script>

    /*import {FormValidate} from "../../utils/validate"*/
    import {get} from "../../utils/request";
    export default {
        name: "Users",
        components: {},
        data() {
            return {
                userId:'',
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 4, // 每页的数据条数,
                changeUserDialogVisible:false,


                roles: [],//角色信息
                users: [],//角色信息
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
            this.getRoles()
            this.getUsers()
        },
        mounted() {

        },
        methods: {

            getRoles(){
                fetch('http://192.168.110.85:8001/bm-role/list',{
                    method:'GET',
                    headers:{
                        "Content-Type": 'application/json',
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res.data);
                        this.roles=res.data
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            /*获取用户*/
            getUsers(){
                fetch('http://192.168.110.85:8001/bm-fasp-tcauser/list',{
                    method:'GET',
                    headers:{
                        "Content-Type": 'application/json',
                    },
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res.data);
                        this.users=res.data
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            //打开修改客户对话框
            handleBindClick(scope) {
                /*const index=scope.$index;*/
                const roleId=scope.row.guid;
                const userId=this.userId;
                let userRole={};
                userRole.userId=userId;
                userRole.roleId=roleId;

                fetch('http://192.168.110.85:8001/bm-role/add/userRole',{
                    method:'POST',
                    headers:{
                        "Content-Type": 'application/json',
                    },
                    body:JSON.stringify(userRole),
                    mode:'cors'
                })
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res.data);
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                //rows.splice(index, 1);
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
                                    this.getRoles();
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
                    this.getRoles()
                })
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
