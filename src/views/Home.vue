<template>
  <a-layout id="home">
    <a-layout-header>
      <div class="header">
        <div class="logo" @click="$router.go(0)"></div>
        <div>
          <a-dropdown placement="bottomCenter" class="nav" trigger="click" overlayClassName="home-nav">
            <a-button icon="menu">功能板块<a-icon type="down"></a-icon></a-button>
            <a-menu slot="overlay" mode="horizontal">
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">前端</a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">后端</a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">笔记</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-button class="login-button" icon="user" shape="round" @click="login">登录</a-button>
        </div>
      </div>

      <div class="introduce">
        <h1>借咏物而寄相思</h1>
        <h6>这是借咏物而寄相思的诗，是眷怀友人之作。因物起兴，语虽单纯却富于想象；接着以设问寄语，意味深长地寄托了情思；第三句暗示珍重友谊，表面似乎嘱人相思，背面却深寓自身相思之重！</h6>
        <div class="register">
          <a-button type="primary" icon="caret-right">我来了</a-button>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="nav-cards">
        <div class="card-group">
          <div class="card-a" style="cursor: pointer" @click="$router.push('./renderer')">
            <div class="bg"></div>
            <div style="margin-left: 5%">vxe-table渲染器</div>
            <span style="margin-right: 5%;align-self: flex-end">
              <a-icon type="like" style="margin-right: 3px"></a-icon>
              12.0k
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
      <div class="background-transition"><div class="background"></div></div>
    </a-layout-content>
  </a-layout>
</template>

<script >
  //import XEUtils from 'xe-utils'

  export default {
    name:'Home',
    data(){
      return {
      }
    },
    created() {
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll,true)
    },
    methods: {
      // 登录跳转
      login() {
        this.$router.push('/login')
      },
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
#home {
  color: white;
  height: 100%;
  width: 100%;
  .ant-layout-header {
    //vw vh包含滚动条宽度
    width: 100%;
    height: 100vh;
    padding: 0;
    background-image: linear-gradient(180deg, rgba(205, 186, 186, 0.5), rgba(0, 0, 0, 0.6)), url("../assets/imgs/bg2.jpg");
    background-size: auto auto, cover;
    background-position: left top, right bottom;
    .header {
      //width: 928px;
      width: 100%;
      height: 64px;
      padding: 0 15%;
      position: fixed;
      display: flex;
      transition: background-color 0.3s ease-in-out;
      z-index: 1;
      justify-content: space-between;
      align-items: center;
      .logo {
        width: 120px;
        height: 32px;
        text-align: left;
        font-size: 1.5em;
        background: url("../assets/imgs/logo.png");
        background-size: cover;
        cursor: pointer;
        /*设置大了也没关系，弹性布局会自适应*/
        //margin-right: 772px;
        line-height: 32px;
      }
      .nav {
        height: 32px;
        line-height: 32px;
        margin-right: 20px;
        background-color: inherit;
        border: inherit;
        color: #fff;
        transition: background-color 0.3s ease-in-out;

        .anticon-down {
          transition: transform 0.3s ease-in-out;
        }

        &:focus {
          background-color: rgba(203, 208, 208, 0.15);
          //animation: sk-scaleout 1s ease-in-out;
          .anticon-down {
            transform: translateY(-1px) rotate(180deg);
          }
        }
      }
    }
    .header-highlight {
      //width: 928px;
      width: 100%;
      height: 64px;
      padding: 0 15%;
      position: fixed;
      display: flex;
      background-color: #00acc1;
      border-bottom: 0;
      box-shadow: 0px 3px 6px 3px rgba(0, 0, 0, 0.51);
      border-radius: 5px;
      z-index: 1;
      justify-content: space-between;
      align-items: center;
    }
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
    padding: 0 15%;
    margin-top: 45px;
    background-color: rebeccapurple;
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
