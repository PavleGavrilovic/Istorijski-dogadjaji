// DOHVATANJE PODATAKA U VIDU JSON FAJLA SA GITHUBA..........................................................

fetch("https://raw.githubusercontent.com/PavleGavrilovic/Istorijski-dogadjaji/main/data/data.json")
.then(response=>response.json())
.then(data=>{
    document.getElementById("randomWrapper").innerHTML=displayRandomData(data);
    document.getElementById("featuredWrapperDesktop").innerHTML=displayFeaturedData(data)
})


// INDEX STRANA...................................................................................

// POPUNJAVANJE TRI RANDOM CLANKA I FEATURED CLANKA DOHVATANJEM IZ JSON FAJLA.....................

function displayFeaturedData(data){
    let today=new Date();
    let todayString=today.toString();
    let todayStringSplit=todayString.split(" ");
    let day=todayStringSplit[1] + " " + todayStringSplit[2];
   

    var text;
    
    for(let i=0;i<data.length;i++){
        
        if(day==data[i].date){
            var text=`
            <div id="featuredWrapper">
                    <h2 id="featuredHeader">${data[i].title} (on this day)</h2>
                    <p id="featuredParagraf">${data[i].text}</p>
            </div>
            `;
        }else{
            var text=`
            <div id="featuredWrapper">
                    <h2 id="featuredHeader" style="text-align:center">NO EVENT ON THIS DAY</h2>
            </div>
            `;
        }
        
    }
    return text;
}

function displayRandomData(data){

    let shuffleData=data.sort(()=>0.5-Math.random());

    let text=`
    <div id="prvi" class="random">
        <h3>${shuffleData[0].title}</h3>
        <img src="${shuffleData[0].image}" alt="img1" class="randomSlika">
        <p class="paragraf">${shuffleData[0].text}</p>
    </div>

    <div id="drugi" class="random">
        <h3>${shuffleData[5].title}</h3>
        <img src="${shuffleData[5].image}" alt="img1" class="randomSlika">
        <p class="paragraf">${shuffleData[5].text}</p>
    </div>

    <div id="treci" class="random">
        <h3>${shuffleData[6].title}</h3>
        <img src="${shuffleData[6].image}" alt="img1" class="randomSlika">
        <p class="paragraf">${shuffleData[6].text}</p>
    </div>
    `;
    return text;
};

// HAMBURGER IKONA PREKO JQUERY...............................

document.getElementById("navbar").style.display="none";

$(function(){
    $("#hamburgerIcon").on("click",function(){
         $("#navbar").toggle("slow");
    })
});
