const content = document.querySelector('section');
//creates variable named content and targets section in html
let pokeData = [1, 2, 3];
const fetchData = async() => {
    await
fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
.then(res => res.json())
.then(data => {
    const fetches = data.results.map(item => {
return fetch(item.url)
.then((res) => res.json())
.then((data) => {
    return {
        id: data.id,
        name: data.name,
        img: data.sprites.other['official-artwork'].front_default,
        types: data.types
    };
});

});
    Promise.all(fetches).then(res => {
        pokeData = res;
        pokeCards()
});
})
}

//fetch api
const pokeCards = () => {
    //map takes the pokeData array 
const cards = pokeData.map(pokemon => {
    return `<div class="container">
    <p class="nro">#${pokemon.id}</p>
    <img
    src="
    ${pokemon.img}"
    />
    <div class="card">
    <p>${pokemon.name}</p>
    </div>
    </div>`
}).join('')




/* `<div class="container">
    <p class="nro">#3</p>
    <img
    src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg"
    />
    <div class="card">
    <p>Name will be here</p>
    </div>
    </div>` */
    content.innerHTML = cards;
    //this creates the content inside section
}
fetchData();