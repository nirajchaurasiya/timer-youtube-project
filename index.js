const minutes = document.querySelector("#minutes");
const hours = document.querySelector("#hours");
const startCustomTimerButton = document.querySelector(
  "#startCustomTimerButton"
);

const timerFunction = () => {
  const selectedHour = document.querySelector("#hours").value;
  const selectedMinute = document.querySelector("#minutes").value;
  const convertedSeconds = selectedHour * 3600 + selectedMinute * 60;
  //   Start a timer
  startTimer(convertedSeconds);
};

startCustomTimerButton.addEventListener("click", timerFunction);

const hoursOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 24]
  .map(
    (e) => `
    <option key="${e}" value="${e}">
        ${e.toString().padStart(2, "0")}
    </option>
`
  )
  .join("");

hours.insertAdjacentHTML("afterbegin", hoursOptions);

const minutesOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .map(
    (e) => `
<option key="${e}" value="${e * 5}">
${(e * 5).toString().padStart(2, "0")}
</option>
`
  )
  .join("");

minutes.insertAdjacentHTML("afterbegin", minutesOptions);

// To display the current time with second

const clock = document.querySelector("#clock");
const playAlarm = () => {
  const audio = new Audio("alarm.mp3");
  audio.play();
};

const showCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  const second =
    date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  let updatedHours = hour > 12 ? hour - 12 : hour;
  updatedHours = updatedHours >= 10 ? updatedHours : "0" + updatedHours;
  let AM_PM = hour > 12 ? "PM" : "AM";
  clock.innerHTML = `<span class='time-sign'>${updatedHours}:${minute}:${second} ${AM_PM}</span>`;
};
showCurrentTime();
setInterval(() => {
  showCurrentTime();
}, 1000);

const timer = document.querySelector("#timer");
let currentTimerId;

const startTimer = (convertedSeconds) => {
  timer.innerHTML = "";

  let remainingTime = convertedSeconds;

  function updateTimer() {
    const hr =
      Math.floor(remainingTime / 3600) > 9
        ? Math.floor(remainingTime / 3600)
        : "0" + Math.floor(remainingTime / 3600);

    let minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds =
      remainingTime % 60 < 10 ? "0" + (remainingTime % 60) : remainingTime % 60;

    timer.innerHTML = remainingTime
      ? `<span>${hr}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds}</span>`
      : `<span class="message-sign">Select  <span>a timer</span> </span>`;

    if (remainingTime > 0) {
      remainingTime--;
      currentTimerId = setTimeout(updateTimer, 1000);
    } else {
      playAlarm();
    }
  }

  // Clear the previous timer if it exists
  if (currentTimerId) {
    clearTimeout(currentTimerId);
  }

  updateTimer();
};
startTimer();
