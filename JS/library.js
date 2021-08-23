let storageArr=localStorage.getItem("eventArr");
document.getElementById("chosenWrapper").innerHTML=storageArr;

let addedArr=localStorage.getItem("newArr");
document.getElementById("chosenWrapper").innerHTML+=addedArr;



// SKIDANJE KLASE KOJA MENJA BOJU POZADINE.......................................................

let forArray=document.getElementsByClassName("eventArticle");


for(let i=0;i<forArray.length;i++){
    document.getElementsByClassName("eventArticle")[i].classList.remove("colorChange");
};



// MENJANJE POZADINSKE BOJE NA KLIK....................

$(function(){ 
						   
    $(".eventArticle").on("click",function(){
        $(this).toggleClass("colorChange");
    })
    
});


// BRISANJE DOGADJAJA...............................................................

document.getElementById("btnRemove").addEventListener("click",removeItems);


function removeItems(){
    $(".colorChange").remove();
    
    let newArray=[];
    
    for(i=0;i<forArray.length;i++){
        newArray.push(forArray[i].outerHTML);
    }
    let newArrayNoCommas=newArray.join(" ");
    

    localStorage.setItem("eventArr",newArrayNoCommas);
    localStorage.setItem("newArr"," ");

    
}


// DODAVANJE DOGADJAJA................................................................

document.getElementById("btnMore").addEventListener("click",addItems);

function addItems(){
    location.href="file:///C:/Users/pavle/OneDrive/Desktop/PROJEKAT/events.html";
}