<template>
<div class="agencyStyle" style="width: 1280px;height: 560px;padding:0">
  <div style="position:absolute;width: 100%;height: 100%">
    <img src="../../../assets/imgs/back_xishi.png" style="height: 100%;width: 100%;opacity: 0.5;" alt="">
  </div>
  <div class="show">
    <router-view></router-view>
  </div>
  <div class="proApplyBt">
    <div @click="applyClick" style="background-color: #bbd0d5">
      <span >新建申报</span>
    </div>
    <div style="background-color: #98c8d4">
      <span>撤销申报</span>
    </div>
    <div style="background-color: #7bcbde">
      <span>申报查看</span>
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
  methods:{
    applyClick(){
      this.$router.push('/pro_apply_add')
    }
  }
}
</script>

<style lang="less" scoped>
  .show{
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 76%;
  }
  .proApplyBt{
    z-index: 1;
    position: absolute;
    display: flex;
    top: 80%;
    margin-top: -10px;
    div{
      width: 430px;
      height: 120px;
      display: flex;
      align-items: center;
      span{
        margin-left: 140px;
        font-family: 幼圆;
        color: white;
        font-size: 40px;
      }
    }
  }

</style>
