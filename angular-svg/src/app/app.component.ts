import {Component, Input} from '@angular/core';
import {ParticleData} from './particle-data';

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'app-root',
  template: `
    <svg [attr.width]="innerWidth" [attr.height]="innerHeight">
      <circle *ngFor="let particle of particles"
              [attr.cx]="particle.x"
              [attr.cy]="particle.y"
              r="3"></circle>
    </svg>
    <div class="ui">
      <p>Emit Particle Per 1 Frame</p>
      <input type="range"
             [(ngModel)]="emitOnFrame"
             min="1" max="30"/>
      <input type="number"
             [(ngModel)]="emitOnFrame"
             min="1" max="30"/>
      <p>現在のパーティクル数 : {{particles.length}} 個</p>
      <label>ランダム更新
        <input type="checkbox" [(ngModel)]="enableRandomUpdate"/>
      </label>
    </div>`,
  styles: [`.ui {
    position: absolute;
    top: 10px;
    right: 10px;
  }`]
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
