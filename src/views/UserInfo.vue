<template>
  <div id="userInfo">
    <div style="display: flex;align-items: center;width: 100%">
      <a-avatar :src="avatarUrl" :size="96"></a-avatar>
      <div class="base-info">
        <span>{{userInfo.username}}</span>
        <span>{{userInfo.email}}</span>
      </div>
      <a-button type="primary" size="large" shape="round" style="margin-left: auto">hello</a-button>
    </div>
    <a-divider></a-divider>
    <a-tabs style="text-align: left">
      <a-tab-pane key="1" tab="基本信息">
        <a-descriptions>
          <a-descriptions-item>
            <template v-slot:label>
              <a-icon type="user"/>
              username
            </template>
            {{ userInfo.username }}
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-slot:label>
              <a-icon type="mail"/>
              email
            </template>
            {{ userInfo.email }}
          </a-descriptions-item>
          <a-descriptions-item >
            <template v-slot:label>
              <a-icon type="message"/>
              city
            </template>
            {{ userInfo.city }}
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-slot:label>
              <a-icon type="mobile"/>
              username
            </template>
            empty
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-slot:label>
              <a-icon type="team"/>
              location
            </template>
            Wantang Road, Xihu District, Hangzhou, Zhejiang
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的通知">
        暂无通知
      </a-tab-pane>
      <a-tab-pane key="3" tab="修改资料">
        <div class="change-profile">
          <div class="info-card">
            <div class="title">修改基本资料</div>
            <div style="padding: 0 10%">
              <a-input ref="userNameInput" v-model="userInfoForm.username" :placeholder="userInfo.username" style="margin-bottom: 10px">
                <a-icon slot="prefix" type="user" />
              </a-input>
              <a-input ref="userNameInput" v-model="userInfoForm.email" :placeholder="userInfo.email" style="margin-bottom: 10px">
                <a-icon slot="prefix" type="mail" />
              </a-input>
              <a-button icon="edit" type="dashed" size="small" @click="changeBaseInfo">修改</a-button>
            </div>
          </div>
          <div class="info-card">
            <div class="title">修改密码</div>
            <div style="padding: 0 10%">
              <a-input ref="userNameInput" v-model="passwordForm.currentPass" placeholder="原密码" style="margin-bottom: 10px">
                <a-icon slot="prefix" type="user" />
              </a-input>
              <a-input ref="userNameInput" v-model="passwordForm.password" placeholder="新密码" style="margin-bottom: 10px">
                <a-icon slot="prefix" type="lock" />
              </a-input>
              <a-button icon="edit" type="dashed" size="small" @click="changePass">修改</a-button>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import avatarUrl from '../assets/imgs/avatar.png'
import request from "../utils/request";
export default {
  name: "UserInfo",
  data(){
    return{
      avatarUrl:avatarUrl,
      userInfo: {
        avatar: "",
      },
      userInfoForm:{
        id:3,
        username: "",
        email: "",
      },
      passwordForm:{
        currentPass: '',
        password: ''
      }
    }
  },
  created() {
    this.$store.dispatch('userInfo/getUserInfo').then(()=>{
      this.userInfo = this.$store.state.userInfo.info
      this.userInfoForm.id=this.userInfo.id
    })

  },
  methods:{
    // 修改用户信息
    changeBaseInfo(){
      request({
        url: '/sys/user/update',
        method: 'post',
        data: this.userInfoForm
      }).then(res=>{
        this.$router.go(0)
        this.$message.success(res.msg)
      })
    },
    // 修改密码
    changePass(){
      request({
        url: '/sys/user/updatePass',
        method: 'post',
        data: this.passwordForm
      }).then(res=>{
        console.log(res)
        this.$message.success(res.msg)
      })
    }
  }
}
</script>

<style lang="less">
#userInfo{
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  .base-info{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    span{
      color: #3c4858;
      font-size: 32px;
      font-family: "Roboto Slab", "Times New Roman", serif;
      font-weight: 700;
      &:nth-child(2){
        font-size: 28px;
      }
    }
  }
  .change-profile{
    display: flex;
    .info-card{
      position: relative;
      border-radius: 10px;
      border: 0.5px solid #bbd0d5;
      box-shadow: 0.5px 0.5px 0.5px 0.5px #dedcdc;
      margin-top: 20px;
      margin-right: 10px;
      background: #fff;
      height: 200px;
      width: 200px;
      .title{
        position: relative;
        border-radius: 5px;
        height: 40px;
        width: 80%;
        text-align: center;
        line-height: 40px;
        background: #fc940b;
        top: -20px;
        left: 10%;
      }
      h2{
        text-align: center;
      }
      .ant-input{

      }
    }
  }
  .ant-descriptions-item > span{
    font-size: 18px!important;
  }
}
</style>