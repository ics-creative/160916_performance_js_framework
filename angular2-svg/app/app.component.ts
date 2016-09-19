import {Component, Input} from "@angular/core";
import {ParticleData} from "./particle-data";

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'my-app',
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
                min="1" max="30" />
              <input type="number"
                [(ngModel)]="emitOnFrame"
                min="1" max="30" />
              <p>現在のパーティクル数 :  {{particles.length}} 個</p>
            </div>`,
  styles: [`.ui {position: absolute; top: 10px; right: 10px;}`]
})
export class AppComponent {

  particles:ParticleData[] = [];
  emitOnFrame = 2;
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