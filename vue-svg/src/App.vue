<template>
  <div>
    <svg v-bind:width="innerWidth"
         v-bind:height="innerHeight">
      <my-particle
        v-for="particle in particles"
        v-bind:key="particle.key"
        v-bind:particle="particle">
      </my-particle>
    </svg>
    <div class="ui">
      <p>Emit Particle Per 1 Frame</p>
      <input type="range"
             v-model="emitOnFrame"
             min="1" max="50" />
      <input type="number"
             v-model="emitOnFrame"
             min="1" max="50" />
      <p>現在のパーティクル数 : {{particles.length}} 個</p>
    </div>
  </div>
</template>

<script>
  import {ParticleData} from "./ParticleData";
  import MyParticle from "./components/MyParticle.vue";


  export default {
    name: "app",
    components: {
      MyParticle
    },
    data: function () {
      return {
        particles: [],
        emitOnFrame: 3,
        count: 0,
        innerWidth: 0,
        innerHeight: 0
      };
    },
    mounted: function () {
      requestAnimationFrame(this.tick);
    },
    methods: {
      handleChange: function (e) {
        const num = Number(e.currentTarget.value);
        this.emitOnFrame = num;
      },
      /** エンターフレームイベントです。 */
      tick: function () {
        // 発生
        const len = Number(this.emitOnFrame);
        for (let i = 0; i < len; i++) {
          this.particles.push(new ParticleData(
            innerWidth / 2,
            innerHeight / 4,
            this.count++));
        }

        // 更新
        this.particles.forEach((particle, index) => {
          particle.update();

          // 寿命の判定
          if (particle.life <= 0) {
            // 配列からも削除
            this.particles.splice(index, 1);
          }
        })
        ;

        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        requestAnimationFrame(this.tick);
      }
    }
  };
</script>

<style>


  .ui {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
