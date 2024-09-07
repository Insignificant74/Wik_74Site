window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const TaskbarButtons = document
    .querySelector("#Taskbar .Internal")
    .querySelectorAll(":scope > .button");

  TaskbarButtons.forEach((button) => {
    setupTaskbarButton(button);
  });

  MainContainer.addEventListener("click", function () {
    TaskbarButtons.forEach((button) => {
      deactivateTaskbarButton(button);
    });
  });

  Clock.call();
};

function deactivateTaskbarButton(button) {
  // check if menus
  const buttonMenus = [].slice.call(button.querySelectorAll(":scope > .Menu"));
  const buttonWindows = [].slice.call(
    button.querySelectorAll(":scope > .Window")
  );

  button.classList.remove("is-active");
  buttonMenus.forEach((menu) => {
    deactivateMenu(menu);
  });
  buttonWindows.forEach((window) => {
    window.classList.remove("is-active");
  });
}

function setupTaskbarButton(button) {
  // check if menus
  const buttonMenus = [].slice.call(button.querySelectorAll(":scope > .Menu"));
  const buttonWindows = [].slice.call(
    button.querySelectorAll(":scope > .Window")
  );
  buttonMenus.forEach((menu) => {
    setupMenuButtons(menu);
  });
  if (buttonMenus.length != 0 && buttonWindows.length != 0) {
    // toggle menus
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleMenu(button, buttonMenus);
        toggleWindow(buttonWindows);
      });
    // toggle windows
  } else if (buttonMenus.length != 0) {
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleMenu(button, buttonMenus);
      });
  } else if (buttonWindows.length != 0) {
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleWindow(buttonWindows);
      });
  }
}

function toggleMenu(button, buttonMenus) {
  if (button.classList.contains("is-active")) {
    buttonMenus.forEach((menu) => {
      menu.classList.add("is-active");
    });
  } else {
    buttonMenus.forEach((menu) => {
      deactivateMenu(menu);
    });
  }
}

function toggleWindow(buttonWindows) {
  buttonWindows.forEach((window) => {
    window.classList.toggle("is-active");
  });
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

    [].slice
      .call(menuButton.querySelectorAll(":scope > .Menu"))
      .forEach((menuButtonMenu) => {
        setupMenuButtons(menuButtonMenu);
      });
    // give button activation function
    menuButton.addEventListener("mouseover", function () {
      moveSelection(menuButtons, menuButton);

      [].slice
        .call(menuButton.querySelectorAll(":scope > .Menu"))
        .forEach((menuButtonMenu) => {
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
