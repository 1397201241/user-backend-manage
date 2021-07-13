<template>
    <el-container direction="vertical">
        <!--搜索框-->
        <QueryPanel :queryModel="customerQuery" @QueryButtonClick="onQueryBtnClick">
            <el-form-item label="姓名" style="margin-right: 10px">
                <el-input v-model="customerQuery.name" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="customerQuery.mobile" style="width: 200px"/>
            </el-form-item>
        </QueryPanel>
        <!--操作栏-->
        <el-container class="action_bar">
            <el-button type="primary">添加</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">复制</el-button>
            <el-button type="primary">导出</el-button>
        </el-container>
        <!--数据展示-->
        <el-table
                :data="role_permissions"
                stripe
                border
                @selection-change="handleSelectionChange"
                style="width: 1000px;margin-top: 30px">
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
                    prop="name"
                    label="角色名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="角色描述"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    label="权限"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-checkbox-group border="true" size="mini" v-model="role_permissions[scope.$index].permissionsCN" @change="changeRolePermission($event,scope.$index)">
                        <el-checkbox-button v-for="permission in ALL_PERMISSIONS_CN" :label="permission" :key="permission">{{permission}}</el-checkbox-button>
                    </el-checkbox-group>
                </template>
            </el-table-column>
            <!--<el-table-column
                    prop="action"
                    label="操作"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="changeRow(scope.$index, roles)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                    <el-button
                            :disabled="!$store.state.login.permissions.includes('DELETE_USER')"
                            @click.native.prevent="deleteRow(scope.$index, roles)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <!--

        <el-dialog
                title="添加角色"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="addRoleForm" :rules="rules" ref="ruleForm" label-width="100px" id="addCustomer" class="demo-ruleForm">
                <el-form-item label="角色ID" prop="id">
                    <el-input v-model.number="addRoleForm.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="addRoleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="description" prop="tel">
                    <el-input v-model="addRoleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddBtnClick('ruleForm')">立即添加</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="角色信息修改"
                :visible.sync="changeVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="changeRole" :rules="rules" ref="ruleForm" label-width="100px" id="changeCustomer" class="demo-ruleForm">
                <el-form-item label="角色ID" prop="id">
                    <el-input v-model.number="changeRole.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="changeRole.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="changeRole.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onChangeBtnClick('ruleForm')">立即修改</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        -->
    </el-container>
</template>

