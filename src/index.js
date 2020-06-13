import 'normalize.css';
import 'improve.css';
import '../public/css/style.css';
import alarm from '../public/media/alarm.mp3';

const form = document.querySelector('form');

const audio = new Audio();

let audioIsActive = false;

const data = {
    hen: {
        soft: 6 * 60 * 1000,
        medium: 8 * 60 * 1000,
        hard: 10 * 60 * 1000
    },
    quail: {
        soft: 2 * 60 * 1000 + 30 * 1000,
        medium: 4 * 60 * 1000,
        hard: 5 * 60 * 1000
    }
}

class Timer {
    constructor(data) {
        this.data = data;

        this.type = 'hen';
        this.readiness = 'soft';

        this.timerContainer = document.querySelector('.timer');
        this.timer = this.timerContainer.querySelector('.timer__time');
        this.ms = 6 * 60 * 1000;
        this.isPause = true;

        this.go = this.go.bind(this);

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
            audio.play();
            this.timerContainer.classList.add('timer--alarm');
        }

        if (this.isPause) {
            audio.pause();
            audio.currentTime = 0;
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

const timer = new Timer(data);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    timer.toggle();

    if (!audioIsActive) {
        audio.play();
        audio.src = alarm;
        audioIsActive = true;
    }
});

const types = document.querySelectorAll('[name="type"]');

types.forEach((state) => {
    state.addEventListener('input', (e) => {
        const {value} = e.target;

        timer.pause();

        timer.setState('type', value);
    });
});

const states = document.querySelectorAll('[name="state"]');

states.forEach((state) => {
    state.addEventListener('input', (e) => {
        const {value} = e.target;

        timer.pause();

        timer.setState('readiness', value);
    });
});
