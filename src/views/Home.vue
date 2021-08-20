<template>
  <a-layout id="home">
    <a-layout-header>
      <div class="header">
        <div class="logo"><em>LOGO</em></div>
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
        <div class="card-group"></div>
        <div class="card-group"></div>
        <div class="card-group"></div>

      </div>
    </a-layout-content>
  </a-layout>
</template>

<script >
  export default {
    name:'Home',
    data(){
      return {

      }
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll,true)
    },
    methods:{
      login(){
        this.$router.push('/login')
      },
      //监听滚动，实现导航栏背景变化
      handleScroll(e){
        let scrollTop=e.target.documentElement.scrollTop
        const header=document.getElementsByClassName('header')[0]
        if (scrollTop>=300){
          header.classList.add('header-highlight')
        }else {
          header.classList.remove('header-highlight')
        }
      }
    }
  }

</script>
<style lang="less" scoped>

#home{
  color: white;
  height: 100%;
  width: 100%;
  .ant-layout-header{
    //vw vh包含滚动条宽度
    width: 100%;
    height: 100vh;
    padding: 0;
    background-image: linear-gradient(180deg, rgba(205, 186, 186, 0.5), rgba(0, 0, 0, 0.6)), url("../assets/imgs/bg2.jpg");
    background-size: auto auto,cover;
    background-position: left top,right bottom;
    .header{
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
        /*设置大了也没关系，弹性布局会自适应*/
        //margin-right: 772px;
        line-height: 32px;
      }
      .nav{
        height: 32px;
        line-height: 32px;
        margin-right: 20px;
        background-color: inherit;
        border: inherit;
        color: #fff;
        transition: background-color 0.3s ease-in-out;
        .anticon-down{
          transition: transform 0.3s ease-in-out;
        }
        &:focus{
          background-color: rgba(203, 208, 208, 0.15);
          //animation: sk-scaleout 1s ease-in-out;
          .anticon-down{
            transform: translateY(-1px) rotate(180deg);
          }
        }
      }
    }
    .header-highlight{
      //width: 928px;
      width: 100%;
      height: 64px;
      padding: 0 15%;
      position: fixed;
      display: flex;
      background-color: #00acc1;
      border-bottom: 0;
      box-shadow: 0px 3px 6px 3px rgba(0,0,0,0.51);
      border-radius: 5px;
      z-index: 1;
      justify-content: space-between;
      align-items: center;
    }
    .introduce{
      position: relative;
      width: 550px;
      top: 50%;
      left: 15%;
      transform: translateY(-50%);
      color: white;
      text-align: left;
      font-weight: 300;
      h1{
        color: white;
        font-size: 3.3125rem;
        margin-bottom: 0.3em;
        font-family: "Roboto Slab", "Times New Roman", serif;
        font-weight: 500
      }
      h6{
        color: white;
        font-size: 1.25em;
        line-height: 1.7;
        font-weight: 300;
      }
      .register{
        
        .ant-btn{
          width: 120px;
          height: 48px;
          font-size: 1.25em;
          font-weight: 300;
          background-color: #ff4d4f;
          border-color: #ff4d4f;
          transition: all 0.3s ease-in-out;
          //background-color: #49a54d;
          &:hover{
            font-size: 1.5em;
            background-color: #ff7875;
            border-color: #ff7875;
          }
        }
      }
    }
  }
  .ant-layout-content {
    height: 100vh;
    width: 100%;
    padding: 0 15%;
    background: #7f8d8d;
    .nav-cards{
      width: 100%;
      height: 300px;
      background: #5e676c;
      display:flex;
      justify-content: space-between;
      .card-group{
        width:30%;
        height:100%;
        background:red
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
