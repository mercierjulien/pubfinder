// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', function(){
    openBeer("hot", "", false)
}, false)


var lastbeerResearch = ""

function openBeer(name, categorie, noAlcohol) {
    lastResearch = name
    if (name == undefined) {
        name = lastbeerResearch
    }
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.punkapi.com/v2/beers?beer_name='+name+'&per_page=20', true);
    request.onload =  function(){
        document.querySelector('.CSSgal').innerHTML = ""
        // Begin accessing JSON data here
        var beers = JSON.parse(this.response);
        console.log(beers);
        if (beers == null) {
            document.querySelector('.CSSgal').innerHTML = '<img class="noResult" src="./assets/EvenEasygoingHarvestmen-size_restricted.gif" alt=""></img>'
        }
        if (noAlcohol == true) {
            beers = beers.filter(beer => beer.strAlcoholic == "Non alcoholic" || beer.strAlcoholic == "Optional alcohol");
        }
        if (categorie != "") {
            beers = beers.filter(beer => beer.strCategory == categorie);
        }
        var bannerSlides = document.querySelector('.CSSgal')
    
        for (let index = 1; index < beers.length+1; index++) {
            bannerSlides.innerHTML += '<s id="s'+index+'"></s>'
        }
    
        bannerSlides.innerHTML += '<div class="cocktailSlider"></div><div class="prevNext"></div><div class="bullets"></div>'
    
        for (let index = 1; index < beers.length+1; index++) {
            var prevnext = bannerSlides.querySelector(".prevNext")
            if (index == 1) {
                prevnext.innerHTML = '<div><a href="#s'+(beers.length)+'"></a><a href="#s'+(index+1)+'"></a></div>'
            }
            else if (index == beers.length) {
                prevnext.innerHTML += '<div><a href="#s'+(index-1)+'"></a><a href="#s'+1+'"></a></div>'
            }
            else{
                prevnext.innerHTML += '<div><a href="#s'+(index-1)+'"></a><a href="#s'+(index+1)+'"></a></div>'
            }
        }
    
        for (let index = 1; index < beers.length+1; index++) {
            var bullets = bannerSlides.querySelector(".bullets")
            bullets.innerHTML += '<a href="#s'+index+'">'+index+'</a>'
        }
    
        beers.forEach(beer => {
    
            var slide = document.querySelector('.cocktailSlider')
            slide.innerHTML += '<div><img class="iconbeer" src="'+beer.image_url+''+'"><h1 class="beerTitle">'+beer.name+'</h1><div class="beerBadge">'+beer.abv+'°</div><div class="beerDescription">'+beer.description+'</div><div class="beerIngredient"><ul>'+'</ul></div></div>'
        });
    }
    
    // Send request
    request.send();
    
    // Begin accessing JSON data here
}

function getBeerVal() {
    const val = document.querySelector('.searchBeerBar').value;
    console.log(val);
    openBeer(val, '', false);
}


function applyBeerFilter(){
    var noAlcohol = document.querySelector('.checkbox').checked
    console.log(noAlcohol)
    var categorie = document.querySelector('#ingredient').value
    openBeer(lastResearch,categorie,noAlcohol)
    var modal = document.getElementById("myModal");
    modal.style.display = 'none'
} 