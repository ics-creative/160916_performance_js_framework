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

    // 地面の跳ね返り処理
    if (this.y > innerHeight) {
      this.y = innerHeight; // 行き過ぎ補正
      this.vy *= -1; // Y軸の速度を反転
    }

    // 寿命を減らす
    this.life -= 1;
  }
}


class ParticleBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      particles: [],
      emitOnFrame: 3
    };
    this.count = 0;

    // React の実にイケてないところ
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.tick();
    });
  }

  /** エンターフレームイベントです。 */
  tick() {
    // 発生
    const len = Number(this.state.emitOnFrame);
    for (let i = 0; i < len; i++) {
      this.state.particles.push(new ParticleData(
        innerWidth / 2,
        innerHeight / 4,
        this.count++));
    }

    // 更新
    this.state.particles.forEach((particle, index) => {
      particle.update();

      // 寿命の判定
      if (particle.life <= 0) {
        // 配列からも削除
        this.state.particles.splice(index, 1);
      }
    });

    // 更新
    this.setState({particles: this.state.particles});

    requestAnimationFrame(() => {
      this.tick();
    });
  }

  handleChange(e) {
    // キャストしないとエラーになる
    const num = Number(e.currentTarget.value);
    this.setState({emitOnFrame: num});
  }

  render() {

    const nodes = this.state.particles.map((particle) =>
      <ParticleObj particle={particle}
                   key={particle.key}>
      </ParticleObj>
    );

    return (
      <div>
        <div>
          {nodes}
        </div>
        <div className="ui">
          <p>Emit Particle Per 1 Frame</p>
          <input type="range"
                 name="emitOnFrame"
                 value={this.state.emitOnFrame}
                 min="1" max="30"
                 onChange={this.handleChange}/>
          <input type="number"
                 name="emitOnFrame"
                 value={this.state.emitOnFrame}
                 min="1" max="30"
                 onChange={this.handleChange}/>

          <p>現在のパーティクル数 : {this.state.particles.length} 個</p>
        </div>
      </div>
    );
  }
}

class ParticleObj extends React.Component {
  render() {
    return (
      <div className="particle" style={{top: this.props.particle.y + "px", left: this.props.particle.x + "px"}}>
        😊</div>
    );
  }
}

ReactDOM.render(
  <ParticleBox />,
  document.getElementById('content')
);