/**
 * パーティクルの座標情報を管理するクラスです。
 */
export class ParticleData {
    vx = 0;
    vy = 0;
    life = 0;

    static MAX_LIFE = 60; // 寿命の最大値

    constructor(public x, public y) {
        // 動的にプロパティーを追加します。
        // 速度
        this.vx = 30 * (Math.random() - 0.5);
        this.vy = 30 * (Math.random() - 0.5);
        // 寿命
        this.life = ParticleData.MAX_LIFE;
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