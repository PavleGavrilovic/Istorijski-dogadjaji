document.getElementById("buttonLog").addEventListener("click", loginClient);

function loginClient() {
  let email = document.getElementById("userL").value;
  let password = document.getElementById("passwordL").value;

  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailProvera = regexEmail.test(email);

  if (emailProvera) {
    console.log("Email ok");
  }

  let regexPass = /([^ ]{7,50})/;
  let passProvera = regexPass.test(password);

  if (passProvera) {
    console.log("Password ok");
  }

  if (!emailProvera || !passProvera) {
    document.getElementById("userL").value = "";
    document.getElementById("userL").placeholder = "Invalid Email!";
    document.getElementById("userL").style.cssText =
      "box-shadow: 0 0 10px red; color: red";
    document.getElementById("passwordL").value = "";
    document.getElementById("passwordL").placeholder = "Invalid Password!";
    document.getElementById("passwordL").style.cssText =
      "box-shadow: 0 0 10px red; color: red";
  } else {
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);

        if (
          response.data.result == "INVALID CREDENTIALS" ||
          response.data.result == "NO SUCH EMAIL IN THE DATABASE"
        ) {
          localStorage.removeItem("userData");
          alert(response.data.result);
        } else {
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          alert(response.data.result);
          window.location.href = "index.html";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
