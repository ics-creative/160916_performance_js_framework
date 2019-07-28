'use strict';


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
    this.displayX = Math.round(this.x);
    this.displayY = Math.round(this.y);

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

    // 整数座標を保持
    this.displayX = Math.round(this.x);
    this.displayY = Math.round(this.y);

    // 地面の跳ね返り処理
    if (this.y > window.innerHeight) {
      this.y = window.innerHeight; // 行き過ぎ補正
      this.vy *= -1; // Y軸の速度を反転
    }

    // 寿命を減らす
    this.life -= 1;
  }
}



{
  const elementSvg = document.getElementById('mySvg');
  const elementRange = document.getElementById('rangeEmitOnFrame');
  const elementInput = document.getElementById('inputEmitOnFrame');
  const elementNumParticles = document.getElementById('numParticles');
  let count = 0;
  const elementParticles = [];

  // ステート
  const state = {
    particles: [],
    emitOnFrame: 3,
  };

  /** エンターフレームイベントです。 */
  const tick = () => {

    const particles = state.particles;
    // 発生
    const len = Number(state.emitOnFrame);
    for (let i = 0; i < len; i++) {
      particles.push(new ParticleData(
        window.innerWidth / 2,
        window.innerHeight / 4,
        count++));
    }

    // 更新
    particles.forEach((particle, index) => {
      // アップデート
      particle.update();

      // 寿命の判定
      if (particle.life <= 0) {
        // 配列からも削除
        particles.splice(index, 1);
      }
    });

    // 画面更新
    render();

    // requestIdleCallback(() => {
    requestAnimationFrame(() => {
      tick();
    });
  };


  const render = () => {
    const particles = state.particles;

    // 削除判定
    for (let i = 0; i < elementParticles.length; i++) {
      const elParticle = elementParticles[i];

      const item = particles.find(e => e.key === elParticle.key);
      if (!item) {
        elementParticles.splice(i, 1);
        elementSvg.removeChild(elParticle.element);
      }
    }

    particles.forEach(particle => {

      const item = elementParticles.find(e => e.key === particle.key);

      if (!item) {
        // 新規作成
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        el.setAttributeNS(null, 'x', particle.displayX);
        el.setAttributeNS(null, 'y', particle.displayY);
        el.setAttributeNS(null, 'width', 2);
        el.setAttributeNS(null, 'height', 2);
        elementSvg.append(el);

        elementParticles.push({key: particle.key, element: el});
      } else {
        // 更新
        const el = item.element;
        el.setAttributeNS(null, 'x', particle.displayX);
        el.setAttributeNS(null, 'y', particle.displayY);
      }
    });

    elementSvg.setAttributeNS('http://www.w3.org/2000/svg', 'width', window.innerWidth);
    elementSvg.setAttributeNS('http://www.w3.org/2000/svg', 'height', window.innerHeight);


    elementNumParticles.textContent = particles.length;
  };

  // UIの更新処理
  const updateUi = () => {
    elementInput.value = state.emitOnFrame;
    elementRange.value = state.emitOnFrame;
  };

  elementInput.addEventListener('change', (event) => {
    const value = Number(event.currentTarget.value);
    state.emitOnFrame = value;

    updateUi();
  });
  elementRange.addEventListener('change', (event) => {
    const value = Number(event.currentTarget.value);
    state.emitOnFrame = value;

    updateUi();
  });


  updateUi();
  tick();
}
