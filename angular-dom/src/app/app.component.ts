import { Component, Input, OnInit } from '@angular/core';
import { ParticleData } from './particle-data';

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
  styleUrls: [`app.component.css`],
})
export class AppComponent implements OnInit {

  particles: ParticleData[] = [];
  emitOnFrame = 3;

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
      particle.update();

      // 寿命の判定
      if (particle.life <= 0) {
        // 配列からも削除
        this.particles.splice(index, 1);
      }
    });

    requestAnimationFrame(() => {
      this.tick();
    });
  }
}

/**
 * パーティクルを表示するコンポーネントです。
 */
@Component({
  selector: 'app-particle',
  template: `
    <div [style.top]="particle?.y + 'px'" [style.left]="particle?.x + 'px'">😊</div>`,
  styles: [`div {
    position: absolute;
    font-size: 2rem;
  }`],
})
export class ParticleComponent {
  @Input() particle: ParticleData | undefined;
}
