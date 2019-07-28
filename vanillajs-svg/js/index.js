'use strict';
import ParticleData from './ParticleData.js';

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
    emitOnFrame: 1,
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
