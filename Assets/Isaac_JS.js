window.onload = function () {
  const StartButton = document.getElementById("StartButton");
  const StartMenu = document.getElementById("StartMenu");
  StartButton.addEventListener("click", function () {
    StartButton.classList.toggle("is-active");
    StartMenu.classList.toggle("is-active");
  });
  Clock.call();
};

function Clock() {
  const d = new Date();
  const Time = document.getElementById("Time");
  var meridiem = "AM";
  let hours = d.getHours();
  let minutes = d.getMinutes();

  if (hours > 12) {
    hours -= 12;
    meridiem = "PM";
  } else if (hours == 12) {
    meridiem = "PM";
  } else if (hours == 0) {
    hours = 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  Time.innerHTML = hours + ":" + minutes + " " + meridiem;

  setTimeout(Clock, 1000);
}

Clock();
