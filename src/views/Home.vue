<template>
  <a-layout id="home">
    <a-layout-header :class="background">
      <Nav :login-button-text="loginButtonText" :login-button-icon="loginButtonIcon"/>
      <div class="introduce">
        <div v-if="$route.name=='Home'">
          <h1>借咏物而寄相思</h1>
          <h6>这是借咏物而寄相思的诗，是眷怀友人之作。因物起兴，语虽单纯却富于想象；接着以设问寄语，意味深长地寄托了情思；第三句暗示珍重友谊，表面似乎嘱人相思，背面却深寓自身相思之重！</h6>
          <div class="register">
            <a-button type="primary" icon="caret-right">我来了</a-button>
          </div>
        </div>
        <div v-else>
          <h1>个人首页</h1>
          <h6>既然巅峰留不住，那就进厂包吃住！</h6>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content :class="contentMargin">
      <div v-if="$route.name=='Home'" class="nav-cards">
        <div class="card-group">
          <div class="card-a" style="cursor: pointer" @click="$router.push('./renderer')">
            <div class="bg"></div>
            <div style="margin-left: 5%">vxe-table渲染器</div>
            <span style="margin-right: 5%;align-self: flex-end">
              <a-icon type="like" style="margin-right: 3px"></a-icon>
              12.8k
              <a-icon type="share-alt" style="margin: 0 3px 0 2px"></a-icon>
              8.7k
            </span>
          </div>
          <div class="card-b">
            <span>
              <a-icon type="account-book" style="margin-right: 3px"></a-icon>
              技术
            </span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>
              <a-icon type="account-book"></a-icon>
              技术
            </span>
          </div>

        </div>
        <div class="card-group">
          <div class="card-b" style="margin-top: 0;box-sizing:border-box;top: -4.75%;background-color: #f0f2f5;color: #a7a7a7;border: 1px solid #a7a7a7">
            <span style="color: #54ad58">
              <a-icon type="account-book" style="margin-right: 3px"></a-icon>
              技术
            </span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>
              <a-icon type="account-book"></a-icon>
              技术
            </span>
          </div>
          <div class="card-a" style="margin-top: 5%" @click="$router.push('/drumKit')">
            <div class="bg"></div>
            <div style="margin-left: 5%">DrumKit</div>
            <span style="margin-right: 5%;align-self: flex-end">
              <a-icon type="clock-circle" style="margin-right: 5px"></a-icon>
              5 min ago
            </span>
          </div>
        </div>
        <div class="card-group">
          <div class="card-a">
            <div class="bg"></div>
            <div style="margin-left: 5%">hello word</div>
            <span style="margin-right: 5%;align-self: flex-end">
              <a-icon type="clock-circle" style="margin-right: 5px"></a-icon>
              5 min ago
            </span>
          </div>
          <div class="card-b" style="background-color: #54ad58">
            <span>
<!--              <i class="iconfont icon-qianduan"></i>-->
              <a-icon type="account-book" style="margin-right: 3px"></a-icon>
              技术
            </span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>Vue全家桶：vue+vuex+vue-router</span>
            <span>
              <a-icon type="account-book"></a-icon>
              技术
            </span>
          </div>
        </div>

      </div>
      <div v-else style="position: relative;top: -60px;height: 80%;background: #fff;border-radius: 10px" class="routerView"><router-view></router-view></div>
<!--      <div class="background-transition"><div class="background"></div></div>-->
    </a-layout-content>
  </a-layout>
</template>

<script >
  //import XEUtils from 'xe-utils'

  import {getToken} from "../utils/auth";
  import Nav from "../components/Nav";

  export default {
    name:'Home',
    components: {Nav},
    data(){
      return {
        name: "fall_soberly",
        background: "background1",
        loginButtonText: "登录",
        loginButtonIcon: "login",
        contentMargin: "content-margin1"
      }
    },
    created() {
      if (this.$route.name === 'Home'){
        this.background="background1"
        this.contentMargin="content-margin1"
      }
      else {
        this.background="background2"
        this.contentMargin="content-margin2"
      }
      let token = getToken()
      if (token){
        this.loginButtonText="退出";
        this.loginButtonIcon="logout";
      }
    },
    mounted() {

      window.addEventListener('scroll',this.handleScroll,true)
    },
    updated() {
      if (this.$route.name === '/menus') {
        alert('dasda')

      }
    },
    methods: {
      // 监听滚动，实现导航栏背景变化
      handleScroll(e) {
        let scrollTop = e.target.documentElement.scrollTop
        const header = document.getElementsByClassName('header')[0]
        if (scrollTop >= 300) {
          header.classList.add('header-highlight')
        } else {
          header.classList.remove('header-highlight')
        }
      }
    },
    watch:{
      $route:function(to){
        if (to.name === 'Home'){
          this.background="background1"
          this.contentMargin="content-margin1"
        }else {
          this.background="background2"
          this.contentMargin="content-margin2"
        }
      }
    },
    computed:{
      changeName:function (){
        return this.name.toUpperCase();
      }
    }
  }

