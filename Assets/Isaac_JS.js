window.onload = function () {
  const MainContainer = document.getElementById("MainContainer");
  const TaskbarButtons = document
    .querySelector("#Taskbar .Internal")
    .querySelectorAll(":scope > .button");

  TaskbarButtons.forEach((button) => {
    setupTaskbarButton(button);
  });

  setupMenus();

  MainContainer.addEventListener("click", function () {
    deselectTaskbarButtons();
  });

  mapButtons();

  Clock.call();
};

function setupDragWindow(programWindow) {
  const minWidth = 200;
  const minHeight = 100;
  var TitleBar = programWindow.querySelector(".TitleBar");
  var TopLeftBorder = programWindow.querySelector(".Window_TopLeftBorder");
  var TopBorder = programWindow.querySelector(".Window_TopBorder");
  var TopRightBorder = programWindow.querySelector(".Window_TopRightBorder");
  var LeftBorder = programWindow.querySelector(".Window_LeftBorder");
  var RightBorder = programWindow.querySelector(".Window_RightBorder");
  var BottomLeftBorder = programWindow.querySelector(
    ".Window_BottomLeftBorder"
  );
  var BottomBorder = programWindow.querySelector(".Window_BottomBorder");
  var BottomRightBorder = programWindow.querySelector(
    ".Window_BottomRightBorder"
  );
  var active = false;
  var target = -1;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;
  var freezeX;
  var freezeY;
  var screenHeight = innerHeight;
  var screenWidth = innerWidth;

  window.addEventListener("resize", function () {
    var heightChange = (innerHeight - screenHeight) / 2;
    var widthCharnge = (innerWidth - screenWidth) / 2;
    programWindow.style.top =
      getWindowOffset(programWindow.style.top, heightChange) + "px";
    programWindow.style.bottom =
      getWindowOffset(programWindow.style.bottom, heightChange) + "px";
    programWindow.style.left =
      getWindowOffset(programWindow.style.left, widthCharnge) + "px";
    programWindow.style.right =
      getWindowOffset(programWindow.style.right, widthCharnge) + "px";
    screenHeight = innerHeight;
    screenWidth = innerWidth;
  });
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
    freezeX = null;
    freezeY = null;
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
    if (!active || e.target.classList.contains("button")) return;
    programWindow.classList.remove("maximised");
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
        programWindow.style.left =
          getWindowOffset(programWindow.style.left, xOffset) + "px";
        programWindow.style.top =
          getWindowOffset(programWindow.style.top, yOffset) + "px";
        programWindow.style.right =
          getWindowOffset(programWindow.style.right, -xOffset) + "px";
        programWindow.style.bottom =
          getWindowOffset(programWindow.style.bottom, -yOffset) + "px";
        break;
      case 1:
        resizeTop(e);
        resizeLeft(e);
        break;
      case 2:
        resizeTop(e);
        break;
      case 3:
        resizeTop(e);
        resizeRight(e);
        break;
      case 4:
        resizeLeft(e);
        break;
      case 5:
        resizeRight(e);
        break;
      case 6:
        resizeBottom(e);
        resizeLeft(e);
        break;
      case 7:
        resizeBottom(e);
        break;
      case 8:
        resizeBottom(e);
        resizeRight(e);
        break;
    }
  }

  function resizeLeft(e) {
    var pass = true;
    var eClientX;
    if (e.type === "touchmove") {
      eClientX = e.touches[0].clientX;
    } else {
      eClientX = e.clientX;
    }
    if (freezeX != null) {
      pass = freezeX > eClientX;
    }
    if (pass) {
      var minLeft =
        innerWidth - getWindowOffset(programWindow.style.right, minWidth);
      if (eClientX <= minLeft) {
        programWindow.style.left = eClientX + "px";
        freezeX = null;
        return;
      }

      freezeX = minLeft;
      programWindow.style.left = freezeX + "px";
    }
  }

  function resizeTop(e) {
    var pass = true;
    var eClientY;
    if (e.type === "touchmove") {
      eClientY = e.touches[0].clientY;
    } else {
      eClientY = e.clientY;
    }
    if (freezeY != null) {
      pass = freezeY > eClientY;
    }
    if (pass) {
      var minTop =
        innerHeight - getWindowOffset(programWindow.style.bottom, minHeight);
      if (eClientY <= minTop) {
        programWindow.style.top = eClientY + "px";
        freezeY = null;
        return;
      }

      freezeY = minTop;
      programWindow.style.top = freezeY + "px";
    }
  }

  function resizeRight(e) {
    var pass = true;
    var eClientX;
    if (e.type === "touchmove") {
      eClientX = e.touches[0].clientX;
    } else {
      eClientX = e.clientX;
    }
    if (freezeX != null) {
      pass = freezeX < eClientX;
    }
    if (pass) {
      var minRight = getWindowOffset(programWindow.style.left, minWidth);
      if (eClientX >= minRight) {
        programWindow.style.right = innerWidth - eClientX + "px";
        freezeX = null;
        return;
      }

      freezeX = minRight;
      programWindow.style.right = innerWidth - freezeX + "px";
    }
  }

  function resizeBottom(e) {
    var pass = true;
    var eClientY;
    if (e.type === "touchmove") {
      eClientY = e.touches[0].clientY;
    } else {
      eClientY = e.clientY;
    }
    if (freezeY != null) {
      pass = freezeY < eClientY;
    }
    if (pass) {
      var minBottom = getWindowOffset(programWindow.style.top, minHeight);
      if (eClientY >= minBottom) {
        programWindow.style.bottom = innerHeight - eClientY + "px";
        freezeY = null;
        return;
      }

      freezeY = minBottom;
      programWindow.style.bottom = innerHeight - freezeY + "px";
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

  const StartButton = document.getElementById("StartButton");

  deactivateMenu(StartButton.querySelector(":scope > .Menu"));
  StartButton.classList.remove("is-active");

  TaskbarButtons.forEach((button) => {
    [].slice
      .call(button.querySelectorAll(":scope > .Window"))
      .forEach((programWindow) => {
        programWindow.classList.remove("selected");
      });
  });
}

function setupMenus() {
  const StartButton = document.getElementById("StartButton");
  var menu = StartButton.querySelector(":scope > .Menu");
  setupMenuButtons(menu);
  StartButton.querySelector(":scope > .Internal").addEventListener(
    "click",
    function () {
      StartButton.classList.toggle("is-active");
      toggleMenu(StartButton, menu);
    }
  );
}

function setupTaskbarButton(button) {
  console.log(button);
  var programWindow = button.querySelector(":scope > .Window");
  console.log(programWindow);
  button
    .querySelector(":scope > .Internal")
    .addEventListener("click", function () {
      toggleWindow(button, programWindow);
    });
  setupDragWindow(programWindow);
  programWindow.addEventListener("mouseup", function () {
    deselectTaskbarButtons();
    selectWindow(programWindow);
  });
  programWindow.addEventListener("touchend", function () {
    deselectTaskbarButtons();
    selectWindow(programWindow);
  });
  programWindow
    .querySelector(".TitleBar_Minimise")
    .addEventListener("click", function () {
      button.classList.remove("is-active");
    });
  programWindow
    .querySelector(".TitleBar_Maximise")
    .addEventListener("click", function () {
      if (programWindow.classList.contains("maximised")){
        programWindow.style.left = programWindow.oldLeft;
        programWindow.style.right = programWindow.oldRight;
        programWindow.style.top = programWindow.oldTop;
        programWindow.style.bottom = programWindow.oldBottom;
        programWindow.classList.remove("maximised");
      }
      else{
        programWindow.oldLeft = programWindow.style.left;
        programWindow.oldRight = programWindow.style.right;
        programWindow.oldTop = programWindow.style.top;
        programWindow.oldBottom = programWindow.style.bottom;
        programWindow.style.left = "0px";
        programWindow.style.right = "0px";
        programWindow.style.top = "0px";
        programWindow.style.bottom = "28px";
        programWindow.classList.add("maximised");
      }
    });
  programWindow
    .querySelector(".TitleBar_Close")
    .addEventListener("click", function () {
      button.classList.remove("open");
    });
}

function toggleMenu(button, menu) {
  if (button.classList.contains("is-active")) {
    deselectTaskbarButtons();
    button.classList.add("is-active");
    menu.classList.add("is-active");
  } else {
    deactivateMenu(menu);
  }
}

function toggleWindow(button, programWindow) {
  if (button.classList.contains("is-active")) {
    button.classList.remove("is-active");
    programWindow.classList.remove("selected");
  } else {
    button.classList.add("is-active");
    selectWindow(programWindow);
  }
}

function selectWindow(programWindow) {
  programWindow.classList.add("selected");
}

function setupMenuButtons(menu) {
  // get the menu's buttons
  const menuButtons = [].slice.call(
    menu
      .querySelector(":scope > .Internal")
      .querySelectorAll(":scope > .menuButton")
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
    .call(menu.querySelector(".Internal").getElementsByClassName("menuButton"))
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

function mapButtons() {
  document.getElementById("Help").addEventListener("click", function () {
    document.getElementById("Taskbar_Welcome").classList.add("open");
    selectWindow(document.getElementById("HelpWindow"));
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
