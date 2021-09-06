$(function () {
  $(".eventArticle").on("click", function () {
    $(this).toggleClass("colorChange");
  });
});


let clickedArray = [];

let storageArr = JSON.parse(localStorage.getItem("arr"));


things = storageArr.filter(
  (thing, index, self) =>
    index ===
    self.findIndex((t) => t.place === thing.place && t.name === thing.name)
);


// ISPISIVANJE DOGADJAJA...........................................................................

let text = "";

storageArr.forEach((element) => {
  text += `
         <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
             <h3 class="headerEvents">${element.title}</h3>
             <img src="${element.image}" alt="img1" class="randomSlika">
             <p class="paragraf shorten">${element.text}</p>
        </div>
            `;
});


let forArray = document.getElementsByClassName("eventArticle");

let state = {
  'info': storageArr,

  'page': 1,
  'rows': 6,
  
}

buildLayout()

function pagination(info, page, rows) {

  let trimStart = (page - 1) * rows
  let trimEnd = trimStart + rows

  let trimmedData = info.slice(trimStart, trimEnd)

  let pages = Math.ceil(info.length / rows);


  return {
      'info': trimmedData,
      'pages': pages,
  }

 
}

function pageButtons(pages) {
  let wrapper = document.getElementById('pagination-wrapper');

  wrapper.innerHTML = ``;

  for (var page = 1; page <= pages; page++) {
    wrapper.innerHTML += `<button value=${page} class="pageNumber">${page}</button>`
  }

  $('.pageNumber').on('click', function() {
      $('#chosenWrapper').empty()

      state.page = Number($(this).val())

      buildLayout()
  })

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

}


function buildLayout() {
  let table = $('#chosenWrapper')
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

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

  pageButtons(dataP.pages);

  let clickedArticles=document.getElementsByClassName("eventArticle");

for(let i=0;i<clickedArticles.length;i++){
    clickedArticles[i].addEventListener("click",getClicked);
}

function getClicked(){
    
    let clicked=this;
    let articleId=clicked.dataset.id

    let find=storageArr.find(function (param) {
        if(param.id==articleId){
            return param;
            
        }
    })
    
   clickedArray.push(find)
}

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });
}

// DOHVATANJE DOGADJAJA I MENJANJE POZADINSKE BOJE NA KLIK...........................................

let clickedArticles = document.getElementsByClassName("eventArticle");

for (let i = 0; i < clickedArticles.length; i++) {
  clickedArticles[i].addEventListener("click", getClicked);
}

function getClicked() {
  let clicked = this;
  let articleId = clicked.dataset.id;

  let find = storageArr.find(function (param) {
    if (param.id == articleId) {
      return param;
    }
  });

  clickedArray.push(find);
}

$(function () {
  $(".eventArticle").on("click", function () {
    $(this).toggleClass("colorChange");
  });
});

// BRISANJE DOGADJAJA...............................................................

document.getElementById("btnRemove").addEventListener("click", removeItems);

function removeItems() {
  $(".colorChange").remove();
  let arrayForRemove = [...new Set(clickedArray)];

  let difference = storageArr.filter((x) => !arrayForRemove.includes(x));

  localStorage.setItem("arr", JSON.stringify(difference));
}

// DODAVANJE DOGADJAJA................................................................

document.getElementById("btnMore").addEventListener("click", addItems);

function addItems() {
  location.href ="file:///C:/Users/pavle/OneDrive/Desktop/PROJEKAT/events.html";
}

// PRIKAZIVANJE CELOG TEKSTA DOGADJAJA..................................................

$(".checkView").change(function () {
  if ($(this).is(":checked")) {
    $(".paragraf").removeClass("shorten");
    $(".eventArticle").css("width", "fit-content").css("height", "fit-content");
  } else {
    $(".paragraf").addClass("shorten");
    $(".eventArticle").css("width", "400px").css("height", "350px");
  }
});

// SORTIRANJE OD NAJSTARIJEG DOGADJAJA.............................................

document.getElementById("btnSortO").addEventListener("click", sortFromOldest);

