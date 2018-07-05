const MAX_LIFE = 60; // 寿命の最大値

/**
 * パーティクルの座標情報を管理するクラスです。
 */
class ParticleData {
  constructor($x, $y, $key) {
    this.x = $x;
    this.y = $y;
    this.key = $key;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;

    // 動的にプロパティーを追加します。
    // 速度
    this.vx = 30 * (Math.random() - 0.5);
    this.vy = 30 * (Math.random() - 0.5);
    // 寿命
    this.life = MAX_LIFE;
  }

  update() {
    // 重力
    this.vy += 1;
    // 摩擦
    this.vx *= 0.96;
    this.vy *= 0.96;
    // 速度を位置に適用
    this.x += this.vx;
    this.y += this.vy;

    // 地面の跳ね返り処理
    if (this.y > innerHeight) {
      this.y = innerHeight; // 行き過ぎ補正
      this.vy *= -1; // Y軸の速度を反転
    }

    // 寿命を減らす
    this.life -= 1;
  }
}


Vue.component('MyApp', {
  template: `
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
        <p>現在のパーティクル数 :  {{particles.length}} 個</p>
      </div>
    </div>`
  ,
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
      });

      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;

      requestAnimationFrame(this.tick);
    }
  }
});

Vue.component('MyParticle', {
  template: `<circle 
               v-bind:cx="particle.x" 
               v-bind:cy="particle.y"
               r="3">
             </circle>`,
  props: ['particle']
});

new Vue({
  el: '#app'
});