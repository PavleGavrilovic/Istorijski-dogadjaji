// SPINNER SAKRIVANJE.......................

$(function () {
  $(window).on("load", function () {
    $("#spinnerWrapper").fadeOut("slow");
    $(" html, body").css({ overflow: "auto" });
  });
});

// HAMBURGER IKONA PREKO JQUERY...............................

document.getElementById("navbar").style.display = "none";

$(function () {
  $("#hamburgerIcon").on("click", function () {
    $("#navbar").toggle("slow");
  });
});

// LOG OUT DUGME.......................................

if (!localStorage.getItem("userData")) {
  for (let i = 0; i < document.getElementsByClassName("logOut").length; i++) {
    document.getElementsByClassName("logOut")[i].style.display = "none";
  }
} else {
  for (let i = 0; i < document.getElementsByClassName("logOut").length; i++) {
    document.getElementsByClassName("logOut")[i].style.cssText = `
      font-size: 20px;
  color: rgba(198, 182, 159, 255);
  background-color: rgb(31, 25, 25);
  border: none;
  margin: 0;
  height: 50px;
      `;
  }

  document.getElementById("linkLog").style.display = "none";
  document.getElementById("linkReg").style.display = "none";

  document.getElementById("mobileLog").style.display = "none";
  document.getElementById("mobileReg").style.display = "none";
}

for (let i = 0; i < document.getElementsByClassName("logOut").length; i++) {
  document
    .getElementsByClassName("logOut")
    [i].addEventListener("click", logMeOut);
}

function logMeOut() {
  localStorage.removeItem("userData");
  this.style.display = "none";
  document.getElementById("linkLog").style.visibility = "visible";
  document.getElementById("linkReg").style.visibility = "visible";

  document.getElementById("mobileLog").style.visibility = "visible";
  document.getElementById("mobileReg").style.visibility = "visible";

  window.location.reload();
}
