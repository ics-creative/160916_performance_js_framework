import React, {Component} from 'react';
import ParticleData from './Particle.js';
import ParticleObj from './ParticleObj';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      particles: [],
      emitOnFrame: 3,
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

    const particles = this.state.particles.concat()
    // 発生
    const len = Number(this.state.emitOnFrame);
    for (let i = 0; i < len; i++) {
      particles.push(new ParticleData(
        window.innerWidth / 2,
        window.innerHeight / 4,
        this.count++));
    }

    // 更新
    particles.forEach((particle, index) => {

      // ランダムアップデートが有効の場合は
      if (this.state.enableRandomUpdate === true) {
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
        particles.splice(index, 1);
      }
    });

    // 更新
    this.setState({particles});

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

    const nodes = this.state.particles.map(
      (particle) => <ParticleObj particle={particle}/>
    );

    return (
      <div>
        <div className="particle-container">
          {nodes}
        </div>
        <div className="ui">
          <p>Emit Particle Per 1 Frame</p>
          <input type="range"
                 name="emitOnFrame"
                 value={this.state.emitOnFrame}
                 min="1" max="50"
                 onChange={this.handleChange} />
          <input type="number"
                 name="emitOnFrame"
                 value={this.state.emitOnFrame}
                 min="1" max="50"
                 onChange={this.handleChange} />

          <p>現在のパーティクル数 : {this.state.particles.length} 個</p>
        </div>
      </div>
    );
  }
}
