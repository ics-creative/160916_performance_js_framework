import { Component, OnInit } from '@angular/core';
import { ParticleData } from './particle-data';

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
  styleUrls: [`app.component.css`]
})
export class AppComponent implements OnInit {

  particles: ParticleData[] = [];
  emitOnFrame = 3;
  innerWidth = 0;
  innerHeight = 0;

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

      // アップデートする
      particle.update();

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

