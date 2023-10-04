const content = document.querySelector('section');
const container = document.querySelector('container');
let type2Cont = document.querySelector('type2');
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
let type = '';
//fetch api
const pokeCards = () => {
    //map takes the pokeData array 
    //getting every string to start with uppercase letter
    console.log(pokeData);
    const cards = pokeData.map((pokemon) => {
        let name = ' ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ';
        let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        console.log(type1);
        
        /* if (type1 = "Grass") {

        } */
        
        /* console.log(pokemon.types[0].type.url); */

        //if there are 2 types and the 2nd type isn't undefined run this or else emptystring
        if (pokemon.types[1] != undefined) {
            let type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
          type2Cont = ` & ${type2}`;
        }else {
            type2Cont = '';
        }
        return `<div class="container">
        <p class="nro">#${pokemon.id}</p>
        <img class="pokePic ${type1}"
        src="
        ${pokemon.img}"
        />
        <div class="card">
        <div>Name:${name}</div>
        <div>Type: </div>
        <p> ${type1} ${type2Cont}</p>
        </div>
        </div>`
    }).join('')
//pokemon.types.map((type) => getTypeString(type)).join('')
/* ${pokemon.types[0].type.name} */
/* ${if (pokemon.types[1] != undefined) {
    pokemon.types[1].type.name}
}} */

//<p class="type2">${type2Cont}</p>
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