<template>
    <el-container id="login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login_form" >
            <el-form-item style="margin-top: 20px">
                <span style="font-size: 20px;color: #22ccdd;line-height: 40px;">预算管理一体化系统</span>
            </el-form-item>
            <!--用户名-->
            <el-form-item prop="username" style="width: 390px" >
                <el-input ref="username" v-model="loginForm.username" prefix-icon="el-icon-user" type="text"
                          placeholder="账号" autocomplete="on"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item style="width: 390px" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" ref="password"
                          v-model="loginForm.password" autocomplete="on"></el-input>
            </el-form-item>
            <!--验证码-->
            <el-form-item prop="verificationCode" class="verification-code" style="width: 390px">
                <el-container>
                    <el-input
                            prefix-icon="el-icon-circle-check"
                            v-model="loginForm.verificationCode"
                            ref="verificationCode"
                            placeholder="验证码"
                            maxlength="4"
                            autocomplete="off"
                    />
                    <canvas id="canvas"
                            ref="code"
                            width="120px"
                            height="40px"
                            style="float: right;background-color: #c6e2ff;margin-left: 20px"
                            @click="this.createCode"
                    >
                    </canvas>
                </el-container>
            </el-form-item>
            <!--登录按钮-->
            <el-button type="primary" style="width:390px;margin-bottom:20px;"
                       @click.prevent="handleLogin">
                登录
            </el-button>
        </el-form>
    </el-container>
</template>

