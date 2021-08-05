// DOHVATANJE PODATAKA U VIDU JSON FAJLA SA GITHUBA..........................................................

fetch("https://raw.githubusercontent.com/PavleGavrilovic/Istorijski-dogadjaji/main/data/data.json")
.then(response=>response.json())
.then(data=>{
    document.getElementById("randomWrapper").innerHTML=displayRandomData(data);
    document.getElementById("featuredWrapperDesktop").innerHTML=displayFeaturedData(data)
})


// INDEX STRANA...................................................................................

// POPUNJAVANJE TRI RANDOM CLANKA I FEATURED CLANKA DOHVATANJEM IZ JSON FAJLA.....................

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

function displayFeaturedData(data){
    let shuffleData=data.sort(()=>0.5-Math.random());

    let text=`
    <div id="featuredWrapper">
            <h2 id="featuredHeader">${shuffleData[0].title} (on this day)</h2>
            <p id="featuredParagraf">${shuffleData[0].text}</p>
    </div>
    `;
    return text;
}

// OVO ZAKOMENTARISANO CE MOZDA BITI POTREBNO KASNIJE!!!
// var danasnjiDan=new Date();
// var danString=danasnjiDan.toString();
// var novi=danString.split(" ");
// var spojeni=novi[1] + " " + novi[2];
// console.log(spojeni);

// var dan="Aug 05";

// if(dan==spojeni){
//     console.log("Jesu jednaki")
// }

// HAMBURGER IKONA PREKO JQUERY...............................

document.getElementById("navbar").style.display="none";

$(function(){
    $("#hamburgerIcon").on("click",function(){
         $("#navbar").toggle("slow");
    })
});
