export const MAX_LIFE = 60; // 寿命の最大値

/**
 * パーティクルの座標情報を管理するクラスです。
 */
export class ParticleData {
  constructor($x, $y, $key) {
    this.x = $x;
    this.y = $y;
    this.key = $key;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;
    // 整数座標を保持
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
    if (this.y > innerHeight) {
      this.y = innerHeight; // 行き過ぎ補正
      this.vy *= -1; // Y軸の速度を反転
    }

    // 寿命を減らす
    this.life -= 1;
  }
}
