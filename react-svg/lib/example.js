"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_LIFE = 60; // 寿命の最大値

/**
 * パーティクルの座標情報を管理するクラスです。
 */

var ParticleData = function () {
  function ParticleData($x, $y, $key) {
    _classCallCheck(this, ParticleData);

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

  _createClass(ParticleData, [{
    key: "update",
    value: function update() {
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
  }]);

  return ParticleData;
}();

var ParticleBox = function (_React$Component) {
  _inherits(ParticleBox, _React$Component);

  function ParticleBox(props) {
    _classCallCheck(this, ParticleBox);

    var _this = _possibleConstructorReturn(this, (ParticleBox.__proto__ || Object.getPrototypeOf(ParticleBox)).call(this, props));

    _this.state = {
      particles: [],
      emitOnFrame: 1
    };
    _this.count = 0;

    // React の実にイケてないところ
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ParticleBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.tick();
      });
    }

    /** エンターフレームイベントです。 */

  }, {
    key: "tick",
    value: function tick() {
      var _this3 = this;

      // 発生
      var len = Number(this.state.emitOnFrame);
      for (var i = 0; i < len; i++) {
        this.state.particles.push(new ParticleData(innerWidth / 2, innerHeight / 4, this.count++));
      }

      // 更新
      this.state.particles.forEach(function (particle, index) {
        particle.update();

        // 寿命の判定
        if (particle.life <= 0) {
          // 配列からも削除
          _this3.state.particles.splice(index, 1);
        }
      });

      // 更新
      this.setState({ particles: this.state.particles });

      requestAnimationFrame(function () {
        _this3.tick();
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      // キャストしないとエラーになる
      var num = Number(e.currentTarget.value);
      this.setState({ emitOnFrame: num });
    }
  }, {
    key: "render",
    value: function render() {

      var nodes = this.state.particles.map(function (particle) {

        return React.createElement("circle", { key: particle.key,
          cx: particle.x,
          cy: particle.y,
          r: "3" });
      });

      return React.createElement(
        "div",
        null,
        React.createElement(
          "svg",
          { width: window.innerWidth, height: window.innerHeight },
          nodes
        ),
        React.createElement(
          "div",
          { className: "ui" },
          React.createElement(
            "p",
            null,
            "Emit Particle Per 1 Frame"
          ),
          React.createElement("input", { type: "range",
            name: "emitOnFrame",
            value: this.state.emitOnFrame,
            min: "1", max: "30",
            onChange: this.handleChange }),
          React.createElement("input", { type: "number",
            name: "emitOnFrame",
            value: this.state.emitOnFrame,
            min: "1", max: "30",
            onChange: this.handleChange }),
          React.createElement(
            "p",
            null,
            "現在のパーティクル数 : ",
            this.state.particles.length,
            " 個"
          )
        )
      );
    }
  }]);

  return ParticleBox;
}(React.Component);

ReactDOM.render(React.createElement(ParticleBox, null), document.getElementById('content'));