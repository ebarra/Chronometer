import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit {

	minutes: number;
	seconds: number;
	millis: number;
	running: boolean;
	interval: number;

  constructor() { 
  	this.minutes = 0;
  	this.seconds = 0;
  	this.millis = 0;
  	this.running = false;
  }

  ngOnInit() {
  }

  _handleStartClick = function () {
  	if(!this.running) {
  		this.interval = setInterval(() => {
  			this.tick();
  		}, 100);
  		this.running = true;
  	}
  }

  _handleStopClick = function () {
  	if(this.running) {
  		clearInterval(this.interval);
  		this.running = false;
  	}
  }

  _handleResetClick = function () {
  	this._handleStopClick();
  	this.minutes = 0;
  	this.seconds = 0;
  	this.millis = 0;
  }

  tick() {
    let millis = this.millis + 1;
    let seconds = this.seconds;
    let minutes = this.minutes;

    if (millis === 10) {
      millis = 0;
      seconds = seconds + 1;
    }
    if (seconds === 60) {
      millis = 0;
      seconds = 0;
      minutes = minutes + 1;
    }

    this.millis = millis;
    this.seconds = seconds;
    this.minutes = minutes;
	}

}