function sortFromOldest() {
  let storageArr = JSON.parse(localStorage.getItem("arr"));

  let sortedArray = storageArr.sort(function (a, b) {
    return a.year - b.year;
  });
  
  
  let actualArray = [];

  for (let i = 0; i < sortedArray.length; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `);
  }
  document.getElementById("chosenWrapper").innerHTML = actualArray.join(" ");
  

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

  localStorage.setItem("arr", JSON.stringify(sortedArray));
  window.location.reload();
}

// SORTIRANJE OD NAJSKORIJEG DOGADJAJA.............................................

document.getElementById("btnSortN").addEventListener("click", sortFromNewest);

function sortFromNewest() {
  
  let storageArr = JSON.parse(localStorage.getItem("arr"));

  let sortedArray = storageArr.sort(function (a, b) {
    return b.year - a.year;
  });
  
  let actualArray = [];

  for (let i = 0; i < sortedArray.length; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `);
  }
  document.getElementById("chosenWrapper").innerHTML = actualArray.join(" ");

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

  localStorage.setItem("arr", JSON.stringify(sortedArray));
  window.location.reload();
}


// FILTRIRANJE ANTICKIH DOGADJAJA................................................

document.getElementById("classical").addEventListener("click", showClassical);

function showClassical() {
let newArray = storageArr.filter(function (elem) {
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

document.getElementById("chosenWrapper").innerHTML = text;

let clickedArticles=document.getElementsByClassName("eventArticle");

for(let i=0;i<clickedArticles.length;i++){
  clickedArticles[i].addEventListener("click",getClicked);
}

function getClicked(){
  
  let clicked=this;
  let articleId=clicked.dataset.id

  let find=storageArr.find(function (param) {
      if(param.id==articleId){
          return param;
          
      }
  })
  
 clickedArray.push(find)
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
  let newArray = storageArr.filter(function (elem) {
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

  document.getElementById("chosenWrapper").innerHTML = text;

  let clickedArticles=document.getElementsByClassName("eventArticle");

for(let i=0;i<clickedArticles.length;i++){
    clickedArticles[i].addEventListener("click",getClicked);
}

function getClicked(){
    
    let clicked=this;
    let articleId=clicked.dataset.id

    let find=storageArr.find(function (param) {
        if(param.id==articleId){
            return param;
            
        }
    })
    
   clickedArray.push(find)
}

  $(function () {
    $(".eventArticle").on("click", function () {
      $(this).toggleClass("colorChange");
    });
  });

  document.getElementById("pagination-wrapper").style.visibility="hidden";
}

// FILTRIRANJE RANIH MODERNIH DOGADJAJA................................................

document.getElementById("newAge").addEventListener("click", showNewAge);

function showNewAge() {
  document.getElementById("chosenWrapper").innerHTML="";
  let newArray = storageArr.filter(function (elem) {
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

    $(function () {
      $(".eventArticle").on("click", function () {
        $(this).toggleClass("colorChange");
      });
    });

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
      $('#chosenWrapper').empty()

      state.page = Number($(this).val())

      buildLayout()
  })

}

function buildLayout() {
  let table = $('#chosenWrapper');

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
      table.append(row);
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

    let find=newArray.find(function (param) {
        if(param.id==articleId){
            return param;
            
        }
    })

  clickedArray.push(find)

  }
}
}

// FILTRIRANJE MODERNIH DOGADJAJA................................................

document.getElementById("modernAge").addEventListener("click", showModernAge);

function showModernAge() {
let date = new Date();
let currentYear = date.getFullYear();

let newArray = storageArr.filter(function (elem) {
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

document.getElementById("chosenWrapper").innerHTML = text;

let clickedArticles=document.getElementsByClassName("eventArticle");

for(let i=0;i<clickedArticles.length;i++){
  clickedArticles[i].addEventListener("click",getClicked);
}

function getClicked(){
  
  let clicked=this;
  let articleId=clicked.dataset.id

  let find=storageArr.find(function (param) {
      if(param.id==articleId){
          return param;
          
      }
  })
  
 clickedArray.push(find)
}

$(function () {
  $(".eventArticle").on("click", function () {
    $(this).toggleClass("colorChange");
  });
});

 document.getElementById("pagination-wrapper").style.visibility="hidden";
}
