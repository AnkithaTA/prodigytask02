let hr = min = sec = ms = "0" + 0,
  startTimer,
  lapCounter = 1;

const startBtn = document.querySelector(".start"),
  stopBtn = document.querySelector(".stop"),
  resetBtn = document.querySelector(".reset"),
  lapBtn = document.querySelector(".lap"),
  hourDisplay = document.querySelector(".hour"),
  minuteDisplay = document.querySelector(".minute"),
  secondDisplay = document.querySelector(".second"),
  millisecondDisplay = document.querySelector(".millisecond"),
  lapsList = document.querySelector(".laps");

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function start() {
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");
  lapBtn.classList.remove("disabled");
  
  startTimer = setInterval(() => {
    ms++;
    ms = ms < 10 ? "0" + ms : ms;
    if (ms == 100) {
      sec++;
      sec = sec < 10 ? "0" + sec : sec;
      ms = "0" + 0;
    }
    if (sec == 60) {
      min++;
      min = min < 10 ? "0" + min : min;
      sec = "0" + 0;
    }
    if (min == 60) {
      hr++;
      hr = hr < 10 ? "0" + hr : hr;
      min = "0" + 0;
    }
    putValue();
  }, 10); // 10 milliseconds = 1 centisecond
}

function stop() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  clearInterval(startTimer);
}

function reset() {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("stopActive");
  lapBtn.classList.add("disabled");
  
  clearInterval(startTimer);
  hr = min = sec = ms = "0" + 0;
  lapCounter = 1;
  lapsList.innerHTML = "";
  putValue();
}

function lap() {
  let lapTime = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(ms)}`;
  let lapItem = document.createElement("li");
  lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
  lapsList.prepend(lapItem);
  lapCounter++;
}

function putValue() {
  hourDisplay.innerText = pad(hr);
  minuteDisplay.innerText = pad(min);
  secondDisplay.innerText = pad(sec);
  millisecondDisplay.innerText = pad(ms);
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}