<script>
    import {FormValidate} from "../../utils/validate";
    import JSEncrypt from 'jsencrypt'
    import querystring from 'querystring';
    import {setToken, setUsernameToken} from "../../utils/auth";
    export default {

        name: "Login",
        data(){
            /*验证码校验*/
            const validateVerificationCode = (rule,value,callback)=>{
                if (!value){
                    callback(new Error('请输入验证码'));
                }
                if (value!==this.verificationC){
                    callback(new Error('验证码错误'));
                }else{
                    callback();
                }
            };
            /*const validateUserName = (rule,value,callback)=>{
              console.log("??")
            }*/
            return {
                verificationC:'',//验证码
                loginForm:{//登录表单
                    username:'',
                    password:'',
                    verificationCode:''
                },
                loginRules:{ //登录校验
                    username:[
                        {
                            validator:FormValidate().Form().Name,
                            trigger:'blur'
                        },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
                    ],
                    password:[
                        {
                            validator:FormValidate().Form().Password,
                            trigger: 'blur'
                        }
                    ],
                    verificationCode:[
                        {
                            validator:validateVerificationCode,
                            trigger:'blur'
                        }
                    ]
                }
            }
        },
        created() {
            this.$store.commit('tab_info/CLEAN_TABS');
            //this.getAccount()

        },
        mounted() {
            this.createCode()
        },
        methods:{

            /*模拟后台用户验证*/
            authenticationUser(username, encryptPassword){
                let users=[];
                for (let user of this.$store.state.user_info.user){
                    users.push(user['username'])
                }
                //用户存在判断
                if (users.includes(username)){
                    //创建解密对象实例
                    let jsEncrypt=new JSEncrypt();
                    this.$store.dispatch('user_info/getPrivateKey').then(
                        //私钥
                        privateKey=>{
                            //设置解密的私钥
                            jsEncrypt.setPrivateKey(privateKey);
                            //密码解密
                            let decryptPassword=jsEncrypt.decrypt(encryptPassword);
                            this.$store.dispatch('user_info/authenticationUser',{username,decryptPassword}).then(()=>{
                                this.$router.push({
                                    path:'/',
                                    query:{
                                        user:{username},
                                        // user:user
                                    }
                                });
                                this.$notify.success({
                                    title: '登录成功！',
                                    duration:1500
                                });
                            });
                        }
                    )

                }else {
                    this.$notify.error({
                        title: '用户不存在！'
                    });
                }
            },
            /*获取用户账号密码*/
            getAccount(){
                this.$store.dispatch('user_info/getUser')
            },
            /*登录*/
            handleLogin() {
                this.$refs['loginForm'].validate(valid=>{
                    if (valid){
                        let loginForm={};
                        const username=this.loginForm.username;
                        loginForm.username=this.loginForm.username;
                        loginForm.password=this.loginForm.password;
                        fetch('http://192.168.110.85:8001/login',{
                            method:'POST',
                            headers:{
                                "Content-Type": 'application/x-www-form-urlencoded',
                                /*"Accept": 'application/json;charset=UTF-8',*/
                                /*"Content-Type": 'application/json',*/
                            },
                            /*credentials:"include",*/
                            mode:"cors",
                            body:querystring.stringify(loginForm)
                            })
                            .then(res=>{
                              console.log(res)
                                let token=res.headers.get('Authorization');
                                setUsernameToken(username);
                                setToken(token);
                                return res.json()
                            })
                            .then(res=>{
                                if (res.code===200){
                                    this.$router.push({
                                        path:'/',
                                        params:{
                                            username,
                                        }
                                    });
                                }
                            })
                            .catch(error=>{
                                console.log(error)
                            });
                        /*//创建加密对象实例
                        let jsEncrypt=new JSEncrypt();
                        console.log(jsEncrypt)
                        //获取公钥并加密
                        this.$store.dispatch('user_info/getPublicKey').then(
                            publicKey=>{
                                //设置加密公钥
                                jsEncrypt.setPublicKey(publicKey);
                                //密码加密
                                let encryptPassword=jsEncrypt.encrypt(this.loginForm.password);
                                //匹配验证
                                this.authenticationUser(this.loginForm.username,encryptPassword)
                            }
                        )*/
                    }
                    else {
                        this.$notify.error({
                            title: '登录失败！'
                        });
                    }
                });
            },
            /*创建验证码*/
            createCode () {
                let canvas = this.$refs.code;
                let context = canvas.getContext('2d');
                // eslint-disable-next-line no-unused-vars
                let verification_code="";
                draw();
                console.log(verification_code);
                this.verificationC=verification_code;
                //绘制图形
                function draw() {
                    //每次绘画前，清空画板
                    context.clearRect(0, 0, 120, 42);
                    //顶个边框
                    context.strokeRect(0, 0, 120, 42);
                    //设置随机数选项
                    let aCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a','b', 'c', 'd', 'e', 'f', 'g',
                        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                    //画出随机数
                    for (let i = 0; i < 4; i++) {
                        let x = 20 + 20 * i;
                        let y = 20 + 10 * Math.random();
                        let index = Math.floor(Math.random() * aCode.length);
                        let txt = aCode[index];
                        verification_code+=txt;
                        context.font = 'bold 25px 微软雅黑';
                        context.fillStyle = getColor();
                        //从此步开始，为字母旋转
                        context.translate(x, y);
                        let deg = Math.random() * 70 * Math.PI / 180;
                        context.rotate(deg);
                        context.fillText(txt, 0, 0);
                        context.rotate(-deg);
                        context.translate(-x, -y);
                    }
                    /*//设置干扰线 8条
                    for (let i = 0; i < 8; i++) {
                        context.beginPath();
                        context.moveTo(Math.random() * 120, Math.random() * 42);
                        context.lineTo(Math.random() * 120, Math.random() * 42);
                        context.strokeStyle = getColor();
                        context.stroke();
                    }*/
                    //设置干扰点 20 个
                    for (let i = 0; i < 20; i++) {
                        context.beginPath();
                        let x = Math.random() * 120;
                        let y = Math.random() * 42;
                        context.moveTo(x, y);
                        context.lineTo(x + 1, y + 1);
                        context.strokeStyle = getColor();
                        context.stroke();
                    }
                }
                //获取随机颜色
                function getColor() {
                    let r = Math.floor(Math.random() * 256);
                    let g = Math.floor(Math.random() * 256);
                    let b = Math.floor(Math.random() * 256);
                    return `rgb(${r}, ${g}, ${b})`
                }
            },
        }
    }
</script>

<style scoped lang="less">
    #login{
        background-image:url('./../../assets/imgs/background.jpg');
        position: absolute;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        top:0;
        left:0;
        .login_form{
            display: flex;
            flex-direction: column;
            margin: auto;
            background: #fff;
            padding: 0 25px;
            opacity: 0.7;
            max-width: 100%;
            overflow: hidden;
            border-radius: 3px;
            box-shadow: 0 0 .5em #b4a078;
            animation: shake-baidu 2s ease 0s 1;

        }

    }
    @keyframes shake-baidu {
        from    { transform: rotate(0deg); }
        4%      { transform: rotate(5deg); }
        12.5%   { transform: rotate(-5deg); }
        21%     { transform: rotate(5deg); }
        29%     { transform: rotate(-5deg); }
        37.5%   { transform: rotate(5deg); }
        46%     { transform: rotate(-5deg); }
        50%,to  { transform: rotate(0deg); }
    }



</style>
