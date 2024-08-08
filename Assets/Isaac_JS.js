window.onload = function () {
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
  } else if ((hours == 12)) {
    meridiem = "PM";
  } else if ((hours == 0)) {
    hours = 12;
  }

  if (minutes < 10){
    minutes = '0' + minutes;
  }

  Time.innerHTML = hours + ":" + minutes + " " + meridiem;

  setTimeout(Clock, 1000);
}

Clock();
