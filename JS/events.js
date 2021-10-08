// DOHVATANJE PODATAKA U VIDU JSON FAJLA SA GITHUBA..........................................................
let text = "";
let clickedArray=[];
fetch(
  "https://raw.githubusercontent.com/PavleGavrilovic/Istorijski-dogadjaji/main/data/data.json"
)
  .then((response) => response.json())
  .then((data) => {

    

    //PAGINACIJA ..................................................................................

    let state = {
      'info': data,
  
      'page': 1,
      'rows': 6,
      
  }
  
  buildLayout()
  
  function pagination(info, page, rows) {
  
      let trimStart = (page - 1) * rows
      let trimEnd = trimStart + rows
  
      let trimmedData = info.slice(trimStart, trimEnd)
  
      let pages = Math.round(info.length / rows);
  
      return {
          'info': trimmedData,
          'pages': pages,
      }
  }
  
  function pageButtons(pages) {
      let wrapper = document.getElementById('pagination-wrapper');
  
      wrapper.innerHTML = ``;
    
      for (let page = 1; page <= pages; page++) {
        wrapper.innerHTML += `<button value=${page} class="pageNumber">${page}</button>`
      }
  
      
  
      $('.pageNumber').on('click', function() {
          $('#eventWrapper').empty();
  
          state.page = Number($(this).val())
  
          buildLayout()
      })
  
  }
  
  
  function buildLayout() {
      let table = $('#eventWrapper');
  
      let dataP = pagination(state.info, state.page, state.rows)
      let myList = dataP.info;
  
      for (var i = 1 in myList) {
          
          var row = `
          <div class="eventArticle" data-id="${myList[i].id}" data-year="${myList[i].year}">
                   <h3 class="headerEvents">${myList[i].title}</h3>
                   <img src="${myList[i].image}" alt="img1" class="randomSlika">
                   <p class="paragraf shorten">${myList[i].text}</p>
               </div>
                    `
          table.append(row)
      }
  
      pageButtons(dataP.pages);

      let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find); 
    }

      $(function () {
        $(".eventArticle").on("click", function () {
          $(this).toggleClass("colorChange");
        });
      });
  }

  // SORTIRANJE OD NAJSTARIJEG DOGADJAJA.............................................

    
  document.getElementById("btnSortO").addEventListener("click", sortFromOldest);

function sortFromOldest() {

  let sortedArray = data.sort(function (a, b) {
    return a.year - b.year;
  });

  let actualArray = [];

  for (let i = 0; i < 6; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `
    );
  }
  
  document.getElementById("eventWrapper").innerHTML = actualArray.join(" ");

  let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find);
    }

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

  document.getElementById("pagination-wrapper").style.visibility="visible";
}

// SORTIRANJE OD NAJSKORIJEG DOGADJAJA.................................................

document.getElementById("btnSortN").addEventListener("click", sortFromNewest);

function sortFromNewest() {

  let sortedArray = data.sort(function (a, b) {
    return b.year - a.year;
  });

  let actualArray = [];

  for (let i = 0; i < 6; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `
    );
  }

  document.getElementById("eventWrapper").innerHTML = actualArray.join(" ");

  let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find);
    }

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });
  document.getElementById("pagination-wrapper").style.visibility="visible";
} 