<script>
    import QueryPanel from "../../components/common/QueryPanel";
    import {del, get, post, put} from "../../utils/request";
    import {changeRolePermission, getPermission, getRole, getRolePermission} from "../../api/user";
    const ALL_PERMISSIONS_CN = ['添加用户', '修改用户', '搜索用户', '删除用户','修改用户角色'];
    const ALL_PERMISSIONS = ['ADD_USER', 'CHANGE_USER', 'SEARCH_USER', 'DELETE_USER','CHANGE_ROLE'];
    export default {
        name: "RoleList",
        components: {QueryPanel},
        data() {
            return {
                role_permissions:[],
                ALL_PERMISSIONS_CN,
                multipleSelection:[],
                //对话框状态
                dialogVisible:false,
                changeVisible:false,
                //修改的客户姓名，手机号码
                customerQuery:{name:'',mobile:''},
                //客户信息
                roles: [],
                //添加的客户
                addRoleForm: {
                    id:'',
                    name: '',
                    description: '',
                },
                //修改的客户
                changeRole:{
                    ID:'',
                    sex:'',
                    name: '',
                    address: '',
                    tel: ''
                },
                //表单校验
                rules: {
                    id: [
                        { required: true, message: '请输入角色ID', trigger: 'blur' },
                        { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入角色名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created:function(){
            // 初始化状态
            this.getRoleList();
            this.getRolePermissionList();
        },
        mounted() {

        },
        methods: {
            //获取角色对应的权限
            getRolePermissionList(){
                getRole()
                    .then(
                        myJson=>{
                            for (const role of myJson){
                                let mergeInfo=role;
                                getRolePermission(role.id)
                                    .then(myJson=>{
                                        mergeInfo.permission_id=myJson.permission_id;
                                        mergeInfo.rid=myJson.rid;
                                        mergeInfo.id=myJson.id;
                                        let permissionRequest=[];
                                        let permissions=[];
                                        let permissionsCN=[];
                                        for (const id of myJson.permission_id){
                                            permissionRequest.push(
                                                //获取权限ID对应的权限
                                                getPermission(id)
                                                    .then(permissionJson=>permissionJson.title)
                                                    .catch(err=>{
                                                        console.log(err)
                                                    })
                                            )
                                        }
                                        Promise.allSettled(permissionRequest).then(res=>{
                                            for (const item of res){
                                                if(item.status==='fulfilled'){
                                                    permissions.push(item.value)
                                                    permissionsCN.push(ALL_PERMISSIONS_CN[ALL_PERMISSIONS.indexOf(item.value)])
                                                }
                                            }
                                        }).then(()=>{
                                            mergeInfo.permissions=permissions;
                                            mergeInfo.permissionsCN=permissionsCN;
                                            this.role_permissions.push(mergeInfo)
                                        }).catch(err=>{
                                            console.log(err)
                                        });
                                    })
                            }
                        }
                    )
                    .catch(err=> console.log(err));
            },
            //修改角色权限
            changeRolePermission(e,index){
                let permission_id=[];
                for (const permission of e){
                    permission_id.push(ALL_PERMISSIONS_CN.indexOf(permission)+1);
                }
                //默认排序
                permission_id.sort();
                let newRolePermission={};
                newRolePermission.id=this.role_permissions[index].id;
                newRolePermission.rid=this.role_permissions[index].rid;
                newRolePermission.permission_id=permission_id;
                changeRolePermission(newRolePermission.id, newRolePermission)
                    .then(()=>{
                            this.$store.dispatch('login/getInfo').catch(err=>{
                                console.log(err)
                            })
                        }
                    )
            },
            //获取客户列表,更新表格
            getRoleList() {
                getRole()
                    .then(
                        myJson => {
                            this.roles = myJson;
                        })
                    .catch(err => console.log(err));
            },
            //查询客户
            onQueryBtnClick() {
                let {name, mobile} = this.customerQuery;
                if (name !== '') {
                    get("http://localhost:3000/customer?name=" + name)
                        .then(
                            myJson => {
                                this.roles = myJson;
                            }
                        ).catch(err => console.log(err));
                } else if (mobile !== '') {
                    get("http://localhost:3000/customer?mobile=" + mobile)
                        .then(
                            myJson => {
                                this.roles = myJson;
                            }
                        ).catch(err => console.log(err));
                } else alert("请输入您要查询的名字或手机号码")
            },
            //添加客户
            onAddBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newCustomer = {
                            "id": this.$refs[formName].model.id,
                            "name": this.$refs[formName].model.name,
                            "description": this.$refs[formName].model.description
                        };
                        if (newCustomer) {
                            post("http://localhost:3000/role", newCustomer)
                                .then(
                                    myJson => {
                                        console.log(myJson);
                                        this.getRoleList();
                                    }
                                ).catch(err => console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.dialogVisible = false
            },
            //修改客户信息
            onChangeBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newRole={
                            "id": this.$refs[formName].model.id,
                            "name":this.$refs[formName].model.name,
                            "description": this.$refs[formName].model.description
                        };
                        if (newRole){
                            put("http://localhost:3000/customer/"+newRole.id, newRole)
                                .then(
                                    myJson=>{
                                        console.log(myJson);
                                        this.getRoleList();
                                        console.log(this.roles);
                                    }
                                ).catch(err=> console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.changeVisible=false
            },
            //删除客户信息
            deleteRow(index, rows) {
                let deleteRole=rows[index];
                if (deleteRole){
                    del("http://localhost:3000/role/"+deleteRole.id)
                        .then(
                            myJson=>{
                                console.log(myJson);
                                this.getRoleList();
                                console.log(this.roles);
                            }
                        ).catch(err=> console.log(err));
                }
            },
            //打开修改客户对话框
            changeRow(index, rows) {
                this.changeRole=rows[index];
                this.changeVisible=true;
                //rows.splice(index, 1);
            },
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //取消按钮
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible=false;
                this.changeVisible=false
            },
            //关闭对话框提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done();
                    })
                    .catch(()=> {});
            }
        }
    }
</script>

<style scoped>
    /*#userList .action_bar{
        width: 300px;
        margin-left: 90px;
    }
    #userList .addButton{
        background-color: #ccc;
        border-color: #ccc;
    }*/
</style>
