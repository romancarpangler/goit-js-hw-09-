const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const backgroundColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
};

start.addEventListener('click', () => {
  timerId = setInterval(backgroundColorSwitcher, 1000);
  start.disabled = true;
});

stop.addEventListener('click', () => {
  clearInterval(timerId);
  start.disabled = false;
});
