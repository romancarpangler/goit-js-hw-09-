import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputId = document.querySelector('#datetime-picker');
const startBTN = document.querySelector('[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

let interval = null;
startBTN.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      return;
    } else {
      startBTN.disabled = false;

      startBTN.addEventListener('click', () => {
        interval = setInterval(() => {
          const time = selectedDates[0] - new Date();

          if (time < 1000) {
            clearInterval(interval);
          }

          const a = convertMs(time);
          timer(a);
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function timer({ days, hours, minutes, seconds }) {
  days.textContent = `{$days}`;
  hours.textContent = `{$hours}`;
  minutes.textContent = `{$minutes}`;
  seconds.textContent = `{$seconds}`;
}

function addLeadingZero(b) {
  return String(b).padStart(2, '0');
}
