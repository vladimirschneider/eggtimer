import alarm from "../public/media/alarm.mp3";

export default class Timer {
  constructor(data) {
    this.data = data;

    this.type = 'hen';
    this.readiness = 'soft';

    this.timerContainer = document.querySelector('.timer');
    this.timer = this.timerContainer.querySelector('.timer__time');
    this.ms = 6 * 60 * 1000;
    this.isPause = true;

    this.go = this.go.bind(this);

    const form = document.querySelector('form');

    this.audio = new Audio();

    let audioIsActive = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.toggle();

      if (!audioIsActive) {
        this.audio.play();
        this.audio.src = alarm;
        audioIsActive = true;
      }
    });

    this.go();
  }

  setState(key, value) {
    if (key === 'type') {
      if (this.data[value]) {
        this.type = value;
      }
    } else if (key === 'readiness') {
      if (this.data[this.type][value]) {
        this.readiness = value;
      }
    }

    const time = this.data[this.type][this.readiness];

    this.setTime(time);
  }

  setTime(t) {
    this.ms = t;
    this.updateHTML();
  }

  pause() {
    this.isPause = true;
  }

  toggle() {
    this.isPause = !this.isPause;
  }

  go() {
    if (!this.isPause && this.ms > 0) {
      this.ms-=1000;

      this.timerContainer.classList.add('timer--active');
    } else {
      this.timerContainer.classList.remove('timer--active');
    }

    if (this.ms === 0 && !this.isPause) {
      this.audio.play();
      this.timerContainer.classList.add('timer--alarm');
    }

    if (this.isPause) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.timerContainer.classList.remove('timer--alarm');
    }

    setTimeout(this.go, 1000);
    this.updateHTML();
  }

  updateHTML() {
    const minutes = String(Math.floor(this.ms / 1000 / 60));
    const seconds = String(Math.floor(this.ms / 1000 - minutes * 60));
    this.timer.innerHTML = `${minutes.length === 1 ? '0'+minutes : minutes}:${seconds.length === 1 ? '0'+seconds : seconds}`;
  }
}
