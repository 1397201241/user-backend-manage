<template>
  <div>
    <el-form>
      <el-form-item label="ddd">
        <el-input prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>



export default {
  name:'Index',
  components: {},
  comments:{
  },
  data() {
    return {
      user:{},
      information: {
        id:'',
        sex:'',
        name: '',
        address: '',
        tel: ''
      },
      isCollapse:true,
      avatar_src:'https://i.pinimg.com/236x/3f/e6/d1/3fe6d15edd844b6a47f5b6693cd20dc8.jpg',
      scale_down:"scale-down",
      //表单校验
      rules: {
        id: [
          { required: true, message: '请输入customerID', trigger: 'blur' },
          { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
        ],
        role:[
          { required: true, message: '请输入客户性别', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            message: '请输入正确的手机号码',
          },
        ]
      }
    }
  },
  created() {
    console.log(window.screen.width );
    console.log(window.screen.height );
  },
  mounted() {
    this.user=this.$route.query.user;
    this.getInfo();
  },
  updated() {

  },
  methods:{
    getInfo(){
      console.log(this.$store.state.login.info[0]);
      this.information=this.$store.state.login.info[0]
    },
    logout(){
      //清除cookie
      //清除用户信息
      this.$store.commit('login/SET_INFO',[]);
      //清除权限
      this.$store.commit('login/SET_PERMISSIONS',[]);
      //清除token
      this.$store.commit('login/SET_TOKEN','');
      //跳转
      this.$router.push({
        path:'/'
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{

  },
  watch:{
    /*'$route'(to,from){
        this.where=this.$route.meta.title
        console.log(this.$route.meta.title)
        /!*if (to.path==='/Home'){
            this.where='首页'
        }
        if (to.path==='/Home/UserList'){
            this.where='客户管理'
        }
        if (to.path==='/Home/ShoppingCart'){
            this.where='购物车管理'
        }*!/
        console.log(from.path);
    }*/
  }
};
</script>

<style scoped>


/*.menu-title{
    padding-left: 0;
}*/
#home .el-header {
  background-color: #ebeef5;
  line-height: 60px;
  cursor: pointer;
}
#home .el-header .myBreadcrumb{
  float: left;
  line-height: inherit;
  width: 150px;
}
#home .user-avatar{
  height: 56px;
  cursor: pointer;
}
#home .user-avatar .user-info span{
  height: 28px;
  line-height: 20px;
  text-align: left;
  font-size: 20px
}


</style>
