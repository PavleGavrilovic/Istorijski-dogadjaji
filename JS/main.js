// HAMBURGER IKONA PREKO JQUERY...............................

document.getElementById("navbar").style.display="none";

$(function(){
    $("#hamburgerIcon").on("click",function(){
         $("#navbar").toggle("slow");
    })
});

