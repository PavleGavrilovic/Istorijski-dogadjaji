// INDEX STRANA...................................................................................

// HAMBURGER IKONA PREKO JQUERY...............................

document.getElementById("navbar").style.display="none";

$(function(){
    $("#hamburgerIcon").on("click",function(){
        $("#navbar").toggle("slow");
    })
});

// REGISTER I LOGIN DEO.............................................................................

var register=document.getElementById("registerForm");
var login=document.getElementById("loginForm");

var dugmeDa=document.getElementById("buttonYes");
var dugmeNe=document.getElementById("buttonNo");
var dugmeNazad=document.getElementById("btnNazad");


dugmeDa.addEventListener("click",showLog);
dugmeNe.addEventListener("click",showReg);
dugmeNazad.addEventListener("click",nazadRegLog);

dugmeNazad.style.display="none";
register.style.display="none";
login.style.display="none";

function showLog(){
    login.style.display="block";
    document.getElementById("buttonRLdiv").style.display="none";
    dugmeNazad.style.display="block";
}

function showReg(){
    register.style.display="block";
    document.getElementById("buttonRLdiv").style.display="none";
    dugmeNazad.style.display="block";
}

function nazadRegLog(){
    register.style.display="none";
    login.style.display="none";
    document.getElementById("buttonRLdiv").style.display="block";
    dugmeNazad.style.display="none";
}

// ...........................................................................................