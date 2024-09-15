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
  const minWidth = 200;
  const minHeight = 100;
  var TitleBar = window.querySelector(".TitleBar");
  var TopLeftBorder = window.querySelector(".Window_TopLeftBorder");
  var TopBorder = window.querySelector(".Window_TopBorder");
  var TopRightBorder = window.querySelector(".Window_TopRightBorder");
  var LeftBorder = window.querySelector(".Window_LeftBorder");
  var RightBorder = window.querySelector(".Window_RightBorder");
  var BottomLeftBorder = window.querySelector(".Window_BottomLeftBorder");
  var BottomBorder = window.querySelector(".Window_BottomBorder");
  var BottomRightBorder = window.querySelector(".Window_BottomRightBorder");
  var active = false;
  var target = -1;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;
  var freezeX;
  var freezeY;

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
  TopBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 2;
      dragStart(e);
    },
    false
  );
  TopBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 2;
      dragStart(e);
    },
    false
  );
  TopRightBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 3;
      dragStart(e);
    },
    false
  );
  TopRightBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 3;
      dragStart(e);
    },
    false
  );
  LeftBorder.addEventListener(
    "touchstart",
    function (e) {
      target = 4;
      dragStart(e);
    },
    false
  );
  LeftBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 4;
      dragStart(e);
    },
    false
  );
  RightBorder.addEventListener(
    "touchstart",
    function (e) {
      target = 5;
      dragStart(e);
    },
    false
  );
  RightBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 5;
      dragStart(e);
    },
    false
  );
  BottomLeftBorder.addEventListener(
    "touchstart",
    function (e) {
      target = 6;
      dragStart(e);
    },
    false
  );
  BottomLeftBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 6;
      dragStart(e);
    },
    false
  );
  BottomBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 7;
      dragStart(e);
    },
    false
  );
  BottomBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 7;
      dragStart(e);
    },
    false
  );
  BottomRightBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 8;
      dragStart(e);
    },
    false
  );
  BottomRightBorder.addEventListener(
    "mousedown",
    function (e) {
      target = 8;
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
    if (!active) return;

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

    switch (target) {
      case 0:
        window.style.left = getWindowOffset(window.style.left, xOffset) + "px";
        window.style.top = getWindowOffset(window.style.top, yOffset) + "px";
        break;
      case 1:
        resizeLeft(e);
        resizeTop(e);
        break;
      case 2:
        resizeTop(e);
        break;
    }
  }

  function resizeLeft(e) {
    var pass = true;

    if (freezeX != null) {
      if (e.type === "touchmove") {
        pass = freezeX > e.touches[0].clientX;
        xOffset = e.touches[0].clientX - freezeX;
      } else {
        pass = freezeX > e.clientX;
        xOffset = e.clientX - freezeX;
      }
    }
    if (pass) {
      if (getWindowOffset(window.style.width, -minWidth) > xOffset) {
        window.style.left = getWindowOffset(window.style.left, xOffset) + "px";
        window.style.width =
          getWindowOffset(window.style.width, -xOffset) + "px";
        freezeX = null;
        return;
      }

      xOffset = getWindowOffset(window.style.width, -minWidth);
      if (e.type === "touchmove") {
        freezeX =
          e.touches[0].clientX -
          xOffset +
          getWindowOffset(window.style.width, -minWidth);
      } else {
        freezeX =
          e.clientX +
          (getWindowOffset(window.style.width, -minWidth) - xOffset);
      }
      window.style.left = getWindowOffset(window.style.left, xOffset) + "px";
      window.style.width = minWidth + "px";
    }
  }

  function resizeTop(e) {
    var pass = true;

    if (freezeY != null) {
      if (e.type === "touchmove") {
        pass = freezeY > e.touches[0].clientY;
        yOffset = e.touches[0].clientY - freezeY;
      } else {
        pass = freezeY > e.clientY;
        yOffset = e.clientY - freezeY;
      }
    }
    if (pass) {
      if (getWindowOffset(window.style.height, -minHeight) > yOffset) {
        window.style.top = getWindowOffset(window.style.top, yOffset) + "px";
        window.style.height =
          getWindowOffset(window.style.height, -yOffset) + "px";
        freezeY = null;
        return;
      }
      yOffset = getWindowOffset(window.style.height, -minHeight);
      if (e.type === "touchmove") {
        freezeY =
          e.touches[0].clientY -
          yOffset +
          getWindowOffset(window.style.height, -minHeight);
      } else {
        freezeY =
          e.clientY +
          (getWindowOffset(window.style.height, -minHeight) - yOffset);
      }
      window.style.top = getWindowOffset(window.style.top, yOffset) + "px";
      window.style.height = minHeight + "px";
    }
  }
}

function getWindowOffset(style, offset) {
  return parseInt(style.slice(0, -2), 10) + offset;
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
