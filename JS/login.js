var register=document.getElementById("registerForm");
var login=document.getElementById("loginForm");
var footer=document.getElementsByTagName("footer")[0];

var dugmeDa=document.getElementById("buttonYes");
var dugmeNe=document.getElementById("buttonNo");
var dugmeNazad=document.getElementById("btnNazad");

dugmeNazad.style.display="none";
register.style.display="none";
login.style.display="none";
footer.style.visibility="hidden";


dugmeDa.addEventListener("click",showLog);
dugmeNe.addEventListener("click",showReg);
dugmeNazad.addEventListener("click",nazadRegLog);





function showLog(){
    login.style.display="block";
    document.getElementById("buttonRLdiv").style.display="none";
    dugmeNazad.style.display="block";
    footer.style.visibility="visible";
}

function showReg(){
    register.style.display="block";
    document.getElementById("buttonRLdiv").style.display="none";
    dugmeNazad.style.display="block";
    footer.style.visibility="visible";
}

function nazadRegLog(){
    register.style.display="none";
    login.style.display="none";
    document.getElementById("buttonRLdiv").style.display="block";
    dugmeNazad.style.display="none";
    footer.style.visibility="hidden";
}