window.onload = function () {
  const UpdateButton = document.querySelector(".UpdateButton");
  UpdateButton.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Update_PHP.php");
    xhr.onload = function () {
      console.log(this.response);
    };
    xhr.send();
    return false;
  });
};
