class Clock {
  
  constructor() {
    const date = new Date();

    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    this.printTime();
    
    setInterval(this._tick.bind(this), 1000)
  };

  printTime () {
    const timeString = [this.hours, this.minutes, this.seconds].join(':')

    console.log(timeString)
  };

  _tick () {
    this.incrementSeconds()

    this.printTime()
  };

  incrementSeconds () {
    this.seconds += 1;

    if (this.seconds === 60) {
      this.seconds = 0
      this.incrementMinutes ()
    };
  };

  incrementMinutes () {
    this.minutes += 1;

    if (this.minutes === 60) {
      this.minutes = 0
      this.incrementHours()
    };
  }

  incrementHours () {
    this.hours = (this.hours + 1) % 24
  }
};

const clock = new Clock()
