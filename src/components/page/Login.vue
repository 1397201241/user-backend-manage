<template>
    <el-container id="login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login_form" >
            <el-form-item style="margin-top: 20px">
                <span style="font-size: 20px;color: #22ccdd;line-height: 40px;">预算管理一体化系统</span>
            </el-form-item>
            <el-form-item prop="username" style="width: 390px;margin-top: 20px" >
                <el-input ref="username" v-model="loginForm.username" prefix-icon="el-icon-user" type="text"
                          placeholder="账号" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item style="width: 390px" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" ref="password"
                          v-model="loginForm.password" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" class="verification-code" style="width: 390px">
                <el-container>
                    <el-input
                            prefix-icon="el-icon-lock"
                            v-model="loginForm.verificationCode"
                            ref="verificationCode"
                            placeholder="验证码"
                            tabindex="3"
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

            <el-button type="primary" style="width:390px;margin-bottom:20px;"
                       @click.prevent="">
                登录
            </el-button>
        </el-form>
    </el-container>
</template>

<script>
    import {FormValidate} from "../../utils/validate";

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
            return {
                verificationC:'',
                loginForm:{
                    username:'',
                    password:'',
                    verificationCode:''
                },
                loginRules:{
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

        },
        mounted() {
            this.createCode()
        },
        methods:{
            // 获得验证码
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
            //登录
            /*handleLogin() {
                this.$refs['loginForm'].validate(valid=>{
                    if (valid){
                        //创建加密对象实例
                        let jsEncrypt=new JSEncrypt();
                        //获取公钥并加密
                        this.$store.dispatch('login/getPublicKey').then(
                            publicKey=>{
                                //设置加密公钥
                                jsEncrypt.setPublicKey(publicKey);
                                //密码加密
                                let encryptPassword=jsEncrypt.encrypt(this.loginForm.password);
                                //匹配验证
                                this.authenticationUser(this.loginForm.username,encryptPassword)
                            }
                        )
                    }
                    else {
                        this.$notify.error({
                            title: '登录失败！'
                        });
                    }
                });

            },*/

        }
    }
</script>

<style scoped>
    #login{
        background-image:url('./../../assets/imgs/background.jpg');
        position: absolute;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        top:0;
        left:0;

    }
    #login .login_form{
        background: #fff;
        padding: 0 25px;
        /*background-color: #B3C0D1;*/
        position: absolute;
        top:50%;
        left:50%;
        transform:translateX(-50%) translateY(-50%);
        opacity: 0.7;
        max-width: 100%;
        overflow: hidden;
    }


</style>
