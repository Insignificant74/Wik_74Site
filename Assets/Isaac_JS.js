window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const StartButton = document.getElementById("StartButton");
  const StartMenu = document.getElementById("StartMenu");
  const StartMenuButtons = [].slice.call(StartMenu.querySelector(".Internal").getElementsByTagName("button"));

  MainContainer.addEventListener("click", function () {
    // deactivate buttons
    StartMenuButtons.forEach(button => {
      button.classList.remove("is-active");
    });
    // deactivate self
    StartMenu.classList.remove("is-active");
    StartButton.classList.remove("is-active");
    // deactivate children
    //...
  });

  StartMenuButtons.forEach(button => {
    button.addEventListener("mouseover", function () {
      moveSelection(StartMenuButtons, button);
    });
  });
  
  StartButton.addEventListener("click", function () {
    StartButton.classList.toggle("is-active");
    StartMenu.classList.toggle("is-active");
  });

  Clock.call();
};

function moveSelection(MenuButtons, targetButton){
  MenuButtons.forEach(button => {
    if (button != targetButton){
      button.classList.remove("is-active");
    }
    else{
      button.classList.add("is-active");
    }
  });
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
