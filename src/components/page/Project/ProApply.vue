<template>
<div class="agencyStyle" style="width: 1280px;height: 560px;padding:0">
  <div style="position:absolute;width: 100%;height: 100%;">
    <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 0.5;" alt="">
  </div>
  <div class="show">
    <router-view></router-view>
  </div>
  <div v-show="$store.state.tab_info.isProApplyBtShow" class="proApplyBt">
    <div @click="applyAddClick" style="background-color: #bbd0d5">
      <span >新建项目申报</span>
    </div>
    <div @click="applyExamClick" style="background-color: #98c8d4">
      <span>项目申报审核</span>
    </div>
    <div @click="$router.push('/project')" style="background-color: #7bcbde">
      <span>查看本部项目</span>
    </div>
  </div>
</div>
</template>

<script>
const ProApply_add = ()=>import('./ProApply_add')
export default {
  name: "ProApply",
  // eslint-disable-next-line vue/no-unused-components
  components:{ProApply_add},
  data(){
    return{
    }
  },
  methods:{
    applyAddClick(){
      if(this.$route.path !== '/pro_apply/add') {
        this.$router.push('/pro_apply/add')
        this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
      }

    },
    applyExamClick(){
      if(this.$route.path !== '/pro_apply/exam') {
        this.$router.push('/pro_apply/exam')
        this.$store.commit('tab_info/CHANGE_PROAPPBTSHOW_FALSE')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .show{
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .proApplyBt{
    z-index: 1;
    position: absolute;
    display: flex;
    top: 80%;
    margin-top: -10px;
    overflow: auto;
    div{
      width: 430px;
      height: 120px;
      display: flex;
      align-items: center;
      span{
        margin-left: 110px;
        font-family: 幼圆;
        color: white;
        font-size: 40px;
      }
    }
  }

</style>
