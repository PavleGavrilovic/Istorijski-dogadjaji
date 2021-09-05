document.getElementById("buttonReg").addEventListener("click", registerClient);

function registerClient() {
  let email = document.getElementById("user").value;
  let pass1 = document.getElementById("password").value;
  let pass2 = document.getElementById("confirm").value;

  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailProvera = regexEmail.test(email);

  if (emailProvera) {
    console.log("Email ok");
  } else {
    document.getElementById("user").placeholder = "Invalid Email!";
    document.getElementById("user").style.cssText =
      "box-shadow: 0 0 10px red; color: red";
  }

  let regexPass = /([^ ]{7,50})/;
  let passProvera = regexPass.test(pass1);

  if (passProvera) {
    console.log("Password ok");
  } else {
    document.getElementById("password").placeholder = "Invalid Password!";
    document.getElementById("password").style.cssText =
      "box-shadow: 0 0 10px red; color: red";
  }

  if (
    !emailProvera ||
    !passProvera ||
    document.getElementById("confirm").value !=
      document.getElementById("password").value ||
    document.getElementById("confirm").value == ""
  ) {
    document.getElementById("confirm").value = "";
    document.getElementById("confirm").placeholder = "Password doesn't match!";
    document.getElementById("confirm").style.cssText =
      "box-shadow:0 0 10px red;color:red";
  } else {
    axios
      .post("http://localhost:3000/register", {
        email: email,
        password: pass2,
      })
      .then(function (response) {
        if (response.data.data == "SUCCESSFULLY REGISTERED") {
          alert(response.data.result);
          window.location.href = "login.html";
        } else if (response.data.data == "EMAIL ALREADY EXISTS") {
          alert(response.data.result);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
