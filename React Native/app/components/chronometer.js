import { Text, View, Button, StyleSheet } from 'react-native';
import React from 'react';

export default class Chronometer extends React.Component {
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
          <View style={{flex:1, margin:10, justifyContent:'center'}}>
            <View>
              <Text style={styles.header}>
                Chronometer React Native
              </Text>
            </View>
            <View>
              <Text style={styles.status}>
                {run ? 'Running' : 'Stop'}
              </Text>
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
              <Text style={styles.time}>
                {this.zeroPad(this.state.minutes)}:{this.zeroPad(this.state.seconds)}
              </Text>
              <Text style={styles.millis}>
                .0{this.state.millis}
              </Text>
            </View>
            <View style={styles.buttons}>
              <Button disabled={run ? true : false} onPress={this._handleStartClick} title="Start">
              </Button>
              <Button disabled={stopDisabled ? true : false} onPress={this._handleStopClick} title="Stop">
              </Button>
              <Button disabled={resetDisabled ? false : true} onPress={this._handleResetClick} title="Reset">
              </Button>
            </View>
          </View>);
    }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10
  },
  status: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10
  },
  chrono: {
    textAlign: 'center'
  },
  time: {
    textAlign: 'center',
    fontSize: 20
  },
  millis: {
    textAlign: 'center',
    fontSize: 10
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    }
});
