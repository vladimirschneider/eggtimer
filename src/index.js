import 'normalize.css';
import 'improve.css';
import '../public/css/style.css';

import Timer from './Timer';

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

const timer = new Timer(data);

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
