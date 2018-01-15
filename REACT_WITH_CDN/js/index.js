class Chronometer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 55,
            millis: 0,
            running: false
        };
        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
        this._handleResetClick = this._handleResetClick.bind(this);
    }

    _handleStartClick(event) {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);
            this.setState({running: true})
        }
    }

    _handleStopClick(event) {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({running: false});
        }
    }

    _handleResetClick(event) {
        this._handleStopClick();
        this.setState({
          millis: 0,
          seconds: 0,
          minutes: 0
        });
    }

    tick() {
        let millis = this.state.millis + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }
        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.setState({
          millis: millis,
          seconds: seconds,
          minutes: minutes
        });
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    render() {
        let run = this.state.running === true;
        let stopDisabled = false === run;
        let resetDisabled = (true === run || (false === run && (this.state.millis > 0 || this.state.seconds > 0 || this.state.minutes > 0 )));
        return (
            <div className="app">
                <main className="main">
                    <div className="display">
                        <div className="state">{run ? 'Running' : 'Stop'}</div>
                        <div className="segments">
                            <span className="mins">{this.zeroPad(this.state.minutes)}:</span>
                            <span className="secs">{this.zeroPad(this.state.seconds)} </span>
                            <span className="millis">.0{this.state.millis}</span>
                        </div>
                    </div>

                    <div className="actions">
                        <button className={"btn start " + (run ? 'disabled' : '')}
                            onClick={this._handleStartClick}>Start</button>

                        <button className={"btn stop " + ( stopDisabled ? 'disabled' : '')}
                            onClick={this._handleStopClick}>Stop</button>

                        <button className={"btn reset " + ( resetDisabled ? '' : 'disabled')}
                            onClick={this._handleResetClick}>Reset</button>
                    </div>
                </main>
            </div>);
    }
}

ReactDOM.render(<Chronometer/>, document.querySelector('#app'));
