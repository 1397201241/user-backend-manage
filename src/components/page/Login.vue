<template>
  <div id="login">
    <a-form-model
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        align="left"
    >
      <a-form-model-item style="font-size: 20px;color: #22ccdd;text-align: center">
        预算管理一体化系统
      </a-form-model-item>
      <a-form-model-item has-feedback ref="username" prop="username" >
        <a-input
            v-model="loginForm.username"
            placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item has-feedback ref="password" prop="password">
        <a-input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item class="verification-code" prop="verificationCode">
        <a-input
            v-model="loginForm.verificationCode"
            ref="verificationCode"
            placeholder="验证码"
            :maxLength=5
            autocomplete="off"
            style="margin-right: 15px"
        >
          <i slot="prefix" class="iconfont icon-xiugai"></i>
        </a-input>
        <img :src="verificationC" style="height: 32px;width: 128px;cursor: pointer" @click="getVerificationCode">
<!--        <canvas id="canvas"
                ref="code"
                width="120px"
                height="32px"
                style="margin-left: 20px;background-color: #c6e2ff"
                @click="createCode"
        >
        </canvas>-->
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" href="">
          Forgot password
        </a>
        <a-button type="primary" :loading="loading" html-type="submit" class="login-form-button" @click.prevent="handleLogin">
          Log in
        </a-button>
        <div>
          Or
          <a href="">
            register now!
          </a>
        </div>
      </a-form-model-item>
    </a-form-model>
    <div class="login-footer">
      <div class="hello">
        <span>关于我们</span>
        <span>|</span>
        <span>诚聘菜鸡</span>
        <span>|</span>
        <span>联系我们</span>
      </div>
      <div style="margin: 0 auto;padding-top: 10px">
        <span>ICP证：邕B2-20210087</span>
      </div>
    </div>
  </div>
</template>

<script>
import {FormValidate} from "../../utils/validate";
import {JSEncrypt} from "jsencrypt";

import {getVerificationCode} from "../../api/user";
//import {setToken, setUsernameToken} from "../../utils/auth";

