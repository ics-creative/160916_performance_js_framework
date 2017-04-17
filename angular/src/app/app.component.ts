import {Component, Input} from "@angular/core";
import {ParticleData} from "./particle-data";

/**
 * メインのコンポーネントです。
 */
@Component({
  selector: 'app-root',
  template: `<app-particle
                    *ngFor="let particle of particles"
                    [particle]="particle" >
               </app-particle>
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
  template: `<div [style.top]="particle.y + 'px'" [style.left]="particle.x + 'px'">😊</div>`,
  styles: [`div {position: absolute; font-size: 2rem;}`]
})
export class ParticleComponent {
  @Input() particle: ParticleData;
}
