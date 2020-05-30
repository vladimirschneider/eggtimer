const form = document.querySelector('form');

const audio = new Audio();

let audioIsActive = false;

class Timer {
    constructor() {
        this.timerContainer = document.querySelector('.timer');
        this.timer = this.timerContainer.querySelector('.timer__time');
        this.ms = 6 * 60 * 1000;
        this.isPause = true;

        this.go = this.go.bind(this);

        this.go();
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

const timer = new Timer();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    timer.toggle();

    if (!audioIsActive) {
        audio.play();
        audio.src = './analog-watch-alarm_daniel-simion.mp3';
        audioIsActive = true;
    }
});

const states = document.querySelectorAll('[name="state"]');

states.forEach((state) => {
    state.addEventListener('input', (e) => {
        const {value} = e.target;

        timer.pause();

        switch (value) {
            case 'soft':
                timer.setTime(6 * 60 * 1000);
                break;
            case 'medium':
                timer.setTime(8 * 60 * 1000);
                break;
            case 'hard':
                timer.setTime(10 * 60 * 1000);
                break;
        }
    });
});
