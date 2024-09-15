window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const TaskbarButtons = document
    .querySelector("#Taskbar .Internal")
    .querySelectorAll(":scope > .button");

  TaskbarButtons.forEach((button) => {
    setupTaskbarButton(button);
  });

  MainContainer.addEventListener("click", function () {
    deselectTaskbarButtons();
  });

  Clock.call();
};

function setupDragWindow(window) {
  var TitleBar = window.querySelector(".TitleBar");
  var TopLeftBorder = window.querySelector(".Window_TopLeftBorder");
  var active = false;
  var target = -1;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  TitleBar.addEventListener(
    "touchstart",
    function (e) {
      target = 0;
      dragStart(e);
    },
    false
  );
  TitleBar.addEventListener(
    "mousedown",
    function (e) {
      target = 0;
      dragStart(e);
    },
    false
  );
  TopLeftBorder.addEventListener(
    "touchstart",
    function (e) {
      target = 1;
      dragStart(e);
    },
    false
  );
  TopLeftBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 1;
      dragStart(e);
    },
    false
  );

  document.body.addEventListener(
    "touchend",
    function () {
      active = false;
      target = -1;
    },
    false
  );
  document.body.addEventListener(
    "mouseup",
    function () {
      active = false;
      target = -1;
    },
    false
  );
  document.body.addEventListener("touchmove", drag, false);
  document.body.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    active = true;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        xOffset = e.touches[0].clientX - initialX;
        yOffset = e.touches[0].clientY - initialY;
      } else {
        xOffset = e.clientX - initialX;
        yOffset = e.clientY - initialY;
      }

      initialX += xOffset;
      initialY += yOffset;

      console.log(xOffset);
      console.log(window.style.width);
      console.log(window.style.left);
      switch (target) {
        case 0:
          window.style.left =
            parseInt(window.style.left.slice(0, -2), 10) + xOffset + "px";
          window.style.top =
            parseInt(window.style.top.slice(0, -2), 10) + yOffset + "px";
          break;
        case 1:
          if (parseInt(window.style.width.slice(0, -2), 10) > xOffset) {
            window.style.left =
              parseInt(window.style.left.slice(0, -2), 10) + xOffset + "px";
            window.style.width =
              parseInt(window.style.width.slice(0, -2), 10) - xOffset + "px";
          } else {
            window.style.left =
              parseInt(window.style.left.slice(0, -2), 10) -
              parseInt(window.style.width.slice(0, -2), 10) +
              "px";
            window.style.width = "0px";
          }

          window.style.top =
            parseInt(window.style.top.slice(0, -2), 10) + yOffset + "px";
          window.style.height =
            parseInt(window.style.height.slice(0, -2), 10) - yOffset + "px";
          break;
      }
    }
  }
}

function deselectTaskbarButtons() {
  const TaskbarButtons = document
    .querySelector("#Taskbar .Internal")
    .querySelectorAll(":scope > .button");

  TaskbarButtons.forEach((button) => {
    const buttonMenus = [].slice.call(
      button.querySelectorAll(":scope > .Menu")
    );
    const buttonWindows = [].slice.call(
      button.querySelectorAll(":scope > .Window")
    );

    buttonWindows.forEach((window) => {
      window.classList.remove("selected");
    });
    buttonMenus.forEach((menu) => {
      deactivateMenu(menu);
    });
    if (buttonWindows.length == 0) {
      button.classList.remove("is-active");
    }
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
    // if menus and windows
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleMenu(button, buttonMenus);
        toggleWindow(buttonWindows);
      });
    buttonWindows.forEach((window) => {
      setupDragWindow(window);
      window.addEventListener("mouseup", function () {
        deselectTaskbarButtons();
        selectWindow(window);
      });
      window.addEventListener("touchend", function () {
        deselectTaskbarButtons();
        selectWindow(window);
      });
    });
    // if menus
  } else if (buttonMenus.length != 0) {
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleMenu(button, buttonMenus);
      });
    // if windows
  } else if (buttonWindows.length != 0) {
    button
      .querySelector(":scope > .Internal")
      .addEventListener("click", function () {
        button.classList.toggle("is-active");
        toggleWindow(buttonWindows);
      });
    buttonWindows.forEach((window) => {
      setupDragWindow(window);
      window.addEventListener("mouseup", function () {
        deselectTaskbarButtons();
        selectWindow(window);
      });
      window.addEventListener("touchend", function () {
        deselectTaskbarButtons();
        selectWindow(window);
      });
    });
  }
}

function toggleMenu(button, buttonMenus) {
  if (button.classList.contains("is-active")) {
    deselectTaskbarButtons();
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
    if (window.classList.contains("is-active")) {
      window.classList.remove("is-active");
      window.classList.remove("selected");
    } else {
      window.classList.add("is-active");
      selectWindow(window);
    }
  });
}

function selectWindow(window) {
  window.classList.add("selected");
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
