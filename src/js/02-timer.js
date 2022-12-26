import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBTN = document.querySelector('[data-start]');
const d = document.querySelector('.value[data-days]');
const h = document.querySelector('.value[data-hours]');
const m = document.querySelector('.value[data-minutes]');
const s = document.querySelector('.value[data-seconds]');

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
            startBTN.disabled = true;
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
  d.textContent = `${days}`;
  h.textContent = `${hours}`;
  m.textContent = `${minutes}`;
  s.textContent = `${seconds}`;
  startBTN.disabled = true;
}

function addLeadingZero(b) {
  return String(b).padStart(2, '0');
}
