import React, {PureComponent} from 'react';
import {number, func} from 'prop-types';

class Timer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {gameTime: props.time};
    this.onTimeout = props.onTimeout;
    this.onTick = props.onTick;
    this.timer = undefined;
    this._tick = this._tick.bind(this);
  }

  render() {
    const gameTime = this.state.gameTime;
    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">0{Math.floor(gameTime / 60)}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">
          {gameTime % 60 < 10 ? `0${gameTime % 60}` : gameTime % 60}
        </span>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setInterval(this._tick, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _tick() {
    this.setState((prevState) => ({gameTime: prevState.gameTime - 1}), () => {
      this.onTick(this.state.gameTime);
    });
    if (this.state.gameTime <= 0) {
      this.onTimeout();
      clearTimeout(this.timer);
    }
  }
}

Timer.propTypes = {
  time: number,
  onTimeout: func,
  onTick: func
};

export default Timer;
