window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const StartButton = document.getElementById("StartButton");
  const StartMenus = [].slice.call(
    StartButton.querySelectorAll(":scope > .Menu")
  );

  StartButton.querySelector(":scope > .Internal").addEventListener(
    "click",
    function () {
      // toggle menu button
      StartButton.classList.toggle("is-active");
      // toggle menus
      if (StartButton.classList.contains("is-active")) {
        StartMenus.forEach((menu) => {
          menu.classList.add("is-active");
        });
      } else {
        StartMenus.forEach((menu) => {
          deactivateMenu(menu);
        });
      }
    }
  );

  MainContainer.addEventListener("click", function () {
    // deactivate menu button
    StartButton.classList.remove("is-active");
    // deactivate menus
    StartMenus.forEach((menu) => {
      deactivateMenu(menu);
    });
  });

  // start menus
  StartMenus.forEach((menu) => {
    setupMenuButtons(menu);
  });

  // start clock
  Clock.call();
};

function toggleMenu(menu) {
  if (menu.classList.contains("is-active")) {
    deactivateMenu(menu);
  } else {
    menu.classList.add("is-active");
  }
}

function setupMenuButtons(menu) {
  // get the menu's buttons
  const menuButtons = [].slice.call(
    menu
      .querySelector(":scope > .Internal")
      .querySelectorAll(":scope > .button")
  );

  menuButtons.forEach((menuButton) => {
    // setup each buttons menu

    [].slice.call(menuButton.querySelectorAll(":scope > .Menu")).forEach((menuButtonMenu) => {
      setupMenuButtons(menuButtonMenu);
    });
    // give button activation function
    menuButton.addEventListener("mouseover", function () {
      moveSelection(menuButtons, menuButton);
      
      [].slice.call(menuButton.querySelectorAll(":scope > .Menu")).forEach((menuButtonMenu) => {
        menuButtonMenu.classList.add("is-active");
    });
    });
  });
}

function deactivateMenu(menu) {
  // deactivate self
  menu.classList.remove("is-active");
  // deactivate buttons
  [].slice
    .call(menu.querySelector(".Internal").getElementsByClassName("button"))
    .forEach((button) => {
      button.classList.remove("is-active");
    });
  // deactivate children
  [].slice.call(menu.getElementsByClassName("Menu")).forEach((subMenu) => {
    deactivateMenu(subMenu);
  });
}

function moveSelection(MenuButtons, targetButton) {
  MenuButtons.forEach((button) => {
    // deactivate inactive buttons
    if (button != targetButton) {
      button.classList.remove("is-active");
      [].slice.call(button.getElementsByClassName("Menu")).forEach((menu) => {
        deactivateMenu(menu);
      });
    } // activate active button
    else {
      button.classList.add("is-active");
    }
  });
}

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

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  Time.innerHTML = hours + ":" + minutes + " " + meridiem;

  setTimeout(Clock, 1000);
}