</script>
<style lang="less" scoped>
@import "https://at.alicdn.com/t/font_2666070_mn7uazpcihs.css";
@keyframes backgroundMove {
  from{
    transform: translate3d(0,0,0);
  }
  to{
    transform: translate3d(0,60px,100px) scale(1.6);
  }
}
.background1{
  height: 100vh;
  background-image: linear-gradient(180deg, rgba(205, 186, 186, 0.5), rgba(0, 0, 0, 0.6)), url("../assets/imgs/bg2.jpg");
}
.background2{
  height: 50vh;
  background-image: linear-gradient(180deg, rgba(205, 186, 186, 0.5), rgba(0, 0, 0, 0.6)), url("../assets/imgs/back_xishi.png");
}
.content-margin1{
  margin-top: 45px;
  padding: 0 15%;
}
.content-margin2{
  margin-top: 0;
  padding: 0 5%;
}
#home {
  color: white;
  height: 100%;
  width: 100%;
  .ant-layout-header {
    //vw vh包含滚动条宽度
    width: 100%;
    padding: 0;
    background-size: auto auto, cover;
    background-position: left top, right bottom;
    .introduce {
      position: relative;
      width: 550px;
      top: 50%;
      left: 15%;
      transform: translateY(-50%);
      color: white;
      text-align: left;
      font-weight: 300;
      h1 {
        color: white;
        font-size: 3.3125rem;
        margin-bottom: 0.3em;
        font-family: "Roboto Slab", "Times New Roman", serif;
        font-weight: 500
      }
      h6 {
        color: white;
        font-size: 1.25em;
        line-height: 1.7;
        font-weight: 300;
      }
      .register {
        .ant-btn {
          width: 120px;
          height: 48px;
          font-size: 1.25em;
          line-height: 48px;
          font-weight: 300;
          background-color: #ff7875;
          border-color: #ff7875;
          transition: all 0.3s ease-in-out;
          //background-color: #49a54d;
          &:hover {
            transform: scale(0.8);
            background-color: #ff4d4f;
            border-color: #ff4d4f;
          }
        }
      }
    }
  }
  .ant-layout-content {
    height: 100vh;
    width: 100%;
    background-color: #e7e7e7;
    .nav-cards {
      width: 100%;
      height: 480px;
      background-color: #f0f2f5;
      display: flex;
      justify-content: space-between;
      .card-group {
        width: 30%;
        height: 100%;
        .card-a {
          position: relative;
          width: 100%;
          height: 50%;
          background-color: inherit;
          color: #a7a7a7;
          border: 1px solid #a7a7a7;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 16px;
          font-weight: 300;
          transition: all 0.3s ease-in-out;
          &:hover {
            box-shadow: 1px 1px 1px 1px #a7a7a7;
          }
          .bg {
            width: 90%;
            height: 70%;
            position: relative;
            border-radius: 8px;
            top: -10%;
            left: 5%;
            background-image: url("../assets/imgs/b2.jpg");
            background-size: cover;
            box-shadow: 0 3px 6px 3px rgba(0, 0, 0, 0.51);
          }
        }

        .card-b {
          position: relative;
          width: 100%;
          height: 40%;
          margin-top: 5%;
          background-color: #0db5c9;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 16px;
          font-weight: 300;
          padding: 10% 5%;

          & > span:nth-child(2), :nth-child(3) {
            padding-top: 15px;
          }

          & > span:nth-child(4) {
            align-self: flex-end;
            padding-top: 15px;
          }
        }
      }
    }
    .background-transition {
      width: 100%;
      height: 40%;
      overflow: hidden;
      .background{
        width: 100%;
        height: 100%;
        background: url("../assets/imgs/back_xishi.png") 0 0 no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        &:hover {
          animation: 2s ease-in 0s 1 normal both running backgroundMove;
        }
      }
    }
  }
}
@keyframes sk-scaleout {
  0% {
    background-color: inherit;
  }
  50% {
    background-color: rgba(203, 208, 208, 0.3);
  }
  100% {
    background-color: inherit;
  }
}
</style>
