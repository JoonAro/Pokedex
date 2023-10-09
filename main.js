const content = document.querySelector('section');
const container = document.querySelector('container');
let type2Cont = document.querySelector('type2');
let searchInput;
const searchButton = document.querySelector('pokeSearch');
//creates variable named content and targets section in html
let pokeData = [1, 2, 3];
let pokeData2 = [];
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
        types: data.types,
        height: data.height,
        weight: data.weight
    };
});

});
    Promise.all(fetches).then(res => {
        pokeData = res;

        pokeCards();
});
})
}
const fetchData2 = async() => {
    await
fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
.then(res => res.json())
.then(data => {
    const fetches2 = data.results.map(item => {
return fetch(item.url)
.then((res) => res.json())
.then((data) => {
    return {
        id: data.id,
        name: data.name,
        img: data.sprites.other['official-artwork'].front_default,
        types: data.types,
        height: data.height,
        weight: data.weight
    };
});

});
    Promise.all(fetches2).then(res => {
        pokeData2 = res;

        pokeCards();
});
})
}
let type = '';
//fetch api
//pokeSearch make a new fetch for the pokesearch and display those results instead of pokecards with an if statement
searchInput = document.querySelector('#searchBar').value
console.log(searchInput);
/* const whatEverFunc = () => {
    const pokemonSearched = pokeData2.filter((pokemon) => pokemon.name.includes(searchInput)).map((pokemon2) => {
        console.log(pokemon2);
        return `<div class="container">
        <p class="nro">#${pokemon2.id}</p>
        <img class="pokePic"
        src="
        ${pokemon2.img}"
        />
        <div class="card">
        <div>Name:${pokemon2.height}</div>
        <div>Type:${pokemon2.weight} </div>
        <p> $} ${type2Cont}</p>
        </div>
        </div>`
    }).join('')
    content.innerHTML = pokemonSearched;
    
    
    
    
}
*/
const pokeCards = () => {
   //map takes the pokeData array 
    //getting every string to start with uppercase letter
    const cards = pokeData.map((pokemon) => {
        
        let name = ' ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ';
        let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
        let weight = pokemon.weight / 10;
        let height = pokemon.height / 10;
    //console.log(pokemon.types[0].type.url);

        //if there are 2 types and the 2nd type isn't undefined run this or else emptystring
        if (pokemon.types[1] != undefined) {
            let type2 = pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
          type2Cont = ` & ${type2}`;
        }else {
            type2Cont = '';
        }
        return `<div class="container">
        <div class="nro ${type1}">#${pokemon.id}</div>
        <img class="pokePic ${type1}"
        src="
        ${pokemon.img}"
        />
        <div class="card">
        <div>Name: ${name} </div>
        <div>Type: ${type1} ${type2Cont}
        </div>
        <div>Height: ${height} m</div>
        <div>Weight: ${weight} kgs</div>
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
/* document.addEventListener('click', whatEverFunc); */
/* searchButton.addEventListener('click', whatEverFunc); */