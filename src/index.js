import 'normalize.css';
import 'improve.css';
import '../public/css/style.css';

import Timer from './Timer';

import { data } from './settings';

import alarm from '../public/media/alarm.mp3';

const timer = new Timer(data, {
  alarm
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