export default {
  name: "Login",
  data() {
    return {
      verificationC: '',//验证码
      loginForm: {//登录表单
        username: 'admin',
        password: '222222',
        verificationCode: 'nnccb',
        key: '8dfbc8bf-ee0f-45da-9018-72eac399e85d'
      },
      loading:false,
      loginRules: { //登录校验
        username: [
          {validator: FormValidate().Form().Name, trigger: 'blur'},
          {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
        ],
        password: [
          {
            validator: FormValidate().Form().Password,
            trigger: 'blur'
          }
        ],
        verificationCode: [
          {
            validator: FormValidate().Form().ValidateVerificationCode,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  beforeCreate() {

  },
  created() {
    // this.$store.commit('tab_info/CLEAN_TABS');
    // this.getAccount()
    this.getVerificationCode()
  },
  mounted() {
    //this.createCode()
  },
  methods: {
    // 获取验证码
    getVerificationCode() {
      return getVerificationCode().then(res => {
            this.verificationC = res.data.base64Img;
            this.loginForm.key=res.data.key
          }
      )
          .catch(err => new Error("获取验证码" + err));
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading=true
          // todo: qs => data
          // todo: api封装
          let {loginForm} = this
          this.$store.dispatch('userInfo/login',{loginForm}).then(res=>{
            this.$message.success(res.data)
            this.$router.push('/')
            // todo: 判断用户是否登录
          }).catch(err=>{
            new Error("登录失败："+err)
          })
          /*login(this.loginForm)
              .then( res => {
                    if (res.status === 200) {
                      setToken(res.headers.authorization)
                      this.$router.push('/')
                    }
                  }
              )
              .catch(err => new Error("登录失败" + err));*/
          /*let loginForm = {};
          loginForm.username = this.loginForm.username;
          loginForm.password = this.loginForm.password;
          /!*fetch('http://192.168.110.85:8001/login', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
            },
            /!*credentials:"include",*!/
            mode: "cors",
            body: querystring.stringify(loginForm)
          })
              .then(res => {
                console.log(res)
                let token = res.headers.get('Authorization');
                setUsernameToken(username);
                setToken(token);
                return res.json()
              })
              .then(res => {
                if (res.code === 200) {
                  this.$router.push({
                    path: '/',
                    params: {
                      username,
                    }
                  });
                }
              })
              .catch(error => {
                console.log(error)
              });*!/
          //创建加密对象实例
          let jsEncrypt=new JSEncrypt();
          //获取公钥并加密
          this.$store.dispatch('userInfo/getPublicKey').then(
              publicKey=>{
                  //设置加密公钥
                  jsEncrypt.setPublicKey(publicKey);
                  //密码加密
                  let encryptPassword=jsEncrypt.encrypt(this.loginForm.password);
                  //匹配验证
                  this.authenticationUser(this.loginForm.username,encryptPassword)
              }
          )*/
        } else {
          this.$notify.error({
            title: '验证失败！'
          });
        }
      });
    },
    /**
     *模拟后台用户验证
     */
    authenticationUser(username, encryptPassword){
      let usernames=[];
      for (let user of this.$store.state.userInfo.users){
        usernames.push(user['username'])
      }
      //用户存在判断
      if (usernames.includes(username)){
        //创建解密对象实例
        let jsEncrypt=new JSEncrypt();
        this.$store.dispatch('userInfo/getPrivateKey').then(
            //私钥
            privateKey=>{
              //设置解密的私钥
              jsEncrypt.setPrivateKey(privateKey);
              //密码解密
              let decryptPassword=jsEncrypt.decrypt(encryptPassword);
              this.$store.dispatch('userInfo/authenticationUser',{username,decryptPassword}).then(()=>{
                this.$router.push({
                  path:'/',
                  query:{
                    user:{username},
                  }
                });
                this.$notify.success({
                  duration:1500,
                  title: '登录成功！'
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
    /*创建验证码*/
    /*createCode() {
      let canvas = this.$refs.code;
      let context = canvas.getContext('2d');
      // eslint-disable-next-line no-unused-vars
      let verification_code = "";
      draw();
      this.verificationC = verification_code;
      //绘制图形
      function draw() {
        //每次绘画前，清空画板
        context.clearRect(0, 0, 120, 42);
        //顶个边框
        context.strokeRect(0, 0, 120, 42);
        //设置随机数选项
        let aCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g',
          'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        //画出随机数
        for (let i = 0; i < 4; i++) {
          let x = 20 + 20 * i;
          let y = 15 + 5 * Math.random();

          let index = Math.floor(Math.random() * aCode.length);
          let txt = aCode[index];
          verification_code += txt;
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
        /!*!//设置干扰线 8条
        for (let i = 0; i < 8; i++) {
            context.beginPath();
            context.moveTo(Math.random() * 120, Math.random() * 42);
            context.lineTo(Math.random() * 120, Math.random() * 42);
            context.strokeStyle = getColor();
            context.stroke();
        }*!/
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
    },*/

    /*获取用户账号密码*/
    getAccount(){
        this.$store.dispatch('userInfo/getUser')
    },

  }
}
</script>

<style lang="less">
@keyframes shake-baidu {
  from {
    transform: rotate(0deg);
  }
  4% {
    transform: rotate(5deg);
  }
  12.5% {
    transform: rotate(-5deg);
  }
  21% {
    transform: rotate(5deg);
  }
  29% {
    transform: rotate(-5deg);
  }
  37.5% {
    transform: rotate(5deg);
  }
  46% {
    transform: rotate(-5deg);
  }
  50%, to {
    transform: rotate(0deg);
  }
}
@import "https://at.alicdn.com/t/font_2666070_zpx1dwunyrc.css?spm=a313x.7781069.1998910419.40&file=font_2666070_zpx1dwunyrc.css";
.verification-code .iconfont{
  color: #b5bbc0;
  font-size: 12px;
}
#login {
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.6)), url('./../../assets/imgs/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-form {
    margin: 10% 10% auto auto;
    background: #fff;
    padding: 30px 24px 0;
    opacity: 0.5;
    max-width: 100%;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 .5em #b4a078;
    animation: shake-baidu 2s ease 0s 1;
    .login-form-forgot {
      float: right;
    }
    .login-form-button {
      width: 100%;
    }
  }
  .login-footer {
    margin: 20px auto auto;
    cursor: pointer;
    .hello {
      span:first-child, :nth-child(3), :nth-child(5) {
        padding: 0 10px;
        height: 16px;
        transition: color 0.2s ease-in-out;
        &:hover {
          color: #5fb3ec;
        }
      }
    }
  }
}

.verification-code .ant-form-item-children {
  display: flex;
}
</style>
