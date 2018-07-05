import {Component, Input} from '@angular/core';
import {ParticleData} from './particle-data';

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'app-root',
  templateUrl:`app.component.html`,
  styleUrls: [`app.component.css`]
})
export class AppComponent {

  particles: ParticleData[] = [];
  emitOnFrame = 3;
  innerWidth = 0;
  innerHeight = 0;
  enableRandomUpdate = false;

  ngOnInit() {
    requestAnimationFrame(() => {
      this.tick();
    });
  }

  /** エンターフレームイベントです。 */
  tick() {
    // 発生
    for (let i = 0; i < this.emitOnFrame; i++) {
      this.particles.push(new ParticleData(
        innerWidth / 2,
        innerHeight / 4));
    }

    // 更新
    this.particles.forEach((particle, index) => {

      // ランダムアップデートが有効の場合は
      if (this.enableRandomUpdate === true) {
        // 50%の確率で更新する
        if (Math.random() < 0.5) {
          particle.update();
        }
      } else {
        // ランダムアップデートが無効の場合は常にアップデートする
        particle.update();
      }

      // 寿命の判定
      if (particle.life <= 0) {
        // 配列からも削除
        this.particles.splice(index, 1);
      }
    });

    // 画面サイズの適用
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    requestAnimationFrame(() => {
      this.tick();
    });
  }
}
