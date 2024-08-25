window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const StartButton = document.getElementById("StartButton");
  const StartMenu = document.getElementById("StartMenu");
  const Programs = document.getElementById("Menu_Programs");
  const Documents = document.getElementById("Menu_Documents");
  const Settings = document.getElementById("Menu_Settings");
  const Find = document.getElementById("Menu_Find");
  const Help = document.getElementById("Menu_Help");
  const Run = document.getElementById("Menu_Run");
  const Shut_Down = document.getElementById("Menu_Shut_Down");

  MainContainer.addEventListener("click", function () {
    StartButton.classList.remove("is-active");
    StartMenu.classList.remove("is-active");
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });

  StartButton.addEventListener("click", function () {
    StartButton.classList.toggle("is-active");
    StartMenu.classList.toggle("is-active");
  });
  Programs.addEventListener("mouseover", function () {
    Programs.classList.add("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Documents.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.add("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Settings.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");    
    Settings.classList.add("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Find.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.add("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Help.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.add("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Run.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.add("is-active");
    Shut_Down.classList.remove("is-active");
  });
  Shut_Down.addEventListener("mouseover", function () {
    Programs.classList.remove("is-active");
    Documents.classList.remove("is-active");
    Settings.classList.remove("is-active");
    Find.classList.remove("is-active");
    Help.classList.remove("is-active");
    Run.classList.remove("is-active");
    Shut_Down.classList.add("is-active");
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
