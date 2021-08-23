// DOHVATANJE PODATAKA U VIDU JSON FAJLA SA GITHUBA..........................................................
let text="";

fetch("https://raw.githubusercontent.com/PavleGavrilovic/Istorijski-dogadjaji/main/data/data.json")
.then(response=>response.json())
.then(data=>{
    document.getElementById("eventWrapper").innerHTML=ispisi(data);
    
        
    function ispisi(data){
        data.forEach(element => {
            text+=`
        <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
            <h3 class="headerEvents">${element.title}</h3>
            <img src="${element.image}" alt="img1" class="randomSlika">
            <p class="paragraf">${element.text}</p>
        </div>
            `;
        });

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });

        return text;
    }

    // FILTRIRANJE ANTICKIH DOGADJAJA................................................

    document.getElementById("classical").addEventListener("click",showClassical);

    function showClassical(){
        let newArray=data.filter(function(elem){
            if(elem.year>-2000 && elem.year<476){
                return elem;
            }
        })
        let text="";
        newArray.forEach(element => {
            text+=`
        <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
            <h3 class="headerEvents">${element.title}</h3>
            <img src="${element.image}" alt="img1" class="randomSlika">
            <p class="paragraf">${element.text}</p>
        </div>
            `;
        });
        
        document.getElementById("eventWrapper").innerHTML=text;

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });
        
    }

    // FILTRIRANJE SREDNJOVEKOVNIH DOGADJAJA................................................

    document.getElementById("medieval").addEventListener("click",showMedieval);

    function showMedieval(){
        let newArray=data.filter(function(elem){
            if(elem.year>476 && elem.year<1492){
                return elem;
            }
        })
        let text="";
        newArray.forEach(element => {
            text+=`
            <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
                <h3 class="headerEvents">${element.title}</h3>
                <img src="${element.image}" alt="img1" class="randomSlika">
                <p class="paragraf">${element.text}</p>
            </div>
                `;
        });
        
        document.getElementById("eventWrapper").innerHTML=text;

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });
        
    }

    
// FILTRIRANJE RANIH MODERNIH DOGADJAJA................................................

document.getElementById("newAge").addEventListener("click",shownewAge);

    function shownewAge(){
        let newArray=data.filter(function(elem){
            if(elem.year>1492 && elem.year<1800){
                return elem;
            }
        })
        let text="";
        newArray.forEach(element => {
            text+=`
            <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
                <h3 class="headerEvents">${element.title}</h3>
                <img src="${element.image}" alt="img1" class="randomSlika">
                <p class="paragraf">${element.text}</p>
            </div>
                `;
        });
        
        document.getElementById("eventWrapper").innerHTML=text;

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });
        
    }

// FILTRIRANJE MODERNIH DOGADJAJA................................................

document.getElementById("modernAge").addEventListener("click",showModernAge);

function showModernAge(){
    let date=new Date;
    let currentYear=date.getFullYear();

    let newArray=data.filter(function(elem){
        if(elem.year>1800 && elem.year<currentYear){
            return elem;
        }
    })
    let text="";
    newArray.forEach(element => {
        text+=`
        <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
            <h3 class="headerEvents">${element.title}</h3>
            <img src="${element.image}" alt="img1" class="randomSlika">
            <p class="paragraf">${element.text}</p>
        </div>
            `;
    });
    
    document.getElementById("eventWrapper").innerHTML=text;

    $(function(){ 
						   
        $(".eventArticle").on("click",function(){
            $(this).toggleClass("colorChange");
        })

        
    });
    
}
    


    // SORTIRANJE OD NAJSTARIJEG DOGADJAJA.................................................

    document.getElementById('btnSortO').addEventListener("click",sortFromOldest);

    function sortFromOldest(){
        

        
        let eventArray=Array.prototype.slice.call(document.getElementsByClassName("eventArticle"));
        

        let sortedArray=eventArray.sort(function (a,b) {
                return a.dataset.year-b.dataset.year
            });
            

            let actualArray=[];

            for(let i=0;i<sortedArray.length;i++){
                actualArray.push(sortedArray[i].outerHTML)
            }


            
        
        document.getElementById("eventWrapper").innerHTML=actualArray.join(" ");

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });
    }


    // SORTIRANJE OD NAJSKORIJEG DOGADJAJA.................................................

    document.getElementById('btnSortN').addEventListener("click",sortFromNewest);

    function sortFromNewest(){
        
        let eventArray=Array.prototype.slice.call(document.getElementsByClassName("eventArticle"));
        

        let sortedArray=eventArray.sort(function (a,b) {
                return b.dataset.year-a.dataset.year
            });
            

            let actualArray=[];

            for(let i=0;i<sortedArray.length;i++){
                actualArray.push(sortedArray[i].outerHTML)
            }


            
        
        document.getElementById("eventWrapper").innerHTML=actualArray.join(" ");

        $(function(){ 
						   
            $(".eventArticle").on("click",function(){
                $(this).toggleClass("colorChange");
            })
    
            
        });

    }
})






// UZIMANJE KLIKNUTIH DOGADJAJA...............................................


document.getElementById("btnAdd").addEventListener("click",collectData);

function collectData(){
    let selected=document.getElementsByClassName("colorChange");
    let selectedArr=[];

console.log(selected.dataset)

    for(let i=0;i<selected.length;i++){
        console.log(selected[i])
        selectedArr.push(selected[i].outerHTML);
    }
    
    let noCommaArr=selectedArr.join(" ");

    localStorage.setItem("eventArr",noCommaArr);

    document.getElementById("btnAdd").disabled=true;
}


// SAKRIVANJE JEDNOG DUGMETA U ZAVISNOSTI OD TOGA DA LI IMA LOCALSTORAGE ILI NE...................................

if(localStorage.getItem("eventArr")){
    document.getElementById("btnAdd").style.display="none";
}

if(!localStorage.getItem("eventArr")){
    document.getElementById("btnAddMore").style.display="none";
}


// DODAVANJE JOS DOGADJAJA.......................................................
document.getElementById("btnAddMore").addEventListener("click",AddData);

function AddData(){
    let selected=document.getElementsByClassName("colorChange");
    let newArr=[];
    let noCommaArr=localStorage.getItem("eventArr");

    for(let i=0;i<selected.length;i++){
        console.log(selected[i]);
        newArr.push(selected[i].outerHTML);
    }

    let noCommaNewArr=newArr.join(" ");
    localStorage.setItem("newArr",noCommaNewArr);

    localStorage.setItem("eventArr",noCommaArr+noCommaNewArr);
    localStorage.setItem("newArr","");

   
}