// FILTRIRANJE ANTICKIH DOGADJAJA................................................

    document.getElementById("classical").addEventListener("click", showClassical);

    function showClassical() {
      let newArray = data.filter(function (elem) {
        if (elem.year > -2000 && elem.year <= 476) {
          return elem;
        }
      });
      let text = "";
      newArray.forEach((element) => {
        text += `
        <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
            <h3 class="headerEvents">${element.title}</h3>
            <img src="${element.image}" alt="img1" class="randomSlika">
            <p class="paragraf shorten">${element.text}</p>
        </div>
            `;
      });

      document.getElementById("eventWrapper").innerHTML = text;

      let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find);
    }

      $(function () {
        $(".eventArticle").on("click", function () {
          $(this).toggleClass("colorChange");
        });
      });

      document.getElementById("pagination-wrapper").style.visibility="hidden";
    }

    // FILTRIRANJE SREDNJOVEKOVNIH DOGADJAJA................................................

    document.getElementById("medieval").addEventListener("click", showMedieval);

    function showMedieval() {
      let newArray = data.filter(function (elem) {
        if (elem.year > 476 && elem.year < 1492) {
          return elem;
        }
      });
      let text = "";
      newArray.forEach((element) => {
        text += `
            <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
                <h3 class="headerEvents">${element.title}</h3>
                <img src="${element.image}" alt="img1" class="randomSlika">
                <p class="paragraf shorten">${element.text}</p>
            </div>
                `;
      });

      document.getElementById("eventWrapper").innerHTML = text;

      let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find);
    }

      $(function () {
        $(".eventArticle").on("click", function () {
          $(this).toggleClass("colorChange");
        });
      });

      document.getElementById("pagination-wrapper").style.visibility="hidden";
    }

    // FILTRIRANJE RANIH MODERNIH DOGADJAJA................................................

    document.getElementById("newAge").addEventListener("click", shownewAge);

    function shownewAge() {
      document.getElementById("eventWrapper").innerHTML="";
      let newArray = data.filter(function (elem) {
        if (elem.year >= 1492 && elem.year < 1800) {
          return elem;
        }
      });
      
      let state = {
        'info': newArray,
    
        'page': 1,
        'rows': 6,
        
      }
    
    buildLayout()
    
    function pagination(info, page, rows) {
    
        let trimStart = (page - 1) * rows
        let trimEnd = trimStart + rows
    
        let trimmedData = info.slice(trimStart, trimEnd)
    
        let pages = Math.round(info.length / rows);
    
        return {
            'info': trimmedData,
            'pages': pages,
        }
    }
    
    function pageButtons(pages) {
        let wrapper = document.getElementById('pagination-wrapper')
    
        wrapper.innerHTML = ``;
      
        for (var page = 1; page <= pages; page++) {
          wrapper.innerHTML += `<button value=${page} class="pageNumber">${page}</button>`
        }
    
        $('.pageNumber').on('click', function() {
            $('#eventWrapper').empty()
    
            state.page = Number($(this).val())
    
            buildLayout()
        })
    
    }
    
    
    function buildLayout() {
        let table = $('#eventWrapper');
    
        let dataP = pagination(state.info, state.page, state.rows)
        let myList = dataP.info;
    
        for (var i = 1 in myList) {
            let row = `
            <div class="eventArticle" data-id="${myList[i].id}" data-year="${myList[i].year}">
                     <h3 class="headerEvents">${myList[i].title}</h3>
                     <img src="${myList[i].image}" alt="img1" class="randomSlika">
                     <p class="paragraf shorten">${myList[i].text}</p>
                 </div>
                      `
            table.append(row)

            
        }
    
        pageButtons(dataP.pages)

        

      if(newArray.length>6){
        document.getElementById("pagination-wrapper").style.visibility="visible";
      }else{
        document.getElementById("pagination-wrapper").style.visibility="hidden";
      }

      let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
        
       clickedArray.push(find);
    }

      $(function () {
        $(".eventArticle").on("click", function () {
          $(this).toggleClass("colorChange");
        });
      });
      
      
    }
  };
    // FILTRIRANJE MODERNIH DOGADJAJA................................................

    document.getElementById("modernAge").addEventListener("click", showModernAge);

    function showModernAge() {
      let date = new Date();
      let currentYear = date.getFullYear();

      let newArray = data.filter(function (elem) {
        if (elem.year >= 1800 && elem.year <= currentYear) {
          return elem;
        }
      });
      let text = "";
      newArray.forEach((element) => {
        text += `
        <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
            <h3 class="headerEvents">${element.title}</h3>
            <img src="${element.image}" alt="img1" class="randomSlika">
            <p class="paragraf shorten">${element.text}</p>
        </div>
            `;
      });

      document.getElementById("eventWrapper").innerHTML = text;

      let clickedArticles=document.getElementsByClassName("eventArticle");

    for(let i=0;i<clickedArticles.length;i++){
        clickedArticles[i].addEventListener("click",getClicked);
    }
    
    function getClicked(){
        
        let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
                
            }
        })
       clickedArray.push(find);
    }

      $(function () {
        $(".eventArticle").on("click", function () {
          $(this).toggleClass("colorChange");
        });
      });

      document.getElementById("pagination-wrapper").style.visibility="hidden";
    }

});   

    
  

// UZIMANJE KLIKNUTIH DOGADJAJA...............................................

document.getElementById("btnAdd").addEventListener("click", collectData);

function collectData() {
  let realArray=[...new Set(clickedArray)];
  localStorage.setItem("arr",JSON.stringify(realArray));
}

// SAKRIVANJE JEDNOG DUGMETA U ZAVISNOSTI OD TOGA DA LI IMA LOCALSTORAGE ILI NE...................................

if (localStorage.getItem("arr")) {
  document.getElementById("btnAdd").style.display = "none";
}

if (!localStorage.getItem("arr")) {
  document.getElementById("btnAddMore").style.display = "none";
}

// DODAVANJE JOS DOGADJAJA.......................................................

document.getElementById("btnAddMore").addEventListener("click", AddData);

    function AddData() {
      if (localStorage.getItem("arr")) {
        localStorage.setItem("arr2",JSON.stringify([...new Set(clickedArray)]))
        let array1=JSON.parse(localStorage.getItem('arr'));
        
        let array2=JSON.parse(localStorage.getItem('arr2'));
        
        let fullArray=array1.concat(array2);
        
        
        fullArrayNoDoubles=fullArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
        
        localStorage.setItem("arr",JSON.stringify([...new Set(fullArrayNoDoubles)]))
        localStorage.setItem("arr2","");
      
      }else{
        localStorage.setItem("arr",JSON.stringify([...new Set(clickedArray)]))
      }
    }

// PRIKAZIVANJE CELOG TEKSTA DOGADJAJA..................................................

    $('.checkView').change(function() {
      if ($(this).is(':checked')) {
        $(".paragraf").removeClass("shorten");
        $(".eventArticle").css("width","fit-content").css("height","fit-content");
      } else {
          $(".paragraf").addClass("shorten");
          $(".eventArticle").css("width","initial").css("height","initial")
      }
    });
