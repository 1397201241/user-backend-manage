<template>
  <div id="drum-kit">
    <div id="keys" v-on:transitionend="removeTransition">
      <div data-key="81" class="key">
        <kbd>Q</kbd>
        <span class="sound">clap</span>
      </div>
      <div data-key="87" class="key">
        <kbd>W</kbd>
        <span class="sound">hihat</span>
      </div>
      <div data-key="69" class="key">
        <kbd>E</kbd>
        <span class="sound">kick</span>
      </div>
      <div data-key="82" class="key">
        <kbd>R</kbd>
        <span class="sound">clap</span>
      </div>
      <div data-key="65" class="key">
        <kbd>A</kbd>
        <span class="sound">hihat</span>
      </div>
      <div data-key="83" class="key">
        <kbd>S</kbd>
        <span class="sound">kick</span>
      </div>
      <div data-key="68" class="key">
        <kbd>D</kbd>
        <span class="sound">clap</span>
      </div>
      <div data-key="70" class="key">
        <kbd>F</kbd>
        <span class="sound">hihat</span>
      </div>

    </div>
    <audio data-key="81" src="../assets/sounds/仙剑奇侠传-逍遥游.flac"></audio>
    <audio data-key="87" src="../assets/sounds/刘德华-17岁.flac"></audio>
    <audio data-key="69" src="../assets/sounds/林俊杰-那些你很冒险的梦.flac"></audio>
    <audio data-key="82" src="../assets/sounds/仙剑奇侠传-逍遥游.flac"></audio>
    <audio data-key="65" src="../assets/sounds/刘德华-17岁.flac"></audio>
    <audio data-key="83" src="../assets/sounds/林俊杰-那些你很冒险的梦.flac"></audio>
    <audio data-key="68" src="../assets/sounds/仙剑奇侠传-逍遥游.flac"></audio>
    <audio data-key="70" src="../assets/sounds/刘德华-17岁.flac"></audio>
  </div>
</template>

<script>
export default {
  name: "DrumKit",
  data(){
    return{

    }
  },
  created() {
    window.addEventListener('keydown',this.playSound)
    const keys = document.querySelectorAll('.key')
    keys.forEach(key=>key.addEventListener('transitionend',this.removeTransition))
  },
  mounted() {
    //keys:document.querySelectorAll('.key')
    //监听变化=>移除变化
    //keys.forEach(key=>key.addEventListener('transitionend',this.removeTransition))
  },
  methods: {
    /*播放音频*/
    playSound(e){
      const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`)//键盘选中的audio
      const key=document.querySelector(`.key[data-key="${e.keyCode}"]`)//键盘选中的key
      if (!audio){
        return
      }
      const audios=document.querySelectorAll('audio')
      /*停止已播放的音频*/
      for (let ad of audios){
        if (ad.currentTime>0){
          ad.pause()
        }
      }
      audio.currentTime=0;
      audio.play();
      key.classList.add('playing')
    },
    /*移除变大:transform*/
    removeTransition(e){
      if(e.propertyName!== 'transform') return
      e.target.classList.remove('playing')
    }
  },
  watch:{

  }
}
</script>

<style lang="less" scoped>
#drum-kit{
  margin: 0;
  padding: 0;
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url("../assets/imgs/b2.jpg");
  background-repeat: no-repeat,no-repeat;
  background-size: auto auto,100% 100%;
  background-attachment: fixed,fixed;
  #keys{
    display: flex;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 10em;
    justify-content: center;
    align-items: center;
    .key {
      display: flex;
      width: 50px;
      height: 50px;
      margin: 0 15px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #a59f9f;
      border-radius: 15%;
      transition: all 0.5s;
      text-shadow: 0 0 5px #a59f9f;
      kbd,span{
        display: block;
      }
      kbd{
        font-size: 20px;
        color: aquamarine;
      }
      span{
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .playing{
    border-color: #33e8ac !important;
    transform: scale(1.5);
    box-shadow: 0 0 10px #a59f9f;
  }
}


</style>